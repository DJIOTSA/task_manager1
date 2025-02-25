import { Navbar } from '@/components/molecules/navbar'
import React, { ReactNode } from 'react'

interface DashboardLayoutProps {
    children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div>
            <Navbar />
            <div className="p-4">
                {children}
            </div>
        </div>
    )
}
