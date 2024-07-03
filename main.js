import Alpine from "alpinejs";
import initEditor from "./src/text-editor";

Alpine.store("tests", {
  runTests() {
    console.log("haha");
  },
  init() {
    initEditor();
  },
});

window.Alpine = Alpine;
Alpine.start();
