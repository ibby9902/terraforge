import React from 'react';
import Link from 'next/link';
import { RefreshCcw, Download } from 'lucide-react';

interface Props {
  name: string;
  authorName: string;
  icon?: string;
  description: string | null;
  numDownloads: number;
} 

const ProjectItemCard = ({ name, authorName, icon, description, numDownloads } : Props) => {
  return (
    <div className='bg-accent rounded-xl grid grid-cols-3 p-6 grid-rows-3 gap-4'>
      <div className='bg-black aspect-square w-full rounded-2xl row-span-3 col-end-1'>
        {/* TODO: add "icon" */}
      </div>
      <div className='flex items-end gap-2 col-span-2'>
        <Link href={`/mods/${name}`} className='font-bold text-2xl'>{name}</Link>
        <span>by</span>
        <Link href={`/user/${authorName}`} className='underline hover:text-gray-500'>{authorName}</Link>
      </div>
      <div className='flex justify-end items-center gap-2'><Download size={16}/><span className='font-bold'>{numDownloads}</span> downloads</div>
      <div className='col-span-2'>{description}</div>
      <div></div>
      <div></div>
      <div></div>
      <div className='flex justify-end items-center gap-2'><RefreshCcw size={16}/>Updated 10 years ago</div>
    </div>
  );
};

export default ProjectItemCard;