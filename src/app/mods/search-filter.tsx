"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import { SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface Props {
  search?: string;
  limit: number;
  page: number;
  totalMods: number;
}

const SearchFilter = ({ search, page, limit, totalMods }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialRender = useRef(true);
  const [text, setText] = useState(search);
  const [query] = useDebounce(text, 500);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
 
      return params.toString();
    },
    [searchParams]
  );

  const deleteQueryString = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams);
      params.delete(key);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    
    if (!query) {
      router.push(pathname + '?' + deleteQueryString('q'));
    } else {
      router.push(pathname + '?' + createQueryString('q', query));
    }
  }, [query]);

  const onLimitChange = (value: string) => {
    if (value === "10") {
      router.push(pathname + '?' + deleteQueryString('l'));
    }
    else {
      router.push(pathname + '?' + createQueryString('l', value));
    }
  }

  const onNext = () => {
    const p = page + 1;
    router.push(pathname + '?' + createQueryString('p', p.toString()));
  }

  const onPrevious = () => {
    const p = page - 1;
    if (p === 1) {
      router.push(pathname + '?' + deleteQueryString('p'));
    }
    else {
      router.push(pathname + '?' + createQueryString('p', p.toString()));
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='w-full bg-accent rounded-xl p-4 flex items-center justify-between'>
        <div className='relative rounded-md shadow-sm'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <SearchIcon
              className='h-5 w-5 text-muted-foreground'
              aria-hidden='true'
            />
          </div>
          <Input
            defaultValue={text}
            placeholder='Search mods'
            onChange={e => setText(e.target.value)}
            className='block w-full rounded-md border-0 py-1.5 pl-10 text-foreground focus:ring-2 sm:text-sm sm:leading-6'
          />
        </div>
        <div className='flex items-center gap-2'>
          <Label>Show per page</Label>
          <Select defaultValue={limit.toString()} onValueChange={onLimitChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={limit} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Pagination className='pb-4'>
        <PaginationContent>
          <PaginationPrevious onClick={onPrevious} disabled={page === 1} className={cn("text-foreground", buttonVariants({ variant: 'outline' }))} />
          <PaginationNext onClick={onNext} disabled={Math.ceil(totalMods / limit) === page} className={cn("text-foreground", buttonVariants({ variant: 'outline' }))} />
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default SearchFilter;