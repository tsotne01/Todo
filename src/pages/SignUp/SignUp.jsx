import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Form from "../../components/Form";
import Input from "../../components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

const SignUp = () => {
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
  const { authToken, setAuthToken } = useContext(UserContext);
  const navigator = useNavigate()
  
  const handleRegister = (data) => {
    const { name, email, password } = data;

    try {
      fetch("https://x8ki-letl-twmt.n7.xano.io/api:M18lWu4n/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }).then((response) => response.json())
      .then((data) => {
        setAuthToken(() => data.authToken);
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="login__page-wrapper">
      {authToken && navigator("/home")}
      <Form page="signup" onSubmit={handleSubmit(handleRegister)}>
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
        <div className="options-div">
          <Button disabled={isSubmitting}>Sign up</Button>
          <span className="divider">Or</span>
          <Link className="singup-link" to="/">
            login
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
