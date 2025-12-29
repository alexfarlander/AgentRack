const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'agentrack',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
};

const updateUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUser', inputVars);
}
updateUserRef.operationName = 'UpdateUser';
exports.updateUserRef = updateUserRef;

exports.updateUser = function updateUser(dcOrVars, vars) {
  return executeMutation(updateUserRef(dcOrVars, vars));
};

const getAgentsForUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAgentsForUser');
}
getAgentsForUserRef.operationName = 'GetAgentsForUser';
exports.getAgentsForUserRef = getAgentsForUserRef;

exports.getAgentsForUser = function getAgentsForUser(dc) {
  return executeQuery(getAgentsForUserRef(dc));
};

const createAgentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAgent', inputVars);
}
createAgentRef.operationName = 'CreateAgent';
exports.createAgentRef = createAgentRef;

exports.createAgent = function createAgent(dcOrVars, vars) {
  return executeMutation(createAgentRef(dcOrVars, vars));
};

const updateAgentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAgent', inputVars);
}
updateAgentRef.operationName = 'UpdateAgent';
exports.updateAgentRef = updateAgentRef;

exports.updateAgent = function updateAgent(dcOrVars, vars) {
  return executeMutation(updateAgentRef(dcOrVars, vars));
};

const deleteAgentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteAgent', inputVars);
}
deleteAgentRef.operationName = 'DeleteAgent';
exports.deleteAgentRef = deleteAgentRef;

exports.deleteAgent = function deleteAgent(dcOrVars, vars) {
  return executeMutation(deleteAgentRef(dcOrVars, vars));
};

const getAgentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAgent', inputVars);
}
getAgentRef.operationName = 'GetAgent';
exports.getAgentRef = getAgentRef;

exports.getAgent = function getAgent(dcOrVars, vars) {
  return executeQuery(getAgentRef(dcOrVars, vars));
};

const createRunRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateRun', inputVars);
}
createRunRef.operationName = 'CreateRun';
exports.createRunRef = createRunRef;

exports.createRun = function createRun(dcOrVars, vars) {
  return executeMutation(createRunRef(dcOrVars, vars));
};
