"use client";

import { useState, type ReactNode } from "react";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";

export function UrqlProvider({ children }: { children: ReactNode }) {
  // useState's initializer creates the client once per mount, not on every render.
  const [client] = useState(
    () =>
      new Client({
        url: "/api/graphql",
        exchanges: [cacheExchange, fetchExchange],
      })
  );

  return <Provider value={client}>{children}</Provider>;
}
