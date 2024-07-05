import ace from "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-javascript";

class Editor {
    constructor() {
        const editor = ace.edit("editor");
        editor.setTheme("ace/theme/monokai");
        editor.session.setMode("ace/mode/javascript");
        editor.setFontSize(18);
        editor.setOptions({
            useWorker: false,
        });

        editor.commands.addCommand({
            name: "insertLog",
            bindKey: { win: "Alt-L", mac: "Alt-L" },
            exec: function () {
                editor.session.insert(editor.getCursorPosition(), `console.log()`);

                const { row, column } = editor.getCursorPosition();
                editor.selection.moveTo(row, column - 1);
            },
        });

        const consoleOutput = ace.edit("console");
        consoleOutput.setTheme("ace/theme/monokai");
        consoleOutput.session.setMode("ace/mode/text");
        consoleOutput.setReadOnly(true);
        consoleOutput.renderer.setShowGutter(false);
        consoleOutput.setHighlightActiveLine(false);
        consoleOutput.setFontSize(18);

        this.editor = editor;
        this.console = consoleOutput;
    }

    getEditor() {
        return this.editor;
    }

    getConsole() {
        return this.console;
    }

    async runCode() {
        const code = this.getEditor().getValue();
        const consoleEditor = this.getConsole();

        try {
            // Capture console.log output
            const capturedLogs = [];
            const originalConsoleLog = console.log;
            console.log = function (...args) {
                // handle each arg accordign to its data type
                const data = args.map((arg) => {
                    let el = null;
                    switch (typeof arg) {
                        //ensures an object value gets logged and normalized
                        case "object":
                            el = JSON.stringify(arg, null, 2);
                            break;
                        //ensures undefined gets logged
                        case "undefined":
                            el = "undefined";
                            break;
                        //by default just log the thing as is
                        default:
                            el = arg;
                            break;
                    }
                    return el;
                });
                capturedLogs.push(data.join("\n"));
                originalConsoleLog.apply(console, args);
            };

            const asyncWrapper = `
                (async function userCode(){
                    ${code}
                })()
            `;

            await eval(asyncWrapper);

            console.log = originalConsoleLog; // Restore original console.log

            const logsText = capturedLogs.join("\n");

            consoleEditor.setValue(logsText);
            consoleEditor.clearSelection();

            return { success: true, capturedLogs: capturedLogs, codeInput: code };
        } catch (error) {
            const errorText = error.message;

            consoleEditor.setValue(errorText);
            consoleEditor.clearSelection();

            return { success: false };
        }
    }

    setCode(data) {
        this.console.setValue("");
        this.editor.setValue(data);
        this.editor.clearSelection();
    }
}

export default Editor;
