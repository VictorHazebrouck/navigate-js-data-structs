import eventBus from "../EvenBus";

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
        this.timer = 60;
        const intervalId = setInterval(() => {
            this.timer--;
            if (this.timer === 0) {
                clearInterval(intervalId);
            }
        }, 1000);

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
