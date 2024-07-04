class EventBus {
    constructor() {
        this.eventTarget = new EventTarget();
    }

    emit(event, detail = {}) {
        this.eventTarget.dispatchEvent(new CustomEvent(event, { detail }));
    }

    on(event, callback) {
        this.eventTarget.addEventListener(event, callback);
    }

    off(event, callback) {
        this.eventTarget.removeEventListener(event, callback);
    }
}

const eventBus = new EventBus();
export default eventBus;
