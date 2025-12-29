import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AgentV2_Key {
  id: string;
  __typename?: 'AgentV2_Key';
}

export interface CreateAgentWithIdData {
  agentV2_insert: AgentV2_Key;
}

export interface CreateAgentWithIdVariables {
  id: string;
  name: string;
  type: string;
  status: string;
  schedule?: string | null;
  settings?: string | null;
}

export interface CreateRunData {
  runV2_insert: RunV2_Key;
}

export interface CreateRunVariables {
  agentId: string;
  status: string;
  details: string;
  logs?: string[] | null;
}

export interface CreateUserData {
  userV2_insert: UserV2_Key;
}

export interface CreateUserVariables {
  displayName?: string | null;
  email: string;
  googleId: string;
  photoUrl?: string | null;
  refreshToken?: string | null;
}

export interface DeleteAgentData {
  agentV2_delete?: AgentV2_Key | null;
}

export interface DeleteAgentVariables {
  id: string;
}

export interface GetAgentData {
  agentV2?: {
    id: string;
    name: string;
    type: string;
    status: string;
    settings?: string | null;
    lastRun?: TimestampString | null;
  } & AgentV2_Key;
}

export interface GetAgentVariables {
  id: string;
}

export interface GetAgentsForUserData {
  agentV2s: ({
    id: string;
    name: string;
    type: string;
    status: string;
    schedule?: string | null;
    settings?: string | null;
    lastRun?: TimestampString | null;
    createdAt: TimestampString;
  } & AgentV2_Key)[];
}

export interface RunV2_Key {
  id: UUIDString;
  __typename?: 'RunV2_Key';
}

export interface UpdateAgentData {
  agentV2_update?: AgentV2_Key | null;
}

export interface UpdateAgentVariables {
  id: string;
  name?: string | null;
  type?: string | null;
  status?: string | null;
  schedule?: string | null;
  settings?: string | null;
  lastRun?: TimestampString | null;
}

export interface UpdateUserData {
  userV2_updateMany: number;
}

export interface UpdateUserVariables {
  googleId: string;
  refreshToken?: string | null;
}

export interface UserV2_Key {
  id: string;
  __typename?: 'UserV2_Key';
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

interface CreateAgentWithIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAgentWithIdVariables): MutationRef<CreateAgentWithIdData, CreateAgentWithIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAgentWithIdVariables): MutationRef<CreateAgentWithIdData, CreateAgentWithIdVariables>;
  operationName: string;
}
export const createAgentWithIdRef: CreateAgentWithIdRef;

export function createAgentWithId(vars: CreateAgentWithIdVariables): MutationPromise<CreateAgentWithIdData, CreateAgentWithIdVariables>;
export function createAgentWithId(dc: DataConnect, vars: CreateAgentWithIdVariables): MutationPromise<CreateAgentWithIdData, CreateAgentWithIdVariables>;

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

