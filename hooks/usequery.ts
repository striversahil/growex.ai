import { QueryFunction, QueryKey, useQuery } from "@tanstack/react-query";

type QueryProps = {
  query: QueryKey;
  queryFn: QueryFunction<any, any>;
};

export const useQueryData = ({ query, queryFn }: QueryProps) => {
  return useQuery({
    queryKey: [query],
    queryFn,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
