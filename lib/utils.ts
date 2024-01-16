import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactNode } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




interface WithAdminRoleProps {
  children: ReactNode;
}

