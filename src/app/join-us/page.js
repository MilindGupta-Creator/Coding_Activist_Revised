import Link from "next/link";
import { FaWhatsapp, FaTelegramPlane, FaLinkedinIn } from "react-icons/fa";

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
        <Link href="https://www.linkedin.com/in/milindguptaji/" target="_blank">
          <img
            src="https://codingactivist.com/static/media/profile-pic.569cb494286da3d4eac8.png"
            alt="profile"
            height={150}
            width={150}
          />
        </Link>
      </div>
    </div>
  );
};

export default Home;
