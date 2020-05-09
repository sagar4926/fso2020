const calculateBmi = (weight: number, height: number): string => {
  height = height / 100;
  const bmi = weight / (height * height);
  const bmiStr = `BMI: ${bmi.toFixed(2)}`;
  if (bmi < 18.5) {
    return `${bmiStr}. Underweight`;
  }
  if (18.5 <= bmi && bmi < 25) {
    return `${bmiStr}. Normal`;
  }
  if (25 <= bmi && bmi < 30) {
    return `${bmiStr}. Overweight`;
  }
  return `${bmiStr}.Obese`;
};

console.log(calculateBmi(66, 182));
