import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ExternalLink } from "lucide-react";

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

// Raw schema for validating the input as a string.
const rawSchema = z.object({
  bookId: z
    .string()
    .nonempty("Book ID is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Book ID must be a valid number",
    }),
});

// Transformed schema which converts the valid string to a number.
const transformedSchema = rawSchema.transform(({ bookId }) => ({
  bookId: Number(bookId),
}));

export const BookForm = () => {
  // Use the raw schema type so that defaultValues can be an empty string.
  const form = useForm<z.infer<typeof rawSchema>>({
    resolver: zodResolver(rawSchema),
    defaultValues: {
      bookId: "",
    },
  });

  // onSubmit receives the transformed values (bookId as number)
  function onSubmit(values: z.infer<typeof transformedSchema>) {
    console.log(values);
  }

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
