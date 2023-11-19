import { useState, useEffect } from "react";
import { Divider, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import ProfileCard from "./ui/profileCard";
import FilterSection from "./filtersSection";
import axios from "axios";
import { useAppSelector } from "../store/hooks";

const Home = () => {
  const jwt = useAppSelector((state) => state.auth.jwtToken);
  const [queryString, setQueryString] = useState("");
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    console.log(queryString);
    axios
      .get(`http://localhost:3000/api/users?${queryString}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        console.log("got these users", res.data);
        setProfiles(res.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [queryString]);
  return (
    <Flex
      width={"100%"}
      direction="column"
      alignItems="center"
      flexWrap={"wrap"}
      justifyContent="center"
    >
      <FilterSection setQueryString={setQueryString} />
      <Divider />
      <Text>Query String: {queryString}</Text>
      <Flex flexWrap={"wrap"} width="90%">
        <SimpleGrid width={"100%"} mt={8} columns={[1, 2, 3, 4]} spacing="20px">
          {profiles.length > 0 ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            profiles?.map((profile: any) => {
              return (
                <ProfileCard
                  key={profile.email}
                  avatar={profile.avatar}
                  email={profile.email}
                  firstName={profile.firstName}
                  lastName={profile.lastName}
                  gender={profile.gender}
                  domain={profile.domain}
                  available={profile.available}
                />
              );
            })
          ) : (
            <Text>No Profiles to Display</Text>
          )}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default Home;
