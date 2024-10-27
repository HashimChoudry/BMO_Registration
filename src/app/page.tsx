import SignUpForm from "@/components/form/signUpForm";
import Slider from "@/components/form/slider";
import Header from "@/components/main/Header";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col">
      <Header />
      <Slider/>
      <SignUpForm />
    </div>
  );
}
