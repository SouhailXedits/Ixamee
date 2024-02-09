import * as React from 'react';
import { cn } from '@/lib/utils';
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'password' | 'email' | 'tel';
  icon?: React.ReactElement;
  options?: { label: string; value: string }[];
  name: string;
}

const Input = React.forwardRef<HTMLInputElement | HTMLSelectElement, InputProps>(
  ({ className, type, icon, name, options, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="relative flex items-center border gap-[4px] rounded-lg">
        {icon && <div className="px-2">{icon}</div>}

        <input
          name={name}
          type={type === 'password' && showPassword ? 'text' : (type as string)}
          className={cn(
            'flex h-10 w-full rounded-md bg-background  py-2 text-sm ring-offset-background  file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref as React.RefObject<HTMLInputElement>}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            className="absolute transform -translate-y-1/2 cursor-pointer top-1/2 right-3 focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {!showPassword ? (
              <EyeClosedIcon className="w-5 h-5 text-gray" name="EyeClosedIcon" />
            ) : (
              <EyeOpenIcon className="w-5 h-5 text-gray" name="EyeOpenIcon" />
            )}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
