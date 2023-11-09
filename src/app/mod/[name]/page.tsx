import React from 'react';
import { RefreshCcw, Download, CalendarDays, Flag, Heart } from 'lucide-react';

import { db } from '@/server/db';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import ModInfoCard from '@/components/mod/mod-info-card';

interface Props {
  params: {
    name: string
  }
}

const ModPage = async ({ params } : Props) => {

  const mod = await db.project.findUnique({
    where: {
      type: "mod",
      name: params.name
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