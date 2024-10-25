import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "../hooks/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../ui/form"
import { Section } from "lucide-react";

const SignUpForm = () => {
  const formSchema = z.object({
    first_name: z.string().min(1, { message: "Enter a Valid First Name" }),
    second_name: z.string().min(1, { message: "Enter a Valid Second Name" }),
    contact_number: z
      .string()
      .regex(/^(?:\+44|0)7\d{9}$/, "Enter a Valid UK Phone number"),
    business_name: z
      .string()
      .min(1, { message: "Enter a Valid Business Name" }),
    business_email: z.string().email("Enter a Valid"),
    business_address: z.object({
      street: z
        .string()
        .min(3, "Street name must be at least 3 characters long."),
      city: z.string().min(2, "City name must be at least 2 characters long."),
      postcode: z
        .string()
        .regex(
          /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i,
          "Invalid UK postcode format."
        ),
      country: z.string().default("United Kingdom").optional(),
    }),
    business_website: z.string().url("Invalid URL Format"),
    business_logo: z.object({
      file: z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: "File Size Must be below 5mb",
        })
        .refine((file) => ["image/png", "image/jpeg"].includes(file.type), {
          message: "File Must be a .png or a .jpeg",
        }),
    }).nullable(),
    consent: z.boolean().refine((val) => val === true, {
      message: "You Must Consent To Your Logo Being Used",
    }),
    email_consent: z.boolean(),
  });

  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
        first_name:"",
        second_name:"",
        contact_number:"",
        business_name:"",
        business_email:"",
        business_address:undefined,
        business_website:"",
        business_logo:undefined,
        consent:undefined,
        email_consent:undefined
    }
  })

  function onSubmit(data: z.infer<typeof formSchema>){
    toast({
        title:"You Submitted The Following Values:",
        description:(
            <pre className="mt-2 w-[340px] rounded -md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data,null,2)}</code>
            </pre>
        )
    })
  }

  return (
    <section>
        <div>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
        </div>
    </section>
  );
};

export default SignUpForm;
