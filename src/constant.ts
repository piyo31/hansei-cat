export const MAIN_COLUMN_WIDTH = "900px";

type Position = {
  x: number;
  y: number;
};
export type BoardPositionByPercent = {
  upperLeft: Position;
  bottomRight: Position;
};

export const boardPositionByPercent = {
  CAT_HANSEI: {
    upperLeft: {
      x: 363 / 1024,
      y: 607 / 1024,
    },
    bottomRight: {
      x: 661 / 1024,
      y: 950 / 1024,
    },
  },
};

export const FONT = "Mochiy Pop One";
