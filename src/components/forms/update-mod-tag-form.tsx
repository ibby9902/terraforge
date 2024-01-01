"use client";
import React, { useState } from 'react';
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';

import { useToast } from "@/components/ui/use-toast";
import type { TAG_TYPE } from '@/lib/validation/project';
import {
  Form,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { updateModTagSchema } from '@/lib/validation/project';
import type { CheckedState } from '@radix-ui/react-checkbox';

interface Props {
  modId: string;
  isActive: boolean;
  tagType: TAG_TYPE;
  text: string;
  icon: string;
  className?: string;
}

const UpdateModTagForm = ({ modId, isActive, tagType, text, icon, className }: Props) => {
  const [toggled, setToggled] = useState(isActive);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof updateModTagSchema>>({
    resolver: zodResolver(updateModTagSchema),
    defaultValues: {
      modId,
      tagName: tagType,
      action: isActive ? "delete" : "add",
    }
  });

  const onSubmit = async (values: z.infer<typeof updateModTagSchema>) => {

    try {
      const response = await fetch("/api/mod/update-tag", {
        method: "post",
        body: JSON.stringify(values),
        headers: {
          'content-type': 'application/json',
        }
      });
      
      const data = await response.json() as { message: string };
      
      if (response.ok) {
        toast({
          title: data.message,
        });
        router.refresh();
      }
      else {
        toast({
          title: data.message,
          variant: "destructive"
        });
      }
    }
    catch(error) {
      console.log(error);

      toast({
        title: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  }

  const onCheckedChange = (checked: CheckedState) => {
    const value = Boolean(checked);
    setToggled(value);

    value  ? form.setValue("action", "add") : form.setValue("action", "delete");

    void form.handleSubmit(onSubmit)();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2' >
        <FormField
          control={form.control}
          name="action"
          render={({ field }) => (
            <FormItem>
              <div className='flex gap-2'>
                <Checkbox {...field} checked={toggled} onCheckedChange={onCheckedChange} />
                <Label>{text}</Label>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default UpdateModTagForm;