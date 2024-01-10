'use client';
import Image from 'next/image';
import Editor from './toolbar-editor';
import { Input } from '@/components/ui/input';

const QuestionComponents = () => {
  return (
    <div className="border border-[#D9D9D9] rounded-lg p-2 min-h-[200px] pb-16">
      <div className="flex items-center justify-between w-full p-3">
        <div className="p-3 flex items-center justify-between bg-[#F0F6F8] w-full rounded-xl">
          <div className="flex items-center gap-6">
            <Input
              type="text"
              className="text-2xl bg-transparent border-none w-[140px] text-[#1B8392]"
            />
            <Image
              src="/editeicon.svg"
              width={24}
              height={24}
              alt="editicon"
              className="cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex w-[210px] h-[46px] bg-white rounded-[5px] border justify-center items-center gap-2.5">
              <div className="flex text-center text-[#1B8392] leading-tight items-center">
                <Input
                  className="bg-transparent border-none w-[77px] text-right text-xl placeholder:text-mainGreen"
                  placeholder="--.--"
                  maxLength={5}
                  disabled
                />
                <span className="text-xl">/ 20.00</span>
              </div>
            </div>
            <Image
              src="/redcloseicon.svg"
              width={20}
              height={20}
              alt="redcloseicon"
              onClick={() => {}}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionComponents;
