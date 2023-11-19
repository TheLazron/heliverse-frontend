import { HStack, Select, Text, VStack, useRadioGroup } from "@chakra-ui/react";
import RadioCard from "./ui/radioCard";
import { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import qs from "qs";

const genders = ["Male", "Female", "Polygender", "Agender", "Bigender"];
const domains = [
  "Sales",
  "UI Design",
  "Finance",
  "Marketing",
  "Business Development",
  "IT",
];

interface FilterSectionProps {
  setQueryString: (value: string) => void;
}

const FilterSection = ({ setQueryString }: FilterSectionProps) => {
  const [genderValue, setGenderValue] = useState("");
  const [domainValue, setDomainValue] = useState("");
  const [availabilityValue, setAvailabilityValue] = useState<boolean | null>(
    null
  );

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
    });
    setQueryString(queryString);
  }, 500);
  useEffect(() => {
    updateQueryString();

    return () => updateQueryString.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genderValue, domainValue, availabilityValue]);

  return (
    <VStack width="90%" alignItems={"flex-start"} my={6}>
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
    </VStack>
  );
};

export default FilterSection;
