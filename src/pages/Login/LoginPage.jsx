import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Form from "../../components/Form";
import Input from "../../components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const UserSchema = z
    .object({
      name: z
        .string()
        .min(3, { message: "name must have at least 3 characters" }),
      email: z.string().email({ message: "email is required" }),
      password: z.string().min(8, {
        message: "password must have at least 8 characters",
      }),
      confirmPassword: z.string().min(8, {
        message: "password must have at least 8 characters",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"], // Show error on confirmPassword field
    });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "all",
    resolver: zodResolver(UserSchema),
  });

  const handleLogin = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="login__page-wrapper">
        <Form page="Login" onSubmit={handleSubmit(handleLogin)}>
          <Input
            {...register("email")}
            id="email-input"
            label="Enter Email"
            type="email"
            placeholder="example@gmail.com"
            error={errors.email?.message}
          />
          <Input
            {...register("password")}
            id="password-input"
            label="Password"
            type="password"
            placeholder="********"
            error={errors.password?.message}
          />
          <div className="options-div">
            <Button disabled={isSubmitting}>Login</Button>
            <span className="divider">Or</span>
            <Link className="singup-link" to="signup">
              singup
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default LoginPage;
