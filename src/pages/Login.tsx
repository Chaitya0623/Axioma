import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios from 'axios';

interface LoginProps {
  onLoginSuccess: () => void;
}

function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {

    const apiUrl = process.env.NODE_ENV === 'production' 
  ? 'https://axioma.simppl.org/login' 
  : 'http://localhost:5000/login';

try {
  const response = await axios.post(apiUrl, {
    username,
    password
  });

  if (response.status === 200) {
    setError("");
    onLoginSuccess(); 
  }
} catch (err: any) {
  setError(err.response?.data?.message || "Something went wrong");
}
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4 ">
      <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
        <Card className=" rounded-xl p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto bg-slate-700">
          <CardHeader>
            <CardTitle className="text-gray-100 text-3xl font-bold text-center">Login</CardTitle>
            
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-gray-100 text-sm mb-2 block">Username</label>
                <div className="relative flex items-center">
                  <Input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600 rounded"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-100 text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600 rounded"
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none rounded" onClick={handleLogin}>
              Login
            </Button>
          </CardFooter>
          
        </Card>
        <div className="max-md:mt-8">
          <img
            src="https://readymadeui.com/login-image.webp"
            className="w-full aspect-[71/50] max-md:w-4/5 mx-auto block object-cover"
            alt="Dining Experience"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
