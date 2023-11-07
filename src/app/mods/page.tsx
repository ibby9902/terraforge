import { db } from '@/server/db';
import React from 'react';

const ModsPage = async () => {
  const mods = await db.project.findMany({
    take: 5,
    where: {
      type: "mod"
    }
  });

  return (
    <div className='w-full h-full'>
      {mods.map(m => (<div key={m.id}>{m.name}</div>))}
    </div>
  );
};

export default ModsPage;