import { CalendarIcon } from "@chakra-ui/icons";
import { Box, HStack, Skeleton, VStack, chakra, Tag } from "@chakra-ui/react";
import { DataStack } from "./DataStack";

export const OverallData = ({
  data,
  isLoading,
}) => {
  const Cols = [
    {
      label: "Total Turnover (Rs.)",
      accesor: "t",
    },
    {
      label: "Total Traded Shares",
      accesor: "q",
    },
    {
      label: "Total Transactions",
      accesor: "tn",
    },
    {
      label: "Total Scrips Traded",
      accesor: "st",
    },
    {
      label: "Total Market Capitalization (Rs.)",
      accesor: "mc",
    },
    {
      label: "Floating Market Capitalization (Rs.)",
      accesor: "fc",
    },
  ];
  if (isLoading) {
    return (
      <Box
        alignItems={`center`}
        padding={`1rem`}
        height={"300px"}
        width={"100%"}
        maxW={[`350px`, "300px", "300px", `100%`]}
        borderRadius={`8px`}
        transition={`all 0.2s ease-in-out`}
        overflow={"hidden"}
        border={[
          `2px solid green`,
          `2px solid green`,
          `2px solid green`,
          `none`,
          `none`,
        ]}
      >
        <Skeleton width={`100%`} height={"250px"} />
      </Box>
    );
  }
  return (
    <VStack
      backgroundColor={'white'}
      alignItems={`flex-start`}
      justifyContent={'flex-start'}
      padding={`1rem`}
      maxW={[`350px`, `100%`]}
      borderRadius={`8px`}
      boxShadow={'sm'}
      transition={`all 0.2s ease-in-out`}
      border={[
        `2px solid green`,
        `2px solid green`,
        `2px solid green`,
        `none`,
        `none`,
      ]}
    >
      <HStack
        flexWrap={`nowrap`}
        flexShrink={`0`}
        width={`100%`}
        justifyContent={'flex-start'}
      >
        <chakra.p
          fontSize={`1.2rem`}
          fontWeight={`bold`}
          borderBottom={`2px solid gray`}
        >
          Market Summary
        </chakra.p>
        <Tag colorScheme={`green`} width={`auto`} minW={`auto`}>
          <CalendarIcon marginRight={`10px`} />{" "}
          {data?.overall.d.split(" ")[0]}
        </Tag>
      </HStack>

      <VStack width={`100%`}>
        {data &&
          data.overall &&
          Cols.map((col, index) => (
            <DataStack
              key={index}
              data={data.overall[col.accesor]}
              label={col.label}
            />
          ))}
      </VStack>
    </VStack>
  );
};
