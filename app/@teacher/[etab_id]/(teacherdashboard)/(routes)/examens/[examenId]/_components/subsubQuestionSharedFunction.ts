import { calculerExerciceMark } from '@/app/_utils/calculateChildrenMarks';

export const updateContentSubSubQuestion = (
  content: any,
  data: any,
  setFakeData: any,
  allData: any
) => {
  setFakeData((prevData: any) => {
    return prevData.map((item: any) => {
      if (item.id === allData.id) {
        return {
          ...item,
          children: item.children.map((subItem: any) => {
            return {
              ...subItem,
              children: subItem.children.map((subSubItem: any, index: number) => {
                return {
                  ...subSubItem,
                  children: subSubItem.children.map((subSubSubItem: any) => {
                    if (subSubSubItem.id === data.id) {
                      subSubSubItem.content = content;
                    }
                    return subSubSubItem;
                  }),
                };
              }),
            };
          }),
        };
      }
      return item;
    });
  });
};

export function numberToLetters(num: number) {
  let letters = '';
  while (num > 0) {
    let mod = (num - 1) % 26;
    letters = String.fromCharCode(65 + mod) + letters;
    num = Math.floor((num - mod) / 26);
  }
  return letters.toLowerCase();
}
export const handelDeleteSubSubQuestion = (setFakeData: any, data: any, allData: any) => {
  // Update the state to include the new sub-sub-question
  setFakeData((prevData: any) => {
    return prevData.map((item: any) => {
      if (item.id === allData.id) {
        return {
          ...item,
          children: item.children.map((subItem: any) => {
            return {
              ...subItem,
              children: subItem.children.map((subSubItem: any) => {
                return {
                  ...subSubItem,
                  children: subSubItem.children.filter(
                    (subSubSubItem: any) => subSubSubItem.id !== data.id
                  ),
                };
              }),
            };
          }),
        };
      }
      return item;
    });
  });
  setFakeData((prevData: any) => {
    return prevData.map((item: any) => {
      if (item.id === allData.id) {
        return {
          ...item,
          children: item.children.map((subItem: any) => {
            return {
              ...subItem,

              children: subItem.children.map((subSubItem: any, index: number) => {
                return {
                  ...subSubItem,

                  mark: calcSumOfMarks(subSubItem),
                };
              }),
              // mark: calculerExerciceMark(allData),
            };
          }),
          // mark: calculerExerciceMark(allData),
        };
      }
      return item;
    });
  });
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
                return {
                  ...subSubItem,
                  mark: calcSumOfMarks(subSubItem),
                };
              }),
            };
          }),
        };
      }
      // Returning unchanged items
      return item;
    });
  });
  renderSubSubQuestion(setFakeData, allData);
};
export const renderSubSubQuestion = (setFakeData: any, allData: any) => {
  setFakeData((prevData: any) => {
    return prevData.map((item: any) => {
      if (item.id === allData.id) {
        return {
          ...item,
          children: item.children.map((subItem: any) => {
            return {
              ...subItem,
              children: subItem.children.map((subSubItem: any) => {
                return {
                  ...subSubItem,
                  children: subSubItem.children.map((subSubSubItem: any, index: number) => {
                    subSubSubItem.name = numberToLetters(index + 1);
                    return subSubSubItem;
                  }),
                };
              }),
            };
          }),
        };
      }
      return item;
    });
  });
};
export const calcSumOfMarks = (data: any) => {
  let sum = 0;
  data.children.map((item: any) => {
    sum += +item.mark;
  });

  return sum;
};
export const updateSubSubQuestion = (e: any, data: any, setFakeData: any, allData: any) => {
  setFakeData((prevData: any) => {
    return prevData.map((item: any) => {
      if (item.id === allData.id) {
        return {
          ...item,
          children: item.children.map((subItem: any) => {
            return {
              ...subItem,
              children: subItem.children.map((subSubItem: any, index: number) => {
                return {
                  ...subSubItem,
                  children: subSubItem.children.map((subSubSubItem: any) => {
                    if (subSubSubItem.id === data.id) {
                      subSubSubItem.mark = +e.target.value;
                    }
                    return subSubSubItem;
                  }),
                };
              }),
            };
          }),
        };
      }
      return item;
    });
  });
  setFakeData((prevData: any) => {
    return prevData.map((item: any) => {
      if (item.id === allData.id) {
        return {
          ...item,
          children: item.children.map((subItem: any) => {
            return {
              ...subItem,

              children: subItem.children.map((subSubItem: any, index: number) => {
                return {
                  ...subSubItem,

                  mark: calcSumOfMarks(subSubItem),
                };
              }),
              // mark: calculerExerciceMark(allData),
            };
          }),
          // mark: calculerExerciceMark(allData),
        };
      }
      return item;
    });
  });
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
                return {
                  ...subSubItem,
                  mark: calcSumOfMarks(subSubItem),
                };
              }),
            };
          }),
        };
      }
      // Returning unchanged items
      return item;
    });
  });

  calculerExerciceMark(allData);
};
