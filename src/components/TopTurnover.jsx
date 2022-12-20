import {
  HStack,
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
export const TopTurnovers = ({
  topTurnover,
}) => {
  return (
    <VStack
      width={[`100%`, `100%`, `auto`, `auto`]}
      paddingTop={`1rem`}
      maxW={[`350px`, `100%`]}
    >
      <HStack justifyContent={`flex-start`} width={`100%`}>
        <Tag colorScheme={`blue`} marginBottom={`1rem`}>
          {topTurnover.date}
        </Tag>
      </HStack>
      <TableContainer width={`100%`}>
        <Table size={`sm`}>
          <TableCaption>Top Turnover</TableCaption>
          <Thead>
            <Tr color={`blue.600`}>
              <Th>Symbol</Th>
              <Th>LTP</Th>
              {/* <Th>Change</Th> */}
              <Th>Turnover</Th>
              <Th>Quantity</Th>
            </Tr>
          </Thead>
          <Tbody>
            {topTurnover?.detail?.slice(0, 7).map((stock, index) => (
              <Tr color={`blue.700`} key={index}>
                <Td>{stock.s}</Td>
                <Td>{stock.lp}</Td>
                {/* <Td>{(stock.lp - stock.op)}</Td> */}
                <Td>{stock.t}</Td>
                <Td>{stock.q}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};
