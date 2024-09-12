// Modal.tsx
import React, { useState } from "react";
import "../modal/Modal.css";

interface ModalProps {
  addTodo: (content: string) => void;
}

function Modal({ addTodo }: ModalProps) {
  const [modal, setModal] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue);
      setInputValue(''); // Clear the input field
      toggleModal(); // Close the modal
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
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
              <button type="submit">Gửi</button>
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

export default Modal;
