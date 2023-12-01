"use client";
import React, { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditableModIcon from '@/components/mod/editable-mod-icon';

interface Props {
  imageUrl: string;
}

const EditModIconModal = ({ imageUrl } : Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className='w-24'>
          <EditableModIcon imageUrl={imageUrl} />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select an image</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditModIconModal;