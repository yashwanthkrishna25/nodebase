// "use client"

import { requireAuth } from "@/lib/auth-utils"
import { caller } from "@/trpc/server";
import { LogoutButton} from "./logout";

// import { Button } from "@/components/ui/button";
// import { authClient } from "@/lib/auth-client";


// const Page = () => {
//   const {data} = authClient.useSession();


//   return (
//     <div className="min-h-screen min-w-screen flex items-center justify-center">
//      {JSON.stringify(data)}
//      {data && (
//      <Button onClick={() => authClient.signOut()}>
//       Logout
//      </Button>
//       )}
//     </div>
//   );
// };

// export default Page;



const Page = async () => {
  await requireAuth();

  const data = await caller.getUsers();

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      Protected server component
      <div>
      {JSON.stringify(data, null , 2)}
      </div>
      <LogoutButton />
      </div>
  );
};

export default Page;