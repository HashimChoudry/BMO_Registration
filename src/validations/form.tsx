import { z } from "zod";
export const formSchema = z.object({
  first_name: z.string().min(2, { message: "Enter a Valid First Name" }),
  second_name: z.string().min(1, { message: "Enter a Valid Second Name" }),
  contact_number: z
    .string()
    .regex(/^(?:\+44|0)7\d{9}$/, "Enter a Valid UK Phone number"),
  business_name: z.string().min(1, { message: "Enter a Valid Business Name" }),
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
  business_logo_url: z.string().optional(),
  email_consent: z.boolean(),
});

export type formSchemaType = z.infer<typeof formSchema>;
