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
} from "@chakra-ui/react";
import { BsSuitcaseLgFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";

interface ProfileCardProps {
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  available: boolean;
  domain: string;
  gender: string;
}

const ProfileCard = ({
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
        p={3}
        alignItems={"center"}
        justifyContent={"center"}
        bgColor={"brand.primary"}
      >
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
              as="h4"
              size="md"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {firstName} {lastName}
            </Heading>
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
            <HStack>
              <Icon as={BsSuitcaseLgFill} />
              <Text>{domain}</Text>
            </HStack>

            <Badge
              rounded="2xl"
              size="md"
              variant="subtle"
              colorScheme={available ? "green" : "red"}
            >
              {available ? "Available" : "Unavailable"}
            </Badge>
          </HStack>
        </VStack>
      </Flex>
    </Card>
  );
};

export default ProfileCard;
