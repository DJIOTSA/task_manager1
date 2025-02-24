import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function TaskListSkeleton() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">
                        <Skeleton className="h-4 w-[60px]" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-4 w-[64px]" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-4 w-[80px]" />
                    </TableHead>
                    <TableHead className="text-right">
                        <Skeleton className="h-4 w-[50px] ml-auto" />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Skeleton className="h-4 w-[80px]" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-[100px]" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-[100px]" />
                        </TableCell>
                        <TableCell className="text-right">
                            <Skeleton className="h-4 w-[70px] ml-auto" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

