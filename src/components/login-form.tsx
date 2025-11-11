'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { login, type FormState } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export function LoginForm() {
  const initialState: FormState = { message: '', errors: {} };
  const [state, dispatch] = useActionState(login, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.errors?._form) {
      toast({
        variant: "destructive",
        title: "Fallo de Inicio de Sesión",
        description: state.errors._form.join(', '),
      })
    }
  }, [state, toast]);


  return (
    <form action={dispatch}>
      <Card>
        <CardHeader />
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="slug">Slug de la Organización</Label>
            <Input
              id="slug"
              name="slug"
              placeholder="ej. pailaquinta"
              required
              defaultValue="pailaquinta"
              aria-describedby="slug-error"
            />
            <div id="slug-error" aria-live="polite" aria-atomic="true">
              {state.errors?.slug &&
                state.errors.slug.map((error: string) => (
                  <p className="mt-2 text-sm text-destructive" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="usuario@empresa.com"
              required
              aria-describedby="email-error"
            />
             <div id="email-error" aria-live="polite" aria-atomic="true">
              {state.errors?.email &&
                state.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-destructive" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" name="password" type="password" required 
             aria-describedby="password-error"
            />
             <div id="password-error" aria-live="polite" aria-atomic="true">
              {state.errors?.password &&
                state.errors.password.map((error: string) => (
                  <p className="mt-2 text-sm text-destructive" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-4">
            <LoginButton />
        </CardFooter>
      </Card>
    </form>
  );
}

function LoginButton() {
    const { pending } = useFormStatus();
  
    return (
      <Button type="submit" className="w-full" aria-disabled={pending} disabled={pending}>
        {pending ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
      </Button>
    );
}
