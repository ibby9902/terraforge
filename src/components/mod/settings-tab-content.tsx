"use client"
import React, { FormEvent, useState } from 'react';
import type { Tag } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { TAG_TYPE } from '@/lib/validation/project';
import ModTagCheckbox from '../mod-tag-checkbox';
import UpdateModSummaryForm from '../forms/update-mod-summary-form';
import UpdateModTagsForm from '../forms/update-mod-tags-form';

interface Props {
  summary: string;
  tags: Tag[];
}

const SettingsTabContent = ({ summary, tags }: Props) => {  
  return (
    <div>
      <UpdateModSummaryForm existingSummary={summary}/>
      <UpdateModTagsForm tags={tags.map(t => t.name)}/>
    </div>
  );
};

export default SettingsTabContent;