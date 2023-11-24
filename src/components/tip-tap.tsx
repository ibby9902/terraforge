"use client";
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import TextAlign from '@tiptap/extension-text-align';
import Toolbar from './toolbar';

interface Props {
  description: string;
  onChange: (richText: string) => void;
}

const TipTap = ({ description, onChange } : Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold",
          levels: [1]
        }
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: "h-96 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      }
    },
    onUpdate({ editor }) {
      const json = JSON.stringify(editor.getJSON());
      onChange(json);
      console.log(json);
    }
  });

  return (
    <div className='flex flex-col justify-stretch min-h-[250px] gap-4'>
      <Toolbar editor={editor}/>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTap;