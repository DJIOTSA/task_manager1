"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getTasks } from "@/lib/handlers/tasks";
import React from "react";
import { useQuery } from "react-query";
import { TaskListSkeleton } from "./task-list-skeleton";
import { TaskEditPopover } from "../task-edit/task-edit-popover";

export default function TaskList() {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  if (isLoading) {
    // Relace with skeleton loader
    return <TaskListSkeleton />;
  }

  console.log("Task list", tasks);

  return (
    <div>
      <Table className="">
        <TableHeader>
          <TableRow className="">
            <TableHead className="w-[300]">Task</TableHead>
            <TableHead>Completed</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks?.map((task) => (
            <TableRow key={task.id} className="">
              <TableCell className="font-medium ">{task.title}</TableCell>
              <TableCell>{task.isDone ? "Yes" : "No"}</TableCell>
              <TableCell>
                {task.date ? new Date(task.date).toLocaleDateString() : ""}
              </TableCell>
              <TableCell>
                {/* TODO: change to popover */}
                <TaskEditPopover taskId={String(task.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
