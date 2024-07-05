/**
 * @class EventBus
 * @classdesc simple event bus for handling custom events
 */
class EventBus {
    constructor() {
        this.eventTarget = new EventTarget();
    }

    /**
     * Emits an event
     * 
     * @param {Event} event 
     * @param {object} detail
     */
    emit(event, detail = {}) {
        this.eventTarget.dispatchEvent(new CustomEvent(event, { detail }));
    }

    /**
     * Registers an event listener.
     *
     * @param {('testPassed' | 'testInvalidated' | 'newSessionLaunched')} event - The name of the event to listen for.
     * @param {function} callback - The callback function to call when the event is fired.
     */
    on(event, callback) {
        this.eventTarget.addEventListener(event, callback);
    }

    /**
     * Removes an event listener.
     *
     * @param {Event} event - The name of the event.
     * @param {function} callback - The callback function to remove.
     */
    off(event, callback) {
        this.eventTarget.removeEventListener(event, callback);
    }
}

const eventBus = new EventBus();
export default eventBus;

/**
 * @typedef Event
 * @type {('testPassed' | 'testInvalidated' | 'newSessionLaunched')}
 */
