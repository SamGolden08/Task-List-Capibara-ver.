import CapibaraTrash from "../../public/CapibaraTrash.png"

//Creacion del tipo 
type TaskProps = {
  task: string;            // cada tarea es un string
  Eliminar: (index: number) => void; // función que recibe un número
  index: number;           // posición de la tarea
};

export default function Task({ task, Eliminar, index }: TaskProps) {
  return (
    <div className="Task">

      <div className="TaskText">

        <input type="checkbox" />
        <p>{task}</p>

      </div>

      <div id="imagen" onClick={() => Eliminar(index)}>

        <img src={CapibaraTrash} alt="TrashCapibara" />

      </div>

    </div>
  );
}

