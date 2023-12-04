"use client";
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import NavAvatar from '@/components/nav-avatar';
import { buttonVariants } from '@/components/ui/button';
import CreateProjectModal from '@/components/modals/create-project-modal';
import ThemeToggleButton from '@/components/theme-toggle-button';

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 inset-x-0 light:bg-gray-100/60 backdrop-blur-md shadow-md z-10 py-4">
      <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
        <div className='flex items-center text-xl gap-8'>
          <Link href="/">
            <span className="font-extrabold text-foreground">Terraforge</span>
          </Link>
          <Link href="/mods" >
            <span className="font-semibold text-primary underline-offset-4 hover:underline">Mods</span>
          </Link>
        </div>
        <div className="flex items-center justify-end space-x-8">
          {status === "authenticated" ? 
            <div className='flex gap-10'>
              <CreateProjectModal />
              <NavAvatar avatar={session.user?.image} username={session.user?.name} />
            </div> : 
            <div className='flex gap-4'>
              <Link href="/sign-in" className={buttonVariants({ variant: "default" })}>Sign in</Link>
              <Link href="/sign-up" className={buttonVariants({ variant: "outline" })}>Sign up</Link>
            </div>}
            <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;