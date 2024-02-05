'use client';
import { Exercise } from './Exercise';


function Exam({ fakeData, isArabic, setFakeData }: any) {

  return (
    <div dir={!isArabic ? 'ltr' : 'rtl'}>
      <div className="flex flex-col gap-4">
        {fakeData?.map((item: any, index: number) => (
          <Exercise
            data={item}
            key={index}
            isArabic={isArabic}
          />
        ))}
      </div>
    </div>
  );
}

export default Exam;
