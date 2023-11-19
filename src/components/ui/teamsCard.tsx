import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

interface TeamCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  team: any;
}

const TeamsCard = ({ team }: TeamCardProps) => {
  return (
    <Card p={4}>
      <Flex direction="column" alignItems="center" gap={8}>
        <Heading size="sm">{team.name}</Heading>
        <AvatarGroup size="md" max={2}>
          {team.members.map((member) => {
            console.log("members", member);
            return <Avatar name={member.firstName} src={member.avatar} />;
          })}
        </AvatarGroup>
      </Flex>
    </Card>
  );
};

const TeamComponent = ({ team }: TeamCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box onClick={onOpen}>
        <TeamsCard team={team} />
      </Box>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{team.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody backgroundColor="brand.secondary">
            <Flex
              justifyContent={"center"}
              direction="column"
              alignItems={"center"}
              width="100%"
              gap={2}
            >
              {team.members.map((member) => (
                <Card
                  backgroundColor={"brand.white"}
                  p={4}
                  width="100%"
                  key={member.id}
                >
                  <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <HStack alignItems={"center"} gap={2}>
                      <Avatar name={member.firstName} src={member.avatar} />
                      <Text size="md">
                        {member.firstName} {member.lastName}
                      </Text>
                    </HStack>
                    <Badge
                      rounded="2xl"
                      size="md"
                      variant="subtle"
                      colorScheme={member.available ? "green" : "red"}
                    >
                      {member.available ? "Available" : "Unavailable"}
                    </Badge>
                  </Flex>
                </Card>
              ))}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TeamComponent;
