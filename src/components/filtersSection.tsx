import {
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  VStack,
  useRadioGroup,
} from "@chakra-ui/react";
import RadioCard from "./ui/radioCard";
import { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import qs from "qs";
import { SearchIcon } from "@chakra-ui/icons";

export const genders = ["Male", "Female", "Polygender", "Agender", "Bigender"];
export const domains = [
  "Sales",
  "UI Design",
  "Finance",
  "Marketing",
  "Business Development",
  "IT",
];

interface FilterSectionProps {
  setQueryString: (value: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setPage: any;
}

const FilterSection = ({ setQueryString, setPage }: FilterSectionProps) => {
  const [genderValue, setGenderValue] = useState("");
  const [domainValue, setDomainValue] = useState("");
  const [availabilityValue, setAvailabilityValue] = useState<boolean | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  //radiocard
  const options = [
    { label: "Available", value: true },
    { label: "Unavailable", value: false },
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: (value: unknown) => {
      console.log(value);
      setAvailabilityValue(value as boolean);
    },
  });

  const group = getRootProps();

  const updateQueryString = debounce(() => {
    const queryString = qs.stringify({
      gender: genderValue,
      domain: domainValue,
      available: availabilityValue,
      name: searchQuery,
    });
    setQueryString(queryString);
  }, 500);
  useEffect(() => {
    updateQueryString();
    setPage(1);

    return () => updateQueryString.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genderValue, domainValue, availabilityValue, searchQuery]);

  return (
    // <VStack alignItems={"flex-start"}>
    <VStack spacing={5} width="90%" alignItems={"flex-start"} my={6}>
      <HStack spacing={5}>
        <HStack>
          <Text fontWeight={"medium"}>Gender:</Text>
          <Select
            placeholder="Select option"
            value={genderValue}
            onChange={(e) => {
              setGenderValue(e.target.value);
            }}
          >
            {genders.map((value) => {
              return <option value={value}>{value}</option>;
            })}
          </Select>
        </HStack>
        <HStack>
          <Text fontWeight={"medium"}>Domain:</Text>
          <Select
            placeholder="Select option"
            value={domainValue}
            onChange={(e) => {
              setDomainValue(e.target.value);
            }}
          >
            {domains.map((value) => {
              return <option value={value}>{value}</option>;
            })}
          </Select>
        </HStack>
        <HStack>
          <Text fontWeight={"medium"}>Availability:</Text>
          <HStack {...group}>
            {options.map((value) => {
              const radio = getRadioProps({ value: value.value });
              return (
                <RadioCard key={value.label} {...radio}>
                  {value.label}
                </RadioCard>
              );
            })}
          </HStack>
        </HStack>
      </HStack>
      <InputGroup width="70%">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          type="text"
          placeholder="Search Users By Name"
        />
      </InputGroup>
    </VStack>
    // </VStack>
  );
};

export default FilterSection;
