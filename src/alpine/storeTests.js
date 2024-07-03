import Alpine from "alpinejs";

export default {
    test: "yo",
    runTest() {
        const data = Alpine.store("texteditor").runCode()
        console.log(data);
    },
    init() {},
};
