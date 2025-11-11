'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { createSession, deleteSession } from '@/lib/session';

const loginSchema = z.object({
  slug: z.string().min(3, 'Organization slug is required.'),
  email: z.string().email('Invalid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

export type FormState = {
  message: string;
  errors?: {
    slug?: string[];
    email?: string[];
    password?: string[];
    _form?: string[];
  }
};

export async function login(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { slug, email, password } = validatedFields.data;

  try {
    const response = await fetch(`https://integrations.lambdaanalytics.co/${slug}/api/accounts/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'An unknown error occurred.' }));
        return {
          message: 'Login failed.',
          errors: { _form: [errorData.detail || 'Invalid slug, credentials, or server error.'] },
        };
    }

    const data = await response.json();

    if (data.access && data.refresh && data.user) {
      await createSession({...data, slug });
    } else {
       return { message: 'Login failed', errors: { _form: ['Invalid response from server.'] } };
    }

  } catch (error) {
    if (error instanceof Error) {
        return { message: 'Login failed', errors: { _form: [error.message] } };
    }
    return { message: 'Login failed', errors: { _form: ['An unknown error occurred.'] } };
  }

  redirect('/dashboard');
}

export async function logout() {
    await deleteSession();
    redirect('/login');
}
