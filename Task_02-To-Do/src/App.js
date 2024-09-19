import "./App.css";
import { TbArrowBarDown } from 'react-icons/tb';
import ToDo from "./components/To-Do/todo.js";
import { useEffect, useState } from "react";
import DateSelect from "./components/Date/DateSelect.js";
import Intro from "./components/Intro/Intro";

const App = () => {
    const [todo, setTodo] = useState("");
    const [allTodos, setAllTodos] = useState([]);
    const [date, setDate] = useState(""); 
    const [selectedOption, setSelectedOption] = useState("");

    
    const addTodo = (e) => {
        e.preventDefault();

        const todoItem = {
            id: new Date().getTime(),
            text: todo,
            isChecked: false,
            date: date,
            option: selectedOption
        };

        if (todo !== "") {
            const updatedTodos = [...allTodos, todoItem];
            setAllTodos(updatedTodos.reverse()); 
            setTodo("");
            setDate(""); 
            setSelectedOption(""); 
        }
    };

   
    const getAllTodos = () => {
        const storedTodos = localStorage.getItem("todo");
        if (storedTodos) {
            setAllTodos(JSON.parse(storedTodos)); 
        }
    };

    const toggleChecked = (id) => {
        const updatedTodos = allTodos.map(todo => {
            if (todo.id === id) {
                todo.isChecked = !todo.isChecked;
            }
            return todo;
        });
        setAllTodos(updatedTodos);
    };

   
    const deleteTodo = (id) => {
        const filteredTodos = allTodos.filter(todo => todo.id !== id);
        setAllTodos(filteredTodos);
    };

  
    useEffect(() => {
        getAllTodos();
    }, []);

  
    useEffect(() => {
        if (allTodos.length > 0) {
            localStorage.setItem("todo", JSON.stringify(allTodos));
        }
    }, [allTodos]);

    return (
        <div className="app">
            <Intro />

            <div className="appTodo">
                <form className="appInputWrapper" onSubmit={addTodo} >
                    <input 
                        type="text" 
                        className="appInput" 
                        value={todo} 
                        onChange={(e) => setTodo(e.target.value)} 
                        placeholder="Add a new task..." 
                    />
                    <DateSelect date={date} setDate={setDate} />
                    
                    <div className="appInputButton" onClick={addTodo}>
                        <TbArrowBarDown size={24} />
                    </div>
                </form>

                <div className="appTodoList">
                    {allTodos.map(todo => (
                        <ToDo 
                            key={todo.id} 
                            deleteTodo={() => deleteTodo(todo.id)} 
                            text={todo.text} 
                            isChecked={todo.isChecked} 
                            toggleChecked={() => toggleChecked(todo.id)} 
                            date={todo.date} 
                        />
                    ))}

                    {allTodos.length === 0 && (
                        <p className="emptyMessage">There are no Todos</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
