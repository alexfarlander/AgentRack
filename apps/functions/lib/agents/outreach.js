"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runOutreachCycle = void 0;
const functions = require("firebase-functions");
const app_1 = require("firebase/app");
const data_connect_1 = require("firebase/data-connect");
const sql_sdk_1 = require("@agentrack/sql-sdk");
// Initialize Firebase Client App for Data Connect
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || "placeholder",
    projectId: process.env.GCLOUD_PROJECT || (process.env.FIREBASE_CONFIG ? JSON.parse(process.env.FIREBASE_CONFIG).projectId : "agentrackapp"),
};
const app = (0, app_1.getApps)().length === 0 ? (0, app_1.initializeApp)(firebaseConfig) : (0, app_1.getApps)()[0];
const dataconnect = (0, data_connect_1.getDataConnect)(app, sql_sdk_1.connectorConfig);
// Scheduled function (e.g. runs every minute to check for pending tasks)
// For prototype, we can also trigger it via HTTP
exports.runOutreachCycle = functions.https.onRequest(async (req, res) => {
    const agentId = req.query.agentId;
    const userId = req.query.userId;
    if (!agentId || !userId) {
        res.status(400).send("Missing agentId or userId");
        return;
    }
    try {
        // 1. Fetch Agent using SQL
        const agentResponse = await (0, sql_sdk_1.getAgent)(dataconnect, { id: agentId });
        const agentData = agentResponse.data.agent;
        if (!agentData) {
            res.status(404).send("Agent not found");
            return;
        }
        // 2. Logic: Generate content (Mock)
        // Parse settings if stringified JSON
        let settings = { emailTemplate: "default" };
        if (agentData.settings) {
            try {
                settings = JSON.parse(agentData.settings);
            }
            catch (e) { }
        }
        const result = {
            status: "SUCCESS",
            details: `Mocked: Sent 1 email to prospect using template: ${settings.emailTemplate}`,
            logs: ["Identifying prospect...", "Generating email content...", "Sent!"]
        };
        // 3. Update Agent State using SQL
        await (0, sql_sdk_1.updateAgent)(dataconnect, {
            id: agentId,
            lastRun: new Date().toISOString(),
            status: "IDLE"
        });
        // 4. Log run using SQL
        await (0, sql_sdk_1.createRun)(dataconnect, {
            agentId: agentId,
            status: result.status,
            details: result.details,
            logs: result.logs
        });
        res.json({ success: true, result });
    }
    catch (error) {
        functions.logger.error("Error running outreach agent", error);
        res.status(500).send("Internal Error");
    }
});
//# sourceMappingURL=outreach.js.map