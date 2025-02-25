import React from 'react'
import { AppLogo } from '../app-logo'
import { UserProfileMenu } from '../user-profile-menu'

export function Navbar() {
    return (
        <nav className='flex justify-between p-4 items-center '>
            <AppLogo />
            <UserProfileMenu />
        </nav>
    )
}
