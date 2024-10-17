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
            if (this.isTestPassed) {
                return;
            }

            const [success, details] = await tester.runTest();

            if (success) {
                eventBus.emit("testPassed");
                this.isTestPassed = true;
            } else {
                alert(details)
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
            tester.newTest();
        },

        newSession() {
            tester.newSession(true);
        },

        lastTest(){
            tester.lastTest()
        },

        init() {
            eventBus.on("lastTest", this.lastTest);
            eventBus.on("newSessionLaunched", this.newSession);
        },
    };
};
