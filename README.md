# snap-context

Screenshot to structured markdown — for AI coding agents.

Share a screenshot of a table, form, code, dialog, or dashboard and get back clean, formatted markdown. Ready to paste into docs, issues, or conversations.

## What Are Skills?

Skills are markdown files that give AI agents specialized knowledge and workflows for specific tasks. When installed, they let your agent recognize when you're sharing a screenshot and automatically apply the right formatting rules to extract its content as text.

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

When invoked, the skill spawns a **subagent** to process the image. The image tokens and analysis stay in the subagent's context — only the clean markdown result comes back to your main conversation. This keeps your context window small, even if you're deep into a long session.

Claude's multimodal vision reads the screenshot directly — no OCR, no heuristics, no dependencies. The skill prompt teaches the subagent the exact formatting rules for each structure type, so output is consistent and predictable across runs.

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
