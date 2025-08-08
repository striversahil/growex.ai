import { useQueryData } from "@/hooks/usequery";
import { useMutationData } from "@/hooks/useMutation";
import { api } from "@/lib/api";

export const Project = {
  getChat: () => {
    return useQueryData({
      query: ["chat"],
      queryFn: async () => {
        const response = await api.get("/chat");
        return response.data;
      },
    });
  },
  getChatHistory: () => {
    return useQueryData({
      query: ["chatHistory"],
      queryFn: async () => {
        const response = await api.get("/chat/history");
        return response.data;
      },
    });
  },
};

export const ChatActions = {
  sendMessage: () => {
    return useMutationData({
      mutationKey: ["sendMessage"],
      mutationFn: async (payload: any) => {
        const response = await api.post("/chat", payload);
        return response.data;
      },
      queryKey: ["chat", "chatHistory"],
      optimisticFn: (previousData, variables) => {
        return {
          ...previousData,
          messages: [
            ...(previousData?.messages || []),
            { text: variables, sender: "user" },
          ],
        };
      },
    });
  },
  clearChatHistory: (payload: any) => {
    return useMutationData({
      mutationKey: ["clearChatHistory"],
      mutationFn: async () => {
        const response = await api.post("/chat/clear", payload);
        return response.data;
      },
      queryKey: ["chat", "chatHistory"],
    });
  },
};
