"use client";
import React, { useState } from 'react';
import { PlusCircleIcon } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import CreateProjectForm from '@/components/forms/create-project-form';

const CreateProjectModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='hidden sm:block'>
          <div className='flex justify-center items-center gap-2'>
            <PlusCircleIcon />
            <span>Create project</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a project</DialogTitle>
          <DialogDescription>
            New projects are created as drafts and can be found under your profile page.
          </DialogDescription>
        </DialogHeader>
        <CreateProjectForm setOpen={setOpen}/>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;