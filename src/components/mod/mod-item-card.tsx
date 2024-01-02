import React from 'react';
import Link from 'next/link';
import { formatDistance, format } from "date-fns";

import { RefreshCcw, Download } from 'lucide-react';
import ModIcon from '@/components/mod/mod-icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Props {
  id: string;
  slug: string;
  name: string;
  authorName: string;
  icon: string | null;
  summary: string | null;
  numDownloads: number;
  updateAt: Date;
}

const ModItemCard = ({ id, slug, name, authorName, icon, summary, numDownloads, updateAt }: Props) => {
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
      <div className='flex items-center gap-2 md:col-span-2'><Download size={16} /><span className='font-bold'>{numDownloads}</span> downloads</div>
      <div className='md:col-start-3'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className='hover:cursor-default'>
              <div className='flex items-center gap-2'>
                <RefreshCcw size={16} />{`Updated ${formatDistance(updateAt, new Date())} ago`}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{format(updateAt, "MMMM d, yyyy 'at' h:m a")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ModItemCard;