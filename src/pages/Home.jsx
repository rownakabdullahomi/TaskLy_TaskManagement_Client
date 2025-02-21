import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "../components/home/TaskColumn/TaskColumn";
import { useTaskContext } from "../providers/TaskProvider";

const Home = () => {
  const {
    showModal,
    setShowModal,
    isEditing,
    currentTask,
    handleCreateOrUpdateTask,
  } = useTaskContext();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mt-24 mb-8   px-2 sm:px-4 lg:px-6 bg-base-100">
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory">
          {["todo", "inprogress", "done"].map((status) => (
            <div key={status} className="snap-start min-w-full sm:min-w-0 flex flex-col flex-grow min-h-[calc(100vh-195px)]">
              <TaskColumn status={status} />
            </div>
          ))}
        </div>
      </div>

      {/* Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-error hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">
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
              <input
                type="submit"
                value={isEditing ? "Update Task" : "Create Task"}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              />
            </form>
          </div>
        </div>
      )}
    </DndProvider>
  );
};

export default Home;
