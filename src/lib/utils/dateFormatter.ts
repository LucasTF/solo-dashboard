const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

export const formatDDMMYYYY = (date: Date, joinChar = "-") => {
  return [
    padTo2Digits(date.getDate() + 1),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join(joinChar);
};

export const formatYYYYMMDD = (date: Date, joinChar = "-") => {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate() + 1),
  ].join(joinChar);
};

export const formatTime = (date: Date) => {
  return [
    padTo2Digits(date.getHours()),
    padTo2Digits(date.getMinutes()),
    padTo2Digits(date.getSeconds()),
  ].join(":");
};

type Format = "DDMMYYYY" | "YYYYMMDD";

const format = (
  date: Date,
  form: Format,
  showTime: boolean,
  joinChar = "-"
) => {
  let formattedDate;
  switch (form) {
    case "DDMMYYYY":
      formattedDate = formatDDMMYYYY(date, joinChar);
      break;
    case "YYYYMMDD":
      formattedDate = formatYYYYMMDD(date, joinChar);
      break;
  }

  if (showTime) {
    const formattedTime = formatTime(date);
    formattedDate = formattedDate.concat(" ", formattedTime);
  }

  return formattedDate;
};

export default format;
