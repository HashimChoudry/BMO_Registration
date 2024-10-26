import SignUpForm from "@/components/form/signUpForm";
import Header from "@/components/main/Header";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col">
      <Header />
      <SignUpForm />
    </div>
  );
}
