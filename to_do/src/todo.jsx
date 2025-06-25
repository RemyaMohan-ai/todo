import { useEffect, useRef, useState } from "react";
import "./todo.css"
import { FaTrash, FaArrowUp, FaArrowDown, FaCheck ,FaTimes, FaEdit} from "react-icons/fa";


function Todofn(){
    const[tasks , setTask] = useState([])
    const defult_task_state = { text: "", completed: false }
    const[newTask, setNewTask]= useState({text: "", completed: false })
    const[editindex , seteditindex] = useState(null)

    function handleInputChanges(event){
      setNewTask({ ...newTask, text: event.target.value })    }

 
    function addNewTask() {
      const taskText = newTask.text.trim();
  
      if (taskText !== "") {
          if (editindex != null) {
            const updatedTasks = [...tasks];
            updatedTasks[editindex] = { text: taskText, completed: false };
            setTask(updatedTasks);
            seteditindex(null);
        } else {
            setTask((t) => [...t, { text: taskText, completed: false }]);
        }
        setNewTask({ text: "", completed: false });     
      }
  }
  




  const inpref = useRef(null)


    function deleteTask(index){
        const updatedTasks = tasks.filter((element, key) =>key != index)
        setTask(updatedTasks)
    }

    // function moveup(index){
    //    if(index>0){
    //     const updatedTasks =[...tasks]
    //     [updatedTasks[index-1],updatedTasks[index]]=[updatedTasks[index], updatedTasks[index-1]]
    //     setTask(updatedTasks)
    //    }
    // }

    // function movedown(index){
    //     if(index<tasks.length-1){
    //         const updatedTasks = [...tasks]
    //         [updatedTasks[index],updatedTasks[index+1]]=[updatedTasks[index+1],updatedTasks[index]]
    //         setTask(updatedTasks)
    //     }
    // }

    function moveup(index) {
        if (index > 0) {  
            const updatedTasks = [...tasks];
            [updatedTasks[index - 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index - 1]];
            setTask(updatedTasks);
        }
    }
    
    function movedown(index) {
        if (index < tasks.length - 1) {  
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTask(updatedTasks);
        }
    }
    function toggleDone(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;  
        console.log(updatedTasks[index]); 
        setTask(updatedTasks);
      }

      function edit(index){
        
        setNewTask(tasks[index])
        seteditindex(index)
      }

    return(
<>
<div className="to-do-list">
      <h1>To-Do List</h1>

      <div className="input-box">
    <input
          type="text"
          placeholder="Enter the task"
          value={newTask.text}
          onChange={handleInputChanges}
        />
        <button className="add-button" onClick={addNewTask}>Add</button>
      </div>

      <div className="task-list">
        <ol>
          {tasks.map((list, index) => (
            <li key={index}
            className={tasks[index].completed ? "done" : ""}
            >
              {list.text}
              <div className="task-buttons">
                <button className="delete-btn" onClick={()=>deleteTask(index)}>
                  <FaTrash />
                </button>
                <button className="up-btn" onClick={()=>moveup(index)}>
                  <FaArrowUp />
                </button>
                <button className="down-btn" onClick={()=>movedown(index)}>
                  <FaArrowDown />
                </button>
                <button className="done-btn" onClick={() => toggleDone(index)}>
                {tasks[index].completed ? <FaTimes /> : <FaCheck />}
              </button>
                <button className="edit-btn" onClick={() => edit(index)}   style={{ 
                        color: 'black', 
                        padding: '10px', 
                        borderRadius: '5px', 
                        border: 'none', 
                        cursor: 'pointer', 
                        fontSize: '16px' 
                    }}>
                <FaEdit />
              </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
</>
      
    
   )
}

export default Todofn 