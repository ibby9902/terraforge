"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { Textarea } from "@/components/ui/textarea";
import { createProjectSchema } from '@/lib/validation/project';

interface Props {
  setOpen: (val: boolean) => void;
}

const CreateProjectForm = ({ setOpen } : Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      type: "mod",
      name: "",
    }
  });

  const onSubmit = async (values: z.infer<typeof createProjectSchema>) => {
    setLoading(true);

    try {
      const response = await fetch("/api/create-project", {
        method: "post",
        body: JSON.stringify(values),
        headers: {
          'content-type': 'application/json',
        }
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await response.json();
      
      if (response.ok) {
        setOpen(false);
        // `/mod/${data.projectName}`
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        router.push(`/${form.watch("type")}/${data.slug}`);
      }
      else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        setMessage(data.message);
      }

    }
    catch(error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col justify-center gap-4'>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project type</FormLabel>
              <FormControl>
                <div>
                  <ToggleGroup type="single" defaultValue={field.value} {...field} onValueChange={(value) => {
                    if (value) field.onChange(value);
                  }}>
                    <ToggleGroupItem value="mod">Mod</ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} autoComplete='off'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>{loading ? <Loader2 className='animate-spin' /> : "Create"}</Button>
        {message && <div className='w-full flex justify-center items-center'><span className='text-red-600 font-bold'>{message}</span></div>}
      </form>
    </Form>
  );
};

export default CreateProjectForm;