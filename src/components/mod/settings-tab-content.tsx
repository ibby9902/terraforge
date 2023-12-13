"use client"
import React from 'react';

import UpdateModSummaryForm from '@/components/forms/update-mod-summary-form';
import UpdateModTagsForm from '@/components/forms/update-mod-tags-form';
import type { ExtendedTag } from '@/lib/types/db';

interface Props {
  modId: string;
  summary: string;
  tags: ExtendedTag[];
}

const SettingsTabContent = ({ modId, summary, tags }: Props) => {  
  return (
    <div>
      <UpdateModSummaryForm existingSummary={summary}/>
      <UpdateModTagsForm modId={modId} tags={tags}/>
    </div>
  );
};

export default SettingsTabContent;