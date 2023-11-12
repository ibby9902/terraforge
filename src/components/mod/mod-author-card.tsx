import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  avatar: string | null;
  name: string | null;
}

const ModAuthorCard = ({ avatar, name } : Props) => {
  return (
    <div className='md:flex flex-col bg-accent rounded-2xl md:col-span-2 p-4 gap-2'>
      <h1 className='text-2xl font-bold'>Created by</h1>
      <Link href={`/user/${name}`} className='flex items-center gap-4 hover:bg-muted-foreground ease-in-out duration-100 rounded-xl p-2'>
        <div className='relative aspect-square w-12 h-12'>
          <Image
            src={avatar ?? "https://github.com/ibby9902"}
            alt="Author profile image"
            fill
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