

// Function to handle rendering questions and updating their names
export const handeRenderQuestion = (setFakeData: any) => {
  // 🚨 Logging the previous data for debugging purposes
  setFakeData((prevData: any) => {
    // Mapping over the previous data to create a new updatedData array
    return prevData.map((item: any) => {
      // Function to get the next character in a sequence based on the index
      const getNextChar = (num: number) => String.fromCharCode(0x2160 + num);

      // Mapping over the children array of each item
      item.children.map((state: any, index: number) => {
        // 🌟 Updating the name of each child with the next character in the sequence
        state.name = getNextChar(index);
      });

      // Returning the updated item
      return item;
    });
  });
};
export const handelDeleteQuestion = (setFakeData :any ,data: any, allData: any) => {
  // 🚨 Logging the previous data for debugging purposes
  setFakeData((prevData: any) => {
    // Mapping over the previous data to create a new updatedData array
    return prevData.map((item: any) => {
      // Checking if the current item's id matches the id of the question to be deleted
      if (item.id === allData.id) {
        // 🗑️ Removing the specific child with the matching id from the children array
        return {
          ...item,
          children: item.children.filter((subItem: any) => subItem.id !== data.id),
        };
      }
      // Returning unchanged items
      return item;
    });
  });
  // 🔄 Triggering a re-render of questions after deletion
  handeRenderQuestion(setFakeData);
};

/**
 * Calculate the mark for the given data
 * @param data - The data containing children and mark
 * @returns The calculated mark
 */
export const calculateMark = (data: any) => {
  // If data has no children, default to an empty array
  const children = data?.children || [];

  // Calculate the mark by summing up the marks of the children
  data.mark = children?.reduce((acc: number, item: any) => {
    return acc + item.mark;
  }, 0);

  // Format the mark to have two decimal places
  // const formattedMark = data?.mark?.toFixed(2);

  // Return the formatted mark
  return data.mark;
};

export const updateContetn = (contetn: string, data: any ,setFakeData: any) => {
  // Using setFakeData to update the state based on previous data
  setFakeData((prevData: any) => {
    // Mapping over the previous data to create a new updatedData array
    const updatedData = prevData.map((item: any) => {
      // Mapping over the children array of each item
      item.children.map((state: any, index: number) => {
        // Checking if the current child's id matches the provided data's id
        if (state.id === data.id) {
          // Updating the mark of the matching child with the new value (+e)
          state.content = contetn;
        }
      });
      // Returning the updated item
      return item;
    });
    // Returning the updatedData to setFakeData
    return updatedData;
  });
};

// Function to update a question's mark in the fake data
export const updateQuestion = (e: any, data: any , setFakeData: any) => {
  if (+e < 1) {
    // toast.error('la note ne doit pas etre inferieur a 0');
    return;
  }
  // Using setFakeData to update the state based on previous data
  setFakeData((prevData: any) => {
    // Mapping over the previous data to create a new updatedData array
    const updatedData = prevData.map((item: any) => {
      // Mapping over the children array of each item
      item.children.map((state: any, index: number) => {
        // Checking if the current child's id matches the provided data's id
        if (state.id === data.id) {
          // Updating the mark of the matching child with the new value (+e)
          state.mark = +e;
        }
      });
      // Returning the updated item
      return item;
    });
    // Returning the updatedData to setFakeData
    return updatedData;
  });
};
