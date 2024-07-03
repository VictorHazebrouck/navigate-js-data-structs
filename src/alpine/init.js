import Alpine from "alpinejs";
import textEditor from "./text-editor";

window.Alpine = Alpine;
Alpine.start();

Alpine.store("texteditor", textEditor);

