export function calculateProgress(data: any) {
  // Iterate over each trimester
  for (const trimester in data) {
    const exams = data[trimester];

    // Iterate over each exam starting from the second one
    for (let i = 1; i < exams.length; i++) {
      const currentExam = exams[i];
      const previousExam = exams[i - 1];

      // Check if both current and previous exams are done
      if (currentExam.status === 'done' && previousExam.status === 'done') {
        // Calculate progress only if both exams are done
        const currentMarks = currentExam.overTwnetyMark || 0;
        const previousMarks = previousExam.overTwnetyMark || 0;

        // Calculate progress percentage based on maximum possible marks (20)
        const maxMarks = 20;
        const progress = ((currentMarks - previousMarks) / maxMarks) * 100;

        // Ensure progress doesn't exceed 100%
        currentExam.progress = Math.min(progress, 100);
      }
    }
  }

  return data;
}
