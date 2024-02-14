const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

export const formatFullYear = (date: Date, joinChar = "-") => {
  return [
    padTo2Digits(date.getDate() + 1),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join(joinChar);
};
