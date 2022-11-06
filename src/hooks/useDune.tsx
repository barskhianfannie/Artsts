import useSwr, { SWRResponse } from "swr";
import {
  duneFetcher,
  duneResultsFetcher,
  duneStatusFetcher,
  ResultsDune,
  StatusDune,
  QueryDune,
} from "../utils/dune";
export const useDune = (
  queryId: number,
  onSuccess: (id: QueryDune) => void
): SWRResponse<QueryDune> => {
  const resp = useSwr([queryId], duneFetcher, {
    onSuccess,
  });
  return resp;
};
export const useDuneStatus = (
  executionId: string,
  shouldRevalidate: boolean
): SWRResponse<StatusDune> => {
  const resp = useSwr([executionId], duneStatusFetcher, {
    refreshInterval: shouldRevalidate ? 5000 : 10000000000,
  });
  return resp;
};
export const useDuneResults = (
  executionId: string
): SWRResponse<ResultsDune> => {
  const resp = useSwr([executionId], duneResultsFetcher);
  return resp;
};
