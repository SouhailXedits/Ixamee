export function calculateCorrectionPercentage(entry: any) {
  if (entry.status === 'done' || entry.status === 'absent' || entry.status === 'notClassified') {
    return 100;
  } else if (entry.status === 'notCorrected') {
    return 0;
  } else if (entry.status === 'pending') {
    let totalQuestions = 0;
    let nullMarks = 0;

    if (entry.correction_exam_content) {
      for (const exercise of entry.correction_exam_content) {
        for (const question of exercise.children) {
          if (question.mark === null) {
            nullMarks++;
          }
          totalQuestions++;
        }
      }
    }

    return totalQuestions === 0 ? 0 : (1 - nullMarks / totalQuestions) * 100;
  }

  return 0;
}

export function groupByCorrectionProgress(data: any) {
  const counts: any = {
    'Entre 0 - 30%': 0,
    'Entre 30 - 60%': 0,
    'Entre 60 - 80%': 0,
    'plus de 80%': 0,
  };

  for (const entry of data) {
    const percentage = calculateCorrectionPercentage(entry);
    if (percentage <= 30) {
      counts['Entre 0 - 30%']++;
    } else if (percentage <= 60) {
      counts['Entre 30 - 60%']++;
    } else if (percentage <= 80) {
      counts['Entre 60 - 80%']++;
    } else {
      counts['plus de 80%']++;
    }
  }
  console.log(counts);

  return counts;
}
