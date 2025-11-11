"use client"

import * as React from "react"
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { UserForm } from "@/app/(dashboard)/users/user-form" 
import { useToast } from "@/hooks/use-toast"
import { getUserDetails, updateUser } from "@/lib/services/user-service"
import type { User } from "@/lib/definitions"
import { Skeleton } from "@/components/ui/skeleton"

const queryClient = new QueryClient();

function getUserIdFromCookie(): string | null {
  if (typeof window === "undefined") return null;
  const cookie = document.cookie.split('; ').find(row => row.startsWith('session='));
  if (!cookie) return null;
  const value = cookie.split('=')[1];
  try {
    // Decode Base64
    const decodedValue = atob(value);
    const sessionData = JSON.parse(decodedValue);
    return sessionData.user?.id || null;
  } catch (error) {
    console.error("Failed to parse user data from cookie:", error);
    return null;
  }
}

function ProfilePage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [userId, setUserId] = React.useState<number | null>(null);

  React.useEffect(() => {
    // This runs only on the client, after hydration
    const idStr = getUserIdFromCookie();
    if (idStr) {
      setUserId(parseInt(idStr, 10));
    }
  }, []);

  const { data: user, isLoading, isError, error } = useQuery<User, Error>({
    queryKey: ["userDetail", userId],
    queryFn: () => getUserDetails(userId!),
    enabled: !!userId, // Only run query if userId is not null
  });

  const mutation = useMutation({
    mutationFn: (values: Partial<User> & { id: number }) => {
        const { id, ...data } = values;
        return updateUser(id, data);
    },
    onSuccess: (updatedUser) => {
      toast({
        title: "Perfil Actualizado",
        description: "Tu información ha sido actualizada exitosamente.",
      });
      queryClient.setQueryData(["userDetail", userId], updatedUser);
      // Optional: re-encrypt and set the session cookie if user details changed
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: `Ocurrió un error al actualizar tu perfil: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleFormSubmit = (values: any) => {
    if(user) {
        // Ensure we don't send an empty password
        if (values.password === '') {
            delete values.password;
        }
        mutation.mutate({ id: user.id, ...values });
    }
  };

  const shouldShowLoading = isLoading || !userId;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mi Perfil</CardTitle>
        <CardDescription>
          Aquí puedes actualizar tu información personal. Deja la contraseña en blanco si no deseas cambiarla.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {shouldShowLoading && (
          <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <div className="flex justify-end">
                <Skeleton className="h-10 w-24" />
              </div>
          </div>
        )}
        {isError && <p className="text-destructive">Error al cargar el perfil: {error.message}</p>}
        {user && !shouldShowLoading && (
          <UserForm 
            user={user} 
            onSubmit={handleFormSubmit}
            isPending={mutation.isPending}
            onCancel={() => {}} 
            isProfileForm={true}
          />
        )}
      </CardContent>
    </Card>
  )
}

export default function ProfilePageWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProfilePage />
    </QueryClientProvider>
  )
}
