import { CreateUserData, CreateUserVariables, GetAgentsForUserData, CreateAgentData, CreateAgentVariables, UpdateAgentData, UpdateAgentVariables, DeleteAgentData, DeleteAgentVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useGetAgentsForUser(options?: useDataConnectQueryOptions<GetAgentsForUserData>): UseDataConnectQueryResult<GetAgentsForUserData, undefined>;
export function useGetAgentsForUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetAgentsForUserData>): UseDataConnectQueryResult<GetAgentsForUserData, undefined>;

export function useCreateAgent(options?: useDataConnectMutationOptions<CreateAgentData, FirebaseError, CreateAgentVariables>): UseDataConnectMutationResult<CreateAgentData, CreateAgentVariables>;
export function useCreateAgent(dc: DataConnect, options?: useDataConnectMutationOptions<CreateAgentData, FirebaseError, CreateAgentVariables>): UseDataConnectMutationResult<CreateAgentData, CreateAgentVariables>;

export function useUpdateAgent(options?: useDataConnectMutationOptions<UpdateAgentData, FirebaseError, UpdateAgentVariables>): UseDataConnectMutationResult<UpdateAgentData, UpdateAgentVariables>;
export function useUpdateAgent(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateAgentData, FirebaseError, UpdateAgentVariables>): UseDataConnectMutationResult<UpdateAgentData, UpdateAgentVariables>;

export function useDeleteAgent(options?: useDataConnectMutationOptions<DeleteAgentData, FirebaseError, DeleteAgentVariables>): UseDataConnectMutationResult<DeleteAgentData, DeleteAgentVariables>;
export function useDeleteAgent(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteAgentData, FirebaseError, DeleteAgentVariables>): UseDataConnectMutationResult<DeleteAgentData, DeleteAgentVariables>;
