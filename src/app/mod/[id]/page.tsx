import React from 'react';

import ModInfoCard from '@/components/mod/mod-info-card';
import { db } from '@/server/db';  

interface Props {
  params: {
    id: string
  }
}

const ModPage = async ({ params } : Props) => {

  const mod = await db.project.findUnique({
    where: {
      type: "mod",
      id: params.id
    }
  });

  if (!mod) {
    return <div className='w-full flex h-full justify-center items-center'>Mod not found</div>;
  }

  return (
    <div className='flex flex-col lg:grid lg:grid-cols-8 gap-6 pt-16'>
      <ModInfoCard 
        icon={null} 
        name={mod.name}
        description={mod.description}
        downloads={mod.downloads}
        createdAtTimeStamp={mod.createdAt.toLocaleDateString()}
        updatedAtTimeStamp={mod.updatedAt.toLocaleDateString()}
        approved={mod.approved}
        draft={mod.draft}
      />
      
      <div className='w-full lg:col-span-6 flex flex-col gap-4'>
        <div className='bg-accent p-2 rounded-xl'>test</div>
      </div>
    </div>
  );
};

export default ModPage;