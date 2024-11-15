"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "../hooks/use-toast";
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
import { Checkbox } from "../ui/checkbox";
import { createUser } from "@/functions/createUser";
import { getSignedURL } from "@/actions/actions";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const maxFileSize = 5 * 1024 * 1024; // 5 MB in bytes
  // const acceptedImageTypes = ["image/png", "image/jpeg"];

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
    business_address_street: z
      .string()
      .min(3, { message: "Street name must be at least 3 characters long." }),
    business_address_city: z
      .string()
      .min(2, { message: "City name must be at least 2 characters long." }),
    business_address_postcode: z
      .string()
      .regex(
        /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i,
        "Invalid UK postcode format."
      ),
    business_address_country: z.string().default("United Kingdom"),
    business_website: z.string().url("Invalid URL Format"),
    business_logo: z
      .instanceof(File, { message: "Please Add a file" })
      .refine((file) => file.size <= maxFileSize, {
        message: "Ensure the file is less than 5MB",
      })
      .optional(),
    business_logo_url: z.string(),
    email_consent: z.boolean(),
  });

  type formSchemaType = z.infer<typeof formSchema>;

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      second_name: "",
      contact_number: "",
      business_name: "",
      business_email: "",
      business_address_city: "",
      business_address_country: "",
      business_address_postcode: "",
      business_address_street: "",
      business_website: "",
      business_logo: undefined,
      business_logo_url: "",
      //   consent:false,
      email_consent: false,
    },
  });

  const { toast } = useToast();
  const router = useRouter()

  // function MakeToast(data: formSchemaType) {
  //   toast({
  //     title: "You Submitted The Following Values:",
  //     description: (
  //       <pre className="mt-2 w-[340px] rounded -md bg-slate-950 p-4">
  //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //       </pre>
  //     ),
  //   });
  // }

  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  const onSubmit = form.handleSubmit(async (data: formSchemaType) => {
    try {
      if (data.business_logo !== undefined) {
        setStatusMessage("creating");
        setIsLoading(true);
        if (data) {
          setStatusMessage("uploading file");
          const checksum = await computeSHA256(data.business_logo);
          const signedurl = await getSignedURL(
            data.business_logo.type,
            data.business_logo.size,
            checksum,
            data.business_name
          );

          if (signedurl?.failure !== undefined) {
            setStatusMessage("failed");
            throw new Error(signedurl.failure);
          }

          const url = signedurl.success.url;
          console.log({ url });

          await fetch(url, {
            method: "PUT",
            body: data.business_logo,
            headers: {
              "Content-Type": data.business_logo?.type,
            },
          });
          data.business_logo = undefined
          data.business_logo_url = url;

          setStatusMessage("created");
          setIsLoading(false);
        }
      }
      console.log(data)
      const response = await createUser(data);

      if (response.error) {
        // An error occurred in createUser, display it in a toast
        toast({
          title: "Error",
          description: response.error,
          duration: 5000,
          variant: "destructive",
        });
      } else if (response.success) {
        // No error, display a success message
        toast({
          title: "Success",
          description: "User created successfully!",
          duration: 3000,
        });
        router.push("/success")
      }
    } catch (error) {
      // If there's an unexpected error, catch it and display a generic message
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast({
        title: "Unexpected Error",
        description: errorMessage,

        duration: 5000,
      });
    }
  });

  //   const fileRef = form.register("business_logo");

  return (
    <section className="w-full flex items-center flex-col ">
      <div className="flex flex-col items-center justify-center bg-secondary p-3 pl-5 pr-5 rounded-lg w-full sm:mb-10 border-mboOutline-50 bg-white border-2 border-solid z-20">
        <div className="m-3 flex flex-col items-center">
          <h2 className="formTitle">Lets get Started</h2>
          <h3 className="formSubtitle">It&apos;s Easy to Do</h3>
        </div>
        <Form {...form}>
          <form onSubmit={onSubmit} className="w-full space-y-10">
            <div className="flex  flex-col justify-between">
              <div className="formSection">
                <div className="flex justify-between flex-col md:flex-row">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem className="md:w-[48%]">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="second_name"
                    render={({ field }) => (
                      <FormItem className="md:w-[48%]">
                        <FormLabel>Second Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Second Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="contact_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Contact Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="business_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Business Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="business_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your Business Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="formSection ">
                {/* Business Address fields */}
                <div className="flex justify-between flex-col">
                  <FormField
                    control={form.control}
                    name="business_address_street"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>First Line Adress</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter The First Line of Address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="addressRow">
                    <FormField
                      control={form.control}
                      name="business_address_city"
                      render={({ field }) => (
                        <FormItem className="addressInput">
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter The City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="business_address_postcode"
                      render={({ field }) => (
                        <FormItem className="addressInput">
                          <FormLabel>Postcode</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter The Postcode"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="business_address_country"
                    render={({ field }) => (
                      <FormItem className="addressInput">
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter The country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="business_website"
                  render={({ field }) => (
                    <FormItem className="w-full mb-5">
                      <FormLabel>Business Website</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter The Business Website"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="business_logo"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>File</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) => {
                              field.onChange(
                                e.target.files && e.target.files[0]
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <span>{statusMessage}</span>
                <FormField
                  control={form.control}
                  name="email_consent"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                        />
                      </FormControl>
                      <FormLabel className="ml-2">
                        I consent to receiving emails from MBO
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button size={"lg"} type="submit" className="self-center">
                  Submit
                </Button>
                <span className={isLoading ? 'block': 'hidden'}>Loading...</span>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default SignUpForm;
