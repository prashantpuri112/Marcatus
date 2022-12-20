import { HStack } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/system";

export const DataStack = ({
  label,
  data,
}) => {
  return (
    <HStack width={`100%`} justifyContent={`space-between `}>
      <chakra.p fontSize={`1rem`} fontWeight={`light`}>
        {label}
      </chakra.p>
      <chakra.p fontSize={`1rem`} fontWeight={`regular`}>
        {data}
      </chakra.p>
    </HStack>
  );
};
