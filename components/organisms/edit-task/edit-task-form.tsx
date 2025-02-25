import React, { ReactNode, useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import useEditTask from './use-edit-task';
import { editTaskPayload } from "@/lib/types/tasks";

interface Props {
    trigger: ReactNode;
    taskId?: string;
    payload?: Partial<editTaskPayload>
}

export function EditTaskForm({ trigger, taskId, payload }: Props) {
    const [isOpen, setIsOpen] = useState(false)

    const { form, onSubmit, mutation } = useEditTask({
        onSuccess: () => {
            setIsOpen(false);
        },
        payload,
        taskId,
    });

    const submitButtonText = taskId ? "Update" : "Create";
    const submittingButtonText = taskId ? "Updating..." : "Creating...";

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{taskId ? "Update task" : "Create new task"}</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button disabled={mutation.isLoading} type="submit">
                            {mutation.isLoading ? submittingButtonText : submitButtonText}

                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
