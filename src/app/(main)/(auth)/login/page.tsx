import LoginForm from "@/components/Login/Form";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

export default function Login() {
  return (
    <main className="my-auto">
      <ThemeSwitcher className="absolute top-0 right-0" />
      <LoginForm />
    </main>
  );
}
