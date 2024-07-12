"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  id: z.number(),
  full_name: z.string(),
  name: z.string(),
});

type Props = {
  data: z.infer<typeof FormSchema>[];
};

export function SelectForm({ data }: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: 1,
      full_name: "",
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success(`Creating ${data.name}`, {
      unstyled: false,
      classNames: {
        toast: "bg-github-green",
      },
    });

    const parts = data.name.split("/");
    const owner = parts[0];
    const repo = parts[1];

    router.push(
      `/create/${encodeURIComponent(owner!)}/${encodeURIComponent(repo!)}`,
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-github-foreground bg-github-secondary text-github-white ">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="border-github-foreground bg-github-secondary text-github-white ">
                  {data.map((repo) => (
                    <SelectItem value={repo.full_name} key={repo.id}>
                      {repo.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
              <FormDescription>
                Creating a shareable repository does not change the visibility
                of your Github repository.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-github-green hover:bg-github-green/80"
        >
          Create
        </Button>
      </form>
    </Form>
  );
}
