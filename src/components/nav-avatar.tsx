"use client";
import React from 'react';
import { signOut } from 'next-auth/react';
import { LogOut as LogOutIcon, User2 as UserIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

interface Props {
  avatar?: string | null | undefined;
}

const NavAvatar = ({ avatar }: Props) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='hover:cursor-pointer'>
            <AvatarImage src={avatar ?? "https://github.com/shadcn.png"} />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={`/`}>
            <DropdownMenuItem className='hover:cursor-pointer hover:bg-accent'>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='hover:cursor-pointer hover:bg-accent' onClick={() => void signOut()}>
            <LogOutIcon className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavAvatar;