"use client";
import Signup from "./pages/signup/page";
import Welcome from "./pages/welcome/page";
import checkLogin from "./components/checklogin";
export default function Home() {

  return <div>{checkLogin ? <Welcome /> : <Signup />}</div>;
}
