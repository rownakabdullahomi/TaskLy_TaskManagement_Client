import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  const handleAddTaskClick = () => {
    setShowModal(true);
    setError("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const createdBy = user?.email;
    const timeStamp = new Date(); // Full date and time

    const newTask = { name, description, timeStamp, createdBy };
    console.log(newTask);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/task`,
        newTask
      );
      console.log(res);
      if (res.data.insertedId) {
        toast.success("Task added successfully!");
        e.target.reset();
      }
    } catch (error) {
      toast.error("Failed to add task. Please try again.", error);
    }

    // setShowModal(false); // Close modal after creation
  };

  return (
    <div className="my-20 h-screen grid grid-cols-6 gap-4">
      {/* Sidebar */}
      <div className="col-span-1 bg-gray-200 px-4 lg:px-6 flex flex-col gap-5">
        <button
          onClick={handleAddTaskClick}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Add Task
        </button>
        <button className="bg-yellow-400 text-white py-2 rounded hover:bg-yellow-500 transition">
          To-Do
        </button>
        <button className="bg-orange-400 text-white py-2 rounded hover:bg-orange-500 transition">
          In Progress
        </button>
        <button className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
          Done
        </button>
      </div>

      {/* Main Content */}
      <div className="col-span-5 bg-gray-300 pr-4 lg:pr-6"></div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg  shadow-lg w-96 p-6 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-error hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Add New Task</h2>

            <form onSubmit={handleCreateTask}>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Task Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  placeholder="Enter task name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  type="text"
                  name="description"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  placeholder="Enter description"
                  rows="4"
                  required
                ></textarea>
              </div>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <input
                type="submit"
                value={"Create Task"}
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
