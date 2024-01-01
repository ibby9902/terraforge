"use client"
import React from 'react';

import UpdateModSummaryForm from '@/components/forms/update-mod-summary-form';
import UpdateModTagForm from '@/components/forms/update-mod-tag-form';
import type { ExtendedTag } from '@/lib/types/db';
import { TAG_TYPE } from '@/lib/validation/project';
import { Label } from '@/components/ui/label';
import DeleteModAlertModal from '../modals/delete-mod-alert-modal';
import { Separator } from '../ui/separator';


interface Props {
  modId: string;
  summary: string;
  tags: ExtendedTag[];
}

const SettingsTabContent = ({ modId, summary, tags }: Props) => {
  return (
    <div className='flex flex-col'>
      <UpdateModSummaryForm modId={modId} existingSummary={summary} />
      <div className="flex flex-col gap-4">
        <Label className="text-2xl font-bold">Tags</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          <UpdateModTagForm
            modId={modId}
            isActive={tags.some(x => x.tag.name == TAG_TYPE.Content)}
            tagType={TAG_TYPE.Content}
            text="Content"
            icon=""
          />
          <UpdateModTagForm
            modId={modId}
            isActive={tags.some(x => x.tag.name == TAG_TYPE.Library)}
            tagType={TAG_TYPE.Library}
            text="Library"
            icon=""
          />
          <UpdateModTagForm
            modId={modId}
            isActive={tags.some(x => x.tag.name == TAG_TYPE.QualityOfLife)}
            tagType={TAG_TYPE.QualityOfLife}
            text="Quality Of Life"
            icon=""
          />
          <UpdateModTagForm
            modId={modId}
            isActive={tags.some(x => x.tag.name == TAG_TYPE.GameplayTweaks)}
            tagType={TAG_TYPE.GameplayTweaks}
            text="Gameplay Tweaks"
            icon=""
          />
          <UpdateModTagForm
            modId={modId}
            isActive={tags.some(x => x.tag.name == TAG_TYPE.VisualTweaks)}
            tagType={TAG_TYPE.VisualTweaks}
            text="Visual Tweaks"
            icon=""
          />
          <UpdateModTagForm
            modId={modId}
            isActive={tags.some(x => x.tag.name == TAG_TYPE.AudioTweaks)}
            tagType={TAG_TYPE.AudioTweaks}
            text="Audio Tweaks"
            icon=""
          />
          <UpdateModTagForm
            modId={modId}
            isActive={tags.some(x => x.tag.name == TAG_TYPE.WorldGen)}
            tagType={TAG_TYPE.WorldGen}
            text="World Gen"
            icon=""
          />
        </div>
      </div>
      <div className='w-full flex justify-end pt-4'>
        <DeleteModAlertModal modId={modId}/>
      </div>
    </div>
  );
};

export default SettingsTabContent;