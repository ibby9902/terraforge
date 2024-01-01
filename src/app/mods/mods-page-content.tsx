"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import { Loader2Icon, SearchIcon } from 'lucide-react';

import ModItemCard from '@/components/mod/mod-item-card';
import { Input } from '@/components/ui/input';
import type { ModWithUser } from '@/lib/types/db';
import { useToast } from "@/components/ui/use-toast";

interface Props {
  currentMods: ModWithUser[]
  search?: string;
}

const ModsPageContent = ({ currentMods, search }: Props) => {
  const [mods, setMods] = useState(currentMods);
  const initialRender = useRef(true);
  const { toast } = useToast();
  const [text, setText] = useState(search);
  const [query] = useDebounce(text, 500);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    // TODO: Fix bug - "getMods" gets triggered on mount even though "mods" is already populated from SSR
    if (!query) {
      history.pushState(null, "", '/mods');
      void getMods("api/mods");
    } else {
      history.pushState(null, "", `/mods?q=${query}`);
      void getMods(`api/mods?q=${query}`);
    }
  }, [query]);

  const getMods = async (path: string) => {
    const response = await fetch(path, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      const data = await response.json() as { mods: ModWithUser[] };
      setMods(data.mods);
    }
    else {
      setMods([]);
      toast({
        title: "Failed to get mods",
        variant: "destructive"
      });
    }

    setLoading(false);
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-8 gap-6 pt-16 h-full'>
      <div className='hidden md:flex flex-col bg-accent rounded-2xl md:col-span-2 p-4 h-96'>
        test
      </div>
      <div className='w-full h-full md:col-span-6 rounded-2xl flex flex-col gap-4'>
        <div className='w-full bg-accent rounded-xl p-4 flex items-center justify-between'>
          <div className='relative rounded-md shadow-sm'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <SearchIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </div>
            <Input
              defaultValue={text}
              placeholder='Search mods'
              onChange={e => {
                setLoading(true);
                setText(e.target.value)
              }}
              className='block w-full rounded-md border-0 py-1.5 pl-10 text-foreground focus:ring-2 sm:text-sm sm:leading-6'
            />
          </div>
        </div>
        {loading ? <div className='flex items-center justify-center'>
          <Loader2Icon className='animate-spin' />
        </div> : mods.length > 0 ? mods.map(m => (<ModItemCard
          key={m.id}
          id={m.id}
          slug={m.slug}
          name={m.name}
          authorName={m.author.name ?? "Unknown"}
          summary={m.summary}
          numDownloads={m.downloads}
          icon={m.icon}
        />)) : <div className='flex items-center justify-center'>no mods found</div>}
      </div>
    </div>
  );
}

export default ModsPageContent;