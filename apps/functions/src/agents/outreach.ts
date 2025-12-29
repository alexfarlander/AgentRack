import * as functions from "firebase-functions";
import { initializeApp, getApps } from "firebase/app";
import { getDataConnect } from "firebase/data-connect";
import { createRun, getAgent, updateAgent, connectorConfig } from "@agentrack/sql-sdk";

// Initialize Firebase Client App for Data Connect
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || "placeholder",
    projectId: process.env.GCLOUD_PROJECT || (process.env.FIREBASE_CONFIG ? JSON.parse(process.env.FIREBASE_CONFIG!).projectId : "agentrackapp"),
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const dataconnect = getDataConnect(app, connectorConfig);

// Scheduled function (e.g. runs every minute to check for pending tasks)
// For prototype, we can also trigger it via HTTP
export const runOutreachCycle = functions.https.onRequest(async (req: functions.https.Request, res: functions.Response) => {
    const agentId = req.query.agentId as string;
    const userId = req.query.userId as string;

    if (!agentId || !userId) {
        res.status(400).send("Missing agentId or userId");
        return;
    }

    try {
        // 1. Fetch Agent using SQL
        const agentResponse = await getAgent(dataconnect, { id: agentId });
        const agentData = agentResponse.data.agentV2;

        if (!agentData) {
            res.status(404).send("Agent not found");
            return;
        }

        // 2. Logic: Generate content (Mock)
        // Parse settings if stringified JSON
        let settings = { emailTemplate: "default" };
        if (agentData.settings) {
            try { settings = JSON.parse(agentData.settings); } catch (e) { }
        }

        const result = {
            status: "SUCCESS",
            details: `Mocked: Sent 1 email to prospect using template: ${settings.emailTemplate}`,
            logs: ["Identifying prospect...", "Generating email content...", "Sent!"]
        };

        // 3. Update Agent State using SQL
        await updateAgent(dataconnect, {
            id: agentId,
            lastRun: new Date().toISOString(),
            status: "IDLE"
        });

        // 4. Log run using SQL
        await createRun(dataconnect, {
            agentId: agentId,
            status: result.status,
            details: result.details,
            logs: result.logs
        });

        res.json({ success: true, result });
    } catch (error) {
        functions.logger.error("Error running outreach agent", error);
        res.status(500).send("Internal Error");
    }
});
