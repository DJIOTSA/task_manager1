import React, { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useDeleteTask } from './use-delete-task';

interface Props {
    trigger: ReactNode;
    taskId: string;
}

export function DeleteTaskModal({ trigger, taskId }: Props) {
    const [isOpen, setIsOpen] = useState(false)

    const { onSubmit, mutation } = useDeleteTask({
        onSuccess: () => {
            setIsOpen(false);
        },
        taskId,
    });


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{"Do you want to delete this task?"}</DialogTitle>
                </DialogHeader>
                <Button onClick={onSubmit} disabled={mutation.isLoading} type="submit">
                    {mutation.isLoading ? "Deleting..." : "Delete"}
                </Button>

            </DialogContent>
        </Dialog>
    )
}
