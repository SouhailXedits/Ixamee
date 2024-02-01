import Image from 'next/image';
import React from 'react';

export default function Rien({
  className,
  image,
  message,
}: {
  image: string;
  className: string;
  message: string;
}) {
  return (
    <div className={className}>
      <Image src={image} width={250} height={250} alt="pas de statistiques " />
      <div className="flex items-center justify-center cursor-pointer ">
        <span className="p-2 text-2">{message}</span>
      </div>
    </div>
  );
}
