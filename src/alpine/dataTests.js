import eventBus from "../EvenBus";

export default (tester) => {
    return {
        remainingTests: [],
        currentTest: null,
        isTestPassed: null,

        runCode() {
            tester.runCode();
        },
        restartTest() {
            tester.restartTest();
        },
        async runTest() {
            const [success, details] = await tester.runTest();

            if (success) {
                this.isTestPassed = true;
            } else {
                alert(details)
                this.isTestPassed = false;
            }
        },
        newTest(force = false) {
            if (!this.isTestPassed && force) {
                console.error("Please pass the test first");
                return;
            }

            console.log(this.isTestPassed === true);
            tester.newTest();
            this.isTestPassed = null;
        },
        newSession() {
            tester.newSession(true);
        },
        init() {
            eventBus.on("newSessionLaunched", this.newSession);
        },
    };
};
