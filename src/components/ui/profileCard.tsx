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

const ProfileCard = () => {
  return (
    <Card rounded={"lg"} overflow={"clip"}>
      <Flex
        p={3}
        alignItems={"center"}
        justifyContent={"center"}
        bgColor={"brand.primary"}
      >
        <Avatar
          size="2xl"
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
        />
      </Flex>
      <Flex
        // width={{ base: "100%", md: "80%", lg: "70%", xl: "60%" }}
        py={3}
        px={2}
        bgColor={"brand.secondary"}
      >
        <VStack width="100%" spacing={3} alignItems={"flex-start"}>
          {/* <Flex alignItems={"center"} justifyContent="space-between"> */}
          <HStack justifyContent="space-between" p={2} width="100%">
            <Heading color="brand.dark" as="h4" size="md">
              John Doe
            </Heading>
            <Badge
              rounded="2xl"
              size="2xl"
              variant="subtle"
              colorScheme="green"
            >
              Available
            </Badge>
          </HStack>

          {/* </Flex> */}
          <HStack>
            <Icon as={RxAvatar} />
            <Text>Male</Text>
          </HStack>
          <HStack>
            <Icon as={MdEmail} />
            <Text>john.doe@gmail.com</Text>
          </HStack>
          <HStack>
            <Icon as={BsSuitcaseLgFill} />
            <Text>Marketing</Text>
          </HStack>
        </VStack>
      </Flex>
    </Card>
  );
};

export default ProfileCard;
