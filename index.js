import "./src/EvenBus";
import Alpine from "alpinejs";
import Editor from "./src/CodeEditor";
import Tester from "./src/Tester";
import dataTests from "./src/alpine/dataTests";
import storeGame from "./src/alpine/storeGame";

const editor = new Editor();
const tester = new Tester(editor);

Alpine.store("utils", storeGame);
Alpine.data("tests", () => dataTests(tester));

window.Alpine = Alpine;
Alpine.start();
