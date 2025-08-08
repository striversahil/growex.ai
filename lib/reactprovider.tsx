"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const QueryProvider = (props: Props) => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>{props.children}</QueryClientProvider>
  );
};

export default QueryProvider;
