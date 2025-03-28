import React, { useState, useEffect } from "react";

const TaskManager = () => {
  const [tasks, setTasks] = useState(null); // Initially null to differentiate between empty list and loading
  const [task, setTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks when component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        let response = await fetch("http://localhost:5500/crud/getalltasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jwtToken: localStorage.getItem("jwtToken") }),
        });

        let parsedData = await response.json();
        setTasks(parsedData.allTasks?.tasks || []); // Ensure it's always an array
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Error fetching tasks");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (task.trim() !== "") {
      try {
        setIsLoading(true);

        let response = await fetch("http://localhost:5500/crud/createtask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jwtToken: localStorage.getItem("jwtToken"), task }),
        });

        let parsedData = await response.json();
        setTasks(parsedData.allTasks?.tasks || []);
        setTask("");
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Error adding new task");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      setIsLoading(true);

      let response = await fetch("http://localhost:5500/crud/deletetask", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jwtToken: localStorage.getItem("jwtToken"), taskId: id }),
      });

      let parsedData = await response.json();
      setTasks(parsedData.allTasks?.tasks || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error deleting task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTask = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleUpdateTask = async () => {
    try {
      setIsLoading(true);

      let response = await fetch("http://localhost:5500/crud/updatetask", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jwtToken: localStorage.getItem("jwtToken"),
          taskId: editingId,
          updatedTask: { taskName: editText, completed: false },
        }),
      });

      let parsedData = await response.json();
      setTasks(parsedData.allTasks?.tasks || []);
      setEditingId(null);
      setEditText("");
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error updating task");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <h2>Loading tasks...</h2>;
  if (error) return <h2 className="text-red-500">{error}</h2>;

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
        {tasks === null ? (
          <p className="text-gray-500 text-center">Fetching tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks added yet.</p>
        ) : (
          tasks.map((t) => (
            <div key={t._id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md mb-3">
              {editingId === t._id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 p-1 border rounded-md focus:outline-none"
                />
              ) : (
                <p className="flex-1">{t.taskName}</p>
              )}
              <div className="flex gap-2">
                {editingId === t._id ? (
                  <button onClick={handleUpdateTask} className="bg-green-500 text-white px-3 py-1 rounded-md">
                    Save
                  </button>
                ) : (
                  <button onClick={() => handleEditTask(t._id, t.taskName)} className="bg-yellow-500 text-white px-3 py-1 rounded-md">
                    Edit
                  </button>
                )}
                <button onClick={() => handleDeleteTask(t._id)} className="bg-red-500 text-white px-3 py-1 rounded-md">
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
