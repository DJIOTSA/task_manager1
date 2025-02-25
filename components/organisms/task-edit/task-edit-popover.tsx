import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        <Button variant="outline">...</Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="grid gap-4">
          <Button variant="outline">edit</Button>
        </div>
        <div className="grid gap-4">
          <Button variant="outline">Mark as Done</Button>
        </div>
        <div className="grid gap-4">
          <Button variant="outline">Delete</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
