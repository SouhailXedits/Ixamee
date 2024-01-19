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
      {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</div>}
      <Select onValueChange={handleValueChange} defaultValue={field.value} disabled={disabled}>
        <SelectTrigger className="w-full text-muted-foreground pl-10">
          <SelectValue placeholder={placeholder} />
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
