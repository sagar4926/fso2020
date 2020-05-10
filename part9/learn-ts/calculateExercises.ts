type Rating = 1 | 2 | 3;
interface ExerciseReport {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
}

const calculateExercises = (
  daily_routine: number[],
  target: number
): ExerciseReport => {
  if (isNaN(target)) {
    throw new Error("Target should be a number");
  }
  const trained_days = daily_routine.filter((hours) => hours > 0);
  const average =
    daily_routine.reduce((a, b) => a + b, 0) / daily_routine.length;
  let rating: Rating = 2;
  let ratingDescription = "You met your target";
  if (average < target) {
    rating = 1;
    ratingDescription = "You failed to meet your target";
  }
  if (average > target) {
    rating = 3;
    ratingDescription = "You exceeded your target. Well done!";
  }
  return {
    periodLength: daily_routine.length,
    trainingDays: trained_days.length,
    target,
    average,
    success: rating > 1,
    rating,
    ratingDescription: ratingDescription,
  };
};

if (require.main === module) {
  const [_program, _file, argTarget, ...argDailyRoutine] = process.argv;
  const target = argTarget ? Number(argTarget) : 2;
  const dailyRoutine = argDailyRoutine.map((arg) => {
    const n = Number(arg);
    if (isNaN(n)) {
      throw new Error("Daily routine values should be numbers");
    }
    return n;
  });
  console.log(calculateExercises(dailyRoutine, target));
}
