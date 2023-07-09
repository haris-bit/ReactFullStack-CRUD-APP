import React, { useEffect, useState } from "react";
import List from "./components/List";
import axios from "axios";
import { baseURL } from "./utils/constant";

const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  // whenever updateUI changes, the useEffect will rerun and get all of the data from the backend using /get
  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      console.log(res.data);
      setTasks(res.data);
    });
  }, [updateUI]);

  const addTask = () => {
    axios.post(`${baseURL}/save`, { task: input }).then((res) => {
      console.log(res.data);
      setInput("");
      // just means if the variable setUpdateUI was originally false it'll be true and vice versa
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateMode = (id, text) => {
    console.log(text);
    setInput(text);
    setUpdateId(id);
  };

  const updateTask = () => {
    axios.put(`${baseURL}/update/${updateId}`, { task: input }).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
      setUpdateId(null);
      setInput("");
    });
  };

  return (
    <main>
      <h1 className="title">CRUD Operations</h1>

      <div className="input_holder">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button type="submit" onClick={updateId ? updateTask : addTask}>
          {updateId ? "Update Task" : "Add Task"}
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <List
            key={task._id}
            id={task._id}
            task={task.task}
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}
          />
        ))}
      </ul>
    </main>
  );
};

export default App;
