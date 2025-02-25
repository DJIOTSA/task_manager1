import { AppLogo } from '@/components/molecules/app-logo'
import { Card, CardContent } from '@/components/ui/card'
import React, { ReactNode } from 'react'

interface AuthLayoutProps {
    children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className='flex flex-col space-y-10 md:justify-center items-center h-screen w-full'>
            <AppLogo />
            <Card className='w-full max-w-sm'>
                <CardContent className='pt-6'>
                    {children}
                </CardContent>
            </Card>
        </div>
    )
}
