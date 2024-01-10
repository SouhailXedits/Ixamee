import * as React from "react"
 
import { cn } from "@/lib/utils"
 
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
 
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
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

