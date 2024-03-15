export function transformData(data: any) {
  const colorCodes: Record<string, string> = {
    'Entre 0 - 30%': '#F04438',
    'Entre 30 - 60%': '#F69D16',
    'Entre 60 - 80%': '#12b76a',
    'plus de 80%': '#1B8392',
  };

  const result = Object.keys(data).map((status) => ({
    status,
    numExams: data[status],
    color: colorCodes[status],
  }));

  return result;
}
