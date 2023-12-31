import React from 'react';
import Image from 'next/image';
import { BoxIcon, ImagePlusIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface Props {
  icon: string | null;
  className?: string;
}

const EditableModIcon = ({ icon, className }: Props) => {
  return (
    <div className={cn("aspect-square relative group overflow-hidden rounded-2xl", className)}>
      {icon ? <Image
        src={icon}
        alt="editable mod icon"
        fill
      /> : <div className='flex items-center justify-center h-full'>
        <BoxIcon size={84} />
        </div>}
      <div className='h-full opacity-0 group-hover:opacity-50 duration-300 absolute left-0 bottom-0 right-0 z-10 flex justify-center items-center bg-black text-white cursor-pointer'>
        <ImagePlusIcon size={24} />
      </div>
    </div>
  );
};

export default EditableModIcon;