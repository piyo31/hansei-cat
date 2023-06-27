import { Image as ChakraImage } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import catImageRaw from "../assets/cat_nekoko_hansei.png";
import {
  BoardPositionByPercent,
  boardPositionByPercent,
  FONT,
} from "../constant";

/**
 * テキストをcanvasにレンダリングする
 */
const drawText = (
  context: CanvasRenderingContext2D,
  text: string,
  defaultFontSize: number,
  image: HTMLImageElement,
  positionByPercent: BoardPositionByPercent
): void => {
  const width = image.width;
  const height = image.height;
  context.clearRect(0, 0, width, height);
  context.drawImage(image, 0, 0);

  const textListSplitLine = text.split("\n");
  const boardWidth =
    width * (positionByPercent.bottomRight.x - positionByPercent.upperLeft.x);
  const boardHeight =
    height * (positionByPercent.bottomRight.y - positionByPercent.upperLeft.y);

  const fontSize =
    defaultFontSize * textListSplitLine.length > boardHeight
      ? boardHeight / textListSplitLine.length
      : defaultFontSize;
  context.font = `${fontSize}px ${FONT}`;
  context.fillStyle = "#000000";

  // 中央寄せのためのスペース
  const centeringSpaceVertical =
    defaultFontSize * textListSplitLine.length > boardHeight
      ? 0
      : (boardHeight - fontSize * textListSplitLine.length) / 2;
  textListSplitLine.forEach((text, index) => {
    const centeringSpaceHorizontal =
      (boardWidth - getTextRenderingWidth(text, fontSize, context)) / 2;

    context.fillText(
      text,
      width * positionByPercent.upperLeft.x + centeringSpaceHorizontal,
      height * positionByPercent.upperLeft.y +
        centeringSpaceVertical +
        fontSize * index -
        (defaultFontSize - fontSize)
    );
  });
};

const getTextRenderingWidth = (
  text: string,
  fontSize: number,
  context: CanvasRenderingContext2D
): number => {
  context.font = `${fontSize}px ${FONT}`;
  return context.measureText(text).width;
};

const createCanvasElement = (image: HTMLImageElement): HTMLCanvasElement => {
  const elem = document.createElement("canvas");
  elem.width = image.width;
  elem.height = image.height;
  return elem;
};

const defaultFontSize = 28;

type Props = {
  word: string;
  parentPng?: string | null;
  parentSetPng?: Dispatch<SetStateAction<string | null>>;
};

const ImgWithWord = (props: Props) => {
  const { word, parentSetPng } = props;
  const [png, setPng] = useState<string | null>(null);

  const [image, setImage] = useState<HTMLImageElement>(new Image());

  const [isInitialImageLoaded, setIsInitialImageLoaded] =
    useState<boolean>(false);

  // TODO: 画像の板座標データの紐づけ方法
  const updateImage = (word: string, image: HTMLImageElement): void => {
    const elem = createCanvasElement(image);
    const ctx = elem.getContext("2d");

    if (ctx === null) {
      console.log("ctx null");
      return;
    }
    ctx.clearRect(0, 0, image.width, image.height);

    drawText(
      ctx,
      word,
      defaultFontSize,
      image,
      boardPositionByPercent.CAT_HANSEI
    );
    setPng(() => elem.toDataURL());
    parentSetPng && parentSetPng(() => elem.toDataURL());
  };

  useEffect(() => {
    const catImage = new Image();
    catImage.src = catImageRaw;
    setImage(() => catImage);
  }, []);

  const initialImageLoad = () => {
    setIsInitialImageLoaded(() => true);
    updateImage(word, image);
  };

  useEffect(() => {
    updateImage(word, image);
  }, [image]);
  useEffect(() => updateImage(word, image), [word]);

  return isInitialImageLoaded ? (
    <ChakraImage src={png ? png : ""} style={{ width: "600px" }} />
  ) : (
    <ChakraImage
      src={catImageRaw}
      style={{ width: "600px" }}
      onLoad={initialImageLoad}
      fallbackSrc="https://via.placeholder.com/600"
    />
  );
};
export default ImgWithWord;
