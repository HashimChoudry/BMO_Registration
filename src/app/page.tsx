
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
      <div className="w-full flex flex-col-reve md:flex-row">
        <div className=" md:w-[60%] mt-10 pt-[24vh] md:pt-0 w-full">
        <SignUpForm />
        </div>
        <div className=" mt-10 md:w-[48%]">
          <div className="">
            <Image alt="iphone image" src={'/iphoneMockup.png'} width={250} height={550} className="absolute z-10 transform translate-y-[80px] translate-x-[50px] hidden md:block"/>
            <Image alt="iphone image" src={'/iphoneMockup.png'} width={120} height={245} className=" inset-0 absolute z-10 transform md:hidden translate-x-[20px] translate-y-[390px]"/>
          </div>
          <div>
            <Image alt="ipad image" src={'/ipadMockup.png'} width={750} height={510} className="absolute z-0 transform  translate-x-[200px] hidden md:block" />
            <Image alt="ipad image" src={'/ipadMockup.png'} width={435} height={315} className="inset-0 absolute z-0 transform md:hidden translate-x-[50px] translate-y-[290px]" />
          </div>
          
        </div>
      </div>
      
    </div>
  );
}
