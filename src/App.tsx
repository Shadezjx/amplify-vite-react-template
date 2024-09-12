import React, { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import "../modal/Modal.css";
import inputValue from "../modal/Modal.tsx"
const a  = 0;


function Modal() {
  const [modal, setModal] = useState(false);
  const [inputValue, setInputValue] = React.useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Dữ liệu nhập vào:', inputValue);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        +New
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Make your todo</h2>
            <form onSubmit={handleSubmit}>
          <label htmlFor="inputField"></label>
          <input
            type="text"
            id="inputField"
            value={inputValue}
            onChange={handleChange}
          />
          <button type="submit" onClick={toggleModal}>Gửi</button>
        </form>

            <button className="close-modal" onClick={toggleModal}>
            X
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);
  
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }
  return (
        
    <Authenticator>
      {({ signOut, user }) => (
    <main>
      <h1 >My todos</h1>
      <Modal></Modal>
      <ul>
        {todos.map((todo) => (
        <li onClick={() => deleteTodo(todo.id)} key={todo.id}>hello</li>
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
