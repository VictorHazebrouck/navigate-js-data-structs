import Alpine from "alpinejs";
import tests from "./storeTests";
import utils from "./utils";

Alpine.store("tests", tests);
Alpine.store("utils", utils);

window.Alpine = Alpine;
Alpine.start();

export default Alpine;
