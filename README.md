# Toka for Visual Studio Code

Official Visual Studio Code extension for the Toka programming language.

## Repository boundary

This repository owns editor integration, extension packaging, and extension
release automation. Compiler and LSP semantics remain authoritative in
[`tokalang/toka`](https://github.com/tokalang/toka).

The repository is currently a migration scaffold. Source will move from the
compiler repository in a reviewed change. Generated `.vsix` files must be
published as release assets and must not be committed to Git.

## License

Apache License 2.0. See [LICENSE](LICENSE).
Official Visual Studio Code extension for Toka
