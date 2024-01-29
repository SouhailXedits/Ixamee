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

interface SelectScrollableParams {
  options: Option[];
  placeholder: string;
  icon?: React.ReactElement;
  field: {
    onChange: (value: any) => void;
    value: any;
  };
  disabled: boolean;
  onChange?: (selectedOption: Option) => void;
}

export function SelectScrollable({
  options,
  placeholder,
  icon,
  field,
  disabled,
  onChange,
}: SelectScrollableParams) {
  const handleValueChange = (selectedValue: string) => {
    field.onChange(selectedValue);

    if (onChange) {
      const selectedOption = options.find((option) => option.value === selectedValue);
      if (selectedOption) {
        onChange(selectedOption);
      }
    }
  };
  return (
    <div className="relative">
      <Select onValueChange={handleValueChange} defaultValue={field.value} disabled={disabled} >
        <SelectTrigger className="w-[102%] border-none text-[#1B8392]">
          <SelectValue placeholder={placeholder} className='text-[#727272]' />
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
