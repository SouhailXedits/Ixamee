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
  id:number;
  value: string;
  label: string;

}
interface SelectScrollableParams {
  options: Option[];
  placeholder: string;
  icon?: React.ReactElement;
  field: {
    onChange: (value: string) => void;
    value: string;
  };
}
export function SelectScrollable({ options, placeholder, icon, field }: SelectScrollableParams) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">{icon}</div>
      )}
      <Select onValueChange={field.onChange} defaultValue={field.value} >
        <SelectTrigger className="w-full text-gray pl-10">
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
