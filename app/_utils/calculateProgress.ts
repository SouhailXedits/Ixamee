export function calculateProgress(data:any) {
  // Iterate over each trimester
  for (const trimester in data) {
    const exams = data[trimester];

    // Iterate over each exam
    for (let i = 1; i < exams.length; i++) {
      const currentExam = exams[i];
      const previousExam = exams[i - 1];

      // Check if both current and previous exams are done
      if (currentExam.status === 'done' && previousExam.status === 'done') {
        // Calculate progress only if both exams are done
        console.log(currentExam);
        console.log(previousExam);
        const currentMarks = currentExam.overTwnetyMark || 0;
        const previousMarks = previousExam.overTwnetyMark || 0;

        // Calculate progress percentage
        console.log(currentMarks, previousMarks);
        const progress = ((currentMarks - previousMarks) / previousMarks) * 100;
        console.log(progress);

        // Add progress field to current exam
        currentExam.progress = progress;
      }
    }
  }

  return data;
}
