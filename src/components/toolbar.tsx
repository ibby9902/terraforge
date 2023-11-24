"use client";
import React from 'react';
import { type Editor } from "@tiptap/core";
import { Toggle } from '@/components/ui/toggle';
import { 
  AlignLeftIcon, 
  AlignCenterIcon, 
  AlignRightIcon, 
  BoldIcon, 
  Heading1Icon, 
  Heading2Icon, 
  Heading3Icon, 
  ItalicIcon, 
  PilcrowIcon, 
  StrikethroughIcon 
} from 'lucide-react';
interface Props {
  editor: Editor | null;
}

const Toolbar = ({ editor } : Props) => {
  if (!editor) {
    return null;
  }

  return (
    <div className='border border-input bg-background rounded-md p-1 flex gap-2'>
      <Toggle size="sm" pressed={editor.isActive("heading", { level: 1})} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
        <Heading1Icon className='h-4 w-4'/>
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive("heading", { level: 2})} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2Icon className='h-4 w-4'/>
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive("bold")} onPressedChange={() => editor.chain().focus().toggleBold().run()}>
        <BoldIcon className='h-4 w-4'/>
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive({ textAlign: 'left' })} onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}>
        <AlignLeftIcon className='h-4 w-4'/>
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive({ textAlign: 'center' })} onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}>
        <AlignCenterIcon className='h-4 w-4'/>
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive({ textAlign: 'right' })} onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}>
        <AlignRightIcon className='h-4 w-4'/>
      </Toggle>
    </div>
  );
};

export default Toolbar;