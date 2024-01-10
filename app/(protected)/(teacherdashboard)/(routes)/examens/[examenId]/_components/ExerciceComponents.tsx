'use client';
import Image from 'next/image';
import Editor from './toolbar-editor';
import { Input } from '@/components/ui/input';

const ExerciceComponents = () => {
  return (
    <div className="border border-[#D9D9D9] rounded-lg p-2 min-h-[200px] pb-16">
      <div className="flex items-center justify-between w-full p-3">
        <div className="p-3 flex items-center justify-between bg-[#F0F6F8] w-full rounded-xl">
          <div className="flex items-center gap-6">
            <Input
              type="text"
              className="text-2xl bg-transparent border-none w-[140px] text-[#1B8392]"
              defaultValue={'dsdsd'}
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
                  className="bg-transparent border-none text-[#1B8392] w-[77px] text-xl text-right placeholder:text-mainGreen p-3 border border-[#1B8392]"
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
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 ml-10">
        <div className="px-4 pt-4 -mb-10">
          <div
            className="bg-[#1B8392] w-52 flex items-center text-white rounded-lg p-2 cursor-pointer"
            onClick={() => {}}
          >
            <Image src="/plusicon.svg" width={20} height={20} alt="plusicon" />
            Ajoutez une question
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciceComponents;
