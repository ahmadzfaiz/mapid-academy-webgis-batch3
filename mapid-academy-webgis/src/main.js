import { createMonasMap } from "./maps/monasMap";
import { addMonasEvents } from "./events/monasEvent";
import { addMonasControl } from "./controls/monasControl";

const map = createMonasMap();

addMonasEvents(map);
addMonasControl(map);
