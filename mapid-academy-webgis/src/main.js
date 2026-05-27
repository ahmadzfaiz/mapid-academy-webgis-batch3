import { createMonasMap } from "./maps/monasMap";
import { addMonasEvents } from "./events/monasEvent";
import { addMonasControl } from "./controls/monasControl";
import { addMonasHandler } from "./handlers/monasHandler";

const map = createMonasMap();

addMonasEvents(map);
addMonasControl(map);
addMonasHandler(map);
