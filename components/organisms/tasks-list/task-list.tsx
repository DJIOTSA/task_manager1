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
import { Card, CardContent } from "@/components/ui/card";
import { EditTaskForm } from "../edit-task";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TaskActionsPopover } from "@/components/molecules/task-actions-popover";

export default function TaskList() {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  if (isLoading) {
    return <TaskListSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <EditTaskForm trigger={<Button> <Plus /> Create task</Button>} />
      </div>

      {!tasks?.length && <p>
        {/* TODO: replace with pretty empty component */}
        No data
      </p>
      }

      {!!tasks?.length && <Card>
        <CardContent>
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
                    <TaskActionsPopover task={task} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>}
    </div>
  );
}
