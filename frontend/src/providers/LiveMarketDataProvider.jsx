import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect } from "react";

export const LiveMarketDataContext = createContext(null);


export const getLiveMarketData = () =>
  // axios.get("https://merolagani.com/handlers/webrequesthandler.ashx?type=market_summary")
axios.get("http://localhost:8080/api/market-summary")

export const LiveMarketDataProviderContext = ({
  children,
}) => {

  const { data, isLoading, isError, isFetching } = useQuery(
    ["marketData"],
    getLiveMarketData,
    { refetchInterval: 10000 }
  );
  return (
    <LiveMarketDataContext.Provider
      value={{ data: data?.data, isLoading, isError, isFetching }}
    >
      {children}
    </LiveMarketDataContext.Provider>
  );
};
