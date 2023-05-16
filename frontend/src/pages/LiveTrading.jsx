import { OverallData } from "../components/OverallData";
import { useLiveData } from "../hooks/useLiveData";
import {
  Badge,
  Box,
  HStack,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";

const LiveTrading = () => {
  const { data, isLoading } = useLiveData();
  return (
    <Box bg={'gray.100'} w={'100%'} py={8}>
      <Box maxW={'6xl'} mx={'auto'} >
        <OverallData data={data} isLoading={isLoading} viewMore={true} />
        <VStack
          mt={4}
          bg={'white'} rounded={'md'}
          width={[`100%`, `100%`, `auto`, `auto`]}
          paddingTop={`1rem`}
          maxWidth={'8xl'}
          mx={'auto'}
        >
          <HStack justifyContent={`flex-start`} width={`100%`} px={4}>
            <Text>Live Market As Of: </Text>
            <Badge variant={'subtle'} py={1} px={2} rounded={'md'} colorScheme="green" fontWeight={'bold'} my={4} mx={4}>{data?.stock.date}</Badge>
          </HStack>
          <TableContainer width={`100%`}>
            {isLoading && (
              <Spinner />
            )}
            <Table size={`sm`}>
              <TableCaption>Live Market</TableCaption>
              <Thead>
                <Tr color={`blue.600`}>
                  <Th pb={5}>SN</Th>
                  <Th pb={5}>Symbol</Th>
                  <Th pb={5}>LTP</Th>
                  <Th pb={5}>P Close</Th>
                  <Th pb={5}>Difference</Th>
                  <Th pb={5}>% Change</Th>
                  <Th pb={5} isNumeric>Quantity</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.stock.detail.map((stock, index) => (
                  <Tr color={`blue.700`} key={index} bg={stock.c > 0 ? '#00b321' : stock.c === 0 ? '#e38100' : '#ff1f35'} textColor={'white'}>
                    <Td>{index + 1}</Td>
                    <Td>{stock.s}</Td>
                    <Td>{stock.lp}</Td>
                    <Td>{(stock.lp - stock.c).toFixed(2)}</Td>
                    <Td>{stock.c}</Td>
                    <Td>{((stock.c / (stock.lp - stock.c)) * 100).toFixed(2)}</Td>
                    <Td isNumeric>{stock.q}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </Box>
    </Box>
  );
};
export default LiveTrading;
