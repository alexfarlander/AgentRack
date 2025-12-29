import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { AgentConfig } from "@agentrack/shared";

if (!admin.apps.length) {
    admin.initializeApp();
}

const db = admin.firestore();

// Scheduled function (e.g. runs every minute to check for pending tasks)
// For prototype, we can also trigger it via HTTP
export const runOutreachCycle = functions.https.onRequest(async (req, res) => {
    const agentId = req.query.agentId as string;
    const userId = req.query.userId as string;

    if (!agentId || !userId) {
        res.status(400).send("Missing agentId or userId");
        return;
    }

    try {
        const agentRef = db.collection("users").doc(userId).collection("agents").doc(agentId);
        const agentSnap = await agentRef.get();

        if (!agentSnap.exists) {
            res.status(404).send("Agent not found");
            return;
        }

        const agentData = agentSnap.data() as AgentConfig;

        // Logic: 
        // 1. Generate content (Genkit placeholder)
        // 2. Mock 'sending' email
        // 3. Log result

        const timestamp = admin.firestore.Timestamp.now();
        const result = {
            status: "SUCCESS",
            timestamp,
            details: `Mocked: Sent 1 email to prospect using template: ${agentData.settings.emailTemplate}`,
            logs: ["Identifying prospect...", "Generating email...", "Sent!"]
        };

        // Update Agent State
        await agentRef.update({
            lastRun: timestamp.toMillis(),
            status: "IDLE" // or stay RUNNING if async
        });

        // Log run
        await agentRef.collection("runs").add(result);

        res.json({ success: true, result });
    } catch (error) {
        functions.logger.error("Error running outreach agent", error);
        res.status(500).send("Internal Error");
    }
});
