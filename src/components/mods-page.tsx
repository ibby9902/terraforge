"use client";
import React, { useState } from 'react'
import queryString from 'query-string';

import ModItemCard from '@/components/mod/mod-item-card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { ModWithUser } from '@/lib/types/db';
import { SearchIcon, XIcon } from 'lucide-react';

interface Props {
  currentMods: ModWithUser[]
  currentSearchValue: string | undefined;
  currentSortByValue: string | undefined;
  currentShowPerPage: string | undefined;
}

const ModsContent = ({ currentMods, currentSearchValue, currentSortByValue, currentShowPerPage }: Props) => {
  const [mods, setMods] = useState(currentMods);
  const [search, setSearch] = useState(currentSearchValue ?? "");
  const [sortBy, setSortBy] = useState(currentSortByValue ?? "relevance");
  const [showPerPage, setShowPerPage] = useState(currentShowPerPage ?? "20");

  const onSearch = () => {
    // TODO: fetch mods from api

    // temp
    const parsed = queryString.parse(location.search);
    parsed.q = search;
    console.log(parsed);
    location.search = queryString.stringify(parsed);
  };

  const clearUrl = () => {
    location.search = queryString.stringify({});
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-8 gap-6 pt-16 h-full'>
      <div className='hidden md:flex flex-col bg-accent rounded-2xl md:col-span-2 p-4 h-96'>
        test
      </div>
      <div className='w-full h-full md:col-span-6 rounded-2xl flex flex-col gap-4'>
        <div className='w-full bg-accent rounded-xl p-4 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Input className='w-48' placeholder='Search mods' defaultValue={search}  onChange={(e) => setSearch(e.target.value)} />
            <Button onClick={onSearch} className='rounded-full'>
              <SearchIcon size={16}/>
            </Button>
            <Button onClick={clearUrl} className='rounded-full'>
              <XIcon size={16}/>
            </Button>
          </div>
          <div className='flex items-center gap-2'>
            <Label>Sort by</Label>
            <Select defaultValue={sortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="relevance">Relevance</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="download-count">Download Count</SelectItem>
                <SelectItem value="recently-updated">Recently Updated</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex items-center gap-2'>
            <Label>Show per page</Label>
            <Select defaultValue={showPerPage}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={showPerPage} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {mods.length > 0 ? mods.map(m => (<ModItemCard
          key={m.id}
          id={m.id}
          slug={m.slug}
          name={m.name}
          authorName={m.author.name ?? "Unknown"}
          summary={m.summary}
          numDownloads={m.downloads}
          icon={m.icon}
        />)) : <div>no mods</div>}
      </div>
    </div>
  );
}

export default ModsContent;