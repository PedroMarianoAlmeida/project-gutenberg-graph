import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getBookText } from "@/services/gutenbergService";

const rawSchema = z.object({
  bookId: z
    .string()
    .nonempty("Book ID is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Book ID must be a valid number",
    }),
});

const transformedSchema = rawSchema.transform(({ bookId }) => ({
  bookId: Number(bookId),
}));

export const BookForm = () => {
  const [submittedBookId, setSubmittedBookId] = useState<number>(0);

  const form = useForm<z.infer<typeof rawSchema>>({
    resolver: zodResolver(rawSchema),
    defaultValues: {
      bookId: "",
    },
  });

  function onSubmit(values: z.infer<typeof transformedSchema>) {
    console.log(values);
    setSubmittedBookId(values.bookId);
  }

  const {
    data: bookText,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["getBookText", submittedBookId],
    queryFn: () => getBookText(submittedBookId),
    enabled: submittedBookId !== 0,
  });
  console.log({ bookText, error, isLoading });

  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            // Transform raw data using the transformed schema.
            const result = transformedSchema.safeParse(data);
            if (result.success) {
              onSubmit(result.data);
            } else {
              console.log(result.error);
            }
          })}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="bookId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book ID</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="47715" {...field} />
                </FormControl>
                <FormDescription className="flex gap-1 items-center justify-center">
                  <span>Book id from</span>
                  <a
                    href="https://www.gutenberg.org/"
                    className="hover:underline flex items-center gap-1 font-bold"
                    target="__blank"
                    rel="noopener noreferrer"
                  >
                    <span>Project Gutenberg</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </section>
  );
};
