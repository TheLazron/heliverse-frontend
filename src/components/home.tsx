/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Box, Button, Divider, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import ProfileCard from "./ui/profileCard";
import FilterSection from "./filtersSection";
import axios from "axios";
import { useAppSelector } from "../store/hooks";
import AddUserModal from "./AddUserModal";
import CreateTeamModal from "./createTeamModa.l";

const Home = () => {
  const jwt = useAppSelector((state) => state.auth.jwtToken);
  const [queryString, setQueryString] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [size] = useState(2);
  useEffect(() => {
    console.log(queryString);
    axios
      .get(
        `http://localhost:3000/api/users?page=${page}&pageSize=${size}${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        console.log("got these users", res.data);
        setProfiles((prevProfiles) => {
          return page > 1
            ? [...prevProfiles, ...res.data.users]
            : res.data.users;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [queryString, page]);

  return (
    <Flex
      width={"100%"}
      direction="column"
      alignItems="center"
      flexWrap={"wrap"}
      justifyContent="center"
    >
      <FilterSection setPage={setPage} setQueryString={setQueryString} />
      <Divider />
      <Flex width="90%" gap={4} justifyContent={"end"}>
        <AddUserModal />
        <CreateTeamModal />
      </Flex>
      <Flex flexWrap={"wrap"} width="90%">
        <SimpleGrid width={"100%"} mt={8} columns={[1, 2, 3, 4]} spacing="20px">
          {profiles.length > 0 ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            profiles?.map((profile: any) => {
              return (
                <ProfileCard
                  key={profile._id}
                  id={profile._id}
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
        <Box mt={8} width="100%">
          <Button
            onClick={() => {
              setPage((page) => page + 1);
            }}
            alignSelf={"center"}
          >
            Load More
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Home;
