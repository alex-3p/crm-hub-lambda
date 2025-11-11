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
import { getUsers, createUser, updateUser, deleteUser } from "@/lib/services/user-service";
import type { User } from "@/lib/definitions";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { UserForm } from "./user-form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";


const queryClient = new QueryClient();

function UsersPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState<User | null>(null);

  const { data: users, isLoading, isError, error } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const mutation = useMutation({
    mutationFn: (values: Partial<User> & { password?: string }) => {
      // If user has an ID, we're updating. Otherwise, creating.
      if (values.id) {
        const { id, ...data } = values;
        // Don't send empty password
        if (data.password === '') delete data.password;
        return updateUser(id, data);
      }
      return createUser(values as User);
    },
    onSuccess: () => {
      toast({
        title: editingUser ? "Usuario Actualizado" : "Usuario Creado",
        description: `El usuario ha sido ${editingUser ? 'actualizado' : 'creado'} exitosamente.`,
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
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

  const deleteMutation = useMutation({
      mutationFn: deleteUser,
      onSuccess: () => {
          toast({
              title: "Usuario Eliminado",
              description: "El usuario ha sido eliminado exitosamente.",
          });
          queryClient.invalidateQueries({ queryKey: ["users"] });
      },
      onError: (error: any) => {
          toast({
              title: "Error",
              description: `No se pudo eliminar el usuario: ${error.message}`,
              variant: "destructive",
          });
      },
  });


  const handleFormSubmit = (values: any) => {
    const dataToSend = { ...values };
    if (editingUser) {
        dataToSend.id = editingUser.id;
    }
    mutation.mutate(dataToSend);
  };

  const openSheet = (user: User | null = null) => {
    setEditingUser(user);
    setIsSheetOpen(true);
  };

  const closeSheet = () => {
    setEditingUser(null);
    setIsSheetOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gestión de Usuarios</CardTitle>
            <CardDescription>
              Añada, edite y gestione usuarios en su organización.
            </CardDescription>
          </div>
          <Button size="sm" className="gap-1" onClick={() => openSheet()}>
            <PlusCircle className="h-4 w-4" />
            Añadir Usuario
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Correo Electrónico</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                Array.from({ length: 4 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                        <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                    </TableRow>
                ))
              )}
              {isError && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-destructive">Error: {error.message}</TableCell>
                  </TableRow>
              )}
              {users?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.full_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                      {user.role}
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
                        <DropdownMenuItem onClick={() => openSheet(user)}>Editar</DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                                Eliminar
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará permanentemente al usuario.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteMutation.mutate(user.id)} className="bg-destructive hover:bg-destructive/90">
                                  {deleteMutation.isPending ? "Eliminando..." : "Eliminar"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
                <SheetTitle>{editingUser ? "Editar Usuario" : "Añadir Nuevo Usuario"}</SheetTitle>
                <SheetDescription>
                    {editingUser ? "Edite los detalles del usuario." : "Rellene los detalles para crear un nuevo usuario."}
                </SheetDescription>
            </SheetHeader>
            <div className="py-4">
                <UserForm
                    user={editingUser ?? undefined}
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

export default function UsersPageWrapper() {
    return (
        <QueryClientProvider client={queryClient}>
            <UsersPage />
        </QueryClientProvider>
    )
}
