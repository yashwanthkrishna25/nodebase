// import { cn } from "@/lib/utils";
// "use client";
// import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
// import { useEffect } from "react";

const Page= async ( ) => {
  // useEffect(() => {}, []);
  const users = await prisma.user.findMany();
  return (
  <div className="min-h-screen min-w-screen flex items-center justify-center">
   {JSON.stringify(users)}
    </div>
  );
};
export default Page;