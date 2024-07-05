import eventBus from "../EventBus";

export default (tester) => {
    return {
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
                eventBus.emit("testInvalidated");
                this.isTestPassed = false;
            }
        },

        newTest(force = false) {
            if (!this.isTestPassed && force) {
                alert("Please pass the test first");
                return;
            }

            this.isTestPassed = null;
            eventBus.emit("testPassed");
            tester.newTest();
        },

        newSession() {
            tester.newSession(true);
        },

        init() {
            eventBus.on("newSessionLaunched", this.newSession);
        },
    };
};
