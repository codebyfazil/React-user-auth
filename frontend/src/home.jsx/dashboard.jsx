import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navbar from "../components/ui/Navbar.jsx";


const Dashboard = ({ user, setUser, error }) => {
  return (
    
    <div className="min-h-screen flex flex-col bg-muted">
       <Navbar user={user} setUser={setUser} />
      <div className="flex flex-1 items-center justify-center p-6">
        
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800">
              {user ? `Welcome, ${user.username || user.name || "User"}` : "Welcome!"}
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              {user ? `Logged in as ${user.email}` : "Please login or register to continue"}
            </CardDescription>
          </CardHeader>

          {/* Optional Navbar - uncomment if you have it */}
         

          <CardContent className="mt-6 text-center">
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {!user && (
              <div className="flex flex-col gap-3">
                <Link to="/login">
                  <Button className="w-full">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline" className="w-full">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
