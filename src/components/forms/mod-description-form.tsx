"use client";
import React, { useState } from 'react';
import type { Prisma } from '@prisma/client';
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2Icon } from 'lucide-react';

import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { descriptionSchema } from '@/lib/validation/project';
import TipTap from '@/components/tip-tap';

interface Props {
  canEdit: boolean;
  description: Prisma.JsonValue;
  modId: string;
}

const ModDescriptionForm = ({ canEdit, description, modId } : Props) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast()
  const form = useForm<z.infer<typeof descriptionSchema>>({
    resolver: zodResolver(descriptionSchema),
    mode: "onChange",
    defaultValues: {
      description,
      id: modId
    },
    disabled: !canEdit
  });

  const onSubmit = async (values: z.infer<typeof descriptionSchema>) => {
    setLoading(true);

    try {
      const response = await fetch('/api/mod/update-description', {
        method: "post",
        body: JSON.stringify(values),
        headers: {
          'content-type': 'application/json',
        }
      });

      if (response.ok) {
        toast({
          title: "Successfully updated"
        });
      }
    }
    catch (error) {
      toast({
        title: "Failed to update",
        variant: "destructive"
      });

      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 h-full'>
      <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TipTap description={field.value} onChange={field.onChange} enableEditor={canEdit}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {canEdit && 
        <div className='w-full flex justify-end'>
          <Button>{loading ? <Loader2Icon className='animate-spin' /> : "Save"}</Button>
        </div>}
      </form>
    </Form>
  );
};

export default ModDescriptionForm;