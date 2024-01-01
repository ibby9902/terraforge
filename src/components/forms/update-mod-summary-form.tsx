"use client";
import React, { useState } from 'react';
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { updateModSummarySchema } from '@/lib/validation/project';
import { useToast } from "@/components/ui/use-toast";

interface Props {
  modId: string;
  existingSummary: string;
}

const UpdateModSummaryForm = ({ modId, existingSummary }: Props) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof updateModSummarySchema>>({
    resolver: zodResolver(updateModSummarySchema),
    defaultValues: {
      modId,
      summary: existingSummary
    }
  });

  const onSubmit = async (values: z.infer<typeof updateModSummarySchema>) => {
    setLoading(true);

    try {
      const response = await fetch('/api/mod/update-summary', {
        method: "post",
        body: JSON.stringify(values),
        headers: {
          'content-type': 'application/json',
        }
      });

      if (response.ok) {
        toast({
          title: "Summary updated"
        });
        router.refresh();
      }
      else {
        toast({
          title: "Failed to update summary",
          variant: "destructive"
        });
      }
    }
    catch (error) {
      toast({
        title: "An unexpected error occurred",
        variant: "destructive"
      });

      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-2xl font-bold'>Summary</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end'>
          <Button disabled={Object.keys(form.formState.dirtyFields).length === 0}>{loading ? <Loader2 className='animate-spin' /> : "Save"}</Button>
        </div>
      </form>
    </Form>
  );
}

export default UpdateModSummaryForm