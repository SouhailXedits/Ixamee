export function calculateCorrectionPercentage(entry: any) {
  console.log('🚀 ~ calculateCorrectionPercentage ~ entry:', entry);
  if (entry.status === 'absent' || entry.status === 'notClassified') {
    return 0;
  } else if (entry.status === 'done') {
    const percentage = (entry.mark_obtained * 100) / entry?.exam?.total_mark;
    return percentage;
  } else {
    return 0;
  }
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

  return counts;
}
