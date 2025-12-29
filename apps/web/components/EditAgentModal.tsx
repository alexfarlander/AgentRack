"use client";

import { useState, useEffect } from "react";
import { dataconnect } from "../lib/firebase";
import { updateAgent } from "@agentrack/sql-sdk";
import { useAuth } from "../context/AuthContext";

interface EditAgentModalProps {
    isOpen: boolean;
    onClose: () => void;
    agent: {
        id: string;
        name: string;
        type: string;
        settings?: string | null;
    } | null;
}

export default function EditAgentModal({ isOpen, onClose, agent }: EditAgentModalProps) {
    const { user } = useAuth();
    const [name, setName] = useState("");
    const [settings, setSettings] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (agent) {
            setName(agent.name);
            setSettings(agent.settings || "");
        }
    }, [agent]);

    if (!isOpen || !agent) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setLoading(true);

        try {
            await updateAgent(dataconnect, {
                id: agent.id,
                name: name,
                settings: settings
            });
            onClose();
        } catch (error: any) {
            console.error("Error updating agent:", error);
            alert(`Update Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-800 rounded-lg w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-slate-100">Configure Agent</h2>
                    <span className="text-[10px] text-slate-500 font-mono">{agent.id}</span>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Agent Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-slate-200 focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Advanced Settings (JSON)</label>
                        <textarea
                            value={settings}
                            onChange={(e) => setSettings(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono text-xs h-32"
                            placeholder='{"itemsPerDay": 30, ...}'
                        />
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
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
