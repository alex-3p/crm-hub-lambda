"use client";

import * as React from "react";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getDomusCredentials, updateDomusCredentials } from "@/lib/services/domus-credentials-service";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";

const domusFormSchema = z.object({
  crm_token: z.string().min(1, "Token de CRM es requerido."),
  inventory_token: z.string().min(1, "Token de Inventario es requerido."),
  api_base: z.string().url("Debe ser una URL válida."),
  crm_base: z.string().url("Debe ser una URL válida."),
  inmobiliaria: z.coerce.number().int(),
  grupo: z.string(),
  requiere_grupo: z.boolean(),
});

function DomusCredentialsForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: credentials, isLoading: isLoadingCredentials } = useQuery({
    queryKey: ["domusCredentials"],
    queryFn: getDomusCredentials,
    retry: false, // Don't retry if it fails (e.g. 404)
  });

  const mutation = useMutation({
    mutationFn: updateDomusCredentials,
    onSuccess: () => {
      toast({
        title: "Credenciales Guardadas",
        description: "Las credenciales de Domus se han actualizado correctamente.",
      });
      queryClient.invalidateQueries({ queryKey: ["domusCredentials"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error al Guardar",
        description: `Ocurrió un error: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const form = useForm<z.infer<typeof domusFormSchema>>({
    resolver: zodResolver(domusFormSchema),
    values: {
      crm_token: credentials?.crm_token || "",
      inventory_token: credentials?.inventory_token || "",
      api_base: credentials?.api_base || "https://apiv3get.domus.la",
      crm_base: credentials?.crm_base || "https://crm_api.domus.la",
      inmobiliaria: credentials?.inmobiliaria || 1,
      grupo: credentials?.grupo || "26007",
      requiere_grupo: credentials?.requiere_grupo ?? true,
    },
    disabled: isLoadingCredentials,
  });
  
  const onSubmit = (values: z.infer<typeof domusFormSchema>) => {
    mutation.mutate(values);
  };
  
  if (isLoadingCredentials) {
      return (
          <Card>
            <CardHeader>
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
                {Array.from({ length: 7 }).map((_, i) => (
                    <div className="space-y-2" key={i}>
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ))}
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-40" />
            </CardFooter>
          </Card>
      );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Credenciales de Domus</CardTitle>
            <CardDescription>
              Configure los tokens de API y los parámetros operativos para la integración con Domus.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            <FormField control={form.control} name="crm_token" render={({ field }) => (
                <FormItem>
                  <FormLabel>Token de CRM</FormLabel>
                  <FormControl><Input type="password" placeholder="Introduzca su Token de CRM" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name="inventory_token" render={({ field }) => (
                <FormItem>
                  <FormLabel>Token de Inventario</FormLabel>
                  <FormControl><Input type="password" placeholder="Introduzca su Token de Inventario" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name="api_base" render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Base de API (Inmuebles)</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name="crm_base" render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Base de CRM</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name="inmobiliaria" render={({ field }) => (
                <FormItem>
                  <FormLabel>ID Inmobiliaria</FormLabel>
                  <FormControl><Input type="number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name="grupo" render={({ field }) => (
                <FormItem>
                  <FormLabel>Grupo</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name="requiere_grupo" render={({ field }) => (
              <FormItem className="flex items-center space-x-2 mt-4">
                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} id="requiere_grupo" /></FormControl>
                <Label htmlFor="requiere_grupo">Requiere Grupo</Label>
              </FormItem>
            )}/>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Guardando..." : "Guardar Credenciales de Domus"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

function EpmCredentialsForm() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Credenciales de EPM</CardTitle>
          <CardDescription>
            Configure los detalles de la cuenta de correo para la lectura de facturas de EPM.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
                <Label htmlFor="epm-correo">Correo de Ingreso a EPM</Label>
                <Input id="epm-correo" type="email" placeholder="usuario@example.com" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="epm-password-epm">Contraseña de EPM</Label>
                <Input id="epm-password-epm" type="password" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="epm-password-correo">Contraseña del Correo (OTP)</Label>
                <Input id="epm-password-correo" type="password" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="epm-tenant-id">Tenant ID (Outlook)</Label>
                <Input id="epm-tenant-id" placeholder="Si usa Outlook" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="epm-client-id">Client ID (Outlook)</Label>
                <Input id="epm-client-id" placeholder="Si usa Outlook" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="epm-client-secret">Client Secret (Outlook)</Label>
                <Input id="epm-client-secret" type="password" placeholder="Si usa Outlook" />
            </div>
        </CardContent>
        <CardFooter>
            <Button>Guardar Credenciales de EPM</Button>
        </CardFooter>
      </Card>
    );
}

function CalendarCredentialsForm() {
    return (
        <Tabs defaultValue="outlook" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="outlook">Outlook Calendar</TabsTrigger>
                <TabsTrigger value="google">Google Calendar</TabsTrigger>
            </TabsList>
            <TabsContent value="outlook">
                <Card>
                    <CardHeader>
                        <CardTitle>Credenciales de Outlook Calendar</CardTitle>
                        <CardDescription>
                        Configure las credenciales de la API de Microsoft Graph para la integración del calendario.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="outlook-client-id">Client ID</Label>
                            <Input id="outlook-client-id" placeholder="Azure AD App Client ID" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="outlook-client-secret">Client Secret</Label>
                            <Input id="outlook-client-secret" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="outlook-tenant-id">Tenant ID</Label>
                            <Input id="outlook-tenant-id" placeholder="Azure AD Tenant ID" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Guardar Credenciales de Outlook</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="google">
                 <Card>
                    <CardHeader>
                        <CardTitle>Credenciales de Google Calendar</CardTitle>
                        <CardDescription>
                        Configure las credenciales de la API de Google Calendar.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="google-client-id">Client ID</Label>
                            <Input id="google-client-id" placeholder="Google Cloud Console Client ID" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="google-client-secret">Client Secret</Label>
                            <Input id="google-client-secret" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Guardar Credenciales de Google</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}

const queryClient = new QueryClient();

function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Gestión de Credenciales</h1>
        <p className="text-muted-foreground">
          Gestione las credenciales de API para sus integraciones conectadas.
        </p>
      </div>
      <Tabs defaultValue="domus" className="w-full">
        <TabsList>
            <TabsTrigger value="domus">Domus</TabsTrigger>
            <TabsTrigger value="epm">EPM</TabsTrigger>
            <TabsTrigger value="calendars">Calendarios</TabsTrigger>
        </TabsList>
        <TabsContent value="domus">
            <DomusCredentialsForm />
        </TabsContent>
        <TabsContent value="epm">
            <EpmCredentialsForm />
        </TabsContent>
         <TabsContent value="calendars">
            <CalendarCredentialsForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function SettingsPageWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsPage />
    </QueryClientProvider>
  )
}
