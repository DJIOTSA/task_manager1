import { EditTaskForm } from "@/components/organisms/edit-task";
import useEditTask from "@/components/organisms/edit-task/use-edit-task";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { editTaskPayload, Task } from "@/lib/types/tasks";

interface TaskActionsPopoverProps {
    task: Task;
}

export const TaskActionsPopover = ({ task }: TaskActionsPopoverProps) => {

    const editTaskPayload: Partial<editTaskPayload> = {
        title: task.title
    }

    const { mutation } = useEditTask({});

    const compyTask = async () => {
        const payload: editTaskPayload = {
            title: task.title
        }
        await mutation.mutateAsync(payload);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="flex justify-start">...</Button>
            </PopoverTrigger>
            <PopoverContent className="w-full">
                <EditTaskForm
                    payload={editTaskPayload}
                    taskId={task.id}
                    trigger={<Button disabled={mutation.isLoading} variant="ghost" className="flex justify-start">Edit</Button>}
                />
                <Button variant="ghost" disabled={mutation.isLoading} className="flex justify-start">Mark as Done</Button>
                <Button variant="ghost" disabled={mutation.isLoading} className="flex justify-start" onClick={compyTask}>
                    {mutation.isLoading ? "Copying..." : "Make a copy"}
                </Button>
                <Button variant="ghost" disabled={mutation.isLoading} className="flex justify-start">Delete</Button>
            </PopoverContent>
        </Popover>
    );
};