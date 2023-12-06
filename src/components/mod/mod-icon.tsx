import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

interface Props {
  imageUrl: string;
  className?: string;
}

const ModIcon = ({ imageUrl, className } : Props) => {
  return (
    <div className={cn("aspect-square relative overflow-hidden rounded-2xl", className)}>
      <Image
        src={imageUrl}
        alt="mod icon"
        fill
      />
    </div>
  );
};

export default ModIcon;