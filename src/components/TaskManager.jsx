import React, { useState } from "react";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAddTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: task }]);
      setTask("");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleUpdateTask = () => {
    setTasks(tasks.map((t) => (t.id === editingId ? { ...t, text: editText } : t)));
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-5">
      
      <h1 className="text-3xl font-bold text-blue-600 mb-5">Project Task Manager</h1>

     
      <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTask}
          className="w-full mt-3 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </div>

      
      <div className="mt-6 w-full max-w-md">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks added yet.</p>
        ) : (
          tasks.map((t) => (
            <div key={t.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md mb-3">
              {editingId === t.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 p-1 border rounded-md focus:outline-none"
                />
              ) : (
                <p className="flex-1">{t.text}</p>
              )}
              <div className="flex gap-2">
                {editingId === t.id ? (
                  <button onClick={handleUpdateTask} className="bg-green-500 text-white px-3 py-1 rounded-md">
                    Save
                  </button>
                ) : (
                  <button onClick={() => handleEditTask(t.id, t.text)} className="bg-yellow-500 text-white px-3 py-1 rounded-md">
                    Edit
                  </button>
                )}
                <button onClick={() => handleDeleteTask(t.id)} className="bg-red-500 text-white px-3 py-1 rounded-md">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskManager;
