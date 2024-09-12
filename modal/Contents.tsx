// Contents.tsx
import React from 'react';

const InputForm: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Dữ liệu nhập vào:', inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="inputField"></label>
      <input
        type="text"
        id="inputField"
        value={inputValue}
        onChange={handleChange}
      />
      <button type="submit">Gửi</b>
    </form>
  );
};

export default InputForm;