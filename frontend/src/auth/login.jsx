import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      console.log(res.data);
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

 

  return (
    <div className="grid grid-cols-1 place-items-center min-h-screen">
      <div className="flex items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="flex flex-col items-center text-center">
              Login to your account
            </CardTitle>
            <CardDescription className="flex flex-col items-center text-center">
              Enter your credentials below
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="grid gap-4">
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center justify-between mt-1">
                  <FieldLabel>Password</FieldLabel>
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm text-blue-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <Input
                  name="password"
                  type="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Field>
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
            </CardContent>

            <CardFooter className="flex flex-col gap-5">
              <Button type="submit" className="w-full mt-4">
                Login
              </Button>

             

              <FieldDescription className="text-center mt-2">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="text-blue-400 hover:underline"
                >
                  Sign up
                </button>
              </FieldDescription>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
