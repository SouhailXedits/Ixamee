import Image from 'next/image';
import { CreateSubSubQuestion } from './CreateSubSubQuestion';
import { Input } from '@/components/ui/input';
import Editor from './toolbar-editor';
import { cn } from '@/lib/utils';
import { getMarkOfExerciceWithId } from './calculateChildrenMarks';
import toast from 'react-hot-toast';

interface CreateSubQuestionProps {
  allData: any;
  data: any;
  setFakeData: (data: any) => void;
  isArabic: boolean;
  realExamContetn: any;
  fakeData: any;
}

const CreateSubQuestion = ({
  allData,
  data,
  setFakeData,
  isArabic,
  realExamContetn,
  fakeData,
}: CreateSubQuestionProps) => {
  const onChange = (content: string) => {
    updateContentSubQuestion(content, data);
  };

  const updateContentSubQuestion = (content: any, data: any) => {
    setFakeData((prevData: any) => {
      return updateData(prevData, data.id, { content });
    });
  };

  const updateData = (data: any, id: string, updates: any) => {
    return data.map((item: any) => {
      if (item.id === id) {
        return { ...item, ...updates };
      }
      if (item.children) {
        return { ...item, children: updateData(item.children, id, updates) };
      }
      return item;
    });
  };

  const createSubSubQuestion = () => {
    const lastSubSubQuestion = data.children[data.children.length - 1];
    const nextName = lastSubSubQuestion ? String.fromCharCode(lastSubSubQuestion.name.charCodeAt(0) + 1) : 'a';

    const newSubSubQuestion = {
      id: Math.random().toString(36).substring(7),
      name: nextName,
      mark: 1,
      children: [],
    };

    setFakeData((prevData: any) => {
      return updateData(prevData, allData.id, {
        children: updateData(data.children, data.id, { children: [...data.children, newSubSubQuestion] }),
      });
    });
  };

  const handleDeleteSubQuestion = () => {
    setFakeData((prevData: any) => {
      return updateData(prevData, allData.id, {
        children: data.children.filter((subItem: any) => subItem.id !== data.id),
      });
    });
  };

  const renderSubSubQuestion = () => {
    setFakeData((prevData: any) => {
      return updateData(prevData, allData.id, {
        children: data.children.map((subSubItem: any, index: number) => {
          return { ...subSubItem, name: index + 1 + ')'; };
        }),
      });
    });
  };

  const updateSubQuestion = (e: any, data: any) => {
    const mark = getMarkOfExerciceWithId(realExamContetn, data.id);
    if (+e.target.value > +mark) {
      toast.error("la note ne doit pas de passer la note de l'exercice");
      return;
    }
    if (+e.target.value < 0) {
      toast.error('la note ne doit pas etre inferieur a 0');
      return;
    }

    setFakeData((prevData: any) => {
      return updateData(prevData, allData.id, {
        children: updateData(data.children, data.id, { mark: +e.target.value }),
      });
    });

    setFakeData((prevData: any) => {
      return updateData(prevData, allData.id, {
        children: data.children.map((subItem: any) => {
          return { ...subItem, mark: subItem.children.length > 0 ? calcSumOfMarks(subItem) : subItem.mark };
        }),
      });
    });
  };

  const calcSumOfMarks = (data: any) => {
    return data.children.reduce((sum: number, item: any) => sum + item.mark, 0);
  };

  return (
    <>
      <div
        className={cn(
          `relative border h-auto min-h-[79px] mr-3  rounded-xl flex items-center justify-start`,
          !isArabic ? 'ml-[6rem]' : 'mr-[6rem]'
        )}
      >
        <div className="flex items-center justify-between w-full gap-3 px-5">
          <div className="w-[80%] flex items-center">
            <span>{data.name}</span>
            <Editor
              initialContent={data.content}
              editable={true}
              onChange={onChange}
            />
          </div>
          <div className="flex gap-3 item-center">
            {data.children && data.children.length > 0 ? (
              <div className="w-[160px] bg-12 h-[54px] flex rounded-lg text-white items-center justify-center text-xl gap-1">
                <span>
                  <span>{data.mark.toFixed(2)}</span>
                </span>
                <span>/</span>
                <span>{getMarkOfExerciceWithId(realExamContetn, data.id)?.toFixed(2)}</span>
              </div>
            ) : (
              <Input
                className="bg-transparent a text-[#1B8392] w-[100px] text-xl placeholder:text-mainGreen flex items-center justify-center p-3 border border-[#1B8392] text-center"
                placeholder={`00/
