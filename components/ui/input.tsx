import * as React from 'react';
import { cn } from '@/lib/utils';
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'password' | 'checkbox' | 'email' | 'tel' | 'list';
  icon?: React.ReactElement;
  options?: { label: string; value: string }[];
}

const Input = React.forwardRef<HTMLInputElement | HTMLSelectElement, InputProps>(
  ({ className, type, icon, options, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    if (type === 'checkbox') {
      return (
        <label className="flex items-center cursor-pointer">
          <input
            {...props}
            type="checkbox"
            className={cn(
              'mr-2',
              'appearance-none',
              'border',
              'rounded',
              'w-5',
              'h-5',
              'border-gray',
              'checked:bg-mainGreen',
              'checked:appearance-auto',
              className
            )}
            ref={ref as React.RefObject<HTMLInputElement>}
          />{' '}
          <span className="text-sm">{props.placeholder}</span>
        </label>
      );
    }

    if (type === 'list' && options) {
      return (
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 ">{icon}</div>
          )}

          <Select ref={ref as React.RefObject<HTMLSelectElement>} {...props}>
            <SelectTrigger
              
            >
              <SelectValue placeholder="Choisissez votre gouvernorat" />
            </SelectTrigger>
            <SelectContent className={cn(
                'w-full',
                'text-gray-700',
                'rounded-md',
                'border',
                'border-gray-300',
                'bg-white',
                'px-4',
                'py-2',
                'text-sm',
                'focus:outline-none',
                'focus:border-blue-500',
                'focus:ring',
                'ring-blue-200',
                'disabled:opacity-50',
                className
              )}>
              <SelectGroup >
                {options.map((option: any, index: number) => (
                  <SelectItem
                    key={index}
                    value={option.value}
                    className="text-black hover:bg-[#f0f6f8]"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      );
    }

    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">{icon}</div>
        )}

        <input
          type={type === 'password' && showPassword ? 'text' : (type as string)}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref as React.RefObject<HTMLInputElement>}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeClosedIcon className="h-5 w-5 text-gray" />
            ) : (
              <EyeOpenIcon className="h-5 w-5 text-gray" />
            )}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
