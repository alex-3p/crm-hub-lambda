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
import { Badge } from "@/components/ui/badge";

const endpoints = {
  inventario: [
    { method: "GET", path: "/inventario/export/", description: "Exportar inventario de propiedades" },
    { method: "GET", path: "/asesores/", description: "Listar asesores" },
    { method: "POST", path: "/asesores/crear/", description: "Crear un nuevo asesor" },
    { method: "GET", path: "/propietarios/", description: "Listar propietarios" },
    { method: "GET", path: "/proyectos/", description: "Listar proyectos" },
    { method: "GET", path: "/tipos-inmueble/", description: "Obtener tipos de inmueble" },
    { method: "GET", path: "/inmuebles/<codpro>/", description: "Ver detalle de un inmueble" },
  ],
  crmContactos: [
    { method: "GET/POST", path: "/crm/contactos/", description: "Colección de contactos (Listar/Crear)" },
    { method: "GET/PUT", path: "/crm/contactos/<contact_id>/", description: "Detalle de un contacto" },
    { method: "GET", path: "/crm/contactos/para-cita/", description: "Buscar contactos para una cita" },
    { method: "GET", path: "/crm/companias/perfiles/", description: "Obtener perfiles de compañía" },
  ],
  crmRelaciones: [
    { method: "POST", path: "/crm/entidades/vincular/", description: "Vincular una entidad" },
    { method: "POST", path: "/crm/capturas/", description: "Vincular una captura de lead" },
    { method: "POST", path: "/crm/tags-contacto/", description: "Asignar un tag a un contacto" },
    { method: "POST", path: "/crm/asignar-asesor/", description: "Reasignar un asesor a un contacto" },
    { method: "POST", path: "/crm/contacto/cambiar-estado/", description: "Cambiar estado de un contacto" },
  ],
  crmCitas: [
    { method: "GET", path: "/crm/citas/", description: "Listar citas" },
    { method: "GET", path: "/crm/citas/<appointment_id>/", description: "Detalle de una cita" },
    { method: "POST", path: "/crm/citas/crear/", description: "Crear una nueva cita" },
    { method: "POST", path: "/crm/citas/editar/", description: "Editar una cita existente" },
    { method: "GET", path: "/crm/disponible/calendario/", description: "Consultar disponibilidad de calendario" },
    { method: "GET", path: "/crm/disponible/agentes/", description: "Consultar agentes disponibles" },
    { method: "GET", path: "/crm/citas/tipos/", description: "Obtener tipos de cita" },
    { method: "GET", path: "/crm/sucursales/", description: "Listar sucursales" },
  ],
  configuracion: [
      { method: "GET/POST", path: "/credentials/", description: "Gestionar credenciales de Domus" },
  ],
  async: [
    { method: "POST", path: "/inventario/export/full/", description: "Iniciar exportación asíncrona de inventario" },
    { method: "GET", path: "/inventario/export/status/<task_id>/", description: "Ver estado de la tarea de exportación" },
  ],
};

function MethodBadge({ method }: { method: string }) {
    const colorMap: { [key: string]: string } = {
        GET: "bg-sky-500/20 text-sky-400 border-sky-500/30",
        POST: "bg-green-500/20 text-green-400 border-green-500/30",
        PUT: "bg-amber-500/20 text-amber-400 border-amber-500/30",
        "GET/POST": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
        "GET/PUT": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    };
    return <Badge variant="outline" className={`font-mono ${colorMap[method] || 'bg-gray-500/20'}`}>{method}</Badge>;
}


function EndpointsTable({ title, data }: { title: string, data: { method: string, path: string, description: string }[]}) {
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
                            <TableHead className="w-[350px]">Ruta del Endpoint</TableHead>
                            <TableHead>Descripción</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((ep) => (
                            <TableRow key={ep.path}>
                                <TableCell><MethodBadge method={ep.method} /></TableCell>
                                <TableCell><code className="font-mono text-sm bg-muted p-1 rounded-sm">{ep.path}</code></TableCell>
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
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold">Endpoints de la API de Domus</h1>
        <p className="text-muted-foreground">
          Referencia rápida de las rutas disponibles para la integración con Domus.
        </p>
      </div>

      <EndpointsTable title="Inventario y Propiedades" data={endpoints.inventario} />
      <EndpointsTable title="CRM - Contactos y Perfiles" data={endpoints.crmContactos} />
      <EndpointsTable title="CRM - Relaciones y Tags" data={endpoints.crmRelaciones} />
      <EndpointsTable title="CRM - Citas y Disponibilidad" data={endpoints.crmCitas} />
      <EndpointsTable title="Configuración" data={endpoints.configuracion} />
      <EndpointsTable title="Tareas Asíncronas" data={endpoints.async} />
    </div>
  );
}
