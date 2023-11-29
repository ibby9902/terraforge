import React from 'react';

import { db } from '@/server/db';
import ProjectItemCard from '@/components/project-item-card';

export function generateMetadata() {
  return {
    title: "Search mods - Terraforge"
  };
}

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
    <div className='grid grid-cols-1 md:grid-cols-8 gap-6 pt-16 h-full'>
      {/* Filter container */}
      <div className='hidden md:flex flex-col bg-accent rounded-2xl md:col-span-2 p-4 h-96'>
        test
      </div>
      
      {/* Mod list container */}
      <div className='w-full h-full md:col-span-6 rounded-2xl flex flex-col gap-4'>
        {mods.map(m => (<ProjectItemCard 
          key={m.id} 
          id={m.id} 
          slug={m.slug} 
          name={m.name} 
          authorName={m.author.name ?? "Unknown"} 
          summary={m.summary} 
          numDownloads={m.downloads}
          icon={m.icon}
        />))}
      </div>
    </div>
  );
};

export default ModsPage;