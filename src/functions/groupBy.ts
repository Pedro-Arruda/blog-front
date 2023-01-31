export const groupBy = (objetoArray: Array<{}>, propriedade: string) => {
  return objetoArray.reduce((acc: any, obj: any) => {
    let key = obj[propriedade];

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(obj);

    return acc;
  }, {});
};
