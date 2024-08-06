import React from "react";
import { Task } from "../models/task";
import { Button, Card, CardBody, Checkbox } from "@nextui-org/react";

interface TaskcardProps {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  handleDelete: (taskId: number) => void;
}

export default function Taskcard({
  task,
  setTasks,
  handleDelete,
}: TaskcardProps) {
  return (
    <Card
      key={task.id}
      onClick={() => {
        handleDelete(task.id);
      }}
    >
      <CardBody>
        <div className="flex justify-between items-center gap-1 w-full">
          <div className="flex justify-start items-center gap-2 w-11/12">
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
            <p className="w-full truncate" title={task.title}>
              {task.title}
            </p>
          </div>
          <div className="flex justify-end items-center gap-2 w-1/12">
            <Button
              type="button"
              color="danger"
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => handleDelete(task.id)}
            >
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
                className="size-4 color-primary"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
