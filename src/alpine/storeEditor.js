import ace from "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-javascript";

export default {
  editor: null,
  console: null,
  _isInit: false,

  /**initializes the code and output containersretr */
  init() {
    if (this._isInit) {
      return;
    }

    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/monokai");
    this.editor.session.setMode("ace/mode/javascript");
    this.editor.setFontSize(18);

    this.console = ace.edit("console");
    this.console.setTheme("ace/theme/monokai");
    this.console.session.setMode("ace/mode/text");
    this.console.setReadOnly(true);
    this.console.renderer.setShowGutter(false);
    this.console.setHighlightActiveLine(false);
    this.console.setFontSize(18);

    this._isInit = true;
  },
};
