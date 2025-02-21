/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthContext } from "./AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const { user } = useAuthContext();
  const axiosPublic = useAxiosPublic();
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Fetch all tasks
  const { data: allTasks = [], refetch } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic(`/tasks/${user?.email}`);
      return data;
    },
  });

  useEffect(() => {
    setTasks(allTasks);
  }, [allTasks]);

  // Move task within the same column and persist order
  const moveTask = async (fromIndex, toIndex, status) => {
    const columnTasks = tasks.filter((task) => task.status === status);
    const movedTask = columnTasks.splice(fromIndex, 1)[0];
    columnTasks.splice(toIndex, 0, movedTask);

    const newTasks = tasks
      .filter((task) => task.status !== status)
      .concat(columnTasks);
    setTasks(newTasks);

    try {
      await axiosPublic.put("/reorder-tasks", {
        tasks: columnTasks.map((task, idx) => ({ id: task._id, order: idx })),
      });
    } catch (error) {
      toast.error("Failed to update task order.", error);
    }
  };

  // Handle Drag and Drop between columns
  const handleDropTask = async (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);

    try {
      await axiosPublic.put(`/drag-update/tasks/${taskId}`, {
        status: newStatus,
      });
      toast.success("Task updated!");
      refetch();
    } catch (error) {
      toast.error("Failed to update task.", error);
    }
  };

  // Handle Add Task
  const handleAddTaskClick = () => {
    setShowModal(true);
    setIsEditing(false);
    setCurrentTask(null);
  };

  // Handle Edit Task
  const handleEditTaskClick = (task) => {
    setShowModal(true);
    setIsEditing(true);
    setCurrentTask(task);
  };

  // Handle Delete Task
  const handleDeleteTaskClick = async (taskId) => {
    try {
      const res = await axiosPublic.delete(`/tasks/${taskId}`);
      if (res.data.deletedCount) {
        toast.success("Task deleted successfully!");
        refetch();
      } else {
        toast.error("Failed to delete task.");
      }
    } catch (error) {
      toast.error("Error deleting task.", error);
    }
  };

  // Handle Create or Update Task
  const handleCreateOrUpdateTask = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;

    if (isEditing && currentTask) {
      try {
        const updatedData = { name, description };
        await axiosPublic.put(`/tasks/${currentTask._id}`, updatedData);
        toast.success("Task updated successfully!");
      } catch {
        toast.error("Error updating task.");
      }
    } else {
      const newTask = {
        name,
        description,
        status: "todo",
        createdBy: user?.email,
        timeStamp: new Date(),
      };
      try {
        const res = await axiosPublic.post("/tasks", newTask);
        if (res.data.insertedId) {
          toast.success("Task added successfully!");
        } else {
          toast.error("Failed to add task.");
        }
      } catch {
        toast.error("Error adding task.");
      }
    }

    refetch();
    setShowModal(false);
  };

  const taskInfo = {
    tasks,
    moveTask,
    handleDropTask,
    handleAddTaskClick,
    handleEditTaskClick,
    handleDeleteTaskClick,
    handleCreateOrUpdateTask,
    showModal,
    setShowModal,
    isEditing,
    currentTask,
  };

  return (
    <TaskContext.Provider value={taskInfo}>{children}</TaskContext.Provider>
  );
};

export default TaskProvider;

// Custom Hook to Use TaskContext
export const useTaskContext = () => useContext(TaskContext);
