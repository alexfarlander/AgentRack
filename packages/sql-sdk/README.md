# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`sql-sdk/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetAgentsForUser*](#getagentsforuser)
  - [*GetAgent*](#getagent)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdateUser*](#updateuser)
  - [*CreateAgent*](#createagent)
  - [*UpdateAgent*](#updateagent)
  - [*DeleteAgent*](#deleteagent)
  - [*CreateRun*](#createrun)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@agentrack/sql-sdk` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@agentrack/sql-sdk';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@agentrack/sql-sdk';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetAgentsForUser
You can execute the `GetAgentsForUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-sdk/index.d.ts](./index.d.ts):
```typescript
getAgentsForUser(): QueryPromise<GetAgentsForUserData, undefined>;

interface GetAgentsForUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAgentsForUserData, undefined>;
}
export const getAgentsForUserRef: GetAgentsForUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAgentsForUser(dc: DataConnect): QueryPromise<GetAgentsForUserData, undefined>;

interface GetAgentsForUserRef {
  ...
  (dc: DataConnect): QueryRef<GetAgentsForUserData, undefined>;
}
export const getAgentsForUserRef: GetAgentsForUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAgentsForUserRef:
```typescript
const name = getAgentsForUserRef.operationName;
console.log(name);
```

### Variables
The `GetAgentsForUser` query has no variables.
### Return Type
Recall that executing the `GetAgentsForUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAgentsForUserData`, which is defined in [sql-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetAgentsForUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAgentsForUser } from '@agentrack/sql-sdk';


// Call the `getAgentsForUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAgentsForUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAgentsForUser(dataConnect);

console.log(data.agents);

// Or, you can use the `Promise` API.
getAgentsForUser().then((response) => {
  const data = response.data;
  console.log(data.agents);
});
```

### Using `GetAgentsForUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAgentsForUserRef } from '@agentrack/sql-sdk';


// Call the `getAgentsForUserRef()` function to get a reference to the query.
const ref = getAgentsForUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAgentsForUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.agents);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.agents);
});
```

## GetAgent
You can execute the `GetAgent` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-sdk/index.d.ts](./index.d.ts):
```typescript
getAgent(vars: GetAgentVariables): QueryPromise<GetAgentData, GetAgentVariables>;

interface GetAgentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAgentVariables): QueryRef<GetAgentData, GetAgentVariables>;
}
export const getAgentRef: GetAgentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAgent(dc: DataConnect, vars: GetAgentVariables): QueryPromise<GetAgentData, GetAgentVariables>;

interface GetAgentRef {
  ...
  (dc: DataConnect, vars: GetAgentVariables): QueryRef<GetAgentData, GetAgentVariables>;
}
export const getAgentRef: GetAgentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAgentRef:
```typescript
const name = getAgentRef.operationName;
console.log(name);
```

### Variables
The `GetAgent` query requires an argument of type `GetAgentVariables`, which is defined in [sql-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAgentVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetAgent` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAgentData`, which is defined in [sql-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetAgent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAgent, GetAgentVariables } from '@agentrack/sql-sdk';

// The `GetAgent` query requires an argument of type `GetAgentVariables`:
const getAgentVars: GetAgentVariables = {
  id: ..., 
};

// Call the `getAgent()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAgent(getAgentVars);
// Variables can be defined inline as well.
const { data } = await getAgent({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAgent(dataConnect, getAgentVars);

console.log(data.agent);

// Or, you can use the `Promise` API.
getAgent(getAgentVars).then((response) => {
  const data = response.data;
  console.log(data.agent);
});
```

### Using `GetAgent`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAgentRef, GetAgentVariables } from '@agentrack/sql-sdk';

// The `GetAgent` query requires an argument of type `GetAgentVariables`:
const getAgentVars: GetAgentVariables = {
  id: ..., 
};

// Call the `getAgentRef()` function to get a reference to the query.
const ref = getAgentRef(getAgentVars);
// Variables can be defined inline as well.
const ref = getAgentRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAgentRef(dataConnect, getAgentVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.agent);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.agent);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-sdk/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [sql-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  displayName?: string | null;
  email: string;
  googleId: string;
  photoUrl?: string | null;
  refreshToken?: string | null;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [sql-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@agentrack/sql-sdk';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  displayName: ..., // optional
  email: ..., 
  googleId: ..., 
  photoUrl: ..., // optional
  refreshToken: ..., // optional
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ displayName: ..., email: ..., googleId: ..., photoUrl: ..., refreshToken: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@agentrack/sql-sdk';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  displayName: ..., // optional
  email: ..., 
  googleId: ..., 
  photoUrl: ..., // optional
  refreshToken: ..., // optional
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ displayName: ..., email: ..., googleId: ..., photoUrl: ..., refreshToken: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateUser
You can execute the `UpdateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-sdk/index.d.ts](./index.d.ts):
```typescript
updateUser(vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUser(dc: DataConnect, vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  (dc: DataConnect, vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRef:
```typescript
const name = updateUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateUser` mutation requires an argument of type `UpdateUserVariables`, which is defined in [sql-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserVariables {
  googleId: string;
  refreshToken?: string | null;
}
```
### Return Type
Recall that executing the `UpdateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserData`, which is defined in [sql-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserData {
  user_updateMany: number;
}
```
### Using `UpdateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUser, UpdateUserVariables } from '@agentrack/sql-sdk';

// The `UpdateUser` mutation requires an argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  googleId: ..., 
  refreshToken: ..., // optional
};

// Call the `updateUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUser(updateUserVars);
// Variables can be defined inline as well.
const { data } = await updateUser({ googleId: ..., refreshToken: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUser(dataConnect, updateUserVars);

console.log(data.user_updateMany);

// Or, you can use the `Promise` API.
updateUser(updateUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_updateMany);
});
```

### Using `UpdateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRef, UpdateUserVariables } from '@agentrack/sql-sdk';

// The `UpdateUser` mutation requires an argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  googleId: ..., 
  refreshToken: ..., // optional
};

// Call the `updateUserRef()` function to get a reference to the mutation.
const ref = updateUserRef(updateUserVars);
// Variables can be defined inline as well.
const ref = updateUserRef({ googleId: ..., refreshToken: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRef(dataConnect, updateUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_updateMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_updateMany);
});
```

## CreateAgent
You can execute the `CreateAgent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-sdk/index.d.ts](./index.d.ts):
```typescript
createAgent(vars: CreateAgentVariables): MutationPromise<CreateAgentData, CreateAgentVariables>;

interface CreateAgentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAgentVariables): MutationRef<CreateAgentData, CreateAgentVariables>;
}
export const createAgentRef: CreateAgentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAgent(dc: DataConnect, vars: CreateAgentVariables): MutationPromise<CreateAgentData, CreateAgentVariables>;

interface CreateAgentRef {
  ...
  (dc: DataConnect, vars: CreateAgentVariables): MutationRef<CreateAgentData, CreateAgentVariables>;
}
export const createAgentRef: CreateAgentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAgentRef:
```typescript
const name = createAgentRef.operationName;
console.log(name);
```

### Variables
The `CreateAgent` mutation requires an argument of type `CreateAgentVariables`, which is defined in [sql-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateAgentVariables {
  id?: UUIDString | null;
  name: string;
  type: string;
  status: string;
  schedule?: string | null;
  settings?: string | null;
}
```
### Return Type
Recall that executing the `CreateAgent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAgentData`, which is defined in [sql-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAgentData {
  agent_insert: Agent_Key;
}
```
### Using `CreateAgent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAgent, CreateAgentVariables } from '@agentrack/sql-sdk';

// The `CreateAgent` mutation requires an argument of type `CreateAgentVariables`:
const createAgentVars: CreateAgentVariables = {
  id: ..., // optional
  name: ..., 
  type: ..., 
  status: ..., 
  schedule: ..., // optional
  settings: ..., // optional
};

// Call the `createAgent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAgent(createAgentVars);
// Variables can be defined inline as well.
const { data } = await createAgent({ id: ..., name: ..., type: ..., status: ..., schedule: ..., settings: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAgent(dataConnect, createAgentVars);

console.log(data.agent_insert);

// Or, you can use the `Promise` API.
createAgent(createAgentVars).then((response) => {
  const data = response.data;
  console.log(data.agent_insert);
});
```

### Using `CreateAgent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAgentRef, CreateAgentVariables } from '@agentrack/sql-sdk';

// The `CreateAgent` mutation requires an argument of type `CreateAgentVariables`:
const createAgentVars: CreateAgentVariables = {
  id: ..., // optional
  name: ..., 
  type: ..., 
  status: ..., 
  schedule: ..., // optional
  settings: ..., // optional
};

// Call the `createAgentRef()` function to get a reference to the mutation.
const ref = createAgentRef(createAgentVars);
// Variables can be defined inline as well.
const ref = createAgentRef({ id: ..., name: ..., type: ..., status: ..., schedule: ..., settings: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAgentRef(dataConnect, createAgentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.agent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.agent_insert);
});
```

## UpdateAgent
You can execute the `UpdateAgent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-sdk/index.d.ts](./index.d.ts):
```typescript
updateAgent(vars: UpdateAgentVariables): MutationPromise<UpdateAgentData, UpdateAgentVariables>;

interface UpdateAgentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAgentVariables): MutationRef<UpdateAgentData, UpdateAgentVariables>;
}
export const updateAgentRef: UpdateAgentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAgent(dc: DataConnect, vars: UpdateAgentVariables): MutationPromise<UpdateAgentData, UpdateAgentVariables>;

interface UpdateAgentRef {
  ...
  (dc: DataConnect, vars: UpdateAgentVariables): MutationRef<UpdateAgentData, UpdateAgentVariables>;
}
export const updateAgentRef: UpdateAgentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAgentRef:
```typescript
const name = updateAgentRef.operationName;
console.log(name);
```

### Variables
The `UpdateAgent` mutation requires an argument of type `UpdateAgentVariables`, which is defined in [sql-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateAgentVariables {
  id: UUIDString;
  name?: string | null;
  type?: string | null;
  status?: string | null;
  schedule?: string | null;
  settings?: string | null;
  lastRun?: TimestampString | null;
}
```
### Return Type
Recall that executing the `UpdateAgent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAgentData`, which is defined in [sql-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAgentData {
  agent_update?: Agent_Key | null;
}
```
### Using `UpdateAgent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAgent, UpdateAgentVariables } from '@agentrack/sql-sdk';

// The `UpdateAgent` mutation requires an argument of type `UpdateAgentVariables`:
const updateAgentVars: UpdateAgentVariables = {
  id: ..., 
  name: ..., // optional
  type: ..., // optional
  status: ..., // optional
  schedule: ..., // optional
  settings: ..., // optional
  lastRun: ..., // optional
};

// Call the `updateAgent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAgent(updateAgentVars);
// Variables can be defined inline as well.
const { data } = await updateAgent({ id: ..., name: ..., type: ..., status: ..., schedule: ..., settings: ..., lastRun: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAgent(dataConnect, updateAgentVars);

console.log(data.agent_update);

// Or, you can use the `Promise` API.
updateAgent(updateAgentVars).then((response) => {
  const data = response.data;
  console.log(data.agent_update);
});
```

### Using `UpdateAgent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAgentRef, UpdateAgentVariables } from '@agentrack/sql-sdk';

// The `UpdateAgent` mutation requires an argument of type `UpdateAgentVariables`:
const updateAgentVars: UpdateAgentVariables = {
  id: ..., 
  name: ..., // optional
  type: ..., // optional
  status: ..., // optional
  schedule: ..., // optional
  settings: ..., // optional
  lastRun: ..., // optional
};

// Call the `updateAgentRef()` function to get a reference to the mutation.
const ref = updateAgentRef(updateAgentVars);
// Variables can be defined inline as well.
const ref = updateAgentRef({ id: ..., name: ..., type: ..., status: ..., schedule: ..., settings: ..., lastRun: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAgentRef(dataConnect, updateAgentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.agent_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.agent_update);
});
```

## DeleteAgent
You can execute the `DeleteAgent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-sdk/index.d.ts](./index.d.ts):
```typescript
deleteAgent(vars: DeleteAgentVariables): MutationPromise<DeleteAgentData, DeleteAgentVariables>;

interface DeleteAgentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAgentVariables): MutationRef<DeleteAgentData, DeleteAgentVariables>;
}
export const deleteAgentRef: DeleteAgentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteAgent(dc: DataConnect, vars: DeleteAgentVariables): MutationPromise<DeleteAgentData, DeleteAgentVariables>;

interface DeleteAgentRef {
  ...
  (dc: DataConnect, vars: DeleteAgentVariables): MutationRef<DeleteAgentData, DeleteAgentVariables>;
}
export const deleteAgentRef: DeleteAgentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteAgentRef:
```typescript
const name = deleteAgentRef.operationName;
console.log(name);
```

### Variables
The `DeleteAgent` mutation requires an argument of type `DeleteAgentVariables`, which is defined in [sql-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteAgentVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteAgent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteAgentData`, which is defined in [sql-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteAgentData {
  agent_delete?: Agent_Key | null;
}
```
### Using `DeleteAgent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteAgent, DeleteAgentVariables } from '@agentrack/sql-sdk';

// The `DeleteAgent` mutation requires an argument of type `DeleteAgentVariables`:
const deleteAgentVars: DeleteAgentVariables = {
  id: ..., 
};

// Call the `deleteAgent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteAgent(deleteAgentVars);
// Variables can be defined inline as well.
const { data } = await deleteAgent({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteAgent(dataConnect, deleteAgentVars);

console.log(data.agent_delete);

// Or, you can use the `Promise` API.
deleteAgent(deleteAgentVars).then((response) => {
  const data = response.data;
  console.log(data.agent_delete);
});
```

### Using `DeleteAgent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteAgentRef, DeleteAgentVariables } from '@agentrack/sql-sdk';

// The `DeleteAgent` mutation requires an argument of type `DeleteAgentVariables`:
const deleteAgentVars: DeleteAgentVariables = {
  id: ..., 
};

// Call the `deleteAgentRef()` function to get a reference to the mutation.
const ref = deleteAgentRef(deleteAgentVars);
// Variables can be defined inline as well.
const ref = deleteAgentRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteAgentRef(dataConnect, deleteAgentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.agent_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.agent_delete);
});
```

## CreateRun
You can execute the `CreateRun` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-sdk/index.d.ts](./index.d.ts):
```typescript
createRun(vars: CreateRunVariables): MutationPromise<CreateRunData, CreateRunVariables>;

interface CreateRunRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateRunVariables): MutationRef<CreateRunData, CreateRunVariables>;
}
export const createRunRef: CreateRunRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createRun(dc: DataConnect, vars: CreateRunVariables): MutationPromise<CreateRunData, CreateRunVariables>;

interface CreateRunRef {
  ...
  (dc: DataConnect, vars: CreateRunVariables): MutationRef<CreateRunData, CreateRunVariables>;
}
export const createRunRef: CreateRunRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createRunRef:
```typescript
const name = createRunRef.operationName;
console.log(name);
```

### Variables
The `CreateRun` mutation requires an argument of type `CreateRunVariables`, which is defined in [sql-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateRunVariables {
  agentId: UUIDString;
  status: string;
  details: string;
  logs?: string[] | null;
}
```
### Return Type
Recall that executing the `CreateRun` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateRunData`, which is defined in [sql-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateRunData {
  run_insert: Run_Key;
}
```
### Using `CreateRun`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createRun, CreateRunVariables } from '@agentrack/sql-sdk';

// The `CreateRun` mutation requires an argument of type `CreateRunVariables`:
const createRunVars: CreateRunVariables = {
  agentId: ..., 
  status: ..., 
  details: ..., 
  logs: ..., // optional
};

// Call the `createRun()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createRun(createRunVars);
// Variables can be defined inline as well.
const { data } = await createRun({ agentId: ..., status: ..., details: ..., logs: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createRun(dataConnect, createRunVars);

console.log(data.run_insert);

// Or, you can use the `Promise` API.
createRun(createRunVars).then((response) => {
  const data = response.data;
  console.log(data.run_insert);
});
```

### Using `CreateRun`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createRunRef, CreateRunVariables } from '@agentrack/sql-sdk';

// The `CreateRun` mutation requires an argument of type `CreateRunVariables`:
const createRunVars: CreateRunVariables = {
  agentId: ..., 
  status: ..., 
  details: ..., 
  logs: ..., // optional
};

// Call the `createRunRef()` function to get a reference to the mutation.
const ref = createRunRef(createRunVars);
// Variables can be defined inline as well.
const ref = createRunRef({ agentId: ..., status: ..., details: ..., logs: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createRunRef(dataConnect, createRunVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.run_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.run_insert);
});
```

