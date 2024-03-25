import React, { useState } from 'react';
import { calcSumOfMarks } from '../../[examenId]/_components/sharedFunction';
import RenderExercice from './renderExercice';
import RenderQuestion from './renderQuestion';
import RenderSubQuestion from './renderSubQuestion';
import PdfHeader from './pdfHeader';
import PdfHeaderEvatuation from '@/components/shared-components/PdfHeaderEvalution';

export default function AddScall({ exam, examDetails }: any) {
  console.log(examDetails);
  const copiedData = JSON.parse(JSON.stringify(exam));

  const devoirName = examDetails?.name;
  console.log(devoirName);
  const classeName = examDetails.exam_classess
    .map((item: any) => {
      return item.name;
    })
    .join(', ');
  console.log(classeName);
  const [content, setContent] = useState<any>(copiedData);

  return (
    <div className="flex flex-wrap gap-4">
      <PdfHeaderEvatuation
        meta={{
          estab: devoirName,

          classe: classeName,
        }}
        type="MSStudent"
      />
      {content?.map((item: any) => {
        return (
          <div className=" min-w-[220px] border-[#dedbdb] border-[1px] p-2  rounded-lg flex flex-col gap-2  ">
            <div className="flex gap-[10px]">
              <div className="text-[#999999]">
                {/* name Of Exerciec */}
                {item.name}
              </div>
              <span className="text-[#F04438]">({calcSumOfMarks(item)} pts)</span>
            </div>
            {item.children && (
              <>
                {/* Render the I) */}
                <div className="flex flex-col pl-2 gap-[10px] text-black ">
                  {item.children.map((child: any) => (
                    <>
                      <RenderExercice child={child} content={content} setContent={setContent} />
                      <div className="flex flex-col gap-[10px]  pl-6">
                        {child.children.map((child: any) => (
                          <>
                            <RenderQuestion child={child} content={item} setContent={setContent} />
                            <div className="flex flex-col gap-[10px]  pl-6">
                              {child?.children?.map((child: any) => (
                                <RenderSubQuestion
                                  child={child}
                                  content={item}
                                  setContent={setContent}
                                />
                              ))}
                            </div>
                          </>
                        ))}
                      </div>
                    </>
                  ))}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
