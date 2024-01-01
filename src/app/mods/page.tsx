import React from 'react';

import { db } from '@/server/db';
import ModItemCard from '@/components/mod/mod-item-card';
import SearchFilter from './search-filter';

export function generateMetadata() {
  return {
    title: "Search mods - Terraforge"
  };
}

interface Props {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}

const ModsPage = async ({ searchParams } : Props) => {
  const search = typeof searchParams.q === "string" ? searchParams.q : undefined;
  
  const mods = await db.mod.findMany({
    take: 5,
    include: {
      author: true
    },
    where: {
      name: {
        contains: search
      }
    }
  });
  
  return (
    <div className='grid grid-cols-1 md:grid-cols-8 gap-6 pt-16 h-full'>
      <div className='hidden md:flex flex-col bg-accent rounded-2xl md:col-span-2 p-4 h-96'>
        test
      </div>
      <div className='w-full h-full md:col-span-6 rounded-2xl flex flex-col gap-4'>
        <SearchFilter search={search}/>
        {mods.length > 0 ? mods.map(m => (<ModItemCard
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
};

export default ModsPage;