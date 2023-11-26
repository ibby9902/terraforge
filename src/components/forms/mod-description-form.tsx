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
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { descriptionSchema } from '@/lib/validation/project';
import TipTap from '@/components/tip-tap';

interface Props {
  disabled: boolean;
}

const ModDescriptionForm = ({ disabled } : Props) => {
  const form = useForm<z.infer<typeof descriptionSchema>>({
    resolver: zodResolver(descriptionSchema),
    mode: "onChange",
    defaultValues: {
      description: ""
    },
    disabled
  });

  const onSubmit = (values: z.infer<typeof descriptionSchema>) => {
    alert(values.description)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TipTap description={field.value} onChange={field.onChange} disabled/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='w-full flex justify-end'>
          <Button>Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default ModDescriptionForm;