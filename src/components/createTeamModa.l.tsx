import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineTeam } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";

type FormValues = {
  teamName: string;
  teamMembers: string[];
};

function CreateTeamModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const jwt = useAppSelector((state) => state.auth.jwtToken);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("submitted data ", data);
    console.log("members", selectedValues);
    const formData = {
      name: data.teamName,
      members: selectedValues,
    };

    console.log("formData", formData);

    axios
      .post("https://ary-backend.azurewebsites.net/api/teams", formData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        console.log("res", res);
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://ary-backend.azurewebsites.net/api/users", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        setProfiles(res.data.users);
        setLoading(false);
        console.log("Profiles from team creation", profiles);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [jwt]);
  //   const handleCheckboxChange = (value) => {
  //     setSelectedValues((prevValues) => {
  //       const stringValue = `${value}`;
  //       if (prevValues.includes(stringValue)) {
  //         return prevValues.filter((id) => id !== value);
  //       } else {
  //         return [...prevValues, stringValue];
  //       }
  //     });
  //   };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCheckboxChange = (value: any) => {
    setSelectedValues((prevValues) => {
      const stringValue = `${value}`;
      if (prevValues.includes(stringValue)) {
        return prevValues.filter((id) => id !== stringValue);
      } else {
        return [...prevValues, stringValue];
      }
    });
  };

  return (
    <>
      <Button onClick={onOpen}>
        <AiOutlineTeam />
        Create Team
      </Button>

      <Modal size="4xl" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Team</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  placeholder="Team Name"
                  type="text"
                  {...register("teamName", {
                    required: true,
                  })}
                />
                {errors.teamName && (
                  <span className="text-red-300">Enter a valid input</span>
                )}

                {loading ? (
                  <Flex mt={12} width="100%" justifyContent="center">
                    <Spinner />
                  </Flex>
                ) : (
                  //   <CheckboxGroup
                  //     value={selectedValues}
                  //     onChange={handleCheckboxChange}
                  //   >
                  <SimpleGrid
                    width={"100%"}
                    mt={8}
                    columns={[1, 2, 3, 4]}
                    spacing="20px"
                  >
                    {profiles.map((profile) => {
                      return (
                        <Checkbox
                          isChecked={selectedValues.includes(`${profile._id}`)}
                          //   isChecked={selectedValues.includes(profile._id)}
                          onChange={() => handleCheckboxChange(profile._id)}
                          //   onChange={() => {
                          //     console.log("checked");
                          //     setSelectedValues((values) => {
                          //       return [...values, profile._id];
                          //     });
                          //   }}
                          value={`${profile._id}`}
                          key={profile._id}
                        >
                          {profile.firstName} {profile.lastName}
                        </Checkbox>
                      );
                    })}
                  </SimpleGrid>
                  //   </CheckboxGroup>
                )}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Flex gap={4}>
                <Button type="submit">Create Team</Button>
                <Button onClick={onClose}>Close</Button>
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateTeamModal;
