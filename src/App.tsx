import "./App.css";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import { Card, CardBody } from "@nextui-org/card";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import { useEffect, useState } from "react";

type task = {
  id: number;
  title: string;
  completed: boolean;
};
function App() {
  const [tasks, setTasks] = useState<task[]>([]);
  const [taskInput, setTaskInput] = useState("");
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

  const removeTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskInput) {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: prevTasks.length + 1,
          title: taskInput,
          completed: false,
        },
      ]);
      setTaskInput("");
    }
  };

  // Drag
  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData("text/plain", taskId.toString());
    e.dataTransfer.effectAllowed = "move";
    e.currentTarget.setAttribute("data-start-x", e.clientX.toString());
  };

  const handleDragEnd = (e: React.DragEvent, taskId: number) => {
    const startX = parseFloat(
      e.currentTarget.getAttribute("data-start-x") || "0"
    );
    const endX = e.clientX;

    if (startX > endX) {
      removeTask(taskId);
    }

    e.currentTarget.removeAttribute("data-start-x");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center gap-4">
          <Input
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
          {/* Active */}
          <Tab
            title={
              <div className="flex items-center justify-start gap-1">
                <span>ACTIVE</span>
                {tasks.filter((task) => !task.completed).length > 0 && (
                  <Chip size="sm" variant="faded">
                    <p className="text-xs">
                      {tasks.filter((task) => !task.completed).length}
                    </p>
                  </Chip>
                )}
              </div>
            }
          >
            <div className="flex flex-col gap-2">
              {tasks
                .filter((task) => !task.completed)
                .map((task) => (
                  <Card
                    className="mt-6"
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    onDragEnd={(e) => handleDragEnd(e, task.id)}
                  >
                    <CardBody>
                      <div className="flex justify-start items-center gap-1">
                        <Checkbox
                          isSelected={task.completed}
                          onValueChange={() => {
                            setTasks((prevTasks) =>
                              prevTasks.map((prevTask) => {
                                if (prevTask.id === task.id) {
                                  return {
                                    ...prevTask,
                                    completed: !prevTask.completed,
                                  };
                                }
                                return prevTask;
                              })
                            );
                          }}
                        />
                        <p>{task.title}</p>
                        <div className="flex gap-2"></div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
            </div>
          </Tab>
          {/* Completed */}
          <Tab title="COMPLETED">
            <div className="flex flex-col gap-2">
              {tasks
                .filter((task) => task.completed)
                .map((task) => (
                  <Card
                    className="mt-6"
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    onDragEnd={(e) => handleDragEnd(e, task.id)}
                  >
                    <CardBody>
                      <div className="flex justify-start items-center gap-1">
                        <Checkbox
                          isSelected={task.completed}
                          onValueChange={() => {
                            setTasks((prevTasks) =>
                              prevTasks.map((prevTask) => {
                                if (prevTask.id === task.id) {
                                  return {
                                    ...prevTask,
                                    completed: !prevTask.completed,
                                  };
                                }
                                return prevTask;
                              })
                            );
                          }}
                        />
                        <p>{task.title}</p>
                        <div className="flex gap-2"></div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
            </div>
          </Tab>
          {/* All */}
          <Tab title="ALL">
            <div className="flex flex-col gap-2">
              {tasks.map((task) => (
                <Card
                  className="mt-6"
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  onDragEnd={(e) => handleDragEnd(e, task.id)}
                >
                  <CardBody>
                    <div className="flex justify-start items-center gap-1">
                      <Checkbox
                        isSelected={task.completed}
                        onValueChange={() => {
                          setTasks((prevTasks) =>
                            prevTasks.map((prevTask) => {
                              if (prevTask.id === task.id) {
                                return {
                                  ...prevTask,
                                  completed: !prevTask.completed,
                                };
                              }
                              return prevTask;
                            })
                          );
                        }}
                      />
                      <p>{task.title}</p>
                      <div className="flex gap-2">
                        {/* <Button color="danger" size="sm" isIconOnly>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-4"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </Button> */}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default App;
