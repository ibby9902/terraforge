import React from 'react';

import { db } from '@/server/db';
import ModsPageContent from './mods-page-content';

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
  
  return <ModsPageContent currentMods={mods} search={search} />
};

export default ModsPage;