"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';

interface Props {
  modId: string;
}

const DeleteModAlertModal = ({ modId } : Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const onDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/mod/delete', {
        method: "delete",
        body: JSON.stringify({ modId }),
        headers: {
          'content-type': 'application/json',
        }
      });
  
      if (response.ok) {
        setOpen(false);
        toast({
          title: "Mod deleted"
        });
        router.push("/");
      }
      else {
        toast({
          title: "Failed to delete mod",
          variant: "destructive"
        });
      }
    }
    catch (e) {
      console.error(e);
      toast({
        title: "An error occurred",
        variant: "destructive"
      });
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AlertDialog open={open}>
        <AlertDialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this mod.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} className={cn(buttonVariants({ variant: "destructive" }))}>
              {loading ? <Loader2Icon className='animate-spin' /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DeleteModAlertModal;