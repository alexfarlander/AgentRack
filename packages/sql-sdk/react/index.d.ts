import { CreateUserData, CreateUserVariables, UpdateUserData, UpdateUserVariables, GetAgentsForUserData, CreateAgentWithIdData, CreateAgentWithIdVariables, UpdateAgentData, UpdateAgentVariables, DeleteAgentData, DeleteAgentVariables, GetAgentData, GetAgentVariables, CreateRunData, CreateRunVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useUpdateUser(options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;
export function useUpdateUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;

export function useGetAgentsForUser(options?: useDataConnectQueryOptions<GetAgentsForUserData>): UseDataConnectQueryResult<GetAgentsForUserData, undefined>;
export function useGetAgentsForUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetAgentsForUserData>): UseDataConnectQueryResult<GetAgentsForUserData, undefined>;

export function useCreateAgentWithId(options?: useDataConnectMutationOptions<CreateAgentWithIdData, FirebaseError, CreateAgentWithIdVariables>): UseDataConnectMutationResult<CreateAgentWithIdData, CreateAgentWithIdVariables>;
export function useCreateAgentWithId(dc: DataConnect, options?: useDataConnectMutationOptions<CreateAgentWithIdData, FirebaseError, CreateAgentWithIdVariables>): UseDataConnectMutationResult<CreateAgentWithIdData, CreateAgentWithIdVariables>;

export function useUpdateAgent(options?: useDataConnectMutationOptions<UpdateAgentData, FirebaseError, UpdateAgentVariables>): UseDataConnectMutationResult<UpdateAgentData, UpdateAgentVariables>;
export function useUpdateAgent(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateAgentData, FirebaseError, UpdateAgentVariables>): UseDataConnectMutationResult<UpdateAgentData, UpdateAgentVariables>;

export function useDeleteAgent(options?: useDataConnectMutationOptions<DeleteAgentData, FirebaseError, DeleteAgentVariables>): UseDataConnectMutationResult<DeleteAgentData, DeleteAgentVariables>;
export function useDeleteAgent(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteAgentData, FirebaseError, DeleteAgentVariables>): UseDataConnectMutationResult<DeleteAgentData, DeleteAgentVariables>;

export function useGetAgent(vars: GetAgentVariables, options?: useDataConnectQueryOptions<GetAgentData>): UseDataConnectQueryResult<GetAgentData, GetAgentVariables>;
export function useGetAgent(dc: DataConnect, vars: GetAgentVariables, options?: useDataConnectQueryOptions<GetAgentData>): UseDataConnectQueryResult<GetAgentData, GetAgentVariables>;

export function useCreateRun(options?: useDataConnectMutationOptions<CreateRunData, FirebaseError, CreateRunVariables>): UseDataConnectMutationResult<CreateRunData, CreateRunVariables>;
export function useCreateRun(dc: DataConnect, options?: useDataConnectMutationOptions<CreateRunData, FirebaseError, CreateRunVariables>): UseDataConnectMutationResult<CreateRunData, CreateRunVariables>;
