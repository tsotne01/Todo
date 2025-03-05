import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Form from "../../components/Form";
import Input from "../../components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();

  const UserSchema = z.object({
    email: z.string().email({ message: "email is required" }),
    password: z.string().min(8, {
      message: "password must have at least 8 characters",
    }),
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

  const handleLogin = () => {
    console.log("handle function");
    try {
      console.log(email, password);

      fetch(
        `https://x8ki-letl-twmt.n7.xano.io/api:M18lWu4n/auth/login?email=${email}&password=${password}`,
        {
          method: "POST",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setAuthToken(() => data.authToken);
        });
      if (authToken == undefined) {
        setAuthFailed(() => true);
        setAuthToken(() => "");
      }
      console.log(authToken);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (authToken) {
      navigate("home", { replace: true });
    }
  }, [authToken, navigate]);

  return (
    <>
      {" "}
      {!authToken && (
        <div className="login__page-wrapper">
          <Form page="Login" onSubmit={handleSubmit(handleLogin)}>
            <Input
              {...register("email")}
              id="email-input"
              label="Enter Email"
              type="email"
              placeholder="example@gmail.com"
              error={errors.email?.message}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              {...register("password")}
              id="password-input"
              label="Password"
              type="password"
              placeholder="********"
              error={errors.password?.message}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="options-div">
              <Button type="submit" disabled={isSubmitting}>
                Login
              </Button>
              <span className="divider">Or</span>
              <Link className="singup-link" to="signup">
                singup
              </Link>
            </div>
          </Form>
          {authFailed && <p className="auth-failed">Authorization failed</p>}
        </div>
      )}
    </>
  );
};

export default LoginPage;
