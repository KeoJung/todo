'use client';

import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

export default function MainPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState("");

 if (!isLoaded)
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <p className="text-xl font-semibold text-slate-700">Loading...</p>
    </div>
  );
if (!isSignedIn) {
  window.location.href = "/";
  return null;
}

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, input.trim()]);
    setInput("");
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  if (!isSignedIn) return null;

  return (
    <div className="flex-1 flex flex-col items-center px-6 py-4">
      <h1 className="text-4xl font-bold text-slate-800 p-10 text-center w-full">
        My Tasks
      </h1>
      {/* Input + Add Button */}
      <div className="flex w-full max-w-2xl mb-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Add a new task..."
          className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-800 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-2 focus:outline-none"
        />
        <button
          onClick={addTask}
          type="button"
          className="ml-2 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200"
          aria-label="add task"
        >
          <span className="material-symbols-outlined text-2xl">add</span>
        </button>
      </div>

      {/* Task List */}
      <main className="w-full max-w-2xl">
        <h2 className="mb-2 text-lg font-semibold text-slate-700">Today</h2>
        <div className="relative space-y-4 max-h-96 overflow-y-auto p-2">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm"
            >
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-slate-300 text-blue-500 focus:ring-blue-500"
                onChange={(e) =>
                  e.target.checked
                    ? e.currentTarget.nextElementSibling?.classList.add(
                        "line-through",
                        "text-slate-400"
                      )
                    : e.currentTarget.nextElementSibling?.classList.remove(
                        "line-through",
                        "text-slate-400"
                      )
                }
              />
              <p className="flex-1 text-base text-slate-800 break-words">{task}</p>
              <button
                onClick={() => removeTask(index)}
                className="ml-2 text-sm text-slate-400 hover:text-red-500"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
