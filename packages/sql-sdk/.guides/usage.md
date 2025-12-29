# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createUser, updateUser, getAgentsForUser, createAgent, updateAgent, deleteAgent, getAgent, createRun } from '@agentrack/sql-sdk';


// Operation CreateUser:  For variables, look at type CreateUserVars in ../index.d.ts
const { data } = await CreateUser(dataConnect, createUserVars);

// Operation UpdateUser:  For variables, look at type UpdateUserVars in ../index.d.ts
const { data } = await UpdateUser(dataConnect, updateUserVars);

// Operation GetAgentsForUser: 
const { data } = await GetAgentsForUser(dataConnect);

// Operation CreateAgent:  For variables, look at type CreateAgentVars in ../index.d.ts
const { data } = await CreateAgent(dataConnect, createAgentVars);

// Operation UpdateAgent:  For variables, look at type UpdateAgentVars in ../index.d.ts
const { data } = await UpdateAgent(dataConnect, updateAgentVars);

// Operation DeleteAgent:  For variables, look at type DeleteAgentVars in ../index.d.ts
const { data } = await DeleteAgent(dataConnect, deleteAgentVars);

// Operation GetAgent:  For variables, look at type GetAgentVars in ../index.d.ts
const { data } = await GetAgent(dataConnect, getAgentVars);

// Operation CreateRun:  For variables, look at type CreateRunVars in ../index.d.ts
const { data } = await CreateRun(dataConnect, createRunVars);


```