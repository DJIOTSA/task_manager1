import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
// import { useRouter } from "next/navigation"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { useRouter } from 'next/navigation';


interface TaskEditPopoverProps {
    taskId: string;
}


export const TaskEditPopover: React.FC<TaskEditPopoverProps> = ({ taskId }) => {
    // const router = useRouter();

    // const { form, onSubmit, mutation } = useLoginForm({
    //     onSuccess: () => {
    //         router.push("/tasks");
    //     }
    // });

    console.log("taskId:", taskId)

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Edit</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Edit Task title</h4>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="width">Title</Label>
                            <Input
                                type="text"
                                id="titleInput"
                                defaultValue=""
                                className="col-span-2 h-8"

                            />
                            <Button>Save</Button>
                        </div>

                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
