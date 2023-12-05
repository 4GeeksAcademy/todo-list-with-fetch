import React, {useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
const [inputValue, setInputValue] = useState("");
const [todos, setTodos] = useState([]);

//add into the array -> concat
//delete from array -> filter
//update - map

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
						setTodos((prevTodos) => [...prevTodos, inputValue]);
						setInputValue("");
					  }
					}}
					placeholder="What do you need to do?!?"></input></li>
					{todos.map((item, index) => (
					<li>{item}<i class="fa-solid fa-trash" onClick={() => setTodos(todos.filter((t, currentIndex) => index != currentIndex))}></i></li>
					))}
			</ul>
			<div>{todos.length}</div>
		</div>
	);
};

export default Home;


