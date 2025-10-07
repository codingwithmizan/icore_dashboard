import { Welcome, LoginForm } from "@/components/auth";

const Login = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Welcome />
      <div className="flex items-center justify-center p-6 lg:p-12">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
