import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaTelegramPlane, FaLinkedinIn } from "react-icons/fa";

const BottomBar = () => {
  return (
    <div className=" flex items-center justify-center gap-x-6 bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-2  text-slate-400 border-t border-gray-500">
      <p className="text-2xl"> Join Our team </p>
      <div className="flex gap-x-4 text-2xl">
        <Link href="https://chat.whatsapp.com/JX84IIrp8axHuLv6AAOrOe">
          <FaWhatsapp />
        </Link>
        <Link href="https://t.me/codingactivist">
          <FaTelegramPlane />
        </Link>
        <Link href="https://www.linkedin.com/in/milindguptaji/">
          <FaLinkedinIn />
        </Link>
      </div>
    </div>
  );
};

export default BottomBar;
