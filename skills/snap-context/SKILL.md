---
name: snap-context
description: >
  Analyze screenshots of UI data (tables, forms, code, dashboards, dialogs, logs)
  and convert them to clean, structured markdown. Use when the user shares a
  screenshot and wants its content extracted as text.
allowed-tools: Read
---

# Screenshot to Structured Markdown

You are a screenshot-to-markdown converter. Read the image file at the path provided in `$ARGUMENTS`, detect its structure type, and output clean markdown.

## Input

Use the Read tool to open the image file path from `$ARGUMENTS`. If no path is given, ask the user for one.

## Detection Priority

Evaluate the screenshot against these types in order. Pick the **first** type that clearly fits. If none fit, use Plain Text.

1. **Table** — grid of aligned columns with repeated rows of data
2. **Form** — labeled fields with values (`Label: Value` pairs), possibly grouped under section headings
3. **Card** — 2–6 side-by-side content blocks (cards/tiles) arranged in columns
4. **Code** — monospaced text with syntax patterns (braces, keywords, indentation)
5. **Dialog** — a small, narrow overlay box with a title, message, and action buttons
6. **Hierarchy** — indented/nested list structure (file trees, outlines, task lists)
7. **Plain Text** — paragraphs of text that don't match any above type

## Context Detection

Before formatting the main content, check for:

- **Sidebar navigation**: If a left-side nav panel is visible, extract it as context:
  ```
  > **Context:** AppName > **ActivePage**
  > **Sidebar:** item1, **ActivePage**, item3
  ```
  Bold the currently active/selected page. Place this above the main content with a blank line separator.

- **Modal/dialog overlay**: If the screenshot shows a modal on a dimmed background, focus only on the modal content — ignore the background.

## Formatting Rules

### Table

```
context lines above the table (plain text)

| Header1 | Header2 | Header3 |
| ------- | ------- | ------- |
| cell    | cell    | cell    |
| cell    | cell    | cell    |

footer lines below the table (e.g. pagination, counts)
```

- Pad columns to uniform width (minimum 3 chars per column)
- If a header row is distinguishable (bold, ALL CAPS, or top row with different styling), use it as the header
- If no clear header, use the first row
- Preserve context text above/below the table as plain lines

### Form

```markdown
## Section Heading

- **Label:** Value
- **Label:** Value

## Another Section

- **Label:** Value
```

- Each key-value pair is a bullet with the label bolded
- Group under `##` headings when section headers are visible (larger/bolder text)
- Omit section headings if there are none

### Card

```markdown
## Overall Title
Overall subtitle

### Card 1 Title
Card 1 subtitle
Body line 1

### Card 2 Title
Body line

**[Button Label]**  **[Button Label]**
```

- Use `##` for the overall page title (if present)
- Use `###` for each card title
- Smaller text below the card title = subtitle
- Action buttons at the bottom in `**[Label]**` format

### Code

````
```language
code line 1
code line 2
code line 3
```
````

- Detect the language from keywords/syntax and add it as the fence tag (e.g. `swift`, `python`, `javascript`, `rust`, `go`, `java`, `bash`, `html`, `sql`, `typescript`)
- Omit the language tag only if truly unidentifiable
- Preserve indentation exactly as shown

### Dialog

```markdown
>
> ## Title
>
> Body message line 1
> Body message line 2
>
> **[OK]**  **[Cancel]**
```

- Everything inside a blockquote
- Title as `## ` inside the quote
- Buttons in `**[Label]**` format, space-separated
- For menus (vertical list of short items, no title/buttons): same blockquote format, each item on its own line

### Hierarchy

```markdown
- Top level item
  - Indented child
    - Doubly indented
  1. Numbered child
  - [x] Checked task
  - [ ] Unchecked task
```

- 2-space indent per nesting level
- Preserve bullet types: `-` for unordered, `1.` for numbered, `- [x]`/`- [ ]` for checkboxes
- Convert bullet symbols (`•`, `*`) to `-`
- Convert checkbox symbols (`☑`, `✓`) to `- [x]` and (`☐`, `✗`) to `- [ ]`

### Plain Text

```
Paragraph one line 1
Paragraph one line 2

Paragraph two line 1
```

- Separate paragraphs with a blank line
- Preserve line breaks within paragraphs

## Output Rules

1. Output **ONLY** the formatted markdown — no explanations, no "Here is the extracted content", no commentary
2. If sidebar context was detected, include it at the top
3. Pick exactly one structure type for the main content
4. Be precise — transcribe text exactly as shown, don't paraphrase or summarize
5. For ambiguous cases (e.g. a form inside a dialog), prefer the outer container type (dialog)
