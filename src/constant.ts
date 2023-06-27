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
      x: 0.27,
      y: 0.77,
    },
    bottomRight: {
      x: 0.64,
      y: 0.9,
    },
  },
};

export const FONT = "Hiragino Maru Gothic Pro";
