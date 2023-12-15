"use client";
import React, { useState } from 'react';
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { updateModSummarySchema } from '@/lib/validation/project';
import { useToast } from "@/components/ui/use-toast";
import { TAG_TYPE } from '@/lib/validation/project';
import { Toggle } from '@/components/ui/toggle';

interface Props {
    tagType: TAG_TYPE;
    text: string;
    icon: string;
    className?: string;
}

const UpdateModTagForm = () => {
  return (
    <div>
        <Toggle></Toggle>
    </div>
  )
}

export default UpdateModTagForm