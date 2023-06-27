import { Box } from "@chakra-ui/react";
import HanseiCatBody from "./components/HanseiCatBody";
import HanseiCatHeader from "./components/HanseiCatHeader";

const App = () => {
  return (
    <>
      <Box width="100%">
        <HanseiCatHeader />
      </Box>

      <HanseiCatBody />
    </>
  );
};

export default App;
