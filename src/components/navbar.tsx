"use client";
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import NavAvatar from '@/components/nav-avatar';
import { buttonVariants } from '@/components/ui/button';

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 inset-x-0 bg-gray-100/60 backdrop-blur-md shadow-md z-10 py-4">
      <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
        <div className='flex items-center text-xl'>
          <div className='sm:hidden'>
          </div>
          <Link href="/">
            <span className="font-extrabold text-foreground">Terraforge</span>
          </Link>
        </div>
        <div className="flex items-center justify-end space-x-8">
          {status === "authenticated" ? <NavAvatar avatar={session.user?.image} /> : 
            <div className='flex gap-4'>
              <Link href="/sign-in" className={buttonVariants({ variant: "default" })}>Sign in</Link>
              <Link href="/sign-up" className={buttonVariants({ variant: "outline" })}>Sign up</Link>
            </div>}
        </div>
      </div>
    </header>
  );
};

export default Navbar;