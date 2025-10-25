import React, { useState, setUser } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/ui/Navbar.jsx";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
        password,
      });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted">
    <Navbar className="min-h-screen flex flex-col bg-muted" user={user} setUser={setUser} />
      <div className="flex-grow grid place-items-center">
          <Card className="w-[350px] p-6 transition-all duration-300">
              <CardHeader>
              <CardTitle className="flex flex-col items-center text-center gap-1.5">
                Reset Password
              </CardTitle>
              <CardDescription className="flex flex-col items-center text-center">
                Enter your new password
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="grid gap-5">
                <Input
                  name="password"
                  type="password"
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {message && <p className="text-white-500 text-sm text-center">{message}</p>}
              </CardContent>

              <CardFooter className="flex flex-col gap-5">
                <Button type="submit" className="w-full mt-4">
                  Reset Password
                </Button>
              </CardFooter>

            </form>
          </Card>
        </div>
      </div>
  );
}

export default ResetPassword;
