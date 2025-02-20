/* eslint-disable react/prop-types */
// import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
// import { FaPlus } from "react-icons/fa6";

// const MainContent = ({ handleAddTaskClick, tasks }) => {
//   console.log(tasks);

//   return (
//     <div className="grid grid-cols-4 gap-4 p-6">
//       {tasks.map((task) => (
//         <div
//           key={task._id}
//           className="border rounded-2xl shadow-md p-4 flex flex-col justify-between"
//         >
//           <div>
//             <h2 className="text-lg font-semibold">{task.name}</h2>
//             <p className="text-sm text-gray-600 my-2">{task.description}</p>
//             <p className="badge badge-outline my-2 badge-error">
//               {task.status}
//             </p>
//           </div>
//           <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
//             <span>{task.timestamp}</span>
//           </div>
//           <div className="flex gap-3 mt-4">
//             <FaEdit className="text-green-500 cursor-pointer" />
//             <FaCheck className="text-blue-500 cursor-pointer" />
//             <FaTrash className="text-red-500 cursor-pointer" />
//           </div>
//         </div>
//       ))}

//       {/* Add New Task Card */}
//       <div
//         onClick={handleAddTaskClick}
//         className="border-2 border-dashed border-gray-400 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 p-4"
//       >
//         <FaPlus size={40} className="text-gray-500" />
//         <p className="text-gray-600 mt-2">Add New Task</p>
//       </div>
//     </div>
//   );
// };

// export default MainContent;
