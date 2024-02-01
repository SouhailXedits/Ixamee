'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ApercuItemProps {
  color: string;
  icon: string;
  stat: string;
  name: string;
  count: number | undefined;
  isPending: boolean | undefined;
  textColor: string;
}

const ApercuItem = ({ color, icon, stat, name, count, isPending, textColor }: ApercuItemProps) => {
  const [animatedCount, setAnimatedCount] = useState<number | undefined>(count);

  useEffect(() => {
    if (isPending || count === undefined) return;

    let startCount = 0;
    const interval = setInterval(() => {
      startCount += 1;
      if (startCount <= count) {
        setAnimatedCount(startCount);
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [count, isPending]);

  let finalCount = animatedCount;
  return (
    <div
      className="w-1/4 h-[93px] px-2.5 bg-red-50 rounded-[20px] justify-start items-center gap-2.5 inline-flex   min-w-[220px]"
      style={{ backgroundColor: color }}
    >
      <div className="w-[60px] h-[60px] p-[5px] bg-white rounded-2xl flex-col justify-center items-center gap-2.5 inline-flex ">
        <Image
          alt="image"
          src={icon}
          width={27}
          height={27}
          className="w-[27px] h-[27px] relative"
        />
      </div>
      <div className="inline-flex flex-col items-start justify-center gap-2 grow shrink basis-0">
        <div className="self-stretch text-lg " style={{ color: textColor }}>
          {name}
        </div>
        <div
          className="self-stretch text-red-500 text-lg font-medium "
          style={{ color: textColor }}
        >
          {finalCount || '-'}
        </div>
      </div>
    </div>
  );
};

export default ApercuItem;
