import { useEffect, useState } from 'react';
import Task from "./Components/Task.jsx"
import Capibara from "../public/Capibara.png"
import './App.css'

function App() {

  const [text, setText] = useState("");
  const [task, setTask] = useState<string[]>([]);

  //Poder subir la tarea con la tecla enter
  function inputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      AddTask();
    }
  }

  //Actualiza el texto 
  function ActualizarText(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  //Agrega la tarea y si el campo esta basio no se sube
  function AddTask() {

    if(text.trim() == "" ){
      alert("Tarea basia")
      return
    }

    setTask([...task, text]); //Se actualiza la tarea
    localStorage.setItem("tareas", JSON.stringify([...task, text])) //se agrega como un .JSON al localStorage
    setText(""); //Eliminamos lo escrito anteriormente para dejar el campo bacio para otras tareas
  }
  
  //Elimina las tareas
  function Eliminar(index: number){
    setTask(task => {
      const newTask = [...task] //Copiams el array
      newTask.splice(index, 1) //Eliminaos el numero de index
      localStorage.setItem("tareas", JSON.stringify(newTask)) //se actualiza local
      return newTask // se da el nuevo arreglo
    })
  }

  //subimos las cosas al local storage
  useEffect(() => {
    const tareasStorage = localStorage.getItem("tareas")
    if (tareasStorage) {
      setTask(
        JSON.parse(tareasStorage) //convierte en un string a array
      )
    }
  }, [])

  return (
  <main>
      <div className='FormularioTask'>
        <h1>Task List</h1>
        <p>Agrega tu tarea pendiente</p>
        <div className='InputTask'>
          <input className='inputTask' type="text" placeholder='Agrega tu tarea'  onChange={ActualizarText} value={text} onKeyDown={inputKeyDown}/>
          <button onClick={AddTask} >Submit</button>
        </div>
        <img src={Capibara} alt="capibara" />
      </div>

      <div className='Tasks'>
        <h2>Tareas</h2>
        {task.map((task, index) => {
          return <Task key={task} task={task} Eliminar={Eliminar} index={index}/>
        })}
      </div>
    </main>
  )
}

export default App