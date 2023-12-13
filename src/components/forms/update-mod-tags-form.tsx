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
  FormLabel
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { TAG_TYPE, updateModTagsSchema } from '@/lib/validation/project';
import type { ExtendedTag } from '@/lib/types/db';
import { useToast } from "@/components/ui/use-toast";

interface Props {
  modId: string;
  tags: ExtendedTag[]
}

const items = [
  {
    id: TAG_TYPE.Content,
    label: "Content",
  },
  {
    id: TAG_TYPE.Library,
    label: "Library",
  },
  {
    id: TAG_TYPE.QualityOfLife,
    label: "Quality of Life",
  },
  {
    id: TAG_TYPE.GameplayTweaks,
    label: "Gameplay Tweaks",
  },
  {
    id: TAG_TYPE.VisualTweaks,
    label: "Visual Tweaks",
  },
  {
    id: TAG_TYPE.AudioTweaks,
    label: "Audio Tweaks",
  },
  {
    id: TAG_TYPE.WorldGen,
    label: "World Gen",
  },
] as const;

const UpdateModTagsForm = ({ modId, tags }: Props) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof updateModTagsSchema>>({
    resolver: zodResolver(updateModTagsSchema),
    defaultValues: {
      modId,
      tags: tags.map(e => e.tag.name)
    }
  });

  const onSubmit = async (values: z.infer<typeof updateModTagsSchema>) => {
    setLoading(true);

    try {
      const response = await fetch('/api/mod/update-tags', {
        method: "post",
        body: JSON.stringify(values),
        headers: {
          'content-type': 'application/json',
        }
      });

      //const data = await response.json();

      if (response.ok) {
        toast({
          title: "Tags updated"
        });
      }
      else {
        toast({
          title: "Failed to update mod tags",
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
    <>
      <h1 className='text-2xl font-bold'>Tags</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2 pt-2'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2'>
            {items.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name="tags"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.id])
                              : field.onChange(
                                field.value?.filter(
                                  (value) => value !== (item.id as string) 
                                )
                              )
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
          </div>
          <div className='flex justify-end'>
            <Button disabled={Object.keys(form.formState.dirtyFields).length === 0}>{loading ? <Loader2 className='animate-spin' /> : "Save"}</Button>
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