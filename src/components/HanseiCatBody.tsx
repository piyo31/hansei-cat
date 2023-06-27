import { Box, Card, CardBody, Flex, Stack, Text } from "@chakra-ui/react";
import ImgWithWordInput from "./ImgWithWordInput";
import ImgWithWord from "./ImgWithWord";

const HanseiCat = () => {
  return (
    <Flex alignItems="center" flexDirection="column">
      <Stack gridGap={2} p={3}>
        <Card maxW="2xl" w="100%" h="100%">
          <CardBody>
            <Text fontSize="2xl" textAlign="center" pb={3}>
              使い方
            </Text>
            <Flex flexDirection="column" alignItems="center" gridGap={2}>
              <Text textAlign="center">
                反省したいことを入力すると､猫が反省している画像が生成されます
              </Text>
            </Flex>
          </CardBody>
        </Card>
        <Card maxW="2xl" w="100%" h="100%">
          <CardBody>
            <ImgWithWordInput />
          </CardBody>
        </Card>

        <Card maxW="2xl" w="100%" h="100%">
          <CardBody>
            <Text fontSize="2xl" textAlign="center" pb={3}>
              使用例
            </Text>
            <ImgWithWord word="私は寝坊しました" />
            <ImgWithWord word={"私はお皿を\n割りました"} />
            <ImgWithWord word={"私はティッシュを\n散らかしました"} />
            <ImgWithWord word={"からっぽの\n炊飯器を\n保温にしました"} />
          </CardBody>
        </Card>
      </Stack>
    </Flex>
  );
};
export default HanseiCat;
