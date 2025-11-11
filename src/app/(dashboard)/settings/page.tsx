import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

function DomusCredentialsForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Credenciales de Domus</CardTitle>
        <CardDescription>
          Configure los tokens de API y los parámetros operativos para la integración con Domus.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="domus-crm-token">Token de CRM</Label>
          <Input id="domus-crm-token" placeholder="Introduzca su Token de CRM" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="domus-inventory-token">Token de Inventario</Label>
          <Input id="domus-inventory-token" placeholder="Introduzca su Token de Inventario" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="domus-api-base">URL Base de API (Inmuebles)</Label>
          <Input id="domus-api-base" defaultValue="https://apiv3get.domus.la" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="domus-crm-base">URL Base de CRM</Label>
          <Input id="domus-crm-base" defaultValue="https://crm_api.domus.la" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="domus-inmobiliaria">ID Inmobiliaria</Label>
          <Input id="domus-inmobiliaria" type="number" defaultValue="1" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="domus-grupo">Grupo</Label>
          <Input id="domus-grupo" defaultValue="26007" />
        </div>
        <div className="flex items-center space-x-2 mt-4">
          <Checkbox id="domus-requiere-grupo" defaultChecked />
          <Label htmlFor="domus-requiere-grupo">Requiere Grupo</Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Guardar Credenciales de Domus</Button>
      </CardFooter>
    </Card>
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


export default function SettingsPage() {
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
