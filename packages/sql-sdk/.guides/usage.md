# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateUser, useUpdateUser, useGetAgentsForUser, useCreateAgent, useUpdateAgent, useDeleteAgent, useGetAgent, useCreateRun } from '@agentrack/sql-sdk/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateUser(createUserVars);

const { data, isPending, isSuccess, isError, error } = useUpdateUser(updateUserVars);

const { data, isPending, isSuccess, isError, error } = useGetAgentsForUser();

const { data, isPending, isSuccess, isError, error } = useCreateAgent(createAgentVars);

const { data, isPending, isSuccess, isError, error } = useUpdateAgent(updateAgentVars);

const { data, isPending, isSuccess, isError, error } = useDeleteAgent(deleteAgentVars);

const { data, isPending, isSuccess, isError, error } = useGetAgent(getAgentVars);

const { data, isPending, isSuccess, isError, error } = useCreateRun(createRunVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



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