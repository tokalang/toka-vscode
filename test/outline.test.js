const assert = require('assert');
const Module = require('module');

class Range {
    constructor(startLine, startColumn, endLine, endColumn) {
        this.start = { line: startLine, character: startColumn };
        this.end = { line: endLine, character: endColumn };
    }
}

class DocumentSymbol {
    constructor(name, detail, kind, range, selectionRange) {
        Object.assign(this, { name, detail, kind, range, selectionRange });
    }
}

const vscode = {
    DocumentSymbol,
    Range,
    SymbolKind: {
        Function: 11,
        Struct: 22,
        Class: 4,
        Variable: 12
    },
    window: {
        createOutputChannel() {
            return { appendLine() {} };
        }
    }
};

const originalLoad = Module._load;
Module._load = function(request, parent, isMain) {
    if (request === 'vscode') {
        return vscode;
    }
    if (request === 'vscode-languageclient/node') {
        return { LanguageClient: class {}, TransportKind: { stdio: 0 } };
    }
    return originalLoad.call(this, request, parent, isMain);
};

const { TokaDocumentSymbolProvider } = require('../extension');
Module._load = originalLoad;

function documentFrom(text) {
    const lines = text.split('\n');
    return {
        lineCount: lines.length,
        lineAt(index) {
            return { text: lines[index] };
        }
    };
}

async function main() {
    const provider = new TokaDocumentSymbolProvider();
    const symbols = await provider.provideDocumentSymbols(documentFrom(`
pub fn run() {}
shape Model(value: i32)
impl Display for Model {}
pub alias ID = i32
`));

    assert.deepStrictEqual(
        symbols.map(symbol => symbol.name),
        ['run', 'Model', 'Display for Model', 'ID']
    );
    assert.deepStrictEqual(
        symbols.map(symbol => symbol.kind),
        [11, 22, 4, 12]
    );
    console.log('Outline provider test passed');
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});
