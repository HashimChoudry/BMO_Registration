
import SignUpForm from "@/components/form/signUpForm";
import Slider from "@/components/form/slider";
import Header from "@/components/main/Header";
// import { faker } from "@faker-js/faker"; // Import faker
// import { revalidatePath } from "next/cache";
// import DataButton from "@/components/form/dataButton";
import Image from "next/image";

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
      <div className="w-full gap-5 flex">
        <div className=" w-[60%] mt-10">
        <SignUpForm />
        </div>
        <div className=" mt-10 w-[48%]">
          <div className="">
            <Image alt="iphone image" src={'/iphone-image.png'} width={250} height={550} className="absolute z-10 transform translate-y-[150px] translate-x-[50px]"/>
          </div>
          <div>
            <Image alt="ipad image" src={'/ipad-image.png'} width={750} height={510} className="absolute z-1 transform  translate-x-[200px]" />
          </div>
          
        </div>
      </div>
      
    </div>
  );
}
