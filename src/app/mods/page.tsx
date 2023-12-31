import React from 'react';

import { db } from '@/server/db';
import ModsPage from '@/components/mods-page';

export function generateMetadata() {
  return {
    title: "Search mods - Terraforge"
  };
}

interface Props {
  params: { slug: string };
  searchParams?: Record<string, string | string[] | undefined>;
}

const Page = async ({ searchParams } : Props) => {
  const search = searchParams?.q as string | undefined;
  const sortBy = searchParams?.s as string | undefined;
  const showPerPage = searchParams?.m as string | undefined;

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
  
  return <ModsPage currentMods={mods} currentSearchValue={search} currentSortByValue={sortBy} currentShowPerPage={showPerPage}/>
};

export default Page;