import React from 'react';
import Link from 'next/link';
import { RefreshCcw, Download } from 'lucide-react';
import ModIcon from '@/components/mod/mod-icon';

interface Props {
  id: string;
  slug: string;
  name: string;
  authorName: string;
  icon: string | null;
  summary: string | null;
  numDownloads: number;
} 

const ModItemCard = ({ id, slug, name, authorName, icon, summary, numDownloads } : Props) => {
  return (
    <div className='bg-accent rounded-xl p-4 grid md:grid-cols-2 gap-4'>
      <Link href={`/mod/${slug}`} className='md:row-span-3 col-end-1 w-28'>
        <ModIcon icon={icon} />
      </Link>
      <div className='flex items-end gap-2 md:col-span-3 flex-wrap'>
        <Link href={`/mod/${slug}`} className='font-bold text-2xl'>{name}</Link>
        <span>by</span>
        <Link href={`/user/${authorName}`} className='underline hover:text-gray-500'>{authorName}</Link>
      </div>
      <div className='md:col-span-3'>
        <p className=''>{summary ?? <span className='italic'>No summary</span>}</p>
      </div>
      <div className='flex items-center gap-2 md:col-span-2'><Download size={16}/><span className='font-bold'>{numDownloads}</span> downloads</div>
      <div className='flex items-center gap-2 md:col-start-3'><RefreshCcw size={16}/>Updated 10 years ago</div>
    </div>
  );
};

export default ModItemCard;