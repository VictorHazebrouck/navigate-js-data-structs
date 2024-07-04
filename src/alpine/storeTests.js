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
        initialCode: "//log 1,2,3,4",
        expectedOutputs: ["1", "2", "3", "4"],
        invalidInputs: ["console.log(1)", "console.log(2)", "console.log(3)", "console.log(4)"],
    },
];

export default {
    remainingTests: [],
    currentTest: null,
    isTestPassed: null,
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

        if(!this.isTestPassed && !force){
            console.error("Please pass the test first")
            return
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

        this.newTest(true)
    },
};
