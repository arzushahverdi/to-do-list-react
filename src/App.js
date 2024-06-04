import React, { useState } from "react";
import "./App.css";

function App() {
  const [todolists, setTodolists] = useState([]);
  const [newtodo, setNewtodo] = useState("");
  const [edittodo, setEdittodo] = useState(null);

  const addlist = () => {
    setTodolists([...todolists, { text: newtodo, completed: false }]);
    setNewtodo("");
  };

  const updatelist = () => {
    const updatedLists = todolists.map((list, listindex) =>
      listindex === edittodo.index
        ? { ...list, text: edittodo.text, completed: false }
        : list
    );
    setTodolists(updatedLists);
    setEdittodo(null);
  };

  const toggleComplete = (index) => {
    const updatedLists = todolists.map((list, listindex) =>
      listindex === index ? { ...list, completed: true } : list
    );
    setTodolists(updatedLists);
  };

  const editlist = (index) => {
    setEdittodo({ index, text: todolists[index].text });
  };

  const deletelist = (index) => {
    const updatedLists = todolists.filter(
      (list, listindex) => listindex !== index
    );
    setTodolists(updatedLists);
  };
  return (
    <div className="App">
      <h1>To do Lists</h1>
      <div className="lists-main">
        <input
          type="text"
          value={edittodo ? edittodo.text : newtodo}
          onChange={(e) =>
            edittodo
              ? setEdittodo({ ...edittodo, text: e.target.value })
              : setNewtodo(e.target.value)
          }
        />
        <button onClick={(e) => (edittodo ? updatelist() : addlist())}>
          {edittodo ? "Update" : "Add"}
        </button>
      </div>
      <div>
        <ul>
          {todolists.map((list, index) => (
            <li
              key={index}
              id="lists-second"
              className={list.completed ? "completed" : ""}
            >
              <span onClick={() => toggleComplete(index)}>{list.text}</span>
              <div className="buttons">
                <button onClick={() => editlist(index)}>Edit</button>
                <button onClick={() => deletelist(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
