export interface AgentConfig {
    id: string;
    name: string;
    type: 'OUTREACH' | 'SUMMARIZER' | 'OTHER';
    schedule?: string; // cron expression
    status: 'IDLE' | 'RUNNING' | 'ERROR';
    lastRun?: number; // timestamp
    settings: Record<string, any>;
    createdAt?: any;
}

export interface OutreachSettings {
    targetAudience: string;
    emailTemplate: string;
    itemsPerDay: number;
}
