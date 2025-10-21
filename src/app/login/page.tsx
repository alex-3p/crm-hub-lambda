import { LoginForm } from '@/components/login-form';
import Link from 'next/link';
import { Cuboid } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-secondary/50">
      <div className="w-full max-w-md p-8 space-y-8">
        <div className="flex flex-col items-center">
          <Link className="flex items-center justify-center mb-6" href="/">
            <Cuboid className="h-8 w-8 text-primary" />
            <span className="ml-3 font-semibold text-2xl">Lambda CRM Gateway Hub</span>
          </Link>
          <h1 className="text-2xl font-bold text-center">Bienvenido de Nuevo</h1>
          <p className="text-muted-foreground text-center">
            Introduce tus credenciales para acceder a tu panel.
          </p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-muted-foreground">
          ¿No tienes una cuenta?{' '}
          <Link href="#" className="underline underline-offset-4 hover:text-primary">
            Contactar a soporte
          </Link>
        </p>
      </div>
    </main>
  );
}
