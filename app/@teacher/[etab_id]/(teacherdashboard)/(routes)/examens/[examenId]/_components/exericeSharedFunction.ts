export const AddQuestion = (setFakeData : any ,data: any) => {
  setFakeData((prevData: any) => {
    const getNextChar = (num: number) => String.fromCharCode(0x2160 + num);

    const newData = {
      id: Math.random().toString(36).substring(7),
      name: getNextChar(data.children.length),
      mark: 0,
      content: '',
      children: [],
    };

    const updatedData = prevData.map((item: any) => {
      if (item.id === data.id) {
        return { ...item, children: [...item.children, newData] };
      }
      return item;
    });

    return updatedData;
  });
};
export const deleteExercice = (data: any ,setFakeData: any, allData: any)  => {
  const newData = allData.filter((item: any) => item.id !== data.id);
  setFakeData(newData);
};

//   calculateChildrenMarks(allData);  console.log(allData)
export const hndelChangeExcericeName = (e: any ,setFakeData: any, data: any) => {
  setFakeData((prevData: any) => {
    return prevData.map((item: any) => {
      if (item.id === data.id) {
        return { ...item, name: e.target.value };
      }
      return item;
    });
  });
};
