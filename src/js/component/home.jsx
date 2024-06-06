import React, { useEffect, useState } from "react";


//create your first component
const Home = () => {
	const apiURL = "https://playground.4geeks.com/todo";
	const [inputValue, setInputValue] = useState({
		"label": "",
		"is_done": false
	});

	const [tasks, setTasks] = useState([]);

	const createUser = async () => {
		try {
			const response = await fetch(`${apiURL}/users/fbcio`,
				{ method: "POST" }
			)
			if (!response.ok) {
				throw new Error(data.detail);
			}
			const data = await response.json()
			console.log(data)
		} catch (error) {
			console.log(error);
		}

	}
	const getList = async () => {
		try {
			const response = await fetch(`${apiURL}/users/fbcio`)
			if (!response.ok) {
				throw new Error(data.detail);
			}
			const data = await response.json()
			console.log(data);
			setTasks(data.todos);
		} catch (error) {
			console.log(error);
		}

	}
	const addTask = async (task) => {
		console.log(tasks);
		try {
			const response = await fetch(`${apiURL}/todos/fbcio`,
				{
					method: "POST",
					body: JSON.stringify(task),
					headers: { "Content-Type": "application/json" }
				}
			)
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.detail);
			}

			setTasks([...tasks, data]);
			setInputValue({
				"label": "",
				"is_done": false
			})

		} catch (error) {
			console.log(error);
		}
	}
	const handleChange = (e) => {
		setInputValue({ ...inputValue, [e.target.name]: e.target.value });
	}


	const deleteTask = (index) => {
		setTasks(tasks.filter((_, newIndex) => newIndex !== index))
	}
	useEffect(() => {
		createUser();
		getList()
	}, [])

	return (
		<section>
			<h1>TO DO LIST </h1>
			<input
				value={inputValue.label}
				name="label"
				onChange={(e) => handleChange(e)}
				onKeyDown={(e) => {
					if (e.key === "Enter" && inputValue.label != "") {
						addTask(inputValue)
					}
				}}
				type="text" className="form-control" placeholder="Tareas pendientes" aria-label="Username" aria-describedby="basic-addon1" />
			<ul>
				{
					tasks && tasks.length > 0 ? tasks.map((task) => (<li key={task.id}>{task.label} <button onClick={() => deleteTask(task.id)} className="btn btn-danger"><i class="fas fa-trash"></i></button> </li>)) :
						<li>No hay tareas</li>
				}

			</ul>

		</section>

	);
};

export default Home;
