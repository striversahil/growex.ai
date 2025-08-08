import {
  MutationFunction,
  MutationKey,
  QueryClient,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

type MutationProps = {
  mutationKey: MutationKey;
  mutationFn: MutationFunction<any, any>;
  queryKey: QueryKey[];
  optimisticFn?: (previousData: any, variables: any) => any;
  onSuccess?: () => void;
};

export const useMutationData = ({
  mutationKey,
  mutationFn,
  queryKey,
  onSuccess,
  optimisticFn,
}: MutationProps) => {
  const client = useQueryClient();

  return useMutation({
    mutationKey,
    mutationFn,
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      } else {
        console.log("Mutation successful");
      }
    },
    onMutate: async (variables) => {
      await client.cancelQueries({
        queryKey: queryKey,
        exact: true,
      });
      // Optimistic update to the cache
      const previousData = client.getQueryData([queryKey[0]]);
      client.setQueryData(
        [queryKey[0]],
        optimisticFn
          ? optimisticFn(previousData, variables)
          : (previousData: any, variables: any) => ({
              ...previousData,
              ...variables,
            })
      );
      return { variables, previousData };
    },
    onSettled: () => {
      queryKey?.forEach((key) => {
        // Invalidate the query to refetch data after mutation
        client.invalidateQueries({ queryKey: [key], exact: true });
      });
    },
  });
};
