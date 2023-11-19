import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiEditAlt } from "react-icons/bi";
import { domains, genders } from "./filtersSection";
import axios from "axios";
import { useAppSelector } from "../store/hooks";

type FormValues = {
  firstName: string;
  lastName: string;
  avatar: string;
  available: string | boolean;
  domain: string;
  gender: string;
};

interface UpdateUserModalProps {
  userData: {
    id: string;
  } & FormValues;
}

const UpdateUserModal = ({ userData }: UpdateUserModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const jwt = useAppSelector((state) => state.auth.jwtToken);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loggedUser: any = useAppSelector((state) => state.auth.user);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("submitted data ", data);
    if (!loggedUser) return;
    axios
      .put(
        `https://ary-backend.azurewebsites.net/api/users/${userData.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        console.log("res", res);
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUser = (id: string) => {
    axios
      .delete(`https://ary-backend.azurewebsites.net/api/users/${id}`, {
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
    setValue("firstName", userData.firstName);
    setValue("lastName", userData.lastName);
    setValue("avatar", userData.avatar);
    setValue("gender", userData.gender);
    setValue("domain", userData.domain);
    setValue("available", String(userData.available));
  }, []);

  return (
    <>
      <IconButton
        backgroundColor="brand.white"
        color="brand.dark"
        aria-label="Edit"
        isRound={true}
        onClick={onOpen}
        icon={<BiEditAlt />}
      />

      <Modal size="4xl" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New User</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl>
                <Flex>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    placeholder="First Name"
                    type="text"
                    {...register("firstName", {
                      required: true,
                    })}
                  />
                  {errors.firstName && (
                    <span className="text-red-300">Enter a valid input</span>
                  )}
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    placeholder="Last Name"
                    type="text"
                    {...register("lastName", {
                      required: true,
                    })}
                  />
                  {errors.lastName && (
                    <span className="text-red-300">Enter a valid input</span>
                  )}
                </Flex>
                <FormLabel>Avatar</FormLabel>
                <Input
                  placeholder="avatar URL"
                  type="url"
                  {...register("avatar", {
                    required: true,
                  })}
                />
                {errors.avatar && (
                  <span className="text-red-300">Enter a valid input</span>
                )}
                <FormLabel>Gender</FormLabel>
                <Select
                  placeholder="Select Gender"
                  {...register("gender", {
                    required: "Please select a gender",
                  })}
                >
                  {genders.map((value) => {
                    return <option value={value}>{value}</option>;
                  })}
                  {/* Add more options as needed */}
                </Select>
                <FormLabel>Domain</FormLabel>
                <Select
                  placeholder="Select Domain"
                  {...register("domain", {
                    required: "Please select a domain",
                  })}
                >
                  {domains.map((value) => {
                    return <option value={value}>{value}</option>;
                  })}
                  {/* Add more options as needed */}
                </Select>

                <FormLabel>Availability</FormLabel>
                <Select
                  placeholder="Select Availability"
                  {...register("available", {
                    required: "Please select this field",
                  })}
                >
                  <option value={"true"}>Available</option>
                  <option value={"false"}>Unavailable</option>
                  {/* Add more options as needed */}
                </Select>
              </FormControl>
            </ModalBody>
            <ModalFooter
              width="100%"
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Box>
                <Button
                  onClick={() => {
                    deleteUser(userData.id);
                  }}
                  colorScheme={"red"}
                >
                  Delete User
                </Button>
              </Box>
              <HStack spacing={2}>
                <Button type="submit">Submit</Button>
                <Button onClick={onClose}>Close</Button>
              </HStack>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateUserModal;
