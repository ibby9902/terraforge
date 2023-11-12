import React from 'react';

import ModInfoCard from '@/components/mod/mod-info-card';
import { db } from '@/server/db';  
import ModAuthorCard from '@/components/mod/mod-author-card';

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params } : Props) {
  const mod = await db.project.findUnique({
    where: {
      type: "mod",
      slug: params.slug
    }
  });
  return {
    title: `${mod?.name} - Terraforge`
  };
}

const ModPage = async ({ params } : Props) => {

  const mod = await db.project.findUnique({
    where: {
      type: "mod",
      slug: params.slug
    },
    include: {
      author: true
    }
  });

  if (!mod) {
    return <div className='w-full flex h-full justify-center items-center'>Mod not found</div>;
  }

  return (
    <div className='flex flex-col lg:grid lg:grid-cols-8 gap-6 pt-16'>
      <div className='w-full lg:col-span-6 flex flex-col gap-4'>
        <div className='bg-accent p-2 rounded-xl'>test</div>
      </div>
      <ModInfoCard 
        icon={null} 
        name={mod.name}
        summary={mod.summary}
        downloads={mod.downloads}
        createdAtTimeStamp={mod.createdAt.toLocaleDateString()}
        updatedAtTimeStamp={mod.updatedAt.toLocaleDateString()}
        approved={mod.approved}
        draft={mod.draft}
      />
      <ModAuthorCard className="lg:col-start-7" name={mod.author.name} avatar={mod.author.image} />
    </div>
  );
};

export default ModPage;