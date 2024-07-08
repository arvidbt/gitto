// import { api } from "@/trpc/server";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// export default async function Dashboard() {
//   const repos = await api.github.getUserRepositories({ username: "arvidbt" });

//   console.log(repos);

//   return (
//     <div className="grid grid-cols-1 gap-2 p-3 md:grid-cols-3">
//       {repos.data.map((repo) => (
//         <Card
//           className="bg-github-secondary border-github-foreground text-github-white border-2"
//           key={repo.id}
//         >
//           <CardHeader className="pb-3">
//             <CardTitle className="text-lg">{repo.name}</CardTitle>
//           </CardHeader>
//           <CardFooter>
//             <Button>Share</Button>
//           </CardFooter>
//         </Card>
//       ))}
//     </div>
//   );
// }

import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/trpc/server";
import { auth } from "@/auth";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function Dashboard() {
  const session = await auth();
  const repos = await api.github.getUserRepositories({ username: "arvidbt" });

  console.log(repos);

  return (
    <div className="bg-github-secondary flex w-full flex-col items-center justify-center">
      <div className="flex max-w-7xl flex-col items-center justify-center gap-4 px-4 py-16">
        <div className="flex min-h-screen w-full flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
              <Card
                className="bg-github-secondary border-github-foreground text-github-white border-2 xl:col-span-2"
                x-chunk="dashboard-01-chunk-4"
              >
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>{session?.user?.name}s Repositories</CardTitle>
                    <CardDescription>
                      {" "}
                      All your repositories, public and private.
                    </CardDescription>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    className="text-github-white ml-auto gap-1 bg-green-500"
                  >
                    <Link href="#">
                      Share Repository
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {repos.data && (
                    <DataTable
                      data={repos.data.map(
                        ({
                          id,
                          name,
                          description,
                          updated_at,
                          html_url,
                          language,
                        }) => ({
                          id,
                          name,
                          description,
                          updated_at,
                          html_url,
                          language,
                        }),
                      )}
                      columns={columns}
                    />
                  )}
                </CardContent>
              </Card>
              <Card
                x-chunk="dashboard-01-chunk-5"
                className="bg-github-secondary border-github-foreground text-github-white border-2"
              >
                <CardHeader>
                  <CardTitle>Active Links</CardTitle>
                  <CardDescription>
                    Repositories that are accessible with password.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-8"></CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
