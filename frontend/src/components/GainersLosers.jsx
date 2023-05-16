import {
  Table,
  TableCaption,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  chakra,
} from "@chakra-ui/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

const GainersLoosers = ({
  stockDetails,
  activeOption,
}) => {
  const date = stockDetails.date;
  const [TOP_GAINERS, SET_TOP_GAINERS] = useState([]);
  const [TOP_LOOSERS, SET_TOP_LOOSERS] = useState([]);
  const [data, setData] = useState([]);
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("s", {
      cell: (info) => info.getValue(),
      header: "Symbol",
    }),
    columnHelper.accessor("lp", {
      cell: (info) => info.getValue(),
      header: "LTP",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("c", {
      cell: (info) => info.getValue(),
      header: "Change",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("pc", {
      cell: (info) => info.getValue(),
      header: "P. Change",
      meta: {
        isNumeric: true,
      },
    }),
  ];

  useEffect(() => {
    const data_with_pc = stockDetails?.detail?.map((item) => {
      const percentage_change = (item?.c / (item?.lp - item?.c)) * 100;
      return {
        ...item,
        pc: Math.round(percentage_change * 100) / 100,
      };
    });
    const sortedByChange = data_with_pc?.sort((a, b) => {
      return -(a?.pc - b?.pc);
    });
    const top_gainers = sortedByChange?.slice(0, 7);

    SET_TOP_GAINERS(top_gainers);

    const top_loosers_with_pc = sortedByChange?.reverse()?.slice(0, 7);

    SET_TOP_LOOSERS(top_loosers_with_pc);
  }, [stockDetails]);
  useEffect(() => {
    if (TOP_GAINERS) {
      if (activeOption === "Top Losers") {
        setData(TOP_LOOSERS);
      } else {
        setData(TOP_GAINERS);
      }
    }
  }, [activeOption, TOP_GAINERS, TOP_LOOSERS]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  if (TOP_GAINERS?.length === 0) {
    return <chakra.p>No data found!</chakra.p>;
  }
  return (
    <TableContainer paddingTop={`1rem`}>
      <Tag
        colorScheme={activeOption === "Top Gainers" ? "green" : "red"}
        marginBottom={`1rem`}
      >
        {date}
      </Tag>
      <Table maxWidth={`100% !important`} variant={`simple`} size={`sm`}>
        <TableCaption marginTop={`1rem`}>{activeOption}</TableCaption>
        <Thead maxW={`100% !important`} width={`100% !important`}>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr width={`100% !important`} key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  color={activeOption === "Top Gainers" ? "green" : "red.700"}
                  backgroundColor={`white`}
                  fontSize={`12px`}
                  maxW={`100px !important`}
                  key={header.id}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell, index) => (
                  <Td
                    fontWeight={`500`}
                    color={
                      activeOption === "Top Gainers" ? "green.600" : "red.600"
                    }
                    key={index}
                    backgroundColor={"white"}
                    maxWidth={`100px !important`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}

                    {cell.column.columnDef.header === "P. Change" ? " %" : ""}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default GainersLoosers;
