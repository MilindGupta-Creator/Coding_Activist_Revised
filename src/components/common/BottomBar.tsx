import Link from "next/link";
import { FaWhatsapp, FaTelegramPlane, FaLinkedinIn } from "react-icons/fa";

const BottomBar = () => {
  return (
    <div className="sticky bottom-0 flex items-center justify-center border border-black gap-x-6 bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-2 "> 
      <p className="text-2xl"> Join Our team </p>
      <div className="flex gap-x-4 text-2xl">
        <Link href="">
          <FaWhatsapp />
        </Link>
        <Link href="">
          <FaTelegramPlane />
        </Link>
        <Link href="">
          <FaLinkedinIn />
        </Link>
      </div>
    </div>
  );
};

export default BottomBar;
