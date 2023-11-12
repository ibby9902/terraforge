import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  name: string | null;
  avatar: string | null;
}

const ModAuthorCard = ({ className, avatar, name } : Props) => {
  return (
    <div className={cn(className, "md:flex flex-col bg-accent rounded-2xl md:col-span-2 p-4 gap-2")}>
      <h1 className='text-2xl font-bold'>Created by</h1>
      <Link href={`/user/${name}`} className='flex items-center gap-4 hover:bg-muted-foreground ease-in-out duration-100 rounded-xl p-2'>
        <div className='relative aspect-square'>
          <Image
            src={avatar ?? "https://github.com/ibby9902"}
            alt="Author profile image"
            width={48}
            height={48}
            style={{ objectFit: "contain" }}
            className='rounded-full'
          />
        </div>
        <span className='font-bold'>{name}</span>
      </Link>
    </div>
  );
};

export default ModAuthorCard;