import ace from "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-javascript";

export default {
  editor: null,
  console: null,
  init() {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/monokai");
    this.editor.session.setMode("ace/mode/javascript");

    this.console = ace.edit("console");
    this.console.setTheme("ace/theme/monokai");
    this.console.session.setMode("ace/mode/javascript");
  },
};
