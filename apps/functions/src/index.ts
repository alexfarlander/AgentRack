import * as functions from "firebase-functions";
import { runOutreachCycle } from "./agents/outreach";

export const helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from AgentRack!");
});

export const outreachDispatcher = runOutreachCycle;
