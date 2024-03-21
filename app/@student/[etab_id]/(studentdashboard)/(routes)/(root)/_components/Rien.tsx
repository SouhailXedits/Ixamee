import Image from 'next/image';
import React from 'react';
import type { ImageProps } from 'next/image';

export default function Rien({
  className = '',
  image = '/default-image.png',
  message = 'No statistics available',
  imageProps,
}: {
  image: string;
  className?: string;
  message?: string;
} & Partial<ImageProps>) {
  return (
    <div
      className={className}
      role="region"
      aria-label={message}
    >
      <Image
        src={image}
        width={250}
        height={250}
        alt={message}
        title={message}
        layout="responsive"
        objectFit="contain"
        {...imageProps}
      />
      <div className="flex items-center justify-center cursor-pointer p-2 text-2">
        {message}
      </div>
    </div>
  );
}

