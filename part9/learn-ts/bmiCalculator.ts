const calculateBmi = (weight: number, height: number): string => {
  if (isNaN(weight) || isNaN(height)) {
    throw new Error("Weight and height must be numbers");
  }
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

if (require.main === module) {
  const [_program, _file, argWeight, argHeight, ..._rest] = process.argv;

  const weight: number = argWeight ? Number(argWeight) : 66;
  const height: number = argHeight ? Number(argHeight) : 182;

  console.log(calculateBmi(weight, height));
}
