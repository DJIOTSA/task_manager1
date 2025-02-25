import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TaskEditPopoverProps {
  taskId: string;
}

export const TaskEditPopover: React.FC<TaskEditPopoverProps> = ({ taskId }) => {
  console.log("taskId:", taskId);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="flex justify-start">...</Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="grid gap-4">
          <Button variant="ghost" className="flex justify-start">edit</Button>
        </div>
        <div className="grid gap-4">
          <Button variant="ghost" className="flex justify-start">Mark as Done</Button>
        </div>
        <div className="grid gap-4">
          <Button variant="ghost" className="flex justify-start">Delete</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
