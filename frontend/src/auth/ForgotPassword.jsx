import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "../components/ui/Navbar.jsx";

export default function ForgotPassword() {
  const location = useLocation();
  const prefilledEmail = location.state?.email || "";
  const [email, setEmail] = useState(prefilledEmail);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("")
   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
    setMessage(res.data.message);
  };

  return (
 <div className="min-h-screen flex flex-col bg-muted">
    <Navbar className="min-h-screen flex flex-col bg-muted" user={user} setUser={setUser} />
      <div className="flex-grow grid place-items-center">
          <Card className="w-[350px] p-6 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex flex-col items-center text-center">
              Forgot Password
            </CardTitle>
            <CardDescription className="flex flex-col items-center text-center">
              Enter your email to receive a reset link
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="grid gap-4">
              <Input
                name="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {message && <p className="text-white-500 text-sm text-center">{message}</p>}
            </CardContent>

            <CardFooter className="flex flex-col gap-5">
              <Button type="submit" className="w-full mt-4">
                Send Reset Link
              </Button>

              <Button type="button" variant="link" onClick={() => navigate("/login")}>
                Back to Login
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
  
   
  
}
