import Alpine from "alpinejs";
import textEditor from "./storeEditor";
import tests from "./storeTests";

Alpine.store("texteditor", textEditor);
Alpine.store("tests", tests);

window.Alpine = Alpine;
Alpine.start();

export default Alpine;
