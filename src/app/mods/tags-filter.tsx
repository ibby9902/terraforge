"use client";
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { TAG_TYPE } from '@/lib/validation/project';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const items = [
  {
    id: TAG_TYPE.Content,
    text: "Content"
  },
  {
    id: TAG_TYPE.Library,
    text: "Library"
  },
  {
    id: TAG_TYPE.QualityOfLife,
    text: "Quality Of Life"
  },
  {
    id: TAG_TYPE.GameplayTweaks,
    text: "Gameplay Tweaks"
  },
  {
    id: TAG_TYPE.AudioTweaks,
    text: "Audio Tweaks"
  },
  {
    id: TAG_TYPE.VisualTweaks,
    text: "Visual Tweaks"
  },
  {
    id: TAG_TYPE.WorldGen,
    text: "World Gen"
  }
];

interface Props {
  currentTags?: string[]
}

const TagsFilter = ({ currentTags } : Props) => {
  const initialRender = useRef(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeTags, setActiveTags] = useState<string[]>(currentTags ?? []);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const deleteQueryString = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams);
      params.delete(key);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (activeTags.length === 0) {
      router.push(pathname + '?' + deleteQueryString('t'));
    }
    else {
      router.push(pathname + '?' + createQueryString('t', activeTags.join(",")));
    }
  }, [activeTags])

  const handleCheckboxChange = (value: string) => {
    if (activeTags.includes(value)) {
      setActiveTags(activeTags.filter(item => item !== value));
    }
    else {
      setActiveTags((prev) => [...prev, value]);
    }
  };

  return (
    <div className='hidden md:flex flex-col bg-accent rounded-2xl md:col-span-2 p-4 h-96 gap-4'>
      <Button onClick={() => setActiveTags([])} disabled={!activeTags.length}>Clear filters</Button>
      <h1 className='font-bold'>Tags</h1>
      {items.map(i => (
        <div key={i.id} className='flex items-center gap-2'>
          <Checkbox id={i.id} checked={activeTags.includes(i.id)} onCheckedChange={() => handleCheckboxChange(i.id)} />
          <Label htmlFor={i.id}>{i.text}</Label>
        </div>
      ))}
    </div>
  );
}

export default TagsFilter;