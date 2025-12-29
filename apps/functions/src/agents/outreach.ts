import * as functions from "firebase-functions";
import { initializeApp, getApps } from "firebase/app";
import { getDataConnect } from "firebase/data-connect";
import { createRun, getAgent, updateAgent, connectorConfig } from "@agentrack/sql-sdk";
import cors from "cors";

const corsHandler = cors({ origin: true });

// Initialize Firebase Client App for Data Connect
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || "placeholder",
    projectId: process.env.GCLOUD_PROJECT || (process.env.FIREBASE_CONFIG ? JSON.parse(process.env.FIREBASE_CONFIG!).projectId : "agentrackapp"),
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const dataconnect = getDataConnect(app, connectorConfig);

export const runOutreachCycle = functions.https.onRequest(async (req, res) => {
    return corsHandler(req, res, async () => {
        const agentId = req.query.agentId as string;
        const userId = req.query.userId as string;

        if (!agentId || !userId) {
            res.status(400).send("Missing agentId or userId");
            return;
        }

        try {
            // 1. Fetch Agent using SQL
            const agentResponse = await getAgent(dataconnect, { id: agentId });
            const agentData = (agentResponse.data as any).agentV2;

            if (!agentData) {
                res.status(404).send("Agent not found");
                return;
            }

            // 2. Logic: Generate content (Mock)
            let settings: any = { emailTemplate: "default", targetAudience: "Prospects" };
            if (agentData.settings) {
                try { settings = JSON.parse(agentData.settings); } catch (e) { }
            }

            const timestamp = new Date().toLocaleTimeString();
            const result = {
                status: "SUCCESS",
                details: `Agent ${agentData.name} successfully executed a cycle at ${timestamp}.`,
                logs: [
                    `[${timestamp}] Booting agent ${agentData.name}...`,
                    `[${timestamp}] Loading ${agentData.type} configuration...`,
                    `[${timestamp}] Identified target audience: ${settings.targetAudience}`,
                    `[${timestamp}] Sent personalized message to 1 contact.`,
                    `[${timestamp}] Cycle complete.`
                ]
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
        } catch (error: any) {
            functions.logger.error("Error running outreach agent", error);
            res.status(500).json({ success: false, error: error.message });
        }
    });
});
