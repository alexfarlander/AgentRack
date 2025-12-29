import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'agentrack',
  location: 'us-east4'
};

export const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';

export function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
}

export const getAgentsForUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAgentsForUser');
}
getAgentsForUserRef.operationName = 'GetAgentsForUser';

export function getAgentsForUser(dc) {
  return executeQuery(getAgentsForUserRef(dc));
}

export const createAgentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAgent', inputVars);
}
createAgentRef.operationName = 'CreateAgent';

export function createAgent(dcOrVars, vars) {
  return executeMutation(createAgentRef(dcOrVars, vars));
}

export const updateAgentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAgent', inputVars);
}
updateAgentRef.operationName = 'UpdateAgent';

export function updateAgent(dcOrVars, vars) {
  return executeMutation(updateAgentRef(dcOrVars, vars));
}

export const deleteAgentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteAgent', inputVars);
}
deleteAgentRef.operationName = 'DeleteAgent';

export function deleteAgent(dcOrVars, vars) {
  return executeMutation(deleteAgentRef(dcOrVars, vars));
}

