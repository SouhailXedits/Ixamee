export const haveZeroInfakeData = (data: any) => {
  if (!data) return false;
  for (const item of data) {
    if (item.mark === 0) {
      return true;
    }
    if (item.children && haveZeroInfakeData(item.children)) {
      return true;
    }
  }
  return false;
};
export const renderSubSubQuestion = (setFakeData: any, allData: any) => {
  // Updating the state to render and update sub-subquestions
  setFakeData((prevData: any) => {
    // Mapping over the previous data to create a new updatedData array
    return prevData.map((item: any) => {
      // Checking if the current item's id matches the id of the parent question
      if (item.id === allData.id) {
        // Updating the children array of the parent question
        return {
          ...item,
          children: item.children.map((subItem: any) => {
            // Updating the children array of the parent subquestion
            return {
              ...subItem,
              children: subItem.children.map((subSubItem: any, index: number) => {
                // 🆕 Updating the name of each sub-subquestion based on its index
                subSubItem.name = index + 1 + ')';
                // Returning unchanged sub-subitems
                return subSubItem;
              }),
            };
          }),
        };
      }
      // Returning unchanged items
      return item;
    });
  });
};

export const handleDeleteSubQuestion = (setFakeData: any, data: any, allData: any) => {
  // Updating the state to delete the specified sub-subquestion
  setFakeData((prevData: any) => {
    // Mapping over the previous data to create a new updatedData array
    return prevData.map((item: any) => {
      // Checking if the current item's id matches the id of the parent question
      if (item.id === allData.id) {
        // Updating the children array of the parent question
        return {
          ...item,
          children: item.children.map((subItem: any) => {
            // Updating the children array of the parent subquestion
            return {
              ...subItem,
              children: subItem.children.filter((subSubItem: any) => {
                // Checking if the current subsubitem's id matches the id of the sub-subquestion to be deleted
                if (subSubItem.id === data.id) {
                  // 🗑️ Returning false to exclude the sub-subquestion from the children array
                  return false;
                }
                // Returning true to keep other sub-subquestions in the children array
                return true;
              }),
            };
          }),
        };
      }
      // Returning unchanged items
      return item;
    });
  });

  // Re-rendering sub-subquestions after deletion
  renderSubSubQuestion(setFakeData, allData);
};
export const calcSumOfMarks = (data: any) => {
  if (data === undefined) {
    return 0;
  }
  // Logging the data for debugging purposes

  // Initializing the sum variable to 0
  let sum = 0;

  // Mapping over the children array of the provided data
  data.children.map((item: any) => {
    // Adding the mark of each child to the sum
    sum += +item.mark;
  });
  data.mark = sum;

  // Returning the calculated sum
  return sum;
};

export const updateSubQuestion = (e: any, data: any, setFakeData: any, allData: any) => {
  if (+e.target.value < 0) {
    // toast.error('la note ne doit pas etre inferieur a 0');
    return;
  }

  // Updating the mark of the specific subquestion
  setFakeData((prevData: any) => {
    return prevData.map((item: any) => {
      // Checking if the current item's id matches the id of the parent question

      if (item.id === allData.id) {
        // Updating 👍 the children array of the parent question
        return {
          ...item,
          children: item.children.map((subItem: any) => {
            // Updating the children array of the parent subquestion
            return {
              ...subItem,
              children: subItem.children.map((subSubItem: any) => {
                // Checking if the current subsubitem's id matches the id of the subquestion to be updated
                if (subSubItem.id === data.id) {
                  // Updating the mark of the subquestion with the new value
                  subSubItem.mark = +e.target.value;
                }
                // Returning unchanged subsubitems
                return subSubItem;
              }),
            };
          }),
        };
      }
      // Returning unchanged items
      return item;
    });
  });

  // Recalculating marks in the hierarchy
  setFakeData((prevData: any) => {
    return prevData.map((item: any) => {
      // Checking if the current item's id matches the id of the parent question and it has children
      if (item.id === allData.id && item.children.length > 0) {
        // Updating the children array of the parent question
        return {
          ...item,
          children: item.children.map((subItem: any) => {
            // Updating the children array of the parent subquestion
            return {
              ...subItem,
              mark: subItem.children.length > 0 ? calcSumOfMarks(subItem) : subItem.mark,
              children: subItem.children.map((subSubItem: any) => {
                // Returning unchanged subsubitems
                return subSubItem;
              }),
            };
          }),
        };
      }
      // Returning unchanged items
      return item;
    });
  });
};

export const createSubQuestion = (data: any, setFakeData: any, allData: any) => {
  // Generating a new subquestion with a random id, name, initial mark, and an empty children array
  const newSubQuestion = {
    id: Math.random().toString(36).substring(7),
    name: `${data.children.length + 1})`, // 🆕 Naming the subquestion based on the current number of children
    mark: 0,
    children: [],
  };

  // Update the state to include the new subquestion
  setFakeData((prevData: any) => {
    // Mapping over the previous data to create a new updatedData array
    return prevData.map((item: any) => {
      // Checking if the current item's id matches the id of the parent question
      if (item.id === allData.id) {
        // Updating the children array of the parent question
        return {
          ...item,
          children: item.children.map((subItem: any) => {
            // Checking if the current subitem's id matches the id of the parent subquestion

            if (subItem.id === data.id) {
              // Adding the new subquestion to the children array of the parent subquestion
              return {
                ...subItem,

                mark: 0,
                children: [...subItem.children, newSubQuestion],
              };
            }
            // Returning unchanged subitems
            return subItem;
          }),
        };
      }
      // Returning unchanged items
      return item;
    });
  });
};
