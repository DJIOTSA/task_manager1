import React, { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useDoneTask } from './use-done-task';

interface Props {
    trigger: ReactNode;
    taskId: string;
}

export function DoneTaskModal({ trigger, taskId }: Props) {
    const [isOpen, setIsOpen] = useState(false)

    const { onSubmit, mutation } = useDoneTask({
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
                    <DialogTitle>{"Set As Done"}</DialogTitle>
                </DialogHeader>
                <Button onClick={onSubmit} disabled={mutation.isLoading} type="submit">
                    {mutation.isLoading ? "Setting as Completed..." : "Set as Completed"}
                </Button>

            </DialogContent>
        </Dialog>
    )
}
