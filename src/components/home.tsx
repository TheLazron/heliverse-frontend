// import { useAppSelector } from "../store/hooks";

import { Flex, SimpleGrid } from "@chakra-ui/react";
import ProfileCard from "./ui/profileCard";

const Home = () => {
  // const user = useAppSelector((state) => state.auth.user);
  return (
    <Flex
      width={"100%"}
      direction="column"
      alignItems="center"
      flexWrap={"wrap"}
      justifyContent="center"
    >
      <h1>Home</h1>
      {/* <h2>{user?.email}</h2> */}
      <Flex flexWrap={"wrap"} width="90%">
        <SimpleGrid width={"100%"} mt={8} columns={[1, 2, 3, 4]} spacing="20px">
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default Home;
