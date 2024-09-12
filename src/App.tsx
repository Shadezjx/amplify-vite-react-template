import React, { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Modal from "../modal/Modal.tsx"; // Update the import path accordingly
import type { Schema } from "../amplify/data/resource";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    const subscription = client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });

    // Cleanup subscription on component unmount
    return () => subscription.unsubscribe();
  }, []);

  const addTodo = async (content: string) => {
    if (content.trim() === "") return; // Don't add empty todos
    try {
      const newTodo = await client.models.Todo.create({ content });
      //setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await client.models.Todo.delete({ id });
      setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

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
