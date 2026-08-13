# Publishing the Toka VS Code extension

This repository packages the `tokalang.toka-vscode` extension. Generated
`.vsix` files are release assets and must not be committed.

## Prerequisites

- Node.js 22.
- Access to the `tokalang` publisher in the Visual Studio Marketplace.
- A Marketplace token stored in a local credential manager or CI secret.

Do not place a publishing token in a command history, source file, workflow
log, or pull request.

## Local qualification

From the repository root:

```bash
npm ci
npm test
npx --no-install vsce ls
npm run package -- --out /tmp/toka-vscode.vsix
unzip -l /tmp/toka-vscode.vsix
```

The archive must include `extension.js`, `language-configuration.json`, the
TextMate grammar, `package.json`, `README.md`, and `LICENSE`. It must not include
tests, publishing documentation, the lockfile, or `@vscode/vsce`.

Install `/tmp/toka-vscode.vsix` through **Extensions: Install from VSIX** and
verify syntax highlighting, Outline, formatting, and LSP startup before a
release.

## Publishing

Authenticate without placing the token directly on the command line:

```bash
npx --no-install vsce login tokalang
npm run publish
```

Alternatively, upload the qualified VSIX through the Marketplace management
portal. CI publishing must use an environment-scoped secret and a protected
release workflow.

After publishing, confirm that the Marketplace version matches `package.json`,
install it into a clean VS Code profile, and attach the same VSIX to the GitHub
Release for that tag.
