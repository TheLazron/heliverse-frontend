import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

interface NavLayoutProps {
  children: ReactNode;
}

const NavLayout = ({ children }: NavLayoutProps): JSX.Element => {
  return (
    <Flex height="100%">
      {/* <Navbar /> */}
      <Flex flex="1">{children}</Flex>
    </Flex>
  );
};

export default NavLayout;
