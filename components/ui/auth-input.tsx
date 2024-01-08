import * as React from 'react';
import { cn } from '@/lib/utils';
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';
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

          <select
            className={cn(
              'flex h-10 w-full text-gray rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ',
              className
            )}
            ref={ref as React.RefObject<HTMLSelectElement>}
            {...props}
            style={{ overflowY: 'auto' }}
          >
            <option value="" disabled hidden>
              {options[0].label}
            </option>
            {options.map((option: any, index: number) => (
              <option key={index} value={option.value} className="text-black ">
                {option.icon && <span className="mr-2">{option.icon}</span>}
                {option.label}
              </option>
            ))}
          </select>
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
