export const dbWhereMapper = (searchKeys: string, finalValue: any) => {
  let obj = {};
  let temp = obj;
  let prevKey: string;
  const keysMap = searchKeys.split(".");
  const strLength = keysMap.length;
  keysMap.forEach((key, index) => {
    if (index > 0) temp = temp[prevKey as keyof object];
    if (index + 1 === strLength) {
      const newObj = new Object({ [key]: finalValue });
      Object.assign(temp, newObj);
    } else {
      const newObj = new Object({ [key]: {} });
      Object.assign(temp, newObj);
    }
    prevKey = key;
  });

  return obj;
};
