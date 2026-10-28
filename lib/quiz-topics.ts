import type { TerminalQuestion, TerminalQuizTopic } from "./terminal"

export type QuizTopic = TerminalQuizTopic & {
  description: string
  objectives: string[]
  igcse: { section: string; label: string }
  ib: { section: string; label: string }
  related: string[]
}

export const quizCurricula = {
  igcse: { slug: "igcse-computer-science", title: "Cambridge IGCSE Computer Science", version: "0478 · exams 2026–2028", source: "https://www.cambridgeinternational.org/Images/697167-2026-2028-syllabus.pdf" },
  ib: { slug: "ib-computer-science", title: "IB Computer Science", version: "first assessment 2027 · shared SL/HL foundations", source: "https://ibo.org/globalassets/new-structure/university-admission/pdfs/dp_comp_sci_subjectbrief_en.pdf" },
} as const

function q(question: string, options: [string, string, string], correct: 0 | 1 | 2, why: string): TerminalQuestion {
  return { question, options, correct, why }
}

// Original practice questions. Curriculum links identify topic areas, not complete exam coverage.
export const quizTopics: QuizTopic[] = [
  {
    slug: "binary", title: "Binary and hexadecimal", description: "Practise number conversion, binary shifts, bytes, overflow, and two's complement with worked explanations.",
    objectives: ["Convert between binary, decimal, and hexadecimal", "Trace logical shifts and recognise overflow", "Interpret unsigned and two's-complement values"],
    igcse: { section: "1.1", label: "Number systems" }, ib: { section: "A.1", label: "Computer fundamentals" }, related: ["logic", "hardware"],
    questions: [
      q("What is binary 1010 in decimal?", ["8", "10", "12"], 1, "The place values are 8, 4, 2, 1. In 1010, the 8 and 2 positions are set: 8 + 2 = 10."),
      q("Which binary number represents decimal 13?", ["1101", "1011", "1110"], 0, "13 = 8 + 4 + 1, so the 8, 4, and 1 bits are set. That gives 1101."),
      q("What is hexadecimal 2F in decimal?", ["32", "47", "215"], 1, "F represents 15. The 2 is in the sixteens column: 2 × 16 + 15 = 47."),
      q("What is the largest unsigned integer an 8-bit register can hold?", ["127", "256", "255"], 2, "Eight bits have 256 different patterns. Unsigned values start at 0, so the largest is 255, represented by 11111111."),
      q("Why does 11111111 + 00000001 overflow an unsigned 8-bit register?", ["The sum needs nine bits", "The answer must be negative", "Binary addition cannot use carries"], 0, "255 + 1 = 256, which is binary 100000000. That ninth bit does not fit in an 8-bit register."),
      q("Logically shift 00101101 one place left in an 8-bit register. What remains?", ["00010110", "01011010", "10110100"], 1, "Move every bit left once and fill the rightmost position with 0. The result is 01011010, or decimal 90."),
      q("Logically shift 10010000 two places right, filling with zeros. What is the result?", ["00100100", "01001000", "00010010"], 0, "Two right shifts give 01001000 and then 00100100. Decimal 144 becomes 36."),
      q("How many bytes are in 24 bits?", ["2", "4", "3"], 2, "One byte contains eight bits. 24 ÷ 8 = 3 bytes."),
      q("One hexadecimal digit corresponds to how many binary bits?", ["2", "4", "8"], 1, "Hexadecimal has 16 digit values. Four binary bits also have 16 patterns, from 0000 to 1111."),
      q("What does 11111111 represent as an 8-bit two's-complement integer?", ["255", "−128", "−1"], 2, "In 8-bit two's complement, the leftmost position has weight −128. The remaining set bits total 127: −128 + 127 = −1."),
    ],
  },
  {
    slug: "logic", title: "Boolean logic and truth tables", description: "Test AND, OR, NOT, XOR, NAND, NOR, and combined Boolean expressions using clearly defined inputs.",
    objectives: ["Evaluate common logic gates", "Calculate the size of a truth table", "Trace Boolean expressions with parentheses"],
    igcse: { section: "10", label: "Boolean logic" }, ib: { section: "A.1", label: "Computer fundamentals" }, related: ["binary", "programming"],
    questions: [
      q("If A = 1 and B = 0, what is A AND B?", ["0", "1", "It cannot be determined"], 0, "AND returns 1 only when both inputs are 1. Here B is 0, so the result is 0."),
      q("If A = 1 and B = 0, what is A OR B?", ["0", "1", "10"], 1, "Inclusive OR returns 1 when at least one input is 1. A is 1, so the result is 1."),
      q("What is NOT 0?", ["0", "Undefined", "1"], 2, "NOT reverses a Boolean input. It turns 0 into 1 and 1 into 0."),
      q("Which input pair makes a two-input XOR gate return 1?", ["A = 1, B = 1", "A = 0, B = 1", "A = 0, B = 0"], 1, "XOR returns 1 when the inputs differ. It returns 0 when they are the same."),
      q("For which inputs does a two-input NAND gate return 0?", ["A = 1, B = 1", "A = 0, B = 0", "A = 1, B = 0"], 0, "NAND means NOT AND. AND is 1 only for two 1 inputs; negating that produces NAND's only 0 result."),
      q("If A = 0 and B = 0, what is A NOR B?", ["0", "Undefined", "1"], 2, "OR returns 0 for two 0 inputs. NOR negates that result, producing 1."),
      q("How many rows are needed to list every combination of two Boolean inputs?", ["2", "4", "8"], 1, "Each input has two possibilities. There are 2 × 2 = 4 combinations: 00, 01, 10, 11."),
      q("How many input combinations are there for three Boolean inputs?", ["8", "6", "3"], 0, "There are 2³ = 8 combinations. Each extra Boolean input doubles the number of rows."),
      q("A = 0, B = 1, C = 1. What is (A OR B) AND (NOT C)?", ["1", "It depends on evaluation order", "0"], 2, "A OR B is 1. NOT C is 0. The final operation is 1 AND 0, which gives 0."),
      q("Which expression is true whenever A and B differ?", ["A AND B", "A XOR B", "A NOR B"], 1, "Exclusive OR detects unequal Boolean inputs: 01 and 10 both produce 1."),
    ],
  },
  {
    slug: "hardware", title: "Computer architecture and memory", description: "Check your understanding of CPU components, registers, memory, storage, and buses in a basic computer model.",
    objectives: ["Distinguish CPU components and registers", "Compare RAM, ROM, cache, and secondary storage", "Identify the roles of common buses"],
    igcse: { section: "3.1, 3.3", label: "Computer architecture; data storage" }, ib: { section: "A.1", label: "Computer fundamentals" }, related: ["binary", "networks"],
    questions: [
      q("Which CPU component carries out arithmetic and logical operations?", ["The control unit", "The ALU", "The network interface"], 1, "The arithmetic logic unit (ALU) performs operations such as addition, comparison, and Boolean logic."),
      q("What is the control unit's main role in a basic CPU?", ["Coordinate instruction execution using control signals", "Store files permanently", "Display the program's interface"], 0, "The control unit directs the activities needed to fetch, decode, and execute instructions. It sends control signals to coordinate components."),
      q("Which kind of memory normally loses its contents when power is removed?", ["ROM", "An SSD", "RAM"], 2, "RAM is volatile working memory. ROM and an SSD retain their stored contents without continuous power."),
      q("What distinguishes ROM from ordinary RAM?", ["ROM must be cleared every second", "ROM retains its contents without power", "ROM is the same as a CPU register"], 1, "ROM is non-volatile. It can hold instructions or data that remain available after the computer is switched off."),
      q("Why does a CPU use cache memory?", ["To keep frequently needed data or instructions close for faster access", "To replace all secondary storage", "To increase the number of pixels on screen"], 0, "Cache is a small, fast memory used to reduce the time spent waiting for frequently needed data or instructions."),
      q("What is a register?", ["A list of registered users", "A removable storage drive", "A small storage location within the CPU"], 2, "Registers hold values the CPU needs directly, such as an instruction, an address, or an intermediate result."),
      q("In a basic fetch–decode–execute model, what does the program counter hold?", ["The number of programs installed", "The address of the next instruction to fetch", "The total number of files"], 1, "The program counter tracks the instruction address used for the next fetch. A branch instruction can change this sequence."),
      q("Which storage device uses flash memory rather than spinning magnetic platters?", ["An SSD", "A magnetic hard disk", "An optical DVD"], 0, "A solid-state drive stores data in flash memory. It does not use a hard disk's spinning magnetic platters."),
      q("What does the address bus carry in a basic computer model?", ["Only arithmetic answers", "The physical address of the computer owner", "The address of a location being accessed"], 2, "The address bus identifies the memory or device location involved in an operation. The data bus carries the data itself."),
      q("Which bus carries data between the CPU and memory?", ["The address bus", "The data bus", "The power cable"], 1, "The data bus transfers data. Its role differs from the address bus, which specifies where an operation should take place."),
    ],
  },
  {
    slug: "networks", title: "Networks and internet protocols", description: "Practise network fundamentals, packet transmission, IP and MAC addresses, DNS, routers, TCP, and HTTPS.",
    objectives: ["Distinguish network devices and addressing", "Explain packets, protocols, and reliable transmission", "Recognise what HTTPS protects"],
    igcse: { section: "2.1, 3.4, 5.1", label: "Data transmission; network hardware; the internet" }, ib: { section: "A.2", label: "Networks" }, related: ["hardware", "binary"],
    questions: [
      q("Which description best fits a local area network (LAN)?", ["A network covering a limited area, such as one school site", "Every computer connected to the internet", "A network that cannot use cables"], 0, "A LAN connects devices within a relatively limited geographical area. It can use wired connections, wireless connections, or both."),
      q("What does a router do?", ["Convert every image into binary", "Forward packets between networks", "Store the only copy of every website"], 1, "A router forwards packets between networks, using routing information to choose a next step toward the destination."),
      q("Why can a message be split into packets for transmission?", ["To guarantee that no errors can occur", "To remove the need for addresses", "To send it as smaller units that can be handled by the network"], 2, "Packets let a network handle a message in smaller units. Addressing and protocols help deliver and reconstruct the data."),
      q("What is a network protocol?", ["An agreed set of rules for communication", "A type of computer screen", "A guarantee that a website is truthful"], 0, "A protocol defines rules such as message format and how devices communicate. Both sides need compatible rules."),
      q("What is the role of an IP address?", ["It records the user's password", "It identifies an interface for communication and routing on an IP network", "It specifies a screen's brightness"], 1, "IP addresses are logical network addresses used when delivering packets across IP networks."),
      q("A MAC address is associated with which component?", ["A monitor's pixels", "A keyboard shortcut", "A network interface"], 2, "A MAC address identifies a network interface at the data-link layer. Its role differs from an IP address used for IP routing."),
      q("What does DNS help a browser find?", ["An IP address associated with a domain name", "The user's Wi-Fi password", "Whether an article is factually correct"], 0, "DNS resolves domain names to information such as IP addresses, helping a client locate the server it needs."),
      q("Which statement about TCP is correct?", ["It deliberately discards all sequence information", "It can provide ordered delivery and retransmission of lost data", "It replaces the need for IP addresses"], 1, "TCP uses mechanisms including sequence information, acknowledgements, and retransmission to provide a reliable, ordered byte stream."),
      q("What does HTTPS principally add to HTTP?", ["Proof that every claim on the page is true", "A promise that the site has no tracking", "TLS protection for data in transit"], 2, "HTTPS uses TLS to protect the connection, including encryption in transit. This does not establish the truth of the page's content."),
      q("Which device lets a computer connect to a network?", ["A network interface controller", "An arithmetic logic unit", "A read-only optical disc"], 0, "A network interface controller provides the interface through which a computer communicates on a network."),
    ],
  },
  {
    slug: "algorithms", title: "Algorithms and computational thinking", description: "Trace short algorithms, compare searching and sorting methods, and test decomposition, abstraction, and boundary cases.",
    objectives: ["Trace variables and outputs step by step", "Choose suitable search and sorting methods", "Identify decomposition, abstraction, and boundary tests"],
    igcse: { section: "7", label: "Algorithm design and problem-solving" }, ib: { section: "B.1", label: "Computational thinking" }, related: ["programming", "logic"],
    questions: [
      q("Which searching method can examine an unsorted list directly?", ["Binary search only", "Linear search", "Neither method can search an unsorted list"], 1, "Linear search checks items in turn and does not require the list to be sorted. Standard binary search does require ordering."),
      q("What is a requirement for standard binary search on an array?", ["The values are sorted in the search order", "Every value is identical", "The array contains exactly eight items"], 0, "Binary search uses ordering to discard half the remaining search interval. An unsorted array does not support that reasoning."),
      q("Trace this pseudocode:\nx ← 3\nWHILE x < 20\n  x ← x * 2\nENDWHILE\nOUTPUT x\nWhat is printed?", ["12", "20", "24"], 2, "x takes the values 3, 6, 12, 24. At 24, x < 20 is false, so the loop ends and prints 24."),
      q("In this pseudocode, both FOR bounds are included:\ntotal ← 0\nFOR i ← 1 TO 4\n  total ← total + i\nNEXT i\nWhat is total?", ["4", "10", "6"], 1, "The loop adds 1 + 2 + 3 + 4 to the initial 0, giving 10."),
      q("What is decomposition?", ["Breaking a problem into smaller, manageable parts", "Deleting all the data before solving a problem", "Writing every program as one long statement"], 0, "Decomposition separates a larger problem into subproblems that can be understood, developed, and tested more easily."),
      q("What is abstraction?", ["Keeping every detail regardless of relevance", "Choosing a computer's paint colour", "Focusing on relevant features while leaving out unnecessary detail"], 2, "Abstraction builds a useful model by selecting the features needed for the problem and omitting irrelevant details."),
      q("A field accepts whole-number ages from 0 to 120 inclusive. Which set tests both boundaries and the nearest rejected values?", ["20, 30, 40, 50", "−1, 0, 120, 121", "0, 40, 80, 120"], 1, "Boundary testing checks the accepted endpoints and the immediately adjacent rejected values: −1, 0, 120, 121."),
      q("One left-to-right bubble-sort pass compares adjacent pairs in [5, 1, 4, 2], swapping when the left item is larger. What is the list after that pass?", ["[1, 4, 2, 5]", "[1, 2, 4, 5]", "[5, 4, 2, 1]"], 0, "The comparisons move 5 right: [1,5,4,2], then [1,4,5,2], then [1,4,2,5]. One pass need not finish the whole sort."),
      q("What is the purpose of a trace table?", ["To store a website's colour palette", "To guarantee that every possible input works", "To record changing values while stepping through an algorithm"], 2, "A trace table records values at successive steps, helping you follow execution and identify mistakes. A single trace does not test every input."),
      q("An array has indices 0 to 4. A loop tries to read indices 0 to 5 inclusive. What is the problem?", ["The loop never runs", "It tries to access an index outside the array", "The array must be sorted first"], 1, "Index 5 is outside the stated valid range. This is a boundary or off-by-one error."),
    ],
  },
  {
    slug: "programming", title: "Programming fundamentals", description: "Test variables, constants, data types, conditions, loops, arrays, functions, and common programming errors.",
    objectives: ["Choose suitable data types and control structures", "Trace arrays and accumulators", "Distinguish syntax errors from logic errors"],
    igcse: { section: "8.1, 8.2", label: "Programming concepts; arrays" }, ib: { section: "B.2", label: "Programming" }, related: ["algorithms", "logic", "databases"],
    questions: [
      q("Which data type is most suitable for the number of students in a class?", ["Integer", "Boolean", "Character"], 0, "A count of students is a whole number, so an integer is suitable. A Boolean has two logical values; a character holds one character."),
      q("How does a constant differ from a variable?", ["A constant must contain text", "A constant is intended to retain its assigned value during execution", "A variable can hold only one digit"], 1, "A constant represents a value that should not be reassigned. A variable can be updated as a program runs."),
      q("Which control structure chooses between paths based on a condition?", ["A comment", "An assignment alone", "Selection, such as IF...ELSE"], 2, "Selection runs a particular path depending on a Boolean condition. IF...ELSE is one way to express it."),
      q("How many times can a pre-condition WHILE loop run if its condition is false at the first check?", ["Zero", "Exactly once", "At least twice"], 0, "A pre-condition loop tests before entering its body. If the condition starts false, the body is skipped."),
      q("Trace this pseudocode:\ncount ← 0\nFOR EACH value IN [4, 8, 2]\n  count ← count + 1\nENDFOR\nWhat is count?", ["14", "3", "1"], 1, "The loop increments once for each of three items. It counts items rather than adding their values."),
      q("Trace this pseudocode:\ntotal ← 0\nFOR EACH value IN [4, 8, 2]\n  total ← total + value\nENDFOR\nWhat is total?", ["3", "8", "14"], 2, "This accumulator adds the values: 4 + 8 + 2 = 14. It totals values rather than counting items."),
      q("The array [4, 7, 9] uses zero-based indexing. What is the value at index 1?", ["7", "4", "9"], 0, "With zero-based indexing, index 0 holds 4, index 1 holds 7, and index 2 holds 9."),
      q("In this pseudocode, FUNCTION double(n) RETURNS n * 2. What is double(6)?", ["3", "12", "36"], 1, "The function multiplies its input by 2 and returns that result. With n = 6, the return value is 12."),
      q("Which example is a logic error?", ["A missing closing parenthesis that breaks the language's syntax", "An unclosed quotation mark in source code", "A program runs but calculates a rectangle's area using width + height"], 2, "The program follows the language's syntax but uses the wrong method. A rectangle's area should be width × height."),
      q("A condition must represent either true or false. Which data type matches that purpose?", ["Boolean", "Real", "String"], 0, "A Boolean represents a logical true or false value and is used in conditions."),
    ],
  },
  {
    slug: "databases", title: "Databases and SQL", description: "Practise records, fields, primary keys, validation, filtering, sorting, and simple single-table SQL queries.",
    objectives: ["Identify fields, records, and primary keys", "Read SELECT, WHERE, COUNT, and ORDER BY queries", "Distinguish validation from proof that data is accurate"],
    igcse: { section: "9", label: "Databases" }, ib: { section: "A.3", label: "Databases" }, related: ["programming", "logic"],
    questions: [
      q("In a database table, what is a record?", ["A single column heading", "One row describing an instance of the thing stored", "The entire database software package"], 1, "A record is one row, such as one student's details. Each field holds a particular attribute in that record."),
      q("What is a field in a database table?", ["An attribute represented by a column, such as surname", "A complete collection of all tables", "A command to delete the database"], 0, "A field represents an attribute of the stored items. For example, each student record may have a surname field."),
      q("Which statement about a primary key is correct?", ["It must be the person's first name", "Its value should be duplicated in every record", "It uniquely identifies each record and cannot be null"], 2, "A primary key must distinguish each record. A unique student ID is more suitable than a first name that several students might share."),
      q("What does this SQL query select?\nSELECT name FROM Students WHERE mark >= 50;", ["Every field from every student", "Names of students whose mark is at least 50", "Only students whose mark is exactly 50"], 1, "SELECT chooses the name field. WHERE keeps records for which mark is greater than or equal to 50."),
      q("What does COUNT(*) return for a query's matching records?", ["The number of matching rows", "The sum of all numeric fields", "The number of characters in the table name"], 0, "COUNT(*) counts rows. SUM would be used to add a numeric field's values."),
      q("What does ORDER BY mark ASC do?", ["Delete the lowest mark", "Put the greatest mark first", "Sort results from the smallest mark to the greatest"], 2, "ASC means ascending order. For numeric marks, that means lowest to highest."),
      q("Which data type suits a field that stores whether a library book is on loan?", ["An image", "Boolean", "A long paragraph of text"], 1, "The status has two possibilities, such as true for on loan and false for available, so a Boolean is suitable."),
      q("An age passes a range check of 0 to 120. What does that establish?", ["It falls within the allowed range, but may still be the wrong person's age", "It is definitely the correct age", "It has been encrypted"], 0, "Validation checks acceptability according to rules. A valid value can still be factually inaccurate."),
      q("Three student records have marks 40, 50, and 80. How many records satisfy WHERE mark >= 50?", ["1", "3", "2"], 2, "The marks 50 and 80 both satisfy the condition. A greater-than-or-equal comparison includes the boundary value 50."),
      q("What does WHERE city = 'Accra' AND active = TRUE require?", ["Either condition may be true", "Both conditions must be true", "The city must be any value except Accra"], 1, "AND retains records only when both tests are true: the city is Accra and the active flag is true."),
    ],
  },
]

export function getQuizTopic(slug: string): QuizTopic | undefined { return quizTopics.find(topic => topic.slug === slug) }
export const quizQuestionCount = quizTopics.reduce((total, topic) => total + topic.questions.length, 0)
