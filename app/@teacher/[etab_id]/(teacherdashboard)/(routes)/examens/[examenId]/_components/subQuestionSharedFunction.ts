export const updateContentSubQuestion = (
  contetn: any,
  data: any,
  setFakeData: any,
  allData: any
) => {
  // Updating the mark of the specific subquestion
  setFakeData((prevData: any) => {
    return prevData.map((item: any) => {
      console.log(item);
      console.log(contetn);
      console.log(data);
      



      // Checking if the current item's id matches the id of the parent question

      if (item.id === allData.id) {
        // Updating 👍 the children array of the parent question
        return {
          ...item,
          children: item.children.map((subItem: any) => {
            console.log(subItem);
            // Updating the children array of the parent subquestion
            return {
              ...subItem,
              children: subItem.children.map((subSubItem: any) => {
                // Checking if the current subsubitem's id matches the id of the subquestion to be updated
                if (subSubItem.id === data.id) {
                  // Updating the mark of the subquestion with the new value
                  subSubItem.content = contetn;
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
};

export const createSubSubQuestion = (
  isArabic: boolean,
  data: any,
  setFakeData: any,
  allData: any
) => {
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
        break;
      }
    }
    if (carry > 0) {
      result = alphabet[carry % base] + result;
      if (carry > base) {
        result = 'a' + result; // Overflow, add an extra 'a'
      }
    }
    return result;
  };
  const getArabicName = (currentName: string) => {
    const arabicAlphabet = 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي';
    const base = arabicAlphabet.length;

    let result = '';
    let carry = 1;

    for (let i = currentName.length - 1; i >= 0; i--) {
      const char = currentName[i];
      const charIndex = arabicAlphabet.indexOf(char);
      const sum = charIndex + carry;

      result = arabicAlphabet[sum % base] + result;
      carry = Math.floor(sum / base);

      if (carry === 0) {
        result = currentName.substring(0, i) + result;
        break;
      }
    }
    if (carry > 0) {
      result = arabicAlphabet[carry % base] + result;
      if (carry > base) {
        result = 'ا' + result; // Overflow, add an extra 'ا' (the first letter of the Arabic alphabet)
      }
    }
    return result;
  };

  const lastSubSubQuestion = data.children[data.children.length - 1];

  const nextName = isArabic
    ? lastSubSubQuestion
      ? getArabicName(lastSubSubQuestion.name)
      : 'ا'
    : lastSubSubQuestion
    ? getNextName(lastSubSubQuestion.name)
    : 'a';
  console.log(nextName);

  const newSubSubQuestion = {
    id: Math.random().toString(36).substring(7),
    name: nextName,
    mark: 0,
    children: [],
  };

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
                if (subSubItem.id === data.id) {
                  return {
                    ...subSubItem,
                    children: [...subSubItem.children, newSubSubQuestion],
                  };
                }
                return subSubItem;
              }),
            };
          }),
        };
      }
      return item;
    });
  });
};
