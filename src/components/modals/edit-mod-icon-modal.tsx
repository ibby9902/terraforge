"use client";
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

import EditableModIcon from '@/components/mod/editable-mod-icon';
import { UploadButton } from "@/lib/uploadthing";
import { Button } from '@/components/ui/button';

interface Props {
  imageUrl: string;
  modId: string;
}

const EditModIconModal = ({ imageUrl, modId }: Props) => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);
  const [newImageUrl, setNewImageUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onSubmit = async () => {
    setLoading(true);

    if (newImageUrl) {
      try {
        const response = await fetch("/api/mod/update-icon", {
          method: "post",
          body: JSON.stringify({ 
            modId,
            imageUrl: newImageUrl
           }),
          headers: {
            'content-type': 'application/json',
          }
        });

        const data = await response.json();

        if (response.ok) {
          setCurrentImageUrl(newImageUrl);
          toast({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
            title: data.message,
          });
  
          setOpen(false);
        }
        else {
          toast({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
            title: data.message,
            variant: "destructive",
          }); 
        }
      }
      catch (e) {
        toast({
          title: "Failed to save icon",
          variant: "destructive",
        });
        console.error(e);
      }
      finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className='w-24'>
          <EditableModIcon imageUrl={currentImageUrl} />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select an image</DialogTitle>
        </DialogHeader>
        <div className='p-2 w-full flex flex-col gap-4'>
          <UploadButton
            className='ut-button:text-background ut-button:bg-foreground ut-allowed-content:text-muted-foreground'
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setNewImageUrl(res[0]?.url);
              setDisabled(false);
            }}
            onUploadError={(error: Error) => {
              toast({
                title: "Failed to upload image",
                variant: "destructive",
              });
            }}
          />
          <Button disabled={disabled} className='w-full' onClick={onSubmit}>{loading ? <Loader2 className='animate-spin' /> : "Save"}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditModIconModal;