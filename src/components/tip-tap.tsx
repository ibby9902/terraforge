"use client";
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import TextAlign from '@tiptap/extension-text-align';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import Dropcursor from '@tiptap/extension-dropcursor';
import Image from '@tiptap/extension-image';
import Paragraph from '@tiptap/extension-paragraph';
import Typography from '@tiptap/extension-typography';
import Link from "@tiptap/extension-link";
import Toolbar from '@/components/toolbar';
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Blockquote from '@tiptap/extension-blockquote';

interface Props {
  description: string;
  onChange: (richText: string) => void;
  disabled: boolean;
}

const TipTap = ({ description, onChange, disabled } : Props) => {
  const editor = useEditor({
    editable: disabled,
    extensions: [
      StarterKit.configure({}),
      Heading.configure({}),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Document,
      Paragraph,
      Text,
      Image,
      Dropcursor,
      Typography,
      Link,
      Blockquote,
      Paragraph,
      BulletList,
      OrderedList,
      ListItem,
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