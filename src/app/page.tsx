import SignUpForm from "@/components/form/signUpForm";
// import Slider from "@/components/form/slider";
import Header from "@/components/main/Header";
import db from "@/modules/db";
import { faker } from "@faker-js/faker"; // Import faker
import { revalidatePath } from "next/cache";
import DataButton from "@/components/form/dataButton";

export default async function Home() {
  const userdata = await db.form.findMany({ orderBy: { createdAt: "desc" } });

  const generateUser = async () => {
    "use server";
    const fakeUser = {
      first_name: faker.name.firstName(),
      second_name: faker.name.lastName(),
      contact_number: "+447925706587", // Generate a UK phone number
      business_name: faker.company.name(),
      business_email: faker.internet.email(),
      business_address_street: faker.address.streetAddress(),
      business_address_city: faker.address.city(),
      business_address_postcode: faker.address.zipCode("?????"), // Generate a UK postcode
      business_address_country: "United Kingdom",
      business_website: faker.internet.url(),
      email_consent: faker.datatype.boolean(),
    };
    await db.form.createMany({
      data: [fakeUser],
    });
    revalidatePath("/");
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <h1>git test</h1>
      <Header />
      {/* <Slider/> */}
      <SignUpForm />
      <DataButton onClick={generateUser}>Generate Post</DataButton>
      <div>
        {userdata.map((data) => (
          <div key={data.id}>{data.first_name}</div>
        ))}
      </div>
    </div>
  );
}
