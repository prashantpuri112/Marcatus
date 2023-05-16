import { LiveMarketDataContext } from "../providers/LiveMarketDataProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react"

export const useLiveData = () => {
  const context = useContext(LiveMarketDataContext);
  const queryClient = useQueryClient();
  if (!context) {
    throw new Error("Context must be consumed inside a probider");
  }
  const refreshData = () => {
    queryClient.invalidateQueries(['marketData'])
  }
  return { ...context, refreshData };
}
