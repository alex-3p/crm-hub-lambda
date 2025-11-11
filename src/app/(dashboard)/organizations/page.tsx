"use client"

import * as React from "react"
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query"
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
import { useToast } from "@/hooks/use-toast";
import { getOrganizations, createOrganization, updateOrganization } from "@/lib/services/organization-service";
import type { Organization } from "@/lib/definitions";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { OrganizationForm } from "./organization-form";
import { Skeleton } from "@/components/ui/skeleton";

const queryClient = new QueryClient();

function OrganizationsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [editingOrg, setEditingOrg] = React.useState<Organization | null>(null);

  const { data: organizations, isLoading, isError, error } = useQuery<Organization[], Error>({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
  });

  const mutation = useMutation({
    mutationFn: (values: Partial<Organization>) => {
      if (values.id) {
        const { id, ...data } = values;
        return updateOrganization(id, data);
      }
      return createOrganization(values);
    },
    onSuccess: () => {
      toast({
        title: editingOrg ? "Organización Actualizada" : "Organización Creada",
        description: `La organización ha sido ${editingOrg ? 'actualizada' : 'creada'} exitosamente.`,
      });
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      closeSheet();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: `Ocurrió un error: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleFormSubmit = (values: any) => {
    mutation.mutate(values);
  };

  const openSheet = (org: Organization | null = null) => {
    setEditingOrg(org);
    setIsSheetOpen(true);
  };

  const closeSheet = () => {
    setEditingOrg(null);
    setIsSheetOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gestión de Organizaciones</CardTitle>
            <CardDescription>
              Gestione todas las organizaciones conectadas al Gateway Hub.
            </CardDescription>
          </div>
          <Button size="sm" className="gap-1" onClick={() => openSheet()}>
            <PlusCircle className="h-4 w-4" />
            Añadir Organización
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre de la Organización</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                  </TableRow>
                ))
              )}
              {isError && <TableRow><TableCell colSpan={4} className="text-center text-destructive">Error: {error.message}</TableCell></TableRow>}
              {organizations?.map((org) => (
                <TableRow key={org.id}>
                  <TableCell className="font-medium">{org.name}</TableCell>
                  <TableCell className="font-mono text-sm">{org.slug}</TableCell>
                  <TableCell>
                    <Badge variant={org.is_active ? 'outline' : 'destructive'} 
                      className={org.is_active ? 'text-green-600 border-green-600' : ''}>
                      {org.is_active ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openSheet(org)}>Editar</DropdownMenuItem>
                         <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">Desactivar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>{editingOrg ? "Editar Organización" : "Añadir Nueva Organización"}</SheetTitle>
                <SheetDescription>
                    {editingOrg ? "Edite los detalles de la organización." : "Rellene los detalles para crear una nueva organización."}
                </SheetDescription>
            </SheetHeader>
            <div className="py-4">
                <OrganizationForm
                    organization={editingOrg}
                    onSubmit={handleFormSubmit}
                    isPending={mutation.isPending}
                    onCancel={closeSheet}
                />
            </div>
        </SheetContent>
      </Sheet>
    </>
  );
}


export default function OrganizationsPageWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
        <OrganizationsPage />
    </QueryClientProvider>
  )
}
