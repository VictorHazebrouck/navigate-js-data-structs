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
    mode: "menu",
    timer: 0,
    startGameEasyMode() {
        this.timer = null;
        this.mode = "game";
        eventBus.emit("newSessionLaunched");
    },
    startGameMediumMode() {
        this.timer = 90;
        const intervalId = setInterval(() => {
            this.timer--;
            if (this.timer === 0) {
                clearInterval(intervalId);
            }
        }, 1000);

        this.mode = "game";
        eventBus.emit("newSessionLaunched");
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
};
