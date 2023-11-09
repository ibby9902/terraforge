import React from 'react';
import { RefreshCcw, Download, CalendarDays, Flag, Heart } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

interface Props {
  icon: string | null;
  name: string;
  description: string | null;
  downloads: number;
  createdAtTimeStamp: string;
  updatedAtTimeStamp: string;
  approved: boolean;
  draft: boolean;
}

const ModInfoCard = ({ icon, name, description, downloads, createdAtTimeStamp, updatedAtTimeStamp, approved, draft } : Props) => {
  return (
    <div className='md:flex flex-col bg-accent rounded-2xl md:col-span-2 p-4 gap-2'>
        <div className='flex flex-col gap-2'>
          <div className='w-full'>
            {icon ? <div className='bg-black aspect-square w-24 rounded-2xl'>{/* TODO: add "icon" */}</div> : <div className='bg-black aspect-square w-24 rounded-2xl'></div>}
          </div>
          <div className='w-full'>
            <h1 className='font-bold text-3xl'>{name}</h1>
          </div>
          <div className='w-full'>
            <p className=''>{description ?? <span className='italic'>No description</span>}</p>
          </div>
        </div>
        <Separator />
        <div className='flex flex-col gap-2'>
          <div className='w-full flex items-center gap-2'>
            <Download size={24}/>
            <div className=''><span className='font-bold text-2xl'>{downloads}</span>{" downloads"}</div>
          </div>

          <div className='w-full flex items-center gap-2'>
            <CalendarDays size={16}/>
            <div className='text-sm'><span className=''>{"Created: "}{createdAtTimeStamp}</span></div>
          </div>
          <div className='w-full flex items-center gap-2'>
            <RefreshCcw size={16}/>
            <div className='text-sm'><span className=''>{"Updated: "}{updatedAtTimeStamp}</span></div>
          </div>
        </div>
        <Separator/>
        <div className='w-full flex gap-4 pt-2'>
          <Button className='flex gap-2'><Flag size={16}/>Report</Button>
          <Button className='flex gap-2'><Heart size={16}/>Follow</Button>
        </div>
      </div>
  );
};

export default ModInfoCard;