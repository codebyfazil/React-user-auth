import { googleLogout } from "@react-oauth/google";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import "../../src/index.css";

function Logout({ setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      googleLogout();

      localStorage.removeItem("token");

      setUser(null);

      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
   
    <Layout>
       <Button
      onClick={handleLogout}
      variant="destructive"
      className="rounded-full text-sm font-medium"
    >
      Logout
    </Button>
  {/* <Dashboard user={user} setUser={setUser} /> */}
</Layout>

  );
}

export default Logout;
