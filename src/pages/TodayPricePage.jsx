import { useLiveData } from "../hooks/useLiveData";
import {
  HStack,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";

const TodayPricePage = () => {
  const { data, isLoading } = useLiveData();
  return (
    <VStack
      width={[`100%`, `100%`, `auto`, `auto`]}
      paddingTop={`1rem`}
      maxWidth={'8xl'}
      mx={'auto'}
    >
      <HStack justifyContent={`flex-start`} width={`100%`}>
      </HStack>
      <TableContainer width={`100%`}>
        {isLoading && (
          <Spinner />
        )}
        <Table size={`sm`}>
          <TableCaption>Market</TableCaption>
          <Thead>
            <Tr color={`blue.600`}>
              <Th>Symbol</Th>
              <Th>LTP</Th>
              <Th>Change</Th>
              <Th>Quantity</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.stock.detail.map((stock, index) => (
              <Tr color={`blue.700`} key={index}>
                <Td>{stock.s}</Td>
                <Td>{stock.lp}</Td>
                <Td>{stock.c}</Td>
                <Td>{stock.q}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};
export default TodayPricePage;
