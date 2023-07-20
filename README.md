# Web Layout Reflow - Source Code Static Analysis

Web Layout Reflow - Source Code Static Analysis
---

This project is based on this [gist](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)

In the future, this may be evolved to be an npm-publish command-line tool.

---

## Installation

1. Clone this repository
2. Browse to the repository folder
3. Run `npm install` 

---

## Usage

1. `npm run scan [filePath]`
2. Reports will be output to folder `report`

---

## Sample Report + Checklist

**Checklist:** 

These represent files that should be inspected or changed to optimize web layout flow.
```
[
  "./utilities/escapeHTML.ts",
  "./utilities/getIsClampEnabled.ts",
  "./utilities/getScrollBarSize.js",
  "./utilities/index.ts"
]
```

**Report:**

These declare the specific files and lines that have flagged layout elements.

```
[ 
  {
    lines: [
      {
        filePath: './shared/TextField/TextField.tsx',
        line: 'if (isFocused) inputField?.current?.focus();',
        lineNo: 35
      }
    ]
  }
]
```
