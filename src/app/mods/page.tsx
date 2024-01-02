import React from 'react';

import { db } from '@/server/db';
import ModItemCard from '@/components/mod/mod-item-card';
import SearchFilter from './search-filter';
import TagsFilter from './tags-filter';

export function generateMetadata() {
  return {
    title: "Search mods - Terraforge"
  };
}

interface Props {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}

const ModsPage = async ({ searchParams }: Props) => {
  const search = typeof searchParams.q === "string" ? searchParams.q : undefined;
  const page = typeof searchParams.p === "string" ? Number(searchParams.p) : 1;
  const limit = typeof searchParams.l === "string" ? Number(searchParams.l) : 10;
  const csvTags = typeof searchParams.t === "string" ? searchParams.t : undefined;
  let tags: string[] | undefined;

  if (csvTags) {
    tags = csvTags.split(",");
  }

  const options = {
    skip: (page - 1) * limit,
    take: limit,
    include: {
      author: true
    },
    where: {
      name: {
        contains: search
      },
      tags: {}
    }
  };

  if (tags) {
    options.where = {
      name: {
        contains: search
      },
      tags:{
        some: {
          tag: {
            name: {
              in: tags
            }
          }
        }
      }
    }
  }

  const mods = await db.mod.findMany(options);

  const totalMods = await db.mod.count();

  return (
    <div className='grid grid-cols-1 md:grid-cols-8 gap-6 pt-16 h-full'>
      <TagsFilter currentTags={tags}/>
      <div className='w-full h-full md:col-span-6 rounded-2xl'>
        <SearchFilter search={search} page={page} limit={limit} totalMods={totalMods} />
        <div className='flex flex-col gap-4 pb-5 min-h-screen'>
          {mods.length > 0 ? mods.map(m => (<ModItemCard
            key={m.id}
            id={m.id}
            slug={m.slug}
            name={m.name}
            authorName={m.author.name ?? "Unknown"}
            summary={m.summary}
            numDownloads={m.downloads}
            icon={m.icon}
            updateAt={m.updatedAt}
          />)) : <div className='flex items-center justify-center'>no mods found</div>}
        </div>
      </div>
    </div>
  );
};

export default ModsPage;