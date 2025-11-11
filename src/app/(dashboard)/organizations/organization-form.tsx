"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { Organization } from "@/lib/definitions"
import { Switch } from "@/components/ui/switch"

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  slug: z.string().min(3, "El slug debe tener al menos 3 caracteres."),
  is_active: z.boolean().default(true),
});


interface OrganizationFormProps {
  organization?: Organization | null;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isPending: boolean;
  onCancel: () => void;
}

export function OrganizationForm({ organization, onSubmit, isPending, onCancel }: OrganizationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: organization?.name || "",
      slug: organization?.slug || "",
      is_active: organization?.is_active ?? true,
    },
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const dataToSend: any = { ...values };
    if (organization) {
      dataToSend.id = organization.id;
    }
    onSubmit(dataToSend);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la Organización</FormLabel>
              <FormControl>
                <Input placeholder="Ej. Pailaquinta" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="Ej. pailaquinta" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Activa</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
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
