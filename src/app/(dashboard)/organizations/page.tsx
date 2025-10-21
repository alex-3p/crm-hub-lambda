import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, PlusCircle } from "lucide-react";

// Mock data for organizations
const organizations = [
  {
    id: 1,
    name: "Pailaquinta",
    slug: "pailaquinta",
    status: "Active",
    users: 5,
  },
  {
    id: 2,
    name: "Lambda Analytics",
    slug: "lambda",
    status: "Active",
    users: 25,
  },
  {
    id: 3,
    name: "Future Corp",
    slug: "future-corp",
    status: "Inactive",
    users: 0,
  },
];


export default function OrganizationsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Organization Management</CardTitle>
          <CardDescription>
            Manage all organizations connected to the Gateway Hub.
          </CardDescription>
        </div>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-4 w-4" />
          Add Organization
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organization Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.map((org) => (
              <TableRow key={org.id}>
                <TableCell className="font-medium">{org.name}</TableCell>
                <TableCell className="font-mono text-sm">{org.slug}</TableCell>
                <TableCell>
                  <Badge variant={org.status === 'Active' ? 'outline' : 'destructive'} 
                    className={org.status === 'Active' ? 'text-green-600 border-green-600' : ''}>
                    {org.status}
                  </Badge>
                </TableCell>
                <TableCell>{org.users}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View Users</DropdownMenuItem>
                       <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">Deactivate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
