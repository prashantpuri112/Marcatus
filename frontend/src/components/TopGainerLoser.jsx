import { HStack, Spinner, Tag, VStack } from "@chakra-ui/react";
import { useState } from "react";
import GainersLoosers from "./GainersLosers";
import { TopTurnovers } from "./TopTurnover";

const TopGainerLoser = ({ data, isLoading }) => {
  const options = ["Top Gainers", "Top Losers"];
  const [activeOption, setActiveOption] = useState("Top Gainers");
  return (
    <VStack
      maxW={[`350px`, `100%`]}
      minH={"420px"}
      minW={"325px"}
      alignItems={`center`}
      padding={`1rem`}
      borderRadius={`8px`}
      boxShadow={'sm'}
      transition={`all 0.2s ease-in-out`}
      backgroundColor={'white'}
      border={[
        `2px solid green`,
        `2px solid green`,
        `2px solid green`,
        `none`,
        `none`,
      ]}
    >
      <HStack>
        {options.map((option, index) => {
          const isactive = option === activeOption;
          return (
            <Tag
              key={index}
              size={"sm"}
              outline={
                isactive
                  ? option === "Top Gainers"
                    ? `2px solid green`
                    : option === "Top Losers"
                      ? "2px solid red"
                      : "2px solid blue"
                  : `none`
              }
              colorScheme={
                option === "Top Gainers"
                  ? "green"
                  : option === "Top Losers"
                    ? "red"
                    : "blue"
              }
              transform={`auto`}
              borderRadius={`full`}
              cursor={`pointer`}
              transition={`transform 0.2s`}
              onClick={() => setActiveOption(option)}
              _hover={{
                translateY: `-2px`,
              }}
              as={"button"}
            >
              {option}
            </Tag>
          );
        })}
      </HStack>
      {data &&
        (activeOption === "Top Turnovers" ? (
          <TopTurnovers topTurnover={data.turnover} />
        ) : (
          <GainersLoosers
            stockDetails={data.stock}
            activeOption={activeOption}
          />
        ))}
      {isLoading && <Spinner />}
    </VStack>
  );
};
export default TopGainerLoser;
