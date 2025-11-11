import { getSession } from "@/lib/session";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Building, Settings, CheckCircle, BarChart3, TrendingUp } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

// Mock data based on your backend API responses
const integrationStats = [
    { org__name: 'Pailaquinta', provider: 'domus', total: 1520 },
    { org__name: 'Pailaquinta', provider: 'epm', total: 340 },
    { org__name: 'Lambda Analytics', provider: 'google-calendar', total: 890 },
];

const userSummary = [
    { email: 'usuario@empresa.com', total_integraciones: 3, total_usos: 1860 },
    { email: 'ana.garcia@empresa.com', total_integraciones: 2, total_usos: 890 },
    { email: 'luis.t@empresa.com', total_integraciones: 1, total_usos: 50 },
];


export default async function DashboardPage() {
  const session = await getSession();

  const totalUsers = userSummary.length;
  const totalIntegrations = [...new Set(integrationStats.map(s => s.provider))].length;
  const totalApiUsage = integrationStats.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="space-y-6">
      <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-xl">
        <Image 
          src="https://miro.medium.com/v2/resize:fit:720/format:webp/0*AU3rmB08Vntf33Is"
          alt="Bienvenido al panel"
          fill
          className="object-cover"
          data-ai-hint="office workspace"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-headline">
              ¡Bienvenido, {session?.user?.full_name.split(' ')[0] || 'Admin'}!
            </h1>
            <p className="text-lg text-white/90">
                Aquí tienes un resumen rápido de tus integraciones de CRM.
            </p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Usuarios Activos
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Total de usuarios en la plataforma
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Integraciones Totales
            </CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalIntegrations}</div>
            <p className="text-xs text-muted-foreground">
              Proveedores de servicios conectados
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
                Uso Total de API
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApiUsage.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Llamadas totales este mes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Estado de la API
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Saludable</div>
            <p className="text-xs text-muted-foreground">
              Monitoreo 24/7
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Uso de API por Integración</CardTitle>
                <CardDescription>Llamadas a la API por organización y proveedor.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Organización</TableHead>
                            <TableHead>Proveedor</TableHead>
                            <TableHead className="text-right">Total de Usos</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {integrationStats.map((stat, index) => (
                            <TableRow key={index}>
                                <TableCell>{stat.org__name}</TableCell>
                                <TableCell><Badge variant="secondary">{stat.provider}</Badge></TableCell>
                                <TableCell className="text-right font-mono">{stat.total.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Resumen por Usuario</CardTitle>
                <CardDescription>Integraciones activas y uso de API por usuario.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Integraciones</TableHead>
                            <TableHead className="text-right">Uso de API</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userSummary.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{user.email}</TableCell>
                                <TableCell className="text-center">{user.total_integraciones}</TableCell>
                                <TableCell className="text-right font-mono">{user.total_usos.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
