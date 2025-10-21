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
        <CardTitle>{crmName} Credentials</CardTitle>
        <CardDescription>
          Enter the API credentials for {crmName} to activate the integration.
          Make sure the credentials have the required permissions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`${crmName}-api-key`}>API Key</Label>
          <Input id={`${crmName}-api-key`} placeholder="Enter your API Key" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${crmName}-api-secret`}>API Secret</Label>
          <Input id={`${crmName}-api-secret`} placeholder="Enter your API Secret" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${crmName}-url`}>API URL (if applicable)</Label>
          <Input id={`${crmName}-url`} placeholder="https://api.example.com" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save Credentials</Button>
      </CardFooter>
    </Card>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">CRM Integration Settings</h1>
        <p className="text-muted-foreground">
          Manage API credentials for your connected CRMs.
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
