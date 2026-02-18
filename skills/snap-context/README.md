# snap-context

A skill that converts screenshots into clean, structured markdown — without consuming your main conversation's context window.

Screenshots of tables, forms, code, dialogs, dashboards, and more are processed by a separate subagent. The image tokens stay in the subagent's context and are discarded after processing — only the lightweight markdown result is returned to your conversation. This means you can extract screenshot content mid-session without burning through your context window.

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
npx skills add sohilpandya/skills --skill snap-context
```

### Clone & Copy

```bash
git clone https://github.com/sohilpandya/skills.git
cp -r skills/skills/snap-context ~/.claude/skills/
```

### Git Submodule

```bash
git submodule add https://github.com/sohilpandya/skills.git .skills/sohilpandya-skills
```

## Usage

Invoke the skill directly with a file path:

```
/snap-context /path/to/screenshot.png
```

Multiple images are supported — attach several screenshots and they'll be processed in parallel, each by its own subagent:

```
/snap-context /path/to/screenshot-1.png /path/to/screenshot-2.png
```

Or share screenshots in conversation and ask for them to be extracted:

- "Extract this screenshot as markdown"
- "Convert these screenshots to text"
- "What's in these screenshots? Give me the data as tables"

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

1. You share one or more screenshots (via file path or paste) and invoke the skill
2. The skill spawns a **separate subagent per image** — images are never loaded into your main conversation
3. Multiple images are processed **in parallel**, each by its own subagent
4. Each subagent reads its image using multimodal vision (no OCR or external dependencies), detects the content structure, and formats it as markdown
5. Only the resulting markdown text is returned to your conversation — typically ~100 tokens per image instead of the thousands each image would cost

This architecture means you can extract screenshots repeatedly throughout a long coding session without degrading your context window.
