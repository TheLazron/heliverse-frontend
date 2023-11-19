import {
  Avatar,
  Badge,
  Card,
  Flex,
  Heading,
  Text,
  Icon,
  VStack,
  HStack,
  Box,
} from "@chakra-ui/react";
import { BsSuitcaseLgFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import UpdateUserModal from "../updateUserModal";

interface ProfileCardProps {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  available: boolean;
  domain: string;
  gender: string;
}

const ProfileCard = ({
  id,
  avatar,
  firstName,
  lastName,
  available,
  domain,
  gender,
  email,
}: ProfileCardProps) => {
  return (
    <Card rounded={"lg"} overflow={"clip"}>
      <Flex
        position={"relative"}
        p={3}
        alignItems={"center"}
        justifyContent={"center"}
        bgColor={"brand.primary"}
      >
        <Box right={1} top={1} position={"absolute"}>
          <UpdateUserModal
            userData={{
              id,
              firstName,
              lastName,
              avatar,
              available,
              domain,
              gender,
            }}
          />
        </Box>
        <Avatar size="2xl" name="Dan Abrahmov" src={avatar} />
      </Flex>
      <Flex
        // width={{ base: "100%", md: "80%", lg: "70%", xl: "60%" }}
        py={3}
        px={2}
        bgColor={"brand.secondary"}
      >
        <VStack
          flex={"auto"}
          width="100%"
          spacing={3}
          alignItems={"flex-start"}
        >
          {/* <Flex alignItems={"center"} justifyContent="space-between"> */}
          <HStack justifyContent="space-between" p={2} width="100%">
            {/* <Heading color="brand.dark" as="h4" size="md">
              {firstName} {lastName}
            </Heading> */}
            <Heading
              color="brand.dark"
              size="md"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {firstName} {lastName}
            </Heading>
            <Badge
              rounded="2xl"
              size="md"
              variant="subtle"
              colorScheme={available ? "green" : "red"}
            >
              {available ? "Available" : "Unavailable"}
            </Badge>
          </HStack>

          {/* </Flex> */}
          <HStack>
            <Icon as={RxAvatar} />
            <Text>{gender}</Text>
          </HStack>
          <HStack>
            <Icon as={MdEmail} />
            <Text>{email}</Text>
          </HStack>
          <HStack justifyContent={"space-between"} width={"100%"}>
            <HStack justifyContent={"flex-start"}>
              <Icon as={BsSuitcaseLgFill} />
              <Text
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                textAlign={"left"}
              >
                {domain}
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </Flex>
    </Card>
  );
};

export default ProfileCard;
