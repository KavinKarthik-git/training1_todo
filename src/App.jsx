import React, { useState, useRef } from 'react';
import { useAtom } from 'jotai';
import { todosAtom } from './atoms';
import './App.css'; 


function App() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useAtom(todosAtom);
  const colorRefs = useRef([]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos([...todos, { text: inputValue, checked: false }]);
      setInputValue('');
      colorRefs.current.push('initial'); // Initialize the color ref for the new todo
    }
  };

  const handleToggleCheck = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, checked: !todo.checked } : todo
    );
    setTodos(updatedTodos);

    const li = document.getElementById(`todo-${index}`);
    if (li && updatedTodos[index].checked) {
      li.style.color = 'green'
    } else {
      li.style.color = colorRefs.current[index] ;
    }
  };

  const handleChangeColor = (index, color) => {
    colorRefs.current[index] = color;
    const li = document.getElementById(`todo-${index}`);
    if (li) {
      li.style.color = colorRefs.current[index] ;
    }
  };

  
    return (
      <div className="container">
        <h1>Todo Application</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Add a new to-do"
            className="input"
          />
          <br />
          <button type="submit" disabled={inputValue.length <= 10} className="button">Add Todo</button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <li
              key={index}
              id={`todo-${index}`}
              className={todo.checked ? 'checked' : ''}
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