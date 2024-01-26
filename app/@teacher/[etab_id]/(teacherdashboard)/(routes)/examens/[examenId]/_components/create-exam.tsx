'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Editor from './toolbar-editor';
import { useState } from 'react';
import { CreateExercice } from './CreateExercice';







function CreateExam({ data }: any) {
  const [fakeData, setFakeData] = useState<any>([
    {
      name: 'Exerice n1',
      mark: 10,
      id: '1x23ds',
      children: [
        {
          name: 'I)',
          mark: '10',
          content:
            '[\n' +
            '  {\n' +
            '    "id": "f8452588-88e4-4770-8037-720fc0cc4e13",\n' +
            '    "type": "paragraph",\n' +
            '    "props": {\n' +
            '      "textColor": "default",\n' +
            '      "backgroundColor": "default",\n' +
            '      "textAlignment": "left"\n' +
            '    },\n' +
            '    "content": [\n' +
            '      {\n' +
            '        "type": "text",\n' +
            '        "text": "what is 1+1",\n' +
            '        "styles": {}\n' +
            '      }\n' +
            '    ],\n' +
            '    "children": []\n' +
            '  },\n' +
            '  {\n' +
            '    "id": "ced59dcb-903c-4038-acad-3c28466f95cb",\n' +
            '    "type": "paragraph",\n' +
            '    "props": {\n' +
            '      "textColor": "default",\n' +
            '      "backgroundColor": "default",\n' +
            '      "textAlignment": "left"\n' +
            '    },\n' +
            '    "content": [],\n' +
            '    "children": []\n' +
            '  }\n' +
            ']',
          children: [
            {
              name: '1)',
              mark: '2',
              content:
                '[\n' +
                '  {\n' +
                '    "id": "f8452588-88e4-4770-8037-720fc0cc4e13",\n' +
                '    "type": "paragraph",\n' +
                '    "props": {\n' +
                '      "textColor": "default",\n' +
                '      "backgroundColor": "default",\n' +
                '      "textAlignment": "left"\n' +
                '    },\n' +
                '    "content": [\n' +
                '      {\n' +
                '        "type": "text",\n' +
                '        "text": "what is 1+2",\n' +
                '        "styles": {}\n' +
                '      }\n' +
                '    ],\n' +
                '    "children": []\n' +
                '  },\n' +
                '  {\n' +
                '    "id": "ced59dcb-903c-4038-acad-3c28466f95cb",\n' +
                '    "type": "paragraph",\n' +
                '    "props": {\n' +
                '      "textColor": "default",\n' +
                '      "backgroundColor": "default",\n' +
                '      "textAlignment": "left"\n' +
                '    },\n' +
                '    "content": [],\n' +
                '    "children": []\n' +
                '  }\n' +
                ']',
              children: [
                {
                  name: 'a)',
                  mark: '1',
                  content:
                    '[\n' +
                    '  {\n' +
                    '    "id": "f8452588-88e4-4770-8037-720fc0cc4e13",\n' +
                    '    "type": "paragraph",\n' +
                    '    "props": {\n' +
                    '      "textColor": "default",\n' +
                    '      "backgroundColor": "default",\n' +
                    '      "textAlignment": "left"\n' +
                    '    },\n' +
                    '    "content": [\n' +
                    '      {\n' +
                    '        "type": "text",\n' +
                    '        "text": "what is 1+1",\n' +
                    '        "styles": {}\n' +
                    '      }\n' +
                    '    ],\n' +
                    '    "children": []\n' +
                    '  },\n' +
                    '  {\n' +
                    '    "id": "ced59dcb-903c-4038-acad-3c28466f95cb",\n' +
                    '    "type": "paragraph",\n' +
                    '    "props": {\n' +
                    '      "textColor": "default",\n' +
                    '      "backgroundColor": "default",\n' +
                    '      "textAlignment": "left"\n' +
                    '    },\n' +
                    '    "content": [],\n' +
                    '    "children": []\n' +
                    '  }\n' +
                    ']',
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  const createExercice = (fakeData: any) => {
    const newExercise = {
      id: Math.random().toString(36).substring(7),
      name: `Exercice ${fakeData.length + 1}`,
      mark: 0,
      children: [],
    };
    const newData = [...fakeData, newExercise];
    setFakeData(newData);
  };
  if (!data) return;
  return (
    <div dir={data?.language === 'fr' ? 'ltr' : 'rtl'}>
      <div className="flex flex-col gap-4">
        {fakeData?.map((item: any, index: number) => (
          <CreateExercice allData={fakeData} data={item} setFakeData={setFakeData} key={index} />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center relative top-[30px]">
          <div className="bg-[#1B8392] p-2 rounded-full" onClick={() => createExercice(fakeData)}>
            <Image
              src="/ajouter-un-exercice-icon.svg"
              width={20}
              height={20}
              alt="plusicon"
              className="cursor-pointer"
            />
          </div>
          {data?.language === 'fr' ? (
            <span className="text-[#D9D9D9]">Ajoutez un exercice</span>
          ) : (
            <span className="text-[#D9D9D9] ">أضف تمرينا</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateExam;
