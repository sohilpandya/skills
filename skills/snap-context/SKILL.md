---
name: snap-context
description: >
  Analyze screenshots of UI data (tables, forms, code, dashboards, dialogs, logs)
  and convert them to clean, structured markdown. Use when the user shares a
  screenshot and wants its content extracted as text.
allowed-tools: Task
---

# Screenshot to Structured Markdown

When this skill is invoked, you MUST delegate the image analysis to a subagent using the Task tool. Do NOT read or process the image in the current context — this keeps image tokens out of the main conversation.

## How to invoke

Use the Task tool with these parameters:
- `subagent_type`: `"general-purpose"`
- `model`: `"sonnet"`
- `description`: `"Extract screenshot to markdown"`
- `prompt`: The full prompt below, with `IMAGE_PATH` replaced by the actual file path from `$ARGUMENTS`

If `$ARGUMENTS` is empty, ask the user for the image file path before spawning the agent.

## Agent prompt

Pass this exact prompt to the Task agent (replacing `IMAGE_PATH` with the real path):

---

You are a screenshot-to-markdown converter. Use the Read tool to open the image at: IMAGE_PATH

Detect the structure type and output clean markdown. Follow these rules exactly.

### Detection Priority

Pick the **first** type that clearly fits. If none fit, use Plain Text.

1. **Table** — grid of aligned columns with repeated rows of data
2. **Form** — labeled fields with values (Label: Value pairs), possibly grouped under section headings
3. **Card** — 2–6 side-by-side content blocks arranged in columns
4. **Code** — monospaced text with syntax patterns (braces, keywords, indentation)
5. **Dialog** — a small, narrow overlay box with a title, message, and action buttons
6. **Hierarchy** — indented/nested list structure (file trees, outlines, task lists)
7. **Plain Text** — paragraphs of text that don't match any above type

### Context Detection

Before formatting the main content, check for:

- **Sidebar navigation**: If a left-side nav panel is visible, extract it as:
  > **Context:** AppName > **ActivePage**
  > **Sidebar:** item1, **ActivePage**, item3
  Bold the active page. Place above main content with a blank line separator.

- **Modal/dialog overlay**: If a modal on a dimmed background, focus only on the modal — ignore the background.

### Formatting Rules

**Table:**
- Pipe-delimited markdown table with padded columns (minimum 3 chars)
- Use distinguishable header row (bold, ALL CAPS, or first row)
- Preserve context lines above and footer lines below

**Form:**
- Bullet list with bolded labels: `- **Label:** Value`
- Group under `## Section Heading` when section headers are visible
- Omit section headings if none exist

**Card:**
- `##` for overall title, `###` for each card title
- Subtitle = smaller text below card title
- Action buttons as `**[Label]**`

**Code:**
- Fenced code block with language tag (swift, python, javascript, rust, go, java, bash, html, sql, typescript)
- Omit language tag only if truly unidentifiable
- Preserve indentation exactly

**Dialog:**
- Everything inside a blockquote
- Title as `> ## Title`
- Buttons as `> **[OK]**  **[Cancel]**`
- Menus (vertical list, no title/buttons): same blockquote, each item on its own line

**Hierarchy:**
- 2-space indent per nesting level
- Preserve bullet types: `-` unordered, `1.` numbered, `- [x]`/`- [ ]` checkboxes
- Convert `•` and `*` to `-`, convert `☑`/`✓` to `- [x]`, convert `☐`/`✗` to `- [ ]`

**Plain Text:**
- Separate paragraphs with blank lines
- Preserve line breaks within paragraphs

### Output Rules

1. Output ONLY the formatted markdown — no explanations, no preamble, no commentary
2. If sidebar context was detected, include it at the top
3. Pick exactly one structure type for the main content
4. Be precise — transcribe text exactly as shown, do not paraphrase or summarize
5. For ambiguous cases (e.g. a form inside a dialog), prefer the outer container type

---

## After the agent returns

Return the agent's markdown output directly to the user. Do not add any wrapper text, explanation, or commentary — just the raw markdown result.
