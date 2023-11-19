import { useForm, SubmitHandler } from "react-hook-form";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authslice";
import { AppDispatch } from "../store/store";
import { useAppSelector } from "../store/hooks";

export type LoginFormValues = {
  email: string;
  password: string;
};

const LoginCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const jwtToken = useAppSelector((state) => state.auth.jwtToken);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    console.log("data", data);
    dispatch(login(data));
    console.log("jwtToken", jwtToken);
    navigate("/home/");
  };

  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={"transparent"}
      w={"120"}
      mx={2}
    >
      <Stack spacing={8} maxW={"lg"}>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={14}>
          <Stack spacing={6} w={"120"}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isRequired id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  })}
                />
                {errors.email && (
                  <span className="text-red-300">Enter a valid input</span>
                )}
              </FormControl>

              <FormControl isRequired id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-red-300">This field is required</span>
                )}
              </FormControl>

              <Stack mt={4}>
                <Button
                  bg={"brand.primary"}
                  color={"white"}
                  _hover={{
                    bg: "brand.primary",
                    opacity: 0.4,
                  }}
                  type="submit"
                >
                  Log In
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginCard;
