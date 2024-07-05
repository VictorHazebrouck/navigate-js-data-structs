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
    /** @type {number | null} */
    timer: null,
    goodAnswersNb: 0,
    startGameEasyMode() {
        this.timer = null;
        this.mode = "game";
        eventBus.emit("newSessionLaunched");
    },
    startGameMediumMode() {
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
        const intervalId = newTimer(this, 60);

        const handleTestInvalidated = () => {
            clearInterval(intervalId);
            this.mode = "menu";
            eventBus.off("testInvalidated", handleTestInvalidated);
        };

        eventBus.on("testInvalidated", handleTestInvalidated);

        this.mode = "game";
        eventBus.emit("newSessionLaunched");
    },
    init() {
        const handleGoodAnswer = () => {
            this.goodAnswersNb++;
        };

        eventBus.on("testPassed", handleGoodAnswer);
    },
};
