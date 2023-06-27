import { DownloadIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Link, Stack, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import ImgWithWord from "./ImgWithWord";
import ShareButton, { canShare, dataUrlToShareData } from "./ShareButton";

const ImgWithWordInput = () => {
  const [word, setWord] = useState<string>("");
  const [png, setPng] = useState<string | null>(null);

  return (
    <Box display="flex" flexFlow="column">
      <ImgWithWord word={word} parentPng={png} parentSetPng={setPng} />
      {png ? (
        <Stack gridGap={5}>
          <Textarea
            value={word}
            onChange={(event) => setWord(event.target.value)}
            placeholder="反省したいこと"
          />
          <Flex justifyContent="center" columnGap={3}>
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
        </Stack>
      ) : (
        <></>
      )}
    </Box>
  );
};
export default ImgWithWordInput;
