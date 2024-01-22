"use client"
import { usePathname } from 'next/navigation';
import React from 'react';
export default function mainPage({ children }: any) {
  const pathName=usePathname()
  console.log("🚀 ~ mainPage ~ pathName:", pathName)
  
  return <div>{children}</div>;
}
