import { DownloadIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Link,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import ImgWithWord from "./ImgWithWord";
import ShareButton, { canShare, dataUrlToShareData } from "./ShareButton";
import { css } from "@emotion/react";

const ImgWithWordInput = () => {
  // TextAreaの文字列
  const [word, setWord] = useState<string>("");
  const [png, setPng] = useState<string | null>(null);
  // 画像に渡される文字列
  const [wordWithImage, setWordWithImage] = useState<string>("");

  const [isRealTime, setIsRealTime] = useState(false);

  return (
    <Box display="flex" flexFlow="column">
      <ImgWithWord word={wordWithImage} parentPng={png} parentSetPng={setPng} />
      {png ? (
        <Stack gridGap={5}>
          <Textarea
            value={word}
            onChange={(event) => {
              setWord(() => event.target.value);
              isRealTime && setWordWithImage(() => event.target.value);
            }}
            placeholder="反省したいこと"
          />
          <Flex justifyContent="center" columnGap={3}>
            <Button
              onClick={() => {
                setWordWithImage(word);
              }}
            >
              生成する
            </Button>
            {canShare(dataUrlToShareData(png)) ? (
              <ShareButton dataURL={png} />
            ) : (
              <></>
            )}
            <Link href={png} download={`反省猫-${word}`} alignSelf="center">
              <Button as="a">
                <DownloadIcon height="100%" /> 画像をダウンロード
              </Button>
            </Link>
          </Flex>
          <Stack>
            <Checkbox
              margin={"auto"}
              isChecked={isRealTime}
              onChange={(event) =>
                event && event.target && setIsRealTime(event.target.checked)
              }
            >
              リアルタイム生成
            </Checkbox>
          </Stack>
        </Stack>
      ) : (
        <></>
      )}
    </Box>
  );
};
export default ImgWithWordInput;
