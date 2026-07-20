const fs = require("fs");
const ts = require("typescript");

const filePath = process.argv[2];
let source = fs.readFileSync(filePath, "utf8");

source = source.replace(
  `export default function ProposalPage({\n  partner = "openai",\n  emphasisFontClassName,\n}: {\n  partner?: "openai" | "cursor";\n  emphasisFontClassName: string;\n}) {\n  const isCursor = partner === "cursor";`,
  `export default function ProposalPage({\n  emphasisFontClassName,\n}: {\n  emphasisFontClassName: string;\n}) {`,
);

source = source
  .replace("  const isCursor = true;\n", "")
  .replaceAll("begin-cursor-page", "begin-openai-page")
  .replaceAll("begin-cursor-arrow", "begin-openai-arrow");

const sourceFile = ts.createSourceFile(
  filePath,
  source,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX,
);

const isIdentifier = (node, name) =>
  ts.isIdentifier(node) && node.text === name;

const isNegatedCursor = (node) =>
  ts.isPrefixUnaryExpression(node) &&
  node.operator === ts.SyntaxKind.ExclamationToken &&
  isIdentifier(node.operand, "isCursor");

const shouldDropVariableStatement = (statement) => {
  if (!ts.isVariableStatement(statement)) return false;

  return statement.declarationList.declarations.every((declaration) => {
    if (!ts.isIdentifier(declaration.name)) return false;
    return (
      declaration.name.text === "isCursor" ||
      declaration.name.text === "allFeaturedReels" ||
      declaration.name.text.startsWith("cursor")
    );
  });
};

const transformer = (context) => {
  const { factory } = context;

  const visit = (node) => {
    if (
      ts.isJsxExpression(node) &&
      node.expression &&
      ts.isBinaryExpression(node.expression) &&
      node.expression.operatorToken.kind ===
        ts.SyntaxKind.AmpersandAmpersandToken
    ) {
      if (isIdentifier(node.expression.left, "isCursor")) return undefined;
      if (isNegatedCursor(node.expression.left)) {
        return factory.updateJsxExpression(
          node,
          ts.visitNode(node.expression.right, visit),
        );
      }
    }

    if (
      ts.isConditionalExpression(node) &&
      isIdentifier(node.condition, "isCursor")
    ) {
      return ts.visitNode(node.whenFalse, visit);
    }

    if (
      ts.isConditionalExpression(node) &&
      isNegatedCursor(node.condition)
    ) {
      return ts.visitNode(node.whenTrue, visit);
    }

    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken
    ) {
      if (isIdentifier(node.left, "isCursor")) {
        return factory.createFalse();
      }
      if (isNegatedCursor(node.left)) {
        return ts.visitNode(node.right, visit);
      }
    }

    return ts.visitEachChild(node, visit, context);
  };

  return (root) => {
    const visited = ts.visitNode(root, visit);
    return factory.updateSourceFile(
      visited,
      visited.statements.filter(
        (statement) => !shouldDropVariableStatement(statement),
      ),
    );
  };
};

const result = ts.transform(sourceFile, [transformer]);
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
process.stdout.write(printer.printFile(result.transformed[0]));
result.dispose();
