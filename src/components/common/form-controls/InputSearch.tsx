'use client';

import { FC, useState, ChangeEvent } from 'react';
import { Input } from 'antd';
import { useDebouncedCallback } from 'use-debounce';
import { IoSearchOutline } from 'react-icons/io5';
import { useSearchParams } from '@/hooks';

interface Props {
  debounceTime?: number;
  placeholder?: string;
  size?: 'small' | 'middle' | 'large';
  allowClear?: boolean;
}

export const InputSearch: FC<Props> = ({
  debounceTime = 500,
  size = 'large',
  placeholder = 'Enter search text here...',
  allowClear = true,
}) => {
  const { query, setQuery } = useSearchParams();
  const [inputValue, setInputValue] = useState(query || '');

  const updateQuery = useDebouncedCallback((value: string) => {
    setQuery(value);
  }, debounceTime);

  const onSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    updateQuery(value);
  };

  return (
    <Input
      allowClear={allowClear}
      className="w-full"
      value={inputValue}
      size={size}
      prefix={<IoSearchOutline size={16} color="oklch(55.1% 0.027 264.364)" />}
      onChange={onSearchQuery}
      placeholder={placeholder}
    />
  );
};
