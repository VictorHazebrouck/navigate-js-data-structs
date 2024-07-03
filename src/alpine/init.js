import Alpine from "alpinejs";
import textEditor from "./storeEditor";
import tests from "./storeTests";

Alpine.store("texteditor", textEditor);
Alpine.store("testssss", tests);

export default Alpine;
