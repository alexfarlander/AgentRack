"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outreachDispatcher = exports.helloWorld = void 0;
const functions = require("firebase-functions");
const outreach_1 = require("./agents/outreach");
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from AgentRack!");
});
exports.outreachDispatcher = outreach_1.runOutreachCycle;
//# sourceMappingURL=index.js.map