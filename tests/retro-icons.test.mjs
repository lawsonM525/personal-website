import test from "node:test"
import assert from "node:assert/strict"
import { existsSync, readFileSync, readdirSync } from "node:fs"
import { createRequire } from "node:module"
import vm from "node:vm"
import ts from "typescript"
import React from "react"
import { renderToStaticMarkup } from "react-dom/server"

const source = readFileSync(new URL("../components/retro-icons.tsx", import.meta.url), "utf8")
const compiled = ts.transpileModule(source, { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS } }).outputText
const module = { exports: {} }
vm.runInNewContext(compiled, { exports: module.exports, module, require: createRequire(import.meta.url) })

test("every retro icon renders at toolbar size and its illustrated artwork exists", () => {
  assert.ok(Object.keys(module.exports).length >= 80)
  for (const [name, Icon] of Object.entries(module.exports)) {
    const html = renderToStaticMarkup(React.createElement(Icon, { size: 26, className: "toolbar-icon" }))
    assert.match(html, /width="26"/, name)
    assert.match(html, /height="26"/, name)
    assert.match(html, /aria-hidden="true"/, name)
    assert.match(html, /data-retro-icon=/, name)
    for (const match of html.matchAll(/href="([^"]+)"/g)) assert.ok(existsSync(new URL("../public" + match[1], import.meta.url)), `${name}: ${match[1]}`)
  }
  const labeled = renderToStaticMarkup(React.createElement(module.exports.Search, { "aria-label": "Search" }))
  assert.doesNotMatch(labeled, /aria-hidden="true"/)
})

test("site source and dependencies contain no Lucide imports", () => {
  function walk(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const file = new URL(entry.name + (entry.isDirectory() ? "/" : ""), directory)
      if (entry.isDirectory()) walk(file)
      else if (/\.(tsx?|jsx?)$/.test(entry.name)) assert.doesNotMatch(readFileSync(file, "utf8"), /["']lucide(?:-react)?(?:\/[^"']*)?["']/, file.pathname)
    }
  }
  walk(new URL("../app/", import.meta.url))
  walk(new URL("../components/", import.meta.url))
  assert.equal(JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")).dependencies["lucide-react"], undefined)
})
