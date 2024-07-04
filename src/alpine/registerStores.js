import Alpine from "alpinejs";
import textEditor from "./storeEditor";
import tests from "./storeTests";
import utils from "./utils";

Alpine.store("texteditor", textEditor);
Alpine.store("tests", tests);
Alpine.store("utils", utils)

window.Alpine = Alpine;
Alpine.start();

export default Alpine;
