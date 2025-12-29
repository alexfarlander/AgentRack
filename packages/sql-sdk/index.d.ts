import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Agent_Key {
  id: UUIDString;
  __typename?: 'Agent_Key';
}

export interface CreateAgentData {
  agent_insert: Agent_Key;
}

export interface CreateAgentVariables {
  id?: UUIDString | null;
  name: string;
  type: string;
  status: string;
  schedule?: string | null;
  settings?: string | null;
}

export interface CreateRunData {
  run_insert: Run_Key;
}

export interface CreateRunVariables {
  agentId: UUIDString;
  status: string;
  details: string;
  logs?: string[] | null;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  displayName?: string | null;
  email: string;
  googleId: string;
  photoUrl?: string | null;
  refreshToken?: string | null;
}

export interface DeleteAgentData {
  agent_delete?: Agent_Key | null;
}

export interface DeleteAgentVariables {
  id: UUIDString;
}

export interface GetAgentData {
  agent?: {
    id: UUIDString;
    name: string;
    type: string;
    status: string;
    settings?: string | null;
    lastRun?: TimestampString | null;
  } & Agent_Key;
}

export interface GetAgentVariables {
  id: UUIDString;
}

export interface GetAgentsForUserData {
  agents: ({
    id: UUIDString;
    name: string;
    type: string;
    status: string;
    schedule?: string | null;
    settings?: string | null;
    lastRun?: TimestampString | null;
    createdAt: TimestampString;
  } & Agent_Key)[];
}

export interface Run_Key {
  id: UUIDString;
  __typename?: 'Run_Key';
}

export interface UpdateAgentData {
  agent_update?: Agent_Key | null;
}

export interface UpdateAgentVariables {
  id: UUIDString;
  name?: string | null;
  type?: string | null;
  status?: string | null;
  schedule?: string | null;
  settings?: string | null;
  lastRun?: TimestampString | null;
}

export interface UpdateUserData {
  user_updateMany: number;
}

export interface UpdateUserVariables {
  googleId: string;
  refreshToken?: string | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface UpdateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  operationName: string;
}
export const updateUserRef: UpdateUserRef;

export function updateUser(vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;
export function updateUser(dc: DataConnect, vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface GetAgentsForUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAgentsForUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetAgentsForUserData, undefined>;
  operationName: string;
}
export const getAgentsForUserRef: GetAgentsForUserRef;

export function getAgentsForUser(): QueryPromise<GetAgentsForUserData, undefined>;
export function getAgentsForUser(dc: DataConnect): QueryPromise<GetAgentsForUserData, undefined>;

interface CreateAgentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAgentVariables): MutationRef<CreateAgentData, CreateAgentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAgentVariables): MutationRef<CreateAgentData, CreateAgentVariables>;
  operationName: string;
}
export const createAgentRef: CreateAgentRef;

export function createAgent(vars: CreateAgentVariables): MutationPromise<CreateAgentData, CreateAgentVariables>;
export function createAgent(dc: DataConnect, vars: CreateAgentVariables): MutationPromise<CreateAgentData, CreateAgentVariables>;

interface UpdateAgentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAgentVariables): MutationRef<UpdateAgentData, UpdateAgentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateAgentVariables): MutationRef<UpdateAgentData, UpdateAgentVariables>;
  operationName: string;
}
export const updateAgentRef: UpdateAgentRef;

export function updateAgent(vars: UpdateAgentVariables): MutationPromise<UpdateAgentData, UpdateAgentVariables>;
export function updateAgent(dc: DataConnect, vars: UpdateAgentVariables): MutationPromise<UpdateAgentData, UpdateAgentVariables>;

interface DeleteAgentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAgentVariables): MutationRef<DeleteAgentData, DeleteAgentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteAgentVariables): MutationRef<DeleteAgentData, DeleteAgentVariables>;
  operationName: string;
}
export const deleteAgentRef: DeleteAgentRef;

export function deleteAgent(vars: DeleteAgentVariables): MutationPromise<DeleteAgentData, DeleteAgentVariables>;
export function deleteAgent(dc: DataConnect, vars: DeleteAgentVariables): MutationPromise<DeleteAgentData, DeleteAgentVariables>;

interface GetAgentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAgentVariables): QueryRef<GetAgentData, GetAgentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAgentVariables): QueryRef<GetAgentData, GetAgentVariables>;
  operationName: string;
}
export const getAgentRef: GetAgentRef;

export function getAgent(vars: GetAgentVariables): QueryPromise<GetAgentData, GetAgentVariables>;
export function getAgent(dc: DataConnect, vars: GetAgentVariables): QueryPromise<GetAgentData, GetAgentVariables>;

interface CreateRunRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateRunVariables): MutationRef<CreateRunData, CreateRunVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateRunVariables): MutationRef<CreateRunData, CreateRunVariables>;
  operationName: string;
}
export const createRunRef: CreateRunRef;

export function createRun(vars: CreateRunVariables): MutationPromise<CreateRunData, CreateRunVariables>;
export function createRun(dc: DataConnect, vars: CreateRunVariables): MutationPromise<CreateRunData, CreateRunVariables>;

