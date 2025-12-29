"use client";

import { useState } from "react";
import { dataconnect } from "../lib/firebase";
import { createAgent } from "@agentrack/sql-sdk";
import { useAuth } from "../context/AuthContext";
import { AgentConfig, OutreachSettings } from "@agentrack/shared";

interface AgentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AgentModal({ isOpen, onClose }: AgentModalProps) {
    const { user } = useAuth();
    const [name, setName] = useState("");
    const [type, setType] = useState<AgentConfig['type']>("OUTREACH");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setLoading(true);

        try {
            const settings = {
                itemsPerDay: 30,
                targetAudience: "Marketing Agencies",
                emailTemplate: "Hi {{name}}, ..."
            };

            await createAgent(dataconnect, {
                name,
                type,
                status: "IDLE",
                settings: JSON.stringify(settings)
            });
            onClose();
        } catch (error) {
            console.error("Error creating agent", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-800 rounded-lg w-full max-w-md p-6">
                <h2 className="text-xl font-bold text-slate-100 mb-4">Plug in New Agent</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Agent Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-slate-200 focus:outline-none focus:border-blue-500"
                            placeholder="e.g. Partner Hunter"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value as any)}
                            className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-slate-200 focus:outline-none focus:border-blue-500"
                        >
                            <option value="OUTREACH">Outreach Vibe</option>
                            <option value="SUMMARIZER">Summarizer</option>
                        </select>
                    </div>
                    <div className="flex gap-3 justify-end pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-slate-400 hover:text-white text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm font-medium disabled:opacity-50"
                        >
                            {loading ? "Plugging in..." : "Create Agent"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
