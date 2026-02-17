# snap-context

A skill that converts screenshots into clean, structured markdown — without consuming your main conversation's context window.

Screenshots of tables, forms, code, dialogs, dashboards, and more are processed by a separate subagent. The image tokens stay in the subagent's context and are discarded after processing — only the lightweight markdown result is returned to your conversation. This means you can extract screenshot content mid-session without burning through your context window.

## What Are Skills?

Skills are reusable markdown files that extend AI coding agents with specialized capabilities. Once installed, this skill gives your agent the ability to recognise screenshots, analyse their content using a dedicated subagent, and return structured markdown — all triggered by a simple command or natural language request.

Learn more about skills at [github.com/vercel-labs/skills](https://github.com/vercel-labs/skills).

## What It Detects

| Structure | Example | Markdown Output |
|-----------|---------|-----------------|
| **Table** | Data grids, spreadsheets, logs | Pipe-delimited markdown table |
| **Form** | Settings panels, key-value pairs | Bulleted `**Label:** Value` list |
| **Card** | Dashboards, tile layouts | Heading hierarchy with `##`/`###` |
| **Code** | Code editors, terminal output | Fenced code block with language tag |
| **Dialog** | Alerts, modals, confirmation boxes | Blockquote with `**[Button]**` actions |
| **Hierarchy** | File trees, outlines, task lists | Nested list with checkboxes |
| **Plain Text** | Articles, paragraphs | Clean paragraphs |

It also detects **sidebar navigation** (extracted as breadcrumb context above the main content) and **modal overlays** (background is ignored, only the modal content is extracted).

## Installation

### CLI Install (Recommended)

```bash
npx skills add sohilpandya/snap-context
```

### Clone & Copy

```bash
git clone https://github.com/sohilpandya/snap-context.git
cp -r snap-context/skills/snap-context ~/.claude/skills/
```

### Git Submodule

```bash
git submodule add https://github.com/sohilpandya/snap-context.git .skills/snap-context
```

## Usage

Invoke the skill directly with a file path:

```
/snap-context /path/to/screenshot.png
```

Or share a screenshot in conversation and ask for it to be extracted:

- "Extract this screenshot as markdown"
- "Convert this to text"
- "What's in this screenshot? Give me the data as a table"

### Example Output

Given a screenshot of a data table:

```markdown
| Name       | Status  | Last Updated |
| ---------- | ------- | ------------ |
| Project A  | Active  | 2025-01-15   |
| Project B  | Pending | 2025-01-14   |
```

Given a screenshot of a settings panel:

```markdown
## General

- **Display Name:** John Doe
- **Email:** john@example.com
- **Language:** English (US)

## Notifications

- **Email Alerts:** Enabled
- **Push Notifications:** Disabled
```

Given a screenshot of a confirmation dialog:

```markdown
>
> ## Delete Project?
>
> This action cannot be undone. All data associated with this project will be permanently removed.
>
> **[Cancel]**  **[Delete]**
```

## How It Works

1. You share a screenshot (via file path or paste) and invoke the skill
2. The skill delegates the image to a **separate subagent** — the image is never loaded into your main conversation
3. The subagent reads the image using multimodal vision (no OCR or external dependencies), detects the content structure, and formats it as markdown
4. Only the resulting markdown text is returned to your conversation — typically ~100 tokens instead of the thousands an image would cost

This architecture means you can extract screenshots repeatedly throughout a long coding session without degrading your context window.

## Supported Agents

Works with any agent that supports the [skills](https://github.com/vercel-labs/skills) ecosystem:

- Claude Code
- Cursor
- Cline
- OpenCode
- And 30+ others

## Contributing

Contributions are welcome. If you find a screenshot type that isn't handled well, open an issue with the screenshot and expected output.

## License

MIT
