import React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  issueLink: string | null;
  sourceLink: string | null;
  wikiLink: string | null;
  discordLink: string | null;
}

const ExternalResourcesCard = ( { className, issueLink, sourceLink, wikiLink, discordLink } : Props) => {
  if (!issueLink && !sourceLink && !wikiLink && !discordLink) {
    return null;
  }
  
  return (
    <div className={cn(className, "md:flex flex-col border-accent border rounded-2xl md:col-span-2 p-4 gap-2")}>
      <h1 className='text-xl font-bold'>External resources</h1>
      <div className='grid grid-cols-3 gap-y-2'>
        {issueLink && <Link href={issueLink}>Issues</Link>}
        {sourceLink && <Link href={sourceLink}>Source</Link>}
        {wikiLink && <Link href={wikiLink}>Wiki</Link>}
        {discordLink && <Link href={discordLink}>Discord</Link>}
      </div>
    </div>
  );
};

export default ExternalResourcesCard;