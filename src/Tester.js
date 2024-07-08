import tests from "./tests/tests.json";

class Tester {
    tests = [];
    remainingTests = [];
    currentTest = null;

    constructor(editor) {
        this.editor = editor;
    }

    async runCode() {
        return await this.editor.runCode();
    }

    async runTest() {
        const { success, capturedLogs, codeInput } = await this.editor.runCode();

        if (!success || !this.currentTest) {
            return [false, "Invalid input"];
        }

        for (let invalidInput of this.currentTest.invalidInputs) {
            if (codeInput.includes(invalidInput)) {
                return [false, "Do not cheat please ^^"];
            }
        }

        let correctAnswersCount = 0;

        for (let expectedOutput of this.currentTest.expectedOutputs) {
            if (capturedLogs.includes(expectedOutput)) {
                correctAnswersCount++;
            }
        }

        if (this.currentTest.expectedOutputs.length === correctAnswersCount) {
            return [true, "all good !"];
        } else {
            return [false, "wrong output"];
        }
    }

    restartTest() {
        if (!this.currentTest) {
            return;
        }

        this.editor.setCode(this.currentTest.initialCode);
    }

    newTest(force = false) {
        if (!this.remainingTests.length && !force) {
            console.error("No more tests remaining");
            return false;
        }

        const indexFromRef = Math.floor(Math.random() * this.remainingTests.length);
        const indexFromData = this.remainingTests[indexFromRef];
        this.remainingTests.splice(indexFromRef, 1);

        this.currentTest = this.tests[indexFromData];
        this.restartTest();
    }

    newSession() {
        this.tests = tests;

        for (let i = 0; i < this.tests.length; i++) {
            this.remainingTests.push(i);
        }

        this.newTest(true);
    }

    lastTest() {
        console.log(tests[tests.length - 1]);
        this.tests.push(tests[tests.length - 1]);
        this.remainingTests.push(0);

        this.newTest(true);
    }
}

export default Tester;
