import {
  HStack,
  Link,
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
  topTurnover, moreFields
}) => {
  return (
    <VStack
      width={[`100%`, `100%`, `auto`, `auto`]}
      paddingTop={`1rem`}
      maxW={[`350px`, `100%`]}
    >
      <HStack justifyContent={`flex-start`} width={`100%`}>
        <Tag colorScheme={`blue`} marginBottom={`1rem`}>
          {topTurnover?.date}
        </Tag>
      </HStack>
      <TableContainer width={`100%`}>
        <Table size={`sm`}>
          {
            !moreFields &&
            <TableCaption>
              <Link href="/market/top-turnovers" fontWeight={'600'}>View All</Link>
            </TableCaption>
          }
          <Thead>
            <Tr color={`blue.600`}>
              <Th>SN</Th>
              <Th>Symbol</Th>
              <Th>LTP</Th>
              <Th>Turnover</Th>
              {
                moreFields &&
                <>
                  <Th>% Change</Th>
                  <Th>Day High</Th>
                  <Th>Day Low</Th>
                  <Th>Opening Price</Th>
                </>
              }
              <Th>Quantity</Th>
            </Tr>
          </Thead>
          <Tbody>
            {topTurnover?.detail?.slice(0, moreFields ? -1 : 5).map((stock, index) => (
              <Tr color={`blue.700`} key={index}>
                <Td>{index+1}</Td>
                <Td>{stock.s}</Td>
                <Td>{(stock.lp).toLocaleString()}</Td>
                <Td>{(stock.t).toLocaleString()}</Td>
                {
                  moreFields &&
                  <>
                    <Td>{stock.pc}</Td>
                    <Td>{(stock.h).toLocaleString()}</Td>
                    <Td>{(stock.l).toLocaleString()}</Td>
                    <Td>{stock.op}</Td>
                  </>
                }
                <Td>{(stock.q).toLocaleString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};
