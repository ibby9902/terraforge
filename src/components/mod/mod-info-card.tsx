import React from 'react';
import { RefreshCcw, CalendarDays, Flag, Heart } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

interface Props {
  icon: string | null;
  name: string;
  summary: string | null;
  downloads: number;
  createdAtTimeStamp: string;
  updatedAtTimeStamp: string;
  approved: boolean;
  draft: boolean;
}

const ModInfoCard = ({ icon, name, summary, downloads, createdAtTimeStamp, updatedAtTimeStamp, approved, draft } : Props) => {
  return (
    <div className='md:flex flex-col border-accent border rounded-2xl md:col-span-2 p-4 gap-2'>
        <div className='flex flex-col gap-2'>
          <div className='w-full'>
            {icon ? <div className='bg-black aspect-square w-24 rounded-2xl'>{/* TODO: add "icon" */}</div> : <div className='bg-black aspect-square w-24 rounded-2xl'></div>}
          </div>
          <div className='w-full'>
            <h1 className='font-bold text-3xl'>{name}</h1>
          </div>
          <div className='w-full text-sm'>
            <p className='text-muted-foreground'>{summary ?? <span className='italic'>No summary</span>}</p>
          </div>
        </div>
        <Separator />
        <div className='flex flex-col gap-2'>
          <div className='w-full flex items-center justify-between'>
            <p>Downloads</p>
            <p>{downloads}</p>
          </div>

          <div className='w-full flex items-center text-sm text-muted-foreground'>
            <div className='w-full flex items-center justify-between'>
              <p>Created</p>
              <p>{createdAtTimeStamp}</p>
            </div>
          </div>
          <div className='w-full flex items-center text-sm text-muted-foreground'>
            <div className='w-full flex items-center justify-between'>
              <p>Updated</p>
              <p>{updatedAtTimeStamp}</p>
            </div>
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