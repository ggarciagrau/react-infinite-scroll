import { DataType } from "../types/DataType";

const getRandomNumber = () =>
  Math.floor(Math.random() * 9000000000) + 1000000000;

export const GetCards = (limit: number, offset: number): Promise<DataType[]> =>
  new Promise((resolve) => {
    const tableLines = 1000;
    const data = [];

    for (let index = 0; index < tableLines; index++) {
      data.push({
        id: getRandomNumber(),
        sn: "SN_" + getRandomNumber(),
        index,
      });
    }

    const selectedData = data.slice(offset, offset + limit);

    setTimeout(() => {
      resolve(selectedData);
    }, 1500);
  });
