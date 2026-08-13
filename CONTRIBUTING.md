# Contributing

This repository owns the Visual Studio Code integration for Toka. Language,
compiler, formatter, and LSP semantics belong in
[`tokalang/toka`](https://github.com/tokalang/toka).

Keep changes narrow and include a test when behavior changes. Before opening a
pull request, run:

```bash
npm ci
npm test
npx --no-install vsce ls
npm run package -- --out /tmp/toka-vscode.vsix
```

Do not commit `node_modules`, generated `.vsix` files, credentials, or
third-party code without its license and provenance.
