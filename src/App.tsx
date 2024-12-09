import { useEffect, useState } from "react";
import Hero from "./components/Hero/Hero";
import Input from "./components/Input/Input";
import TaskList from "./components/TaskList/TaskList";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskText: string) => {
    const newTask: Task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    setTasks((prevTasks) => sortTasks([...prevTasks, newTask]));
  };

  const toggleTask = (id: number) => {
    setTasks((prevTasks) =>
      sortTasks(
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      )
    );
  };

  const removeTask = (id: number) => {
    setTasks((prevTasks) =>
      sortTasks(prevTasks.filter((task) => task.id !== id))
    );
  };

  const sortTasks = (tasks: Task[]) => {
    return tasks.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return a.text.localeCompare(b.text);
    });
  };

  return (
    <div>
      <Hero />
      <Input addTask={addTask} />
      <hr className="container divider" />
      <TaskList tasks={tasks} toggleTask={toggleTask} removeTask={removeTask} />
    </div>
  );
};

export default App;
