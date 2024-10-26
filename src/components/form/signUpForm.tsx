"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {  useToast } from "../hooks/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const SignUpForm = () => {
  const formSchema = z.object({
    first_name: z.string().min(2, { message: "Enter a Valid First Name" }),
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
    // business_website: z.string().url("Invalid URL Format"),
    // business_logo: z
    //   .object({
    //     file: z
    //       .instanceof(File)
    //       .refine((file) => file.size <= 5 * 1024 * 1024, {
    //         message: "File Size Must be below 5mb",
    //       })
    //       .refine((file) => ["image/png", "image/jpeg"].includes(file.type), {
    //         message: "File Must be a .png or a .jpeg",
    //       }),
    //   }).optional(),
    // consent: z.boolean().refine((val) => val === true, {
    //   message: "You Must Consent To Your Logo Being Used",
    // }),
    // email_consent: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      second_name: "",
      contact_number: "",
      business_name: "",
      business_email: "",
      business_address: {
        street: "",
        city: "",
        postcode: "",
        country: "",
      },
    //   business_website: "",
    //   business_logo: undefined,
    //   consent: false,
    //   email_consent: false,
    },
  });

  const {toast} = useToast()

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("toast made")
    toast({
      title: "You Submitted The Following Values:",
      description: (
        <pre className="mt-2 w-[340px] rounded -md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <section>
      <div className="flex items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-5">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="First Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="second_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Second Name</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Second Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Contact Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
            control={form.control}
            name="business_name"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                        <Input className="text-black" placeholder="Enter Business Name" {...field}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            {/* Business Adress fields */}
            <FormField
              control={form.control}
              name="business_address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Line Adress</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Endter The First Line of Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="business_address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Endter The First Line of Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="business_address.postcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postcode</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Endter The First Line of Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="business_address.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Endter The First Line of Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size={"lg"} type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default SignUpForm;
