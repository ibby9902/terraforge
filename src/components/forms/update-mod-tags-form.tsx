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
import { TAG_TYPE, updateModTagsSchema } from '@/lib/validation/project';
import { Checkbox } from '../ui/checkbox';
import ModTagCheckbox from '../mod-tag-checkbox';
import { Tag } from '@prisma/client';

interface Props {
  tags: string[]
}

const UpdateModTagsForm = ({ tags }: Props) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof updateModTagsSchema>>({
    resolver: zodResolver(updateModTagsSchema),
    defaultValues: {
      content: tags.some(x => x === TAG_TYPE.Content)
    }
  });

  const onSubmit = () => {
    //
  }

  return (
    <>
      <h1 className='text-2xl font-bold'>Tags</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2 pt-2'>
          <div className='grid grid-cols-4 grid-rows-3'>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ModTagCheckbox id="mod-settings-content-tag" labelText="Content" checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex justify-end'>
            <Button>{loading ? <Loader2 className='animate-spin' /> : "Save"}</Button>
          </div>
        </form>
      </Form>
    </>
  );
}

/*
<div className='grid grid-cols-4 grid-rows-3'>
          <ModTagCheckbox id="mod-settings-content-tag" labelText="Content" isChecked={tags.some(x => x === TAG_TYPE.Content)} onCheckedChange={onCheckedChange}/>
          
        </div>
        <div className='flex justify-end'>
          <Button>Save</Button>
        </div>
  <ModTagCheckbox id="mod-settings-library-tag" labelText="Library" isChecked={tags.some(x => x === TAG_TYPE.Library)} onCheckedChange={onCheckedChange}/>
          <ModTagCheckbox id="mod-settings-qol-tag" labelText="Quality of Life" isChecked={tags.some(x => x === TAG_TYPE.QualityOfLife)} onCheckedChange={onCheckedChange}/>
          <ModTagCheckbox id="mod-settings-gameplay-tweaks-tag" labelText="Gameplay Tweaks" isChecked={tags.some(x => x === TAG_TYPE.GameplayTweaks)} onCheckedChange={onCheckedChange}/>
          <ModTagCheckbox id="mod-settings-visual-tweaks-tag" labelText="Visual Tweaks" isChecked={tags.some(x => x=== TAG_TYPE.VisualTweaks)} onCheckedChange={onCheckedChange}/>
          <ModTagCheckbox id="mod-settings-audio-tweaks-tag" labelText="Audio Tweaks" isChecked={tags.some(x => x === TAG_TYPE.AudioTweaks)} onCheckedChange={onCheckedChange}/>
          <ModTagCheckbox id="mod-settings-world-gen-tag" labelText="World Gen" isChecked={tags.some(x => x === TAG_TYPE.WorldGen)} onCheckedChange={onCheckedChange}/>
*/

export default UpdateModTagsForm