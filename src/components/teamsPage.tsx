/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Heading, SimpleGrid, Spinner, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppSelector } from "../store/hooks";
import TeamComponent from "./ui/teamsCard";

const TeamsPage = () => {
  const jwt = useAppSelector((state) => state.auth.jwtToken);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/teams", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setTeams(response.data.teams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setLoading(false);
      }
    };

    if (jwt) {
      fetchTeams();
    }
  }, [jwt]);

  return (
    <Flex width="100%" justifyContent={"center"}>
      <VStack alignItems={"center"} width="100%">
        <Heading>Teams</Heading>
        {loading ? (
          <Flex mt={12} width="100%" justifyContent="center">
            <Spinner />
          </Flex>
        ) : (
          <SimpleGrid
            width={"100%"}
            mt={8}
            columns={[1, 2, 3, 4]}
            spacing="20px"
          >
            {teams.map((team: any) => {
              return <TeamComponent key={team.id} team={team} />;
            })}
          </SimpleGrid>
        )}
      </VStack>
    </Flex>
  );
};

export default TeamsPage;
