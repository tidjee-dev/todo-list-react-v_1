import { useState } from "react";

interface InputProps {
  addTask: (taskText: string) => void;
}

const Input: React.FC<InputProps> = ({ addTask }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddTask = () => {
    if (inputValue.trim()) {
      addTask(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="container" id="input-container">
      <input
        type="text"
        placeholder="Add a task ..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="button" onClick={handleAddTask}>
        Add
      </button>
    </div>
  );
};

export default Input;
