import Image from 'next/image';
import { CreateSubQuestion } from './CreateSubQuestion';
import { Input } from '@/components/ui/input';
import Editor from './toolbar-editor';
import { cn } from '@/lib/utils';
import { getMarkOfExerciceWithId } from './calculateChildrenMarks';
import toast from 'react-hot-toast';

interface CreateQuestionProps {
  allData: any;
  data: any;
  setFakeData: (data: any) => void;
  realExamContetn: any;
  isArabic: boolean;
  fakeData: any;
}

export const CreateQuestion = ({
  allData,
  data,
  setFakeData,
  realExamContetn,
  isArabic,
  fakeData,
}: CreateQuestionProps) => {
  const onChange = (content: string) => {
    updateContetn(content, data);
  };

  const updateContetn = (contetn: string, data: any) => {
    setFakeData((prevData: any) => {
      return prevData.map((item: any) => {
        if (item.id === data.id) {
          return {
            ...item,
            content: contetn,
          };
        }
        if (item.children) {
          return {
            ...item,
            children: item.children.map((child: any) =>
              child.id === data.id ? { ...child, content: contetn } : child
            ),
          };
        }
        return item;
      });
    });
  };

  const updateQuestion = (e: any, data: any) => {
    const mark = getMarkOfExerciceWithId(realExamContetn, data.id);
    if (+e > +mark) {
      toast.error("la note ne doit pas de passer la note de l'exercice");
      return;
    }
    if (+e < 0) {
      toast.error('la note ne doit pas etre inferieur a 0');
      return;
    }
    setFakeData((prevData: any) => {
      return prevData.map((item: any) => {
        if (item.id === data.id) {
          return {
            ...item,
            mark: +e,
          };
        }
        if (item.children) {
          return {
            ...item,
            children: item.children.map((child: any) =>
              child.id === data.id ? { ...child, mark: +e } : child
            ),
          };
        }
        return item;
      });
    });
  };

  const createSubQuestion = () => {
    const newSubQuestion = {
      id: Math.random().toString(36).substring(7),
      name: `${data.children.length + 1})`,
      mark: 0,
      content: '',
      children: [],
    };

    setFakeData((prevData: any) => {
      return prevData.map((item: any) => {
        if (item.id === allData.id) {
          return {
            ...item,
            children: [...item.children, newSubQuestion],
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
      return prevData.map((item: any, index: number) => {
        const getNextChar = (num: number) => String.fromCharCode(0x2160 + num);

        item.children = item.children.map((state: any, index: number) => {
          state.name = getNextChar(index);
          return state;
        });

        return item;
      });
    });
  };

  return (
    <>
      <div
        className={`relative border flex  h-auto min-h-[79px] mr-3 rounded-xl items-center justify-start`}
      >
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
            {data.children && data.children.length > 0 ? (
              <div className="w-[160px] bg-12 h-[54px] flex rounded-lg text-white items-center justify-center text-xl gap-1">
                <span>{calculateMark(data).toFixed(2)}</span>
                <span>/</span>
                <span>{getMarkOfExerciceWithId(realExamContetn, data.id)?.toFixed(2)}</span>
              </div>
            ) : (
              <Input
                className="bg-transparent a text-[#1B8392] w-[90px] text-xl placeholder:text-mainGreen text-center p-3 border border-[#1B8392]"
                type="number"
                placeholder={'--.--'}
                value={data.mark}
                step="0.25"
                disabled={data.children && data.children.length > 0}
                max
