import { CheckCircledIcon } from '@radix-ui/react-icons';
import React from 'react';

interface FormSuccessProps {
  message?: string;
  className?: string;
}

const FormSuccessWithCheck = ({ message = 'Form submitted successfully.', className }: FormSuccessProps) => {
  if (!message) return null;
  if (!CheckCircledIcon) return null;

  return (
    <div className={`bg-mainGreen/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-mainGreen ${className}`}>
      <CheckCircledIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}

export default FormSuccessWithCheck;
