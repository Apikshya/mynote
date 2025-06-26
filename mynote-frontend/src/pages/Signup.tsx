import axios from "axios";
import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    await axios.post(BACKEND_URL + "/signup", {
      username,
      password,
    });
    navigate("/signin");
    alert("You have signed up to note app!!!");
  }

  function signinpage() {
    navigate("/signin");
  }

  return (
    <div className="bg-[url('../../images/background2.webp')] bg-cover bg-center h-screen w-screen fixed top-0 left-0 flex items-center justify-center">
      <div className="backdrop-blur-sm border-2 border-white/30 backdrop-blue-md h-[600px] w-[660px] rounded-2xl flex items-center justify-center ">
        <div className="h-96 w-96">
          <div className="flex justify-around">
            <span className="text-2xl font-semibold text-black">SIGN UP</span><button onClick={signinpage} className="text-2xl font-semibold text-gray-500">SIGN IN</button>
          </div>

          <div className="mt-20">
            <Input ref={usernameRef} placeholder="Username" />
            <Input ref={passwordRef} placeholder="Password"  />
            <Button onClick={signup} text="Signup" />
          </div>
        </div>
      </div>
    </div>
  );
}
