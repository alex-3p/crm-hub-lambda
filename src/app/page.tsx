import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Cuboid } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const crms = [
  {
    id: 'domus',
    name: 'Domus',
    description: 'El CRM inmobiliario líder para optimizar la gestión de propiedades y procesos de venta.',
    image: PlaceHolderImages.find(p => p.id === 'domus-logo'),
  },
  {
    id: 'siesa',
    name: 'Siesa',
    description: 'Soluciones integrales de ERP y CRM para empresas en crecimiento, unificando todas sus operaciones.',
    image: PlaceHolderImages.find(p => p.id === 'siesa-logo'),
  },
  {
    id: 'inventario-agil',
    name: 'Inventario Agil',
    description: 'Optimice su inventario y conéctelo sin problemas con sus canales de venta.',
    image: PlaceHolderImages.find(p => p.id === 'inventario-agil-logo'),
  },
  {
    id: 'wasi',
    name: 'Wasi',
    description: 'Una potente plataforma para que los profesionales inmobiliarios gestionen clientes y propiedades.',
    image: PlaceHolderImages.find(p => p.id === 'wasi-logo'),
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm bg-card">
        <Link className="flex items-center justify-center" href="#">
          <Cuboid className="h-6 w-6 text-primary" />
          <span className="ml-2 font-semibold text-lg">CRM Gateway Hub</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button asChild variant="default">
            <Link href="/login">
              Iniciar Sesión
              <LogInIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Plataforma Unificada de Gestión de CRM
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Conecte, gestione y sincronice sus datos a través de múltiples CRMs sin problemas. Nuestro Gateway Hub proporciona el sistema nervioso central para sus operaciones comerciales.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/login">
                      Comenzar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
               <Image
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                height="550"
                src={PlaceHolderImages.find(p => p.id === 'hero-connect')?.imageUrl || ''}
                data-ai-hint="abstract network connection"
                width="550"
              />
            </div>
          </div>
        </section>
        <section id="integrations" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Integraciones Soportadas</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nos conectamos con los CRMs líderes de la industria. Haga clic para configurar una integración y comenzar a sincronizar.
                </p>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {crms.map((crm) => (
                <Card key={crm.id} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                     {crm.image && <Image src={crm.image.imageUrl} alt={`${crm.name} logo`} width={40} height={40} className="rounded-md" data-ai-hint={crm.image.imageHint} />}
                    <CardTitle>{crm.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{crm.description}</CardDescription>
                  </CardContent>
                  <CardFooter>
                     <Button asChild className="w-full" variant="outline">
                      <Link href="/login">
                        Añadir Integración
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 CRM Gateway Hub. Todos los derechos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Términos de Servicio
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacidad
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function LogInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  );
}
