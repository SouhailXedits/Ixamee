import Image from 'next/image';
import { CreateSubQuestion } from './CreateSubQuestion';
import { Input } from '@/components/ui/input';
import Editor from '../../../../../../../../components/shared-components/toolbar-editor';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface QuestionProps {
  allData: any;
  data: any;
  setFakeData: (data: any) => void;
  isArabic: boolean;
  fakeData: any;
}

export const CreateQuestion = ({ allData, data, setFakeData, isArabic, fakeData }: QuestionProps) => {
  const onChange = (content: string) => {
    updateContetn(content, data);
  };

  const createSubQuestion = () => {
    const newSubQuestion = {
      id: Math.random().toString(36).substring(7),
      name: `${data.children.length + 1})`,
      mark: 1,
      children: [],
    };

    setFakeData((prevData: any) => {
      return prevData.map((item: any) => {
        if (item.id === allData.id) {
          return {
            ...item,
            children: item.children.map((subItem: any) => {
              if (subItem.id === data.id) {
                return {
                  ...subItem,
                  children: [...subItem.children, newSubQuestion],
                };
              }
              return subItem;
            }),
          };
        }
        return item;
      });
    });
  };

  const handelDeleteQuestion = () => {
    setFakeData((prevData: any) => {
      return prevData.map((item: any) => {
        if (item.id === allData.id) {
          return {
            ...item,
            children: item.children.filter((subItem: any) => subItem.id !== data.id),
          };
        }
        return item;
      });
    });
    handeRenderQuestion();
  };

  const handeRenderQuestion = () => {
    setFakeData((prevData: any) => {
      return prevData.map((item: any) => {
        const getNextChar = (num: number) => String.fromCharCode(0x2160 + num);

        item.children.map((state: any, index: number) => {
          state.name = getNextChar(index);
        });

        return item;
      });
    });
  };

  const calculateMark = (data: any) => {
    const children = data?.children || [];

    data.mark = children?.reduce((acc: number, item: any) => {
      return acc + item.mark;
    }, 0);

    return data.mark;
  };

  const updateContetn = (contetn: string, data: any) => {
    setFakeData((prevData: any) => {
      return prevData.map((item: any) => {
        item.children.map((state: any, index: number) => {
          if (state.id === data.id) {
            state.content = contetn;
          }
        });
        return item;
      });
    });
  };

  const updateQuestion = (e: any, data: any) => {
    const value = parseFloat(e.target.value);

    if (isNaN(value) || value < 0) {
      toast.error('La note ne doit pas être inférieure à 0');
      return;
    }

    setFakeData((prevData: any) => {
      return prevData.map((item: any) => {
        item.children.map((state: any, index: number) => {
          if (state.id === data.id) {
            state.mark = value;
          }
        });
        return item;
      });
    });
  };

  return (
    <>
      <div
        className={`relative border  h-auto min-h-[79px] mr-3 rounded-xl flex items-center justify-start`}
      >
        <div
          className={cn(
            'bg-[#CFE8E6] p-2 rounded-full  cursor-pointer',
            !isArabic ? 'absolute -left-3' : 'absolute -right-3'
          )}
          onClick={createSubQuestion}
        >
          <Image src="/plusiconforsubexercice.svg" width={10} height={10} alt="plusicon" />
        </div>

        <div className="flex items-center justify-between w-full gap-3 px-5">
          <div className="w-[80%] flex items-center">
            <div className="flex items-center gap-1">
              <span>{data.name} </span>
              <span>)</span>
            </div>
            <Editor
              editable={true}
              onChange={onChange}
              initialContent={data.content}
            />
          </div>
          <div className="flex gap-3 item-center">
            <Input
              className="bg-transparent a text-[#1B8392] w-[90px] text-xl placeholder:text-mainGreen p-3 border text-center border-[#1B8392]"
              placeholder="--.--"
              type="number"
              min={1}
              step="0.25"
              value={data.children && data.children.length > 0 ? calculateMark(data) : data.mark}
              disabled={data.children && data.children.length > 0}
              onChange={(e) => {
                updateQuestion(e, data);
              }}
            />
            <Image
              src="/redcloseicon.svg"
              width={20}
              height={20}
              alt="redcloseicon"
              className="cursor-pointer"
              onClick={() => handelDeleteQuestion()}
            />
          </div>
       
