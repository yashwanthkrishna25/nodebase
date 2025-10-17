// import { cn } from "@/lib/utils";
// "use client";

import { getQueryClient, trpc } from "@/trpc/server";
import { Client } from "./client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

// import { Button } from "@/components/ui/button";
// import { useTRPC } from "@/trpc/client";
// import { useQuery } from "@tanstack/react-query";
// import { Client } from "./client";
// import { caller } from "@/trpc/server";
// import { useEffect } from "react";
  // useEffect(() => {}, []);
 const Page = async () => {
//  const trpc = useTRPC();
//  const { data: users } = useQuery(trpc.getUsers.queryOptions());
 const  queryClient = getQueryClient();
 void queryClient.prefetchQuery(trpc.getUsers.queryOptions());
//  const { data: users } = useQuery({
// const users = await caller.getUsers();
  return (
  <div className="min-h-screen min-w-screen flex items-center justify-center">
    {/* <Client users={users} /> */}
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
    <Client/>
    </Suspense>
    </HydrationBoundary>
    </div>
  );
};
export default Page;