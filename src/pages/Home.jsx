import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [initialTaskValues, setInitialTaskValues] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: allTasks = [], refetch: refetchAll } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic(`/tasks/${user?.email}`);
      return data;
    },
  });

  useEffect(() => {
    if (allTasks.length) {
      setTasks(allTasks);
    }
  }, [allTasks]);

  const { data: todoTasks = [], refetch: refetchTodo } = useQuery({
    queryKey: ["todoTasks", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic(`/todo-tasks/${user?.email}`);
      return data;
    },
  });
  const { data: inProgressTasks = [], refetch: refetchInProgress } = useQuery({
    queryKey: ["inProgressTasks", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic(`/in-progress-tasks/${user?.email}`);
      return data;
    },
  });
  const { data: doneTasks = [], refetch: refetchDone } = useQuery({
    queryKey: ["doneTasks", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic(`/done-tasks/${user?.email}`);
      return data;
    },
  });

  const handleAllTaskClick = () => {
    refetchAll();
    setTasks(allTasks);
    setActiveFilter("all");
  };
  const handleToDoTaskClick = () => {
    refetchTodo();
    setTasks(todoTasks);
    setActiveFilter("todo");
  };
  const handleInProgressTaskClick = () => {
    refetchInProgress();
    setTasks(inProgressTasks);
    setActiveFilter("inprogress");
  };
  const handleDoneTaskClick = () => {
    refetchDone();
    setTasks(doneTasks);
    setActiveFilter("done");
  };

  const handleAddTaskClick = () => {
    setShowModal(true);
    setIsEditing(false);
    setCurrentTask(null);
    setError("");
  };

  const handleEditTaskClick = (task) => {
    setShowModal(true);
    setIsEditing(true);
    setCurrentTask(task);
    setInitialTaskValues({ name: task.name, description: task.description });
  };

  const handleDeleteTaskClick = async (taskId) => {
    try {
      const res = await axiosPublic.delete(`/task/${taskId}`);
      if (res.data.deletedCount) {
        toast.success("Task deleted successfully!");
        refetchAll();
      } else {
        toast.error("Failed to delete task.");
      }
    } catch (error) {
      toast.error("Error deleting task.", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentTask(null);
  };

  const handleCreateOrUpdateTask = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;

    if (isEditing && currentTask) {
      if (
        name === initialTaskValues.name &&
        description === initialTaskValues.description
      ) {
        toast.error("No changes made to the task.");
        return;
      }
      try {
        const updatedData = { name, description };
        console.log(updatedData);
        const res = await axiosPublic.patch(
          `/task/${currentTask._id}`,
          updatedData
        );
        if (res.data.modifiedCount) {
          toast.success("Task updated successfully!");
          refetchAll();
          handleCloseModal();
        } else {
          toast.error("Failed to update task.");
        }
      } catch (error) {
        toast.error("Error updating task.", error);
      }
    } else {
      const createdBy = user?.email;
      const status = "todo";
      const timeStamp = new Date();
      const newTask = { name, description, status, timeStamp, createdBy };

      try {
        const res = await axiosPublic.post("/task", newTask);
        if (res.data.insertedId) {
          toast.success("Task added successfully!");
          e.target.reset();
          refetchAll();
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error("Failed to add task. Please try again.", error);
      }
    }
  };

  return (
    <div className="my-20 h-screen grid grid-cols-6 gap-4">
      <div className="col-span-1 bg-gray-200 px-4 lg:px-6 flex flex-col gap-5 py-6">
        <button
          onClick={handleAllTaskClick}
          className={`btn btn-outline btn-primary transition ${
            activeFilter === "all" ? "bg-primary !text-white" : ""
          }`}
        >
          All Tasks
        </button>
        <button
          onClick={handleToDoTaskClick}
          className={`btn btn-outline btn-secondary transition ${
            activeFilter === "todo" ? "bg-secondary !text-white" : ""
          }`}
        >
          To-Do
        </button>
        <button
          onClick={handleInProgressTaskClick}
          className={`btn btn-outline btn-warning transition ${
            activeFilter === "inprogress" ? "bg-warning !text-white" : ""
          }`}
        >
          In Progress
        </button>
        <button
          onClick={handleDoneTaskClick}
          className={`btn btn-outline btn-success transition ${
            activeFilter === "done" ? "bg-success !text-white" : ""
          }`}
        >
          Done
        </button>
      </div>

      <div className="col-span-5 bg-gray-300 pr-4 lg:pr-6">
        <div className="grid grid-cols-4 gap-4 p-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="border rounded-2xl shadow-md p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold">{task.name}</h2>
                <p className="text-sm text-gray-600 my-2">{task.description}</p>
                <p className="badge badge-outline my-2 badge-error">
                  {task.status}
                </p>
              </div>
              <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                <span>{task.timestamp}</span>
              </div>
              <div className="flex gap-3 mt-4">
                <div className="tooltip" data-tip="Edit">
                  <FaEdit
                    className="text-green-500 cursor-pointer"
                    onClick={() => handleEditTaskClick(task)}
                  />
                </div>
                <FaCheck className="text-blue-500 cursor-pointer" />
                <div className="tooltip" data-tip="Delete">
                  <FaTrash
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDeleteTaskClick(task._id)}
                  />
                </div>
              </div>
            </div>
          ))}

          <div
            onClick={handleAddTaskClick}
            className="border-2 border-dashed border-gray-400 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 p-4"
          >
            <FaPlus size={40} className="text-gray-500" />
            <p className="text-gray-600 mt-2">Add New Task</p>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-error hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {isEditing ? "Edit Task" : "Add New Task"}
            </h2>

            <form onSubmit={handleCreateOrUpdateTask}>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Task Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={currentTask?.name || ""}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  placeholder="Enter task name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  name="description"
                  defaultValue={currentTask?.description || ""}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  placeholder="Enter description"
                  rows="4"
                  required
                ></textarea>
              </div>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <input
                type="submit"
                value={isEditing ? "Update Task" : "Create Task"}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
