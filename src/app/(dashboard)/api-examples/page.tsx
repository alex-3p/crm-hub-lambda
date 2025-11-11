import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function CodeBlock({ content }: { content: string }) {
    return (
        <div className="bg-muted/50 rounded-md p-4 my-4 overflow-x-auto">
            <pre><code className="text-sm font-mono text-foreground">{content}</code></pre>
        </div>
    )
}


export default function ApiExamplesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Ejemplos de Consumo de API</h1>
        <p className="text-muted-foreground">
          Guía práctica para interactuar con los endpoints principales del Gateway Hub.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>1. Autenticación (Login)</CardTitle>
          <CardDescription>
            Este es el primer paso para obtener los tokens de acceso necesarios para consumir el resto de la API.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="font-semibold">Endpoint:</p>
            <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sky-400 border-sky-500/30 bg-sky-500/20">POST</Badge>
                <code className="font-mono text-sm bg-muted p-1 rounded-sm">https://integrations.lambdaanalytics.co/{'{slug}'}/api/accounts/login/</code>
            </div>

            <p className="font-semibold mt-4">Cuerpo de la Solicitud (Body):</p>
            <p>Se debe enviar un objeto JSON con el email y la contraseña del usuario.</p>
            <CodeBlock content={`{
  "email": "alexander.rios@lambdaanalytics.co",
  "password": "unacontraseñasegura"
}`} />

            <p className="font-semibold mt-4">Respuesta Exitosa (200 OK):</p>
            <p>La API devuelve un token de refresco, un token de acceso y la información del usuario. El <code className="font-mono text-sm bg-muted p-1 rounded-sm">access</code> token es el que debe usarse en las cabeceras de las siguientes peticiones.</p>
            <CodeBlock content={`{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "id": 1,
        "email": "alexander.rios@lambdaanalytics.co",
        "full_name": "Jose Alexander Rios Trespalacios",
        "role": "Administrador"
    }
}`} />
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>2. Endpoint de Flujo Unificado (Domus)</CardTitle>
          <CardDescription>
            Este endpoint se utiliza para la ingesta de leads, citas y otra información relevante desde fuentes externas hacia el CRM de Domus.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="font-semibold">Endpoint:</p>
            <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sky-400 border-sky-500/30 bg-sky-500/20">POST</Badge>
                <code className="font-mono text-sm bg-muted p-1 rounded-sm">https://integrations.lambdaanalytics.co/{'{slug}'}/api/domus/crm/flujo-unificado/</code>
            </div>
            
            <p className="font-semibold mt-4">Cabeceras (Headers):</p>
            <p>Esta es una ruta protegida y requiere el token de acceso obtenido en el login.</p>
            <CodeBlock content={`{
  "Authorization": "Bearer {access_token}"
}`} />

            <p className="font-semibold mt-4">Cuerpo de la Solicitud (Body):</p>
            <p>El cuerpo es un objeto JSON complejo que contiene toda la información del lead o la cita a crear.</p>
            <CodeBlock content={`{
  "name": "Daniel",
  "email": "estebanmerchan99@gmail.com",
  "phones": [
    { "phone": "3117915613", "phone_type": 2, "phone_indicative": 1 }
  ],
  "address": "EDIFICIO ESTEFAN PISO 4 SIN ASCENSOR",
  "comment": "El usuario desea arrendar un apartamento en Bogota, zona centro.",
  "endHour": "11:00",
  "profile": { "code": "898" },
  "entity_id": "2713982",
  "startDate": "2025-12-12",
  "startHour": "10:00",
  "description": "Hola",
  "follow_type_id": 5,
  "appointment_type": "2695"
}`} />

            <p className="font-semibold mt-4">Respuesta Exitosa (200 OK):</p>
            <p>La API confirma la recepción y almacenamiento del payload, indicando que será procesado de forma asíncrona.</p>
            <CodeBlock content={`{
    "id": "42559d56-3d65-4dee-b430-d76690ce5fbe",
    "org": "28a253fe-c8d0-4387-a835-5871e7e42631",
    "integration_provider": "domus",
    "phone": "3117915613",
    "payload": { ... },
    "status": 3,
    "notes": "Ingesta OK",
    "raw_headers": { ... },
    "received_at": "2025-11-11T03:36:29.295530-05:00",
    "processed_at": null,
    "ok": true,
    "message": "Payload almacenado y pronto será agendado. Estado=PENDIENTE (3)."
}`} />
        </CardContent>
      </Card>
    </div>
  );
}
