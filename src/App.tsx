import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { Task } from "./models/task";
import Taskcard from "./components/taskcard";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);

  const removeTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskInput) {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: new Date().getTime(),
          title: taskInput,
          date: new Date().toISOString(),
          completed: false,
        },
      ]);
      setTaskInput("");
    }
  };

  const handleDelete = (taskId: number) => {
    removeTask(taskId);
  };

  // sync this taks to local storage load and save
  useEffect(() => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      setTasks(JSON.parse(tasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section className="p-4 max-w-5xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center gap-4">
          <Input
            ref={inputRef}
            placeholder="Enter task..."
            size="lg"
            name="task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <Button type="submit" isIconOnly color="primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-corner-down-left"
            >
              <polyline points="9 10 4 15 9 20" />
              <path d="M20 4v7a4 4 0 0 1-4 4H4" />
            </svg>
          </Button>
        </div>
      </form>

      {/* Tabs */}
      <div className="flex w-full flex-col gap-3 mt-2">
        <Tabs variant="underlined" defaultSelectedKey="2">
          {/* Today */}
          <Tab
            title={
              <div className="flex items-center justify-start gap-2 ">
                <span>TODAY</span>
                {tasks.filter(
                  (task) =>
                    new Date(task.date).toDateString() ===
                    new Date().toDateString()
                ).length > 0 && (
                  <Chip size="sm" variant="bordered">
                    <p className="text-xs w-fit">
                      {
                        tasks.filter(
                          (task) =>
                            new Date(task.date).toDateString() ===
                              new Date().toDateString() && !task.completed
                        ).length
                      }
                    </p>
                  </Chip>
                )}
              </div>
            }
          >
            <div className="flex flex-col gap-3">
              {tasks
                .filter(
                  (task) =>
                    new Date(task.date).toDateString() ===
                    new Date().toDateString()
                )
                .map((task) => (
                  <Taskcard
                    key={task.id}
                    task={task}
                    setTasks={setTasks}
                    handleDelete={handleDelete}
                  />
                ))}
            </div>
          </Tab>

          {/* Completed */}
          <Tab title="COMPLETED">
            <div className="flex flex-col gap-3">
              {tasks
                .filter((task) => task.completed)
                .map((task) => (
                  <Taskcard
                    key={task.id}
                    task={task}
                    setTasks={setTasks}
                    handleDelete={handleDelete}
                  />
                ))}
            </div>
          </Tab>
          {/* All */}
          <Tab title="ALL">
            <div className="flex flex-col gap-3">
              {tasks.map((task) => (
                <Taskcard
                  key={task.id}
                  task={task}
                  setTasks={setTasks}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
}

export default App;
