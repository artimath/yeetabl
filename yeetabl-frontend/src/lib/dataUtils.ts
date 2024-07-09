export function generateDataPoints(
  startDate: string,
  numDays: number,
  startValue: number,
  increment: number,
) {
  const dataPoints = [];
  const currentDate = new Date(startDate);
  let currentValue = startValue;

  for (let i = 0; i < numDays; i++) {
    dataPoints.push({
      date: currentDate.toISOString().split('T')[0],
      value: currentValue,
    });
    currentDate.setDate(currentDate.getDate() + 1);
    currentValue += increment;
  }

  return dataPoints;
}
