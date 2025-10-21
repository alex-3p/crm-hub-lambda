import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Cuboid, LogInIcon, Globe, Briefcase, Boxes, Building2 } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const crms = [
  {
    id: 'domus',
    name: 'Domus',
    description: 'El CRM inmobiliario líder para optimizar la gestión de propiedades y procesos de venta.',
    icon: Globe,
  },
  {
    id: 'siesa',
    name: 'Siesa',
    description: 'Soluciones integrales de ERP y CRM para empresas en crecimiento, unificando todas sus operaciones.',
    icon: Briefcase,
  },
  {
    id: 'inventario-agil',
    name: 'Inventario Agil',
    description: 'Optimice su inventario y conéctelo sin problemas con sus canales de venta.',
    icon: Boxes,
  },
  {
    id: 'wasi',
    name: 'Wasi',
    description: 'Una potente plataforma para que los profesionales inmobiliarios gestionen clientes y propiedades.',
    icon: Building2,
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-connect');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm bg-card z-10">
        <Link className="flex items-center justify-center" href="#">
          <Cuboid className="h-6 w-6 text-primary" />
          <span className="ml-2 font-semibold text-lg">Lambda CRM Gateway Hub</span>
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
        <section className="relative w-full h-[80vh] flex items-center justify-center text-center text-white">
        {heroImage && (
            <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="z-0 object-cover"
                data-ai-hint={heroImage.imageHint}
                priority
            />
        )}
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="relative z-20 container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                Plataforma Unificada de Gestión de CRM
              </h1>
              <p className="max-w-[700px] text-lg text-white/90 md:text-xl">
                Conecte, gestione y sincronice sus datos a través de múltiples CRMs sin problemas. Nuestro Gateway Hub proporciona el sistema nervioso central para sus operaciones comerciales.
              </p>
              <div className="flex gap-4 mt-6">
                <Button asChild size="lg">
                  <Link href="/login">
                    Comenzar Ahora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="integrations" className="w-full py-12 md:py-20 lg:py-24 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-3">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Integraciones</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Conecte sus Herramientas Favoritas</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nos conectamos con los CRMs líderes de la industria para centralizar su información y optimizar sus flujos de trabajo.
                </p>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 justify-center">
              {crms.map((crm) => (
                <Card key={crm.id} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-primary/20 hover:shadow-lg flex flex-col w-full max-w-sm">
                  <CardHeader className="flex-grow-0">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <crm.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{crm.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
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
        <p className="text-xs text-muted-foreground">&copy; 2024 CRM Gateway Hub - Lambda. All rights reserved.</p>
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
