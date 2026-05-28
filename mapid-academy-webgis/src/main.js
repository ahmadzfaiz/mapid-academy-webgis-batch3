import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { createMonasMap } from "./maps/monasMap";
import { addMonasEvents } from "./events/monasEvent";
import { addMonasControl } from "./controls/monasControl";
import { addMonasHandler } from "./handlers/monasHandler";
import { createAreaTool } from "./engine/areaTool";

const map = createMonasMap();

addMonasEvents(map);
addMonasControl(map);
addMonasHandler(map);

document.body.appendChild(createAreaTool());
