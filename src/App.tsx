// App.tsx
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import "../modal/Modal.css";
import Modal from '../modal/Modal.tsx'; // Đảm bảo rằng bạn import Modal đúng cách

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    const subscription = client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });

    return () => subscription.unsubscribe(); // Cleanup subscription on component unmount
  }, []);
  
  function addTodo(content: string) {
    client.models.Todo.create({ content })
      .then(() => {
        // Reload todos after adding a new one
        client.models.Todo.observeQuery().subscribe({
          next: (data) => setTodos([...data.items]),
        });
      });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>My todos</h1>
          <Modal addTodo={addTodo} />
          <ul>
            {todos.map((todo) => (
              <li onClick={() => deleteTodo(todo.id)} key={todo.id}>
                {todo.content}
              </li>
            ))}
          </ul>
          <div>
            Try creating a new todo.
          </div>
          <button onClick={signOut}>Sign out</button>
          <h1>{user?.signInDetails?.loginId}'s todo</h1>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
