import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Option {
  id: number;
  value: string;
  label: string;
}

interface SelectScrollableProps {
  options: Option[];
  placeholder: string;
  icon?: React.ReactElement;
  value?: string;
  onChange: (value: string, option?: Option) => void;
  disabled?: boolean;
}

export function SelectScrollable({
  options,
  placeholder,
  icon,
  value,
  onChange,
  disabled,
}: SelectScrollableProps) {
  const handleValueChange = (selectedValue: string) => {
    const selectedOption = options.find((option) => option.value === selectedValue);
    onChange(selectedValue, selectedOption);
  };

  return (
    <div className="relative">
      <Select onValueChange={handleValueChange} value={value} disabled={disabled} >
        <SelectTrigger className="w-[102%] border-none text-[#1B8392]">
          <SelectValue placeholder={placeholder} className='text-[#727272]' />
          {icon && <SelectValue icon={icon} />}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option: Option) => {
              return (
                <SelectItem value={option.value} key={option.id}>
                  {option.label}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
