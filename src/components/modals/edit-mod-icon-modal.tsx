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
import { UploadButton } from "@/lib/uploadthing";

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
        <UploadButton
        className='ut-button:text-background ut-button:bg-foreground ut-allowed-content:text-muted-foreground'
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      </DialogContent>
    </Dialog>
  );
};

export default EditModIconModal;