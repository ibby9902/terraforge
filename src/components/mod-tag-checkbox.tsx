import React, { FormEvent } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Props {
  id: string;
  labelText: string;
  checked: boolean;
  onCheckedChange: () => void;
}

const ModTagCheckbox = ({ id, labelText, checked, onCheckedChange } : Props) => {
  return (
    <div className='flex items-center gap-2'>
      <Checkbox id={id} defaultChecked={checked} onCheckedChange={onCheckedChange}/>
      <Label htmlFor={id} className='text-lg'>{labelText}</Label>
    </div>
  )
}

export default ModTagCheckbox