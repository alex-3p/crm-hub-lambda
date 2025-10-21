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

const crms = [
  {
    id: "domus",
    name: "Domus",
  },
  {
    id: "siesa",
    name: "Siesa",
  },
  {
    id: "inventario-agil",
    name: "Inventario Agil",
  },
  {
    id: "wasi",
    name: "Wasi",
  },
];

function CrmSettingsForm({ crmName }: { crmName: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Credenciales de {crmName}</CardTitle>
        <CardDescription>
          Introduzca las credenciales de la API para {crmName} para activar la integración.
          Asegúrese de que las credenciales tienen los permisos necesarios.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`${crmName}-api-key`}>Clave de API</Label>
          <Input id={`${crmName}-api-key`} placeholder="Introduzca su Clave de API" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${crmName}-api-secret`}>Secreto de API</Label>
          <Input id={`${crmName}-api-secret`} placeholder="Introduzca su Secreto de API" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${crmName}-url`}>URL de API (si aplica)</Label>
          <Input id={`${crmName}-url`} placeholder="https://api.example.com" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Guardar Credenciales</Button>
      </CardFooter>
    </Card>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Ajustes de Integración de CRM</h1>
        <p className="text-muted-foreground">
          Gestione las credenciales de API para sus CRMs conectados.
        </p>
      </div>
      <Tabs defaultValue="domus" className="w-full">
        <TabsList>
          {crms.map((crm) => (
            <TabsTrigger key={crm.id} value={crm.id}>
              {crm.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {crms.map((crm) => (
          <TabsContent key={crm.id} value={crm.id}>
            <CrmSettingsForm crmName={crm.name} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
