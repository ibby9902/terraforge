"use client";
import React from 'react';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SignInPage = () => {
  return (
    <main className='w-full h-full flex justify-center items-center pt-20'>
      <div className='w-full sm:w-2/3 md:w-1/2 bg-accent p-10 flex flex-col gap-6 rounded-xl'>
      <h1 className='font-bold text-4xl'>Sign in with</h1>
      <div className='w-full flex justify-center items-center gap-10'>
        <div>
          <Button onClick={() => signIn("discord", {
            callbackUrl: "http://localhost:3000"
          })}>Discord</Button>
        </div>
        <div>
          <Button>GitHub</Button>
        </div>
        <div>
          <Button>Google</Button>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <div>
          <Label>Email:</Label>
          <Input/>
        </div>
        <div>
          <Label>Password:</Label>
          <Input/>
        </div>
        <Button onClick={() => alert("Not yet implemented")}>Sign in</Button>
      </div>
    </div>
    </main>
  );
};

export default SignInPage;