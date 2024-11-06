import SignUpForm from "@/components/form/signUpForm";
import Slider from "@/components/form/slider";
import Header from "@/components/main/Header";
// import { faker } from "@faker-js/faker"; // Import faker
// import { revalidatePath } from "next/cache";
// import DataButton from "@/components/form/dataButton";

export default async function Home() {

  // const generateUser = async () => {
  //   "use server";
  //   const fakeUser = {
  //     first_name: faker.name.firstName(),
  //     second_name: faker.name.lastName(),
  //     contact_number: "+447925706587", // Generate a UK phone number
  //     business_name: faker.company.name(),
  //     business_email: faker.internet.email(),
  //     business_address_street: faker.address.streetAddress(),
  //     business_address_city: faker.address.city(),
  //     business_address_postcode: faker.address.zipCode("?????"), // Generate a UK postcode
  //     business_address_country: "United Kingdom",
  //     business_website: faker.internet.url(),
  //     email_consent: faker.datatype.boolean(),
  //   };
  //   await db.form.createMany({
  //     data: [fakeUser],
  //   });
  //   revalidatePath("/");
  // };

  return (
    <div className="w-[80%] flex items-center justify-center flex-col">
      <Header />
      <Slider/>
      <div className="w-full gap-5">
        <div className=" w-[48%]">
        <SignUpForm />
        </div>
        <div className=" h-full bg-slate-600 w-[48%]"></div>
      </div>
      
    </div>
  );
}
