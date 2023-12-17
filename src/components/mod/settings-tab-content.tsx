"use client"
import React from 'react';

import UpdateModSummaryForm from '@/components/forms/update-mod-summary-form';
import UpdateModTagForm from '@/components/forms/update-mod-tag-form';
import type { ExtendedTag } from '@/lib/types/db';
import { TAG_TYPE } from '@/lib/validation/project';

interface Props {
  modId: string;
  summary: string;
  tags: ExtendedTag[];
}

const SettingsTabContent = ({ modId, summary, tags }: Props) => {
  return (
    <div>
      <UpdateModSummaryForm modId={modId} existingSummary={summary}/>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2'>
        <UpdateModTagForm 
          modId={modId} 
          isActive={tags.some(x => x.tag.name == TAG_TYPE.Content)} 
          tagType={TAG_TYPE.Content} 
          text='Content' 
          icon="" 
        />
      </div>
    </div>
  );
};

export default SettingsTabContent;