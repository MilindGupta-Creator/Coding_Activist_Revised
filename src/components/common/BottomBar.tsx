import Link from "next/link";

interface BottomBarProps {
  className?: string;
}

const BottomBar: React.FC<BottomBarProps> = ({ className }) => {
  return (
    <div className={`flex items-center justify-center gap-x-6 bg-[#181818] p-2 text-slate-400 border-t border-gray-500 ${className}`}>
      <Link
        href="/join-us"
        className="text-2xl bg-[#181818] px-3 py-1 rounded-lg"
      >
        Join Us
      </Link>
    </div>
  );
};

export default BottomBar;
