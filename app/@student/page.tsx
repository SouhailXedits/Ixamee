"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
export default function mainPage() {
  const pathName = usePathname();
  console.log(pathName);

  return <div>hello</div>;
}
