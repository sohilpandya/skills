# skills

<video src="assets/SnapContextDemo.mp4" autoplay loop muted playsinline width="100%"></video>

A collection of reusable skills for AI coding agents. Each skill extends your agent with a specialized capability — install one or install them all.

Learn more about the skills ecosystem at [github.com/vercel-labs/skills](https://github.com/vercel-labs/skills).

## Available Skills

| Skill | Description |
|-------|-------------|
| [snap-context](skills/snap-context/) | Converts screenshots into clean, structured markdown without consuming your main context window |

## Installation

### CLI Install (Recommended)

Install a specific skill:

```bash
npx skills add sohilpandya/skills --skill snap-context
```

Or install all skills from this repo:

```bash
npx skills add sohilpandya/skills --skill '*'
```

### Clone & Copy

```bash
git clone https://github.com/sohilpandya/skills.git
cp -r skills/skills/<skill-name> ~/.claude/skills/
```

### Git Submodule

```bash
git submodule add https://github.com/sohilpandya/skills.git .skills/sohilpandya-skills
```

## Supported Agents

Works with any agent that supports the [skills](https://github.com/vercel-labs/skills) ecosystem:

- Claude Code
- Cursor
- Cline
- OpenCode
- And 30+ others

## Contributing

Contributions are welcome. If you have an idea for a new skill or find an issue with an existing one, open an issue or submit a pull request.

## License

MIT
