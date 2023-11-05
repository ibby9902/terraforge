import React from 'react';
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
import CreateProjectForm from '../forms/create-project-form';

const CreateProjectModal = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
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
        <CreateProjectForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;