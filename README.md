# Toka for Visual Studio Code

Official Visual Studio Code extension for the
[Toka programming language](https://github.com/tokalang/toka).

## Repository boundary

This repository owns editor integration, extension packaging, and extension
release automation. The Toka language specification, compiler, formatter, and
language server remain authoritative in
[`tokalang/toka`](https://github.com/tokalang/toka).

## Features

- Syntax highlighting for Toka declarations, ownership sigils, suffix
  attributes, and import paths.
- Document symbols for `fn`, `shape`, `impl`, and `alias` declarations.
- Document formatting through `tokafmt`.
- Diagnostics and language intelligence through `tokalsp`.

## Toolchain setup

Install or build the Toka toolchain first. The extension looks for `tokafmt`
and `tokalsp` in this order:

1. `<workspace>/build/bin`, when the current workspace is a Toka source tree.
2. The current process `PATH`.

If `tokalsp` is unavailable, syntax highlighting and document symbols remain
available. See the compiler repository's
[LSP documentation](https://github.com/tokalang/toka/blob/main/docs/lsp.md) for
the server contract.

## Development

Node.js 22 is used in CI.

```bash
npm ci
npm test
npx --no-install vsce ls
npm run package -- --out /tmp/toka-vscode.vsix
```

Generated `.vsix` files are release artifacts and must not be committed.
Publishing instructions live in [docs/publishing.md](docs/publishing.md).

## Migration provenance

The extension source was migrated from `tokalang/toka` at commit
`3c4219790644b7e39aab0f88a4fd9018b17b0632`, primarily from
`editors/code/` and `docs/publishing_vscode_extension.md`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Report extension issues in this
repository; report compiler and LSP semantic issues in `tokalang/toka`.

## License

Apache License 2.0. See [LICENSE](LICENSE).
