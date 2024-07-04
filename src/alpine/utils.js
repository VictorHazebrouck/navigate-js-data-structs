import eventBus from "../EvenBus";

export default {
    mode: "menu",
    timer: 0,
    startGameEasyMode() {
        this.timer = null;
        this.mode = "game";
        eventBus.emit("newSessionLaunched")
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
        eventBus.emit("newSessionLaunched")
    },
    startGameHardMode() {
        this.timer = 60;
        const intervalId = setInterval(() => {
            this.timer--;
            if (this.timer === 0) {
                clearInterval(intervalId);
            }
        }, 1000);

        eventBus.on("testInvalidated", ()=>{
            clearInterval(intervalId);
            this.mode = "menu";
            eventBus.off("testInvalidated");
        })

        this.mode = "game";
        eventBus.emit("newSessionLaunched")
    },
};
