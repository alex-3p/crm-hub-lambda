"use client"

import * as React from "react"
import {
  Card,
  CardContent,
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
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const endpoints = {
  inventario: [
    { method: "GET", path: "/inventario/local/", description: "Exportar inventario de propiedades (local)" },
    { method: "GET", path: "/inventario/export/local/", description: "Exportar inventario de propiedades (local)" },
    { method: "GET", path: "/asesores/", description: "Listar asesores" },
    { method: "POST", path: "/asesores/crear/", description: "Crear un nuevo asesor" },
    { method: "GET", path: "/propietarios/", description: "Listar propietarios" },
    { method: "GET", path: "/proyectos/", description: "Listar proyectos" },
    { method: "GET", path: "/tipos-inmueble/", description: "Obtener tipos de inmueble" },
    { method: "GET", path: "/inmuebles/<codpro>/", description: "Ver detalle de un inmueble por código" },
    { method: "GET", path: "/inmuebles/<codpro>/<idpro>/", description: "Ver detalle de un inmueble por código e ID" },
  ],
  crmContactos: [
    { method: "GET/POST", path: "/crm/contactos/", description: "Listar o crear contactos" },
    { method: "GET/PUT", path: "/crm/contactos/<contact_id>/", description: "Detalle de un contacto (lectura/escritura)" },
    { method: "GET", path: "/crm/contactos/para-cita/", description: "Buscar contactos disponibles para una cita" },
    { method: "GET", path: "/crm/companias/perfiles/", description: "Obtener perfiles de compañía" },
  ],
  crmRelaciones: [
    { method: "POST", path: "/crm/entidades/vincular/", description: "Vincular una entidad a un contacto" },
    { method: "POST", path: "/crm/capturas/", description: "Vincular una captura de lead a un contacto" },
    { method: "POST", path: "/crm/tags-contacto/", description: "Asignar un tag a un contacto" },
    { method: "POST", path: "/crm/asignar-asesor/", description: "Reasignar un asesor a un contacto" },
    { method: "POST", path: "/crm/contacto/cambiar-estado/", description: "Cambiar el estado de un contacto" },
    { method: "GET", path: "/crm/contacto-estado-consulta/<biz_id>/", description: "Consultar estado de un contacto por ID de negocio" },
  ],
  crmCitas: [
    { method: "GET", path: "/crm/citas/", description: "Listar todas las citas" },
    { method: "GET", path: "/crm/citas/<appointment_id>/", description: "Detalle de una cita específica" },
    { method: "POST", path: "/crm/citas/crear/", description: "Crear una nueva cita" },
    { method: "POST", path: "/crm/citas/editar/", description: "Editar una cita existente" },
    { method: "GET", path: "/crm/disponible/calendario/", description: "Consultar disponibilidad de calendario" },
    { method: "GET", path: "/crm/disponible/agentes/", description: "Consultar agentes disponibles" },
    { method: "GET", path: "/crm/disponibilidad/agentes/ranking/", description: "Ranking de agentes por disponibilidad" },
    { method: "POST", path: "/crm/crear-cita/auto/", description: "Agendar cita automáticamente" },
    { method: "GET", path: "/crm/citas/tipos/", description: "Obtener los tipos de cita disponibles" },
    { method: "GET", path: "/crm/sucursales/", description: "Listar sucursales" },
    { method: "POST", path: "/domus/crm/follows", description: "Crear un seguimiento (Follow-up) para una cita" },
  ],
  unifiedFlow: [
    { method: "ANY", path: "/crm/flujo-unificado/", description: "Inbox para el Flujo Unificado (Webhook)" },
    { method: "ANY", path: "/crm/flujo-unificado-automatizacion/", description: "Endpoint para automatización del Flujo Unificado" },
  ],
  configuracion: [
    { method: "GET/POST", path: "/credentials/", description: "Gestionar credenciales de API de Domus" },
  ],
async: [
    { method: "POST", path: "/inventario/export/full/", description: "Iniciar exportación asíncrona de todo el inventario" },
    { method: "GET", path: "/inventario/export/status/<task_id>/", description: "Ver estado de la tarea de exportación asíncrona" },
  ],
};

function getSlugFromCookie(): string | null {
  if (typeof window === "undefined") return null;
  const cookie = document.cookie.split('; ').find(row => row.startsWith('session='));
  if (!cookie) return null;
  const value = cookie.split('=')[1];
  try {
    const sessionData = JSON.parse(decodeURIComponent(value));
    return sessionData.slug || null;
  } catch (error) {
    return null;
  }
}

function MethodBadge({ method }: { method: string }) {
    const lowerMethod = method.toLowerCase();
    let colorClass = "bg-gray-500/20 text-gray-400 border-gray-500/30";
    if (lowerMethod.includes("get")) colorClass = "bg-sky-500/20 text-sky-400 border-sky-500/30";
    if (lowerMethod.includes("post")) colorClass = "bg-green-500/20 text-green-400 border-green-500/30";
    if (lowerMethod.includes("put")) colorClass = "bg-amber-500/20 text-amber-400 border-amber-500/30";
    if (lowerMethod.includes("get") && lowerMethod.includes("post")) colorClass = "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
    if (lowerMethod.includes("get") && lowerMethod.includes("put")) colorClass = "bg-indigo-500/20 text-indigo-400 border-indigo-500/30";
    if (lowerMethod.includes("any")) colorClass = "bg-purple-500/20 text-purple-400 border-purple-500/30";
    
    return <Badge variant="outline" className={`font-mono ${colorClass}`}>{method.toUpperCase()}</Badge>;
}


function EndpointsTable({ title, data, baseUrl }: { title: string, data: { method: string, path: string, description: string }[], baseUrl: string | null }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[120px]">Método</TableHead>
                            <TableHead className="w-[450px]">Ruta del Endpoint</TableHead>
                            <TableHead>Descripción</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((ep) => (
                            <TableRow key={ep.path}>
                                <TableCell><MethodBadge method={ep.method} /></TableCell>
                                <TableCell>
                                    {baseUrl ? 
                                        <code className="font-mono text-sm bg-muted p-1 rounded-sm">{baseUrl}{ep.path}</code> 
                                        : <Skeleton className="h-5 w-full" />
                                    }
                                </TableCell>
                                <TableCell>{ep.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default function DomusEndpointsPage() {
  const [baseUrl, setBaseUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
      const slug = getSlugFromCookie();
      if(slug) {
          setBaseUrl(`https://integrations.lambdaanalytics.co/${slug}/api/domus`);
      }
  }, []);

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold">Endpoints de la API de Domus</h1>
        <p className="text-muted-foreground">
          Referencia rápida de las rutas disponibles para la integración con Domus.
        </p>
      </div>

      <EndpointsTable title="Inventario y Propiedades" data={endpoints.inventario} baseUrl={baseUrl} />
      <EndpointsTable title="CRM - Contactos y Perfiles" data={endpoints.crmContactos} baseUrl={baseUrl} />
      <EndpointsTable title="CRM - Relaciones y Tags" data={endpoints.crmRelaciones} baseUrl={baseUrl} />
      <EndpointsTable title="CRM - Citas y Disponibilidad" data={endpoints.crmCitas} baseUrl={baseUrl} />
      <EndpointsTable title="Flujo Unificado" data={endpoints.unifiedFlow} baseUrl={baseUrl} />
      <EndpointsTable title="Configuración" data={endpoints.configuracion} baseUrl={baseUrl} />
      <EndpointsTable title="Tareas Asíncronas" data={endpoints.async} baseUrl={baseUrl} />
    </div>
  );
}
