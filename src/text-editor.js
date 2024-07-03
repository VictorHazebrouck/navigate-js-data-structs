import ace from 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-javascript';



export default function(){
    const editor = ace.edit('editor')
    editor.setTheme('ace/theme/monokai')
    editor.session.setMode('ace/mode/javascript')
} 

