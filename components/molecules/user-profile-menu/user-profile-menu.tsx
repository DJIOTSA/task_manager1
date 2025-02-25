"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { currentUser, logOut, currentUserName } from '@/lib/handlers/auth';
import { useRouter } from "next/navigation"

export function UserProfileMenu() {
    const router = useRouter()
    const handleLogOut = () => {
        logOut();
        router.push('/auth/login')
    }

    const userName = currentUser().name

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                    <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
                    <span className="sr-only">Toggle user menu</span>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem className="font-bold text-lg">{userName}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="#" className="block w-full text-left" prefetch={false}>
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Button onClick={handleLogOut} variant="outline" className="block w-full text-left">
                        Logout
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}