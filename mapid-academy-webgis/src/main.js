import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { createMonasMap } from "./maps/monasMap";
import { addMonasEvents } from "./events/monasEvent";
import { addMonasControl } from "./controls/monasControl";
import { addMonasHandler } from "./handlers/monasHandler";
import { createAreaTool } from "./engine/areaTool";
import { createLengthTool } from "./engine/lengthTool";
import { createCentroidTool } from "./engine/centroidTool";

const map = createMonasMap();

addMonasEvents(map);
addMonasControl(map);
addMonasHandler(map);

const cardContainer = document.createElement("div");
cardContainer.className = "d-flex flex-wrap";
document.body.appendChild(cardContainer);

cardContainer.appendChild(createAreaTool());
cardContainer.appendChild(createLengthTool());
cardContainer.appendChild(createCentroidTool(map));
