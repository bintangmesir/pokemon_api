import { Link } from "react-router-dom";
import { Button, Center, Text } from "@chakra-ui/react";

const Home = () => {
  const play = () => {
    document.getElementById("autoplay").play();
  };
  
  return (
    <Center h="100vh">
      <Link to="/pokemon">
        <Button colorScheme="orange" onClick={play} boxShadow="dark-lg" p={8}>
          <Text fontSize="xl">Let's Explore</Text>
        </Button>
      </Link>
    </Center>
  );
};

export default Home;