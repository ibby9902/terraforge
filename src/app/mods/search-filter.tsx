"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';

const SearchFilter = ({ search }: { search?: string }) => {
  const router = useRouter();
  const initialRender = useRef(true);
  const [text, setText] = useState(search);
  const [query] = useDebounce(text, 500);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }

    if (!query) {
      router.push(`/mods`)
    } else {
      router.push(`/mods?q=${query}`)
    }
  }, [query]);

  return (
    <div className='w-full bg-accent rounded-xl p-4 flex items-center justify-between'>
      <div className='relative rounded-md shadow-sm'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <SearchIcon
            className='h-5 w-5 text-muted-foreground'
            aria-hidden='true'
          />
        </div>
        <Input
          defaultValue={text}
          placeholder='Search mods'
          onChange={e => setText(e.target.value)}
          className='block w-full rounded-md border-0 py-1.5 pl-10 text-foreground focus:ring-2 sm:text-sm sm:leading-6'
        />
      </div>
    </div>
  )
}

export default SearchFilter;