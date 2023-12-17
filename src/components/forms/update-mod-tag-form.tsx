"use client";
import React, { useState } from 'react';

import { useToast } from "@/components/ui/use-toast";
import type { TAG_TYPE } from '@/lib/validation/project';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

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

  const onClick = async (value: boolean) => {
    setToggled(value);

    const values = {
      modId,
      tagName: tagType,
      action: value ? "add" : "delete",
    }

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

  return (
    <Toggle pressed={toggled} onPressedChange={onClick} className={cn("w-20 rounded-full data-[state=off]:bg-blue-500")}>
      {text}
    </Toggle>
  );
}

export default UpdateModTagForm;