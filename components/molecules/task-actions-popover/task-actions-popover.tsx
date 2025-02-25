import { DoneTaskModal } from "@/components/organisms/done-task";
import { EditTaskForm } from "@/components/organisms/edit-task";
import useEditTask from "@/components/organisms/edit-task/use-edit-task";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { editTaskPayload, Task } from "@/lib/types/tasks";
import { useDoneTask } from '../../organisms/done-task/use-done-task';
import { useDeleteTask } from "@/components/organisms/delete-task/use-delete-task";
import { DeleteTaskModal } from "@/components/organisms/delete-task";

interface TaskActionsPopoverProps {
    task: Task;
}

export const TaskActionsPopover = ({ task }: TaskActionsPopoverProps) => {

    const editTaskPayload: Partial<editTaskPayload> = {
        title: task.title
    }

    const { mutation } = useEditTask({});
    const { mutation: doneMutation } = useDoneTask({ taskId: task.id })
    const { mutation: deleteMutation } = useDeleteTask({ taskId: task.id })

    const displayIsDonButon = (task.isDone || doneMutation.isLoading) ? true : false

    const copyTask = async () => {
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
                <DoneTaskModal
                    taskId={task.id}
                    trigger={<Button disabled={displayIsDonButon} variant="ghost" className="flex justify-start">Mark as Done</Button>}
                />
                <Button variant="ghost" disabled={mutation.isLoading} className="flex justify-start" onClick={copyTask}>
                    {mutation.isLoading ? "Copying..." : "Make a copy"}
                </Button>
                <DeleteTaskModal
                    taskId={task.id}
                    trigger={<Button variant={"ghost"}
                        disabled={deleteMutation.isLoading} >Delete</Button>}
                />


            </PopoverContent>
        </Popover >
    );
};