"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { User } from "@/lib/definitions"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  full_name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce un correo electrónico válido."),
  password: z.string().optional(),
  role: z.string().min(1, "El rol es requerido."),
});

const profileFormSchema = z.object({
  full_name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce un correo electrónico válido."),
  password: z.string().optional(),
});


interface UserFormProps {
  user?: User;
  onSubmit: (values: any) => void;
  isPending: boolean;
  onCancel: () => void;
  isProfileForm?: boolean;
}

export function UserForm({ user, onSubmit, isPending, onCancel, isProfileForm = false }: UserFormProps) {
  const schema = isProfileForm ? profileFormSchema : formSchema;
  
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: user?.full_name || "",
      email: user?.email || "",
      password: "",
      ...(!isProfileForm && { role: user?.role || "" }),
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre Completo</FormLabel>
              <FormControl>
                <Input placeholder="Ej. Juan Pérez" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input placeholder="usuario@empresa.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                {isProfileForm ? 'Dejar en blanco para no cambiar la contraseña.' : (user ? 'Dejar en blanco para no cambiarla.' : 'La contraseña es requerida para nuevos usuarios.')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isProfileForm && 'role' in form.control.defaultValuesRef.current && (
            <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Rol</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccione un rol" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Agent">Agent</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
        )}
        <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
                Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
                {isPending ? "Guardando..." : "Guardar Cambios"}
            </Button>
        </div>
      </form>
    </Form>
  )
}
