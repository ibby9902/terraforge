import React from 'react';
import Link from 'next/link';
import { RefreshCcw, Download } from 'lucide-react';

interface Props {
  id: string;
  slug: string;
  name: string;
  authorName: string;
  icon?: string;
  summary: string | null;
  numDownloads: number;
} 

const ProjectItemCard = ({ id, slug, name, authorName, icon, summary, numDownloads } : Props) => {
  return (
    <div className='bg-accent rounded-xl grid grid-cols-2 sm:grid-cols-3 p-6 grid-rows-4 sm:grid-rows-3 gap-4'>
      <div className='bg-black aspect-square w-full rounded-2xl row-span-2 sm:row-span-3 col-end-1'>
        {/* TODO: add "icon" */}
      </div>
      <div className='flex items-end gap-2 col-span-2 flex-wrap'>
        <Link href={`/mod/${slug}`} className='font-bold text-2xl'>{name}</Link>
        <span>by</span>
        <Link href={`/user/${authorName}`} className='underline hover:text-gray-500'>{authorName}</Link>
      </div>
      <div></div>
      <div className='col-span-2'><p className=''>{summary ?? <span className='italic'>No summary</span>}</p></div>
      <div></div>
      <div className='flex items-center gap-2'><Download size={16}/><span className='font-bold'>{numDownloads}</span> downloads</div>
      <div></div>
      <div className='flex justify-end items-center gap-2'><RefreshCcw size={16}/>Updated 10 years ago</div>
    </div>
  );
};

export default ProjectItemCard;