"use client";
import React, { useState } from 'react';
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from 'lucide-react';

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

interface Props {
  existingSummary: string;
}

const UpdateModSummaryForm = ({ existingSummary }: Props) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof updateModSummarySchema>>({
    resolver: zodResolver(updateModSummarySchema),
    defaultValues: {
      summary: existingSummary
    }
  });

  const onSubmit = () => {
    //
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
          <Button disabled={existingSummary === form.watch("summary")}>{loading ? <Loader2 className='animate-spin' /> : "Save"}</Button>
        </div>
      </form>
    </Form>
  );
}

export default UpdateModSummaryForm