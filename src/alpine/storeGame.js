import eventBus from "../EventBus";

function newTimer(ctx, amount) {
    //start a timer
    ctx.timer = amount;
    return setInterval(() => {
        ctx.timer--;
        if (ctx.timer === 0) {
            clearInterval(intervalId);
        }
    }, 1000);
}

export default {
    /** @type  {"menu" | "game"}*/
    mode: "menu",
    /** @type {"easy" | "medium" | "hard"} */
    type: "easy",
    /** @type {number | null} */
    timer: null,
    goodAnswersNb: 0,
    startGameEasyMode() {
        this.timer = null;
        this.mode = "game";
        this.type = "easy"
        eventBus.emit("newSessionLaunched");
    },
    startGameMediumMode() {
        this.type = "medium";

        const handleTestInvalidated = () => {
            alert("WRONG ANSWER. best score: " + this.goodAnswersNb);
            this.goodAnswersNb = 0;
            this.mode = "menu"
            eventBus.off("testInvalidated", handleTestInvalidated);
        };

        eventBus.on("testInvalidated", handleTestInvalidated);
        
        eventBus.emit("newSessionLaunched");
        this.mode = "game";
    },
    startGameHardMode() {
        this.type = "hard"
        const intervalId = newTimer(this, 120);

        const handleTestInvalidated = () => {
            clearInterval(intervalId);
            alert("Wrong asnwer, best score: " + this.goodAnswersNb)
            this.mode = "menu";
            eventBus.off("testInvalidated", handleTestInvalidated);
        };

        eventBus.on("testInvalidated", handleTestInvalidated);

        this.mode = "game";
        eventBus.emit("newSessionLaunched");
    },
    lastTest(){
        eventBus.emit("lastTest")
        this.mode = "game"
    },
    init() {
        const handleGoodAnswer = () => {
            this.goodAnswersNb++;
        };

        eventBus.on("testPassed", handleGoodAnswer);
    },
};
