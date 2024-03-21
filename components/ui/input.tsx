import * as React from 'react';

import { cn } from '@/lib/utils';

type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';

export interface InputProps extends React.ComponentPropsWithRef<HTMLInputElement> {
  className?: string;
  type?: InputType;
  name: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, type, name, defaultValue, required, disabled, readOnly, ...rest } = props;

  return (
    <input
      type={type}
      name={name}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',

