import Alpine from "alpinejs";

const dummyTests = [
    {
        initialCode: "//log hello world and haha",
        expectedOutputs: ["hello world", "haha"],
        invalidInputs: [],
    },
    {
        initialCode: "//log 'haha'",
        expectedOutputs: ["haha"],
        invalidInputs: [],
    },
    {
        initialCode: "//log hello world",
        expectedOutputs: ["hello world"],
        invalidInputs: [],
    },
    {
        initialCode: "//log 1,2,3,4 individually using a loop",
        expectedOutputs: ["1", "2", "3", "4"],
        invalidInputs: ["console.log(1)", "console.log(2)", "console.log(3)", "console.log(4)"],
    },
    {
        initialCode:
            "// Log each element of the 'numbers' array using a loop\nconst numbers = [1, 2, 3, 4, 5];",
        expectedOutputs: ["1", "2", "3", "4", "5"],
        invalidInputs: [
            "console.log(i)",
            "console.log(1)",
            "console.log(2)",
            "console.log(3)",
            "console.log(4)",
            "console.log(5)",
        ],
    },
    {
        initialCode:
            "//Log the name of the person\nconst person = {\n\tname: 'John',\n\tage: 30,\n\tcity: 'New York'\n};",
        expectedOutputs: ["John"],
        invalidInputs: ["console.log('John')", 'console.log("John")'],
    },
    {
        initialCode:
            "// Log the price of the item inside the cart object\nconst cart = {\n\titem: {\n\t\tname: 'Chair',\n\t\tprice: 50,\n\t\tquantity: 2\n\t},\n\tcustomer: {\n\t\tname: 'Alice',\n\t\temail: 'alice@example.com'\n\t}\n};",
        expectedOutputs: ["50"],
        invalidInputs: ["console.log('50')", 'console.log("50")', "console.log(50)"],
    },
];

export default {
    remainingTests: [],
    currentTest: null,
    isTestPassed: null,
    timer: 55,
    runTest() {
        const { success, capturedLogs, codeInput } = Alpine.store("texteditor").runCode();

        if (!success || !this.currentTest) {
            console.log("INVALID INPUT");
            return false;
        }

        for (let invalidInput of this.currentTest.invalidInputs) {
            if (codeInput.includes(invalidInput)) {
                this.isTestPassed = false;
                return console.error("INVALIT THINGY: ", invalidInput);
            }
        }

        let correctAnswersCount = 0;

        for (let expectedOutput of this.currentTest.expectedOutputs) {
            if (capturedLogs.includes(expectedOutput)) {
                console.log("success !");
                correctAnswersCount++;
            }
        }

        if (this.currentTest.expectedOutputs.length === correctAnswersCount) {
            this.isTestPassed = true;
        } else {
            this.isTestPassed = false;
        }
    },
    restartTest() {
        if (!this.currentTest) {
            return;
        }

        Alpine.store("texteditor").setCode(this.currentTest.initialCode);
    },
    newTest(force = false) {
        if (!this.remainingTests.length) {
            console.error("No more tests remaining");
            return;
        }

        if (!this.isTestPassed && !force) {
            console.error("Please pass the test first");
            return;
        }

        const indexFromRef = Math.floor(Math.random() * this.remainingTests.length);
        const indexFromData = this.remainingTests[indexFromRef];
        this.remainingTests.splice(indexFromRef, 1);

        this.isTestPassed = null;
        this.currentTest = dummyTests[indexFromData];
        this.restartTest();
    },
    init() {
        for (let i = 0; i < dummyTests.length; i++) {
            this.remainingTests.push(i);
        }

        this.newTest(true);
    },
};
