import Link from "next/link";
import { FaWhatsapp, FaTelegramPlane, FaLinkedinIn } from "react-icons/fa";
import profile_pic from "../../assets/img/profile_pic.jpeg"
import Image from "next/image";

const Home = () => {
  return (
    <div className="w-full flex justify-center items-center pt-20 h-screen">
      <div className="flex gap-10 flex-wrap justify-center items-center">
        <Link
          href="https://chat.whatsapp.com/JX84IIrp8axHuLv6AAOrOe"
          target="_blank"
        >
          <FaWhatsapp className="bg-[#333333] p-5 rounded-lg" size={150} />
        </Link>
        <Link href="https://t.me/codingactivist" target="_blank">
          <FaTelegramPlane className="bg-[#333333] p-5 rounded-lg" size={150} />
        </Link>
        <Link href="https://www.linkedin.com/in/milindguptaji/" target="_blank" className="mt-8">
          {/* <div className="flex flex-col items-center">
            <div className="bg-[#333333]  rounded-lg" style={{ width: "150px", height: "150px" }}>
              <Image
                src={profile_pic}
                alt="profile"
                height={150}
                width={150}
                className="rounded-lg mx-auto h-[150px]"
              />
            </div>
            {/* <p className="mt-2 text-center font-medium">Developer</p> */}

          <FaLinkedinIn className="bg-[#333333] p-5 rounded-lg" size={150} />
          <p className="mt-2 text-center font-medium">Creator & Developer  </p>
        </Link>
      </div>
    </div>
  );
};

export default Home;