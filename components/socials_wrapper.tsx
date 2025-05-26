import { SocialButton } from "./social_button";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook, FaGithub } from "react-icons/fa";

export const SocialWrapper = () => {
  const socials = [
    <SocialButton key="google" image={<FcGoogle/>} provider={"Google"} color="#000000" background="#ffffff"/>, 
    <SocialButton key="facebook" image={<FaFacebook/>} provider={"Facebook"} color="#ffffff" background="#1778f2"/>,
    <SocialButton key="github" image={<FaGithub/>} provider={"Github"} color="#ffffff" background="#000000"/>,
    <SocialButton key="apple" image={<FaApple color="#000000" />} provider={"Apple"} color="#000000" background="#ffffff"/>
  ];

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-1" >
      {socials.map((button, index) => (
        <div key={index}>
          {button}
        </div>
      ))}
    </div>
  );
}
