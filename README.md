# snap-context

An agent skill that converts screenshots into clean, structured markdown. Share a screenshot of a table, form, code, dialog, or dashboard and get back properly formatted markdown — ready to paste into docs, issues, or conversations.

## Install

```bash
npx skills add sohilpandya/snap-context
```

## Usage

```
/snap-context /path/to/screenshot.png
```

Or share a screenshot in conversation and ask for it to be extracted as markdown.

## What it detects

| Structure | Example | Output |
|-----------|---------|--------|
| **Table** | Data grids, spreadsheets, logs | Pipe-delimited markdown table |
| **Form** | Settings panels, key-value pairs | Bulleted `**Label:** Value` list |
| **Card** | Dashboards, tile layouts | `##`/`###` heading hierarchy |
| **Code** | Code editors, terminal output | Fenced code block with language tag |
| **Dialog** | Alerts, modals, confirmation boxes | Blockquote with `**[Button]**` actions |
| **Hierarchy** | File trees, outlines, task lists | Nested markdown list with checkboxes |
| **Plain Text** | Articles, paragraphs | Clean paragraphs |

It also detects **sidebar navigation** (extracted as breadcrumb context) and **modal overlays** (background is ignored, only modal content is extracted).

## Example

Given a screenshot of a data table, the skill outputs:

```markdown
| Name       | Status  | Last Updated |
| ---------- | ------- | ------------ |
| Project A  | Active  | 2025-01-15   |
| Project B  | Pending | 2025-01-14   |
```

## How it works

Claude's multimodal vision reads the screenshot directly — no OCR, no heuristics, no dependencies. The skill prompt teaches Claude the formatting rules for each structure type, so the output is consistent and predictable.

This is the spiritual successor to [SnapContext](https://github.com/sohilpandya/SnapContext) (the macOS menu bar app), reimagined as a zero-install agent skill.

## Supported agents

Works with any agent that supports the [skills](https://github.com/vercel-labs/skills) ecosystem, including Claude Code, Cursor, Cline, and others.

## License

MIT
