'use client';
import { useState } from 'react';

export default function Calendar() {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

  const days: (number | null)[] = []; //달력에 표시될 셀. 숫자 또는 null만 가능
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null); //이번 달 1일 전까지 빈칸(null) 추가
  for (let d = 1; d <= lastDateOfMonth; d++) days.push(d); //1일~마지막 날짜까지 숫자 추가

  const handlePrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, input.trim()]);
    setInput("");
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm p-4">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white text-center py-4">Calendar</h1>
      </header>

      {/* Main: 2단 레이아웃 */}
      <main className="flex-1 overflow-y-auto py-10 flex flex-col md:flex-row gap-6 justify-center">
        {/* 왼쪽: 달력 */}
        <div className="w-full md:w-1/2 max-w-md mx-auto md:mx-0">
          {/*월,주,일*/}
          <div className="border-b border-slate-200 dark:border-slate-700">
            <nav className="flex justify-around px-4">
              <a className="flex-1 py-3 text-center text-sm font-bold text-primary border-b-2 border-primary" href="#">월</a>
              <a className="flex-1 py-3 text-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" href="#">주</a>
              <a className="flex-1 py-3 text-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" href="#">일</a>
              </nav>
          </div>
          {/* 월 이동 */}
          <div className="flex items-center justify-between mb-4 py-3">
            <button onClick={handlePrevMonth} className="flex items-center justify-center w-10 h-10 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 ml-4">
              ◀
            </button>

            <p className="text-base font-bold text-slate-900 dark:text-white">{year}년 {month + 1}월</p>

            <button onClick={handleNextMonth} className="flex items-center justify-center w-10 h-10 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 mr-4">
              ▶
            </button>
          </div>

          {/* 요일 */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
            {["일","월","화","수","목","금","토"].map((d) => <span key={d}>{d}</span>)}
          </div>

          {/* 날짜 */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, idx) => { 
              const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
              const isSelected = day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear();
              return (
                <button
                  key={idx}
                  className={`h-10 flex items-center justify-center rounded hover:bg-slate-200
                    ${isToday ? 'text-blue-500' : ''} 
                    ${isSelected ? 'bg-slate-200' : ''}`}
                  onClick={() => day && setSelectedDate(new Date(year, month, day))}
                  disabled={!day}
                >
                  {day || ""}
                </button>
              );
            })}
          </div>         
        </div>

        {/* 오른쪽: 할 일 목록 */}
        <div className="w-full md:w-1/2 max-w-md">
          {/* 선택 날짜 표시 */}
          <p className="text-lg font-bold text-slate-900 dark:text-white text-center pr-10">
            {selectedDate.toLocaleDateString()}
          </p>

          {/* Input + Add Button */}
          <div className="flex w-full mb-4 mt-6">
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
          <ul className="relative space-y-4 max-h-96 overflow-y-auto pr-3">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
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
          </ul>
        </div>
      </main>
    </div>
  );
}
//map -> li변환 
