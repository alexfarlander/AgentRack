"use client";

import Image from "next/image";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AgentModal from "../components/AgentModal";
import EditAgentModal from "../components/EditAgentModal";
import { dataconnect } from "../lib/firebase";
import { useGetAgentsForUser } from "@agentrack/sql-sdk/react";
import { deleteAgent } from "@agentrack/sql-sdk";

export default function Home() {
  const { user, loading, signInWithGoogle, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<any | null>(null);
  const [runningId, setRunningId] = useState<string | null>(null);

  // Data Connect Hook
  const { data, isLoading: loadingAgents, refetch } = useGetAgentsForUser(dataconnect);

  const agents = data?.agentV2s || [];

  const handleDelete = async (agentId: string) => {
    if (!user || !confirm("Delete this agent?")) return;
    try {
      await deleteAgent(dataconnect, { id: agentId });
      refetch();
    } catch (e) {
      console.error(e);
    }
  }

  const handleRun = async (agentId: string) => {
    if (!user) return;
    setRunningId(agentId);
    try {
      // Trigger Cloud Function (outreach)
      // For local testing, we can use the local emulator if running, or the deployed function.
      // Deployed URL format: https://<region>-agentrackapp.cloudfunctions.net/runOutreachCycle
      const region = "us-east4"; // Defaulting to us-east4 based on Data Connect location
      const projectId = "agentrackapp";
      const baseUrl = `https://${region}-${projectId}.cloudfunctions.net`;

      const response = await fetch(`${baseUrl}/runOutreachCycle?agentId=${agentId}&userId=${user.uid}`, {
        method: 'POST'
      });

      const result = await response.json();
      if (result.success) {
        alert("Agent cycle triggered successfully!");
        refetch();
      } else {
        alert("Failed to run agent: " + (result.error || "Unknown error"));
      }
    } catch (e: any) {
      console.error("Run error:", e);
      alert("Error triggering agent. Is the function deployed?");
    } finally {
      setRunningId(null);
    }
  }

  const parseSettings = (settingsStr: string | null | undefined) => {
    if (!settingsStr) return {};
    try {
      return JSON.parse(settingsStr);
    } catch (e) {
      return {};
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500 font-mono">Loading Rack...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-mono">
      <header className="mb-12 flex justify-between items-center border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-blue-500">AGENT<span className="text-slate-100">RACK</span></h1>
          <p className="text-slate-500 text-sm mt-1">Unified Automation Environment [SQL POWERED]</p>
        </div>
        <div className="flex gap-4 items-center">
          {!user ? (
            <button
              onClick={signInWithGoogle}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm font-medium transition-colors"
            >
              Sign In with Google
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm font-medium transition-colors"
              >
                + New Agent
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden relative">
                  {user.photoURL ? (
                    <Image src={user.photoURL} alt="User" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs">USR</div>
                  )}
                </div>
                <button onClick={logout} className="text-xs text-slate-500 hover:text-slate-300">Logout</button>
              </div>
            </>
          )}
        </div>
      </header>

      <main>
        {!user ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <h2 className="text-2xl font-bold text-slate-100 mb-4">Welcome to AgentRack</h2>
            <p className="text-slate-400 max-w-md mb-8">Sign in to access your unified automation environment and manage your GenAI agents.</p>
            <button
              onClick={signInWithGoogle}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
            >
              Get Started
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Add Slot */}
              <div
                onClick={() => setIsModalOpen(true)}
                className="group border-2 border-dashed border-slate-800 rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px] hover:border-blue-500/50 hover:bg-slate-900/50 transition-all cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-slate-600 group-hover:text-blue-500">+</span>
                </div>
                <p className="text-slate-500 font-medium group-hover:text-blue-400">Plug in new agent</p>
              </div>

              {/* Agent List */}
              {loadingAgents ? (
                <div className="col-span-1 min-h-[300px] flex items-center justify-center text-slate-600">Loading Agents...</div>
              ) : agents.map(agent => {
                const settings = parseSettings(agent.settings);
                return (
                  <div key={agent.id} className="relative bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex flex-col hover:shadow-lg hover:shadow-blue-900/10 transition-shadow">
                    {agent.status === 'RUNNING' && <div className="absolute top-0 left-0 w-full h-1 bg-green-500 animate-pulse"></div>}
                    {agent.status === 'ERROR' && <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>}

                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div className="bg-blue-950/50 text-blue-400 text-xs px-2 py-1 rounded border border-blue-900/50">
                          {agent.type}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${agent.status === 'RUNNING' ? 'bg-green-500' : agent.status === 'ERROR' ? 'bg-red-500' : 'bg-slate-600'}`}></span>
                          <span className={`text-xs uppercase tracking-wider ${agent.status === 'RUNNING' ? 'text-green-500' : agent.status === 'ERROR' ? 'text-red-500' : 'text-slate-600'}`}>
                            {agent.status}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-slate-100 mb-2 truncate" title={agent.name}>{agent.name}</h3>
                      <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                        {agent.type === 'OUTREACH' ? `Targeting ${settings.targetAudience} with ${settings.itemsPerDay} emails/day.` : 'Generic Agent'}
                      </p>

                      <div className="space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">SQL Record ID</span>
                          <span className="text-slate-300 text-[10px] truncate w-24 text-right" title={agent.id}>{agent.id}</span>
                        </div>

                        {/* Latest Logs Preview */}
                        <div className="bg-slate-950/50 rounded border border-slate-800 p-2 mt-2">
                          <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Latest activity</div>
                          <div className="text-[10px] text-slate-400 font-mono line-clamp-3">
                            {agent.status === 'RUNNING' ? '> Agent is currently active...' : (agent.lastRun ? '> Cycle completed successfully.' : '> Awaiting manual trigger...')}
                          </div>
                        </div>

                        <div className="w-full bg-slate-800 rounded-full h-1.5">
                          <div className="bg-blue-700 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-950 p-4 border-t border-slate-800 flex justify-between items-center">
                      <span className="text-xs text-slate-500">
                        {agent.lastRun ? `Last run: ${new Date(agent.lastRun).toLocaleTimeString()}` : 'Never run'}
                      </span>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleRun(agent.id)}
                          disabled={runningId === agent.id}
                          className="px-3 py-1 bg-green-900/40 text-green-400 hover:bg-green-800/60 rounded text-[10px] font-bold uppercase tracking-tight transition-colors border border-green-900/50"
                        >
                          {runningId === agent.id ? "Running..." : "Run Now"}
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); handleDelete(agent.id); }} className="text-xs text-red-900 hover:text-red-500">Del</button>
                        <button
                          onClick={() => setEditingAgent(agent)}
                          className="text-xs text-slate-300 hover:text-white hover:underline"
                        >
                          Configure &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <AgentModal isOpen={isModalOpen} onClose={() => {
              setIsModalOpen(false);
              refetch();
            }} />

            <EditAgentModal
              isOpen={!!editingAgent}
              agent={editingAgent}
              onClose={() => {
                setEditingAgent(null);
                refetch();
              }}
            />
          </>
        )}
      </main>
    </div>
  );
}
