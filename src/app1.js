import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { todosAtom } from './atoms';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useAtom(todosAtom);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos([...todos, { text: inputValue, checked: false, color: 'initial' }]);
      setInputValue('');
    }
  };

  const handleToggleCheck = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, checked: !todo.checked } : todo
    );
    setTodos(updatedTodos);
  };

  const handleChangeColor = (index, color) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, color: color } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Todo Application</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Add a new to-do"
        />
        <button type="submit" disabled={inputValue.length <= 10}>Add Todo</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{ color: todo.checked ? 'green' : todo.color }}
          >
            <input
              type="checkbox"
              checked={todo.checked}
              onChange={() => handleToggleCheck(index)}
            />
            {todo.text}
            <select onChange={(e) => handleChangeColor(index, e.target.value)}>
              <option value="initial">Initial</option>
              <option value="blue">Blue</option>
              <option value="red">Red</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;