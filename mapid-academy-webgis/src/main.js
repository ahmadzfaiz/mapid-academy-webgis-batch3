import { createMonasMap } from "./maps/monasMap";
import { addMonasEvents } from "./events/monasEvent";

const map = createMonasMap();

addMonasEvents(map);
