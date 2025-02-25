import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Form from "../../components/Form";
import Input from "../../components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="login__page-wrapper">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("name")}
          id="name-input"
          label="Enter name"
          placeholder="Kurt smith"
          error={errors.name?.message}
        />
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
        <Input
          {...register("confirmPassword")}
          id="confirm-password-input"
          label="Confirm Password"
          type="password"
          placeholder="********"
          error={errors.confirmPassword?.message}
        />
        <Button disabled={isSubmitting}>Login</Button>
      </Form>
    </div>
  );
};

export default LoginPage;
