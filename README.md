# Claude night themes

Two themes for the Claude desktop and mobile apps. Both are dark-only and draw a slowly moving backdrop behind the conversation. Terminals and editors draw no theme.

- **laniakea-night**: stars and flow lines of the Laniakea supercluster converging on the Great Attractor.
- **solar-system**: planets orbiting the Sun at real Kepler speeds, with the asteroid belt, the Kuiper belt and Pluto.

Only one theme can be active at a time. The last one turned on replaces the other.

## Install

Claude Code 2.1.275 or later, at the prompt of a terminal session:

```
/plugin install laniakea-night --marketplace waritthab-TGH/waristhab
```

```
/plugin install solar-system --marketplace waritthab-TGH/waristhab
```

Answer `y` to add the marketplace, then pick a scope.

Older versions, from a shell:

```
claude plugin marketplace add waritthab-TGH/waristhab
claude plugin install laniakea-night@claude-night-themes
claude plugin install solar-system@claude-night-themes
```
