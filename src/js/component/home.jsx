import React, { useState, useEffect } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch API code to get initial data
    fetch("https://playground.4geeks.com/apis/fake/todos/user/alesanchezr")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching initial data:", error));
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  const syncWithServer = () => {
    // fetch API code to sync data with the server
    fetch("https://playground.4geeks.com/apis/fake/todos/user/alesanchezr", {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => console.log("Data synced with server:", data))
      .catch((error) => console.error("Error syncing with server:", error));
  };

  const handleAddTodo = () => {
    // Add new todo locally
    setTodos((prevTodos) => [...prevTodos, inputValue]);
    setInputValue("");

    // Sync with the server
    syncWithServer();
  };

  const handleDeleteTodo = (index) => {
    // Delete todo locally
    setTodos((prevTodos) => prevTodos.filter((_, currentIndex) => index !== currentIndex));

    // Sync with the server
    syncWithServer();
  };

  const handleCleanAllTasks = () => {
    // Clean all tasks locally
    setTodos([]);

    // Sync with the server to delete all tasks
    syncWithServer();
  };

  return (
    <div className="container">
      <h1>My Todos</h1>
      <ul>
        <li>
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleAddTodo();
              }
            }}
            placeholder="What do you need to do?!?"
          />
        </li>
        {todos.map((item, index) => (
          <li key={index}>
            {item}
            <i className="fa-solid fa-trash" onClick={() => handleDeleteTodo(index)}></i>
          </li>
        ))}
      </ul>
      <button onClick={handleCleanAllTasks}>Clean All Tasks</button>
      <div>{todos.length}</div>
    </div>
  );
};

export default Home;
