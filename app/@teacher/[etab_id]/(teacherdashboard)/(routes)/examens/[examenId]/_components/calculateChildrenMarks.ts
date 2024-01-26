export function calculateChildrenMarks(data:any) {
  let totalChildrenMark = 0;

  data.forEach((item:any) => {
    if (item.children) {
      item.children.forEach((child:any) => {
        totalChildrenMark += parseInt(child.mark, 10) || 0; // Convert child's mark to integer and add to totalChildrenMark
      });
    }
  });

  return totalChildrenMark;
}


export const calculerExerciceMark = (data:any) => {
  data.mark = data.children.reduce((acc: number, item: any) => {
    return acc + item.mark;
  }, 0);
  return data.mark;
};
// Call the function passing the fakeData array to get the sum of marks for immediate children
