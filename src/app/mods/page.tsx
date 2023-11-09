import React from 'react';

import { db } from '@/server/db';
import ProjectItemCard from '@/components/project-item-card';

const ModsPage = async () => {
  const mods = await db.project.findMany({
    take: 5,
    where: {
      type: "mod"
    },
    include: {
      author: true
    }
  });

  return (
    <div className='grid grid-cols-1 md:grid-cols-8 gap-6 pt-16'>
      {/* Options container */}
      <div className='hidden md:flex flex-col bg-accent rounded-2xl h-full md:col-span-2'>
        test
      </div>
      
      {/* Mod list container */}
      <div className='w-full h-full md:col-span-6 rounded-2xl flex flex-col gap-4'>
        {mods.map(m => (<ProjectItemCard key={m.id} id={m.id} name={m.name} authorName={m.author.name ?? "ibby"} description={m.description} numDownloads={m.downloads}/>))}
      </div>
    </div>
  );
};

export default ModsPage;