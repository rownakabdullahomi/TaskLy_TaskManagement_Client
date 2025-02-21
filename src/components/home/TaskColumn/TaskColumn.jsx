/* eslint-disable react/prop-types */
/* TaskColumn.jsx */
import { useDrop } from "react-dnd";
import { FaPlus } from "react-icons/fa";
import TaskCard from "./TaskCard";
import { useTaskContext } from "../../../providers/TaskProvider";

const ItemTypes = {
  TASK: "task",
};

const TaskColumn = ({ status }) => {
  const { tasks, handleDropTask, handleAddTaskClick} = useTaskContext();

  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item) => handleDropTask(item.id, status),
  });

  return (
    <div ref={drop} className="bg-base-200 p-4 rounded-lg hover:bg-base-300 border border-warning flex-1">
      <h2 className="text-xl font-bold capitalize mb-4">{status === "inprogress"? "In Progress" : status === "todo" ? "Todo" : "Done"}</h2>
      {tasks.filter(task => task.status === status).map((task, index) => (
        <TaskCard
          key={task._id}
          task={task}
          index={index}
        />
      ))}
      {status === "todo" && (
        <div
          onClick={handleAddTaskClick}
          className="border-2 border-dashed border-gray-400 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 p-4"
        >
          <FaPlus size={40} className="text-gray-500" />
          <p className="text-gray-600 mt-2">Add New Task</p>
        </div>
      )}
    </div>
  );
};

export default TaskColumn;
