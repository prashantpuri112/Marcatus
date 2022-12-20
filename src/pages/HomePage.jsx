import { OverallData } from "../components/OverallData";
import TopGainerLoser from "../components/TopGainerLoser";
import { useLiveData } from "../hooks/useLiveData";
import { Box, Flex } from "@chakra-ui/react";

export default function HomePage() {
  const { data, isLoading } = useLiveData();
  return (
    <Box width={'100%'} backgroundColor={'gray.50'} p={'1rem'}>
      <Flex maxW={'8xl'} mx={'auto'} gap={'2rem'}>
        <OverallData data={data} isLoading={isLoading} />
        <TopGainerLoser data={data} isLoading={isLoading} />
      </Flex>
    </Box>
  )
}
