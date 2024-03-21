import Image from 'next/image';
import { CreateSubSubQuestion } from './CreateSubSubQuestion';
import { Input } from '@/components/ui/input';
import Editor from '../../../../../../../../components/shared-components/toolbar-editor';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

export const CreateSubQuestion = ({
  allData,
  data,
  setFakeData,
  isArabic,
  fakeData,
}: any) => {
  const updateContentSubQuestion = (content: any, data: any) => {
    setFakeData((prevData: any) =>
      prevData.map((item: any) =>
        item.id === allData.id
          ? {
              ...item,
              children: item.children.map((subItem: any) =>
                subItem.id === data.id
                  ? {
                      ...subItem,
                      children: subItem.children.map((subSubItem: any) => ({
                        ...subSubItem,
                        content,
                      })),
                    }
                  : subItem
              ),
            }
          : item
      )
    );
  };

  const createSubSubQuestion = () => {
    const lastSubSubQuestion =
      data.children[data.children.length - 1] || { name: '' };

    const nextName =
      isArabic && lastSubSubQuestion.name
        ? getArabicName(lastSubSubQuestion.name)
        : getNextName(lastSubSubQuestion.name);

    const newSubSubQuestion = {
      id: Math.random().toString(36).substring(7),
      name: nextName,
      mark: 1,
      content: '',
      children: [],
    };

    setFakeData((prevData: any) =>
      prevData.map((item: any) =>
        item.id === allData.id
          ? {
              ...item,
              children: [...item.children, newSubSubQuestion],
            }
          : item
      )
    );
  };

  const handleDeleteSubQuestion = () => {
    setFakeData((prevData: any) =>
      prevData.map((item: any) =>
        item.id === allData.id
          ? {
              ...item,
              children: item.children.map((subItem: any) =>
                subItem.id === data.id
                  ? {
                      ...subItem,
                      children: subItem.children.filter(
                        (subSubItem: any) => subSubItem.id !== data.id
                      ),
                    }
                  : subItem
              ),
            }
          : item
      )
    );

    renderSubSubQuestion();
  };

  const renderSubSubQuestion = () => {
    setFakeData((prevData: any) =>
      prevData.map((item: any) =>
        item.id === allData.id
          ? {
              ...item,
              children: item.children.map((subItem: any, index: number) =>
                subItem.id === data.id
                  ? {
                      ...subItem,
                      children: subItem.children.map(
                        (subSubItem: any, subIndex: number) =>
                          (subSubItem.name = `${subIndex + 1})`)
                      ),
                    }
                  : subItem
              ),
            }
          : item
      )
    );
  };

  const calculerSubMark = (data: any) => data.children.reduce((sum: number, item: any) => sum + item.mark, 0);

  const calcSumOfMarks = (data: any) =>
    data.children.reduce(
      (sum: number, item: any) => sum + (item.children.length > 0 ? calculerSubMark(item) : item.mark),
      0
    );

  const updateSubQuestion = (e: any, data: any) => {
    const newMark = parseFloat(e.target.value);

    if (newMark < 0) {
      toast.error('La note ne doit pas être inférieure à 0');
      return;
    }

    setFakeData((prevData: any) =>
      prevData.map((item: any) =>
        item.id === allData.id
          ? {
              ...item,
              children: item.children.map((subItem: any) =>
                subItem.id === data.id
                  ? {
                      ...subItem,
                      mark: newMark,
                    }
                  : subItem
              ),
            }
          : item
      )
    );

    setFakeData((prevData: any) =>
      prevData.map((item: any) =>
        item.id === allData.id
          ? {
              ...item,
              children: item.children.map((subItem: any) =>
                subItem.id === data.id
                  ? {
                      ...subItem,
                      children: subItem.children.map((subSubItem: any) => ({
                        ...subSubItem,
                        mark: calculerSubMark(subSubItem),
                      })),
                    }
                  : subItem
              ),
            }
          : item
      )
    );
  };

  const getNextName = (currentName: string) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const base = alphabet.length;

    let result = '';
    let carry = 1;

    for (let i = currentName.length - 1; i >= 0; i--) {
      const char = currentName[i];
      const charIndex = alphabet.indexOf(char);
      const sum = charIndex + carry;

      result = alphabet[sum % base] + result;
      carry = Math.floor(sum / base);

      if (carry === 0) {
        result = currentName.substring(0, i) + result;
       
