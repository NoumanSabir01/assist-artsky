import Link from "next/link";
import Image from "@/components/Image";

type TestProps = {
  className?: string;
  dark?: boolean;
};

const Test = ({ className, dark }: TestProps) => (
  <Link className={`flex w-[200px] ${className}`} href="/">
    <Image
      className="w-full h-auto"
      src={dark ? "/images/anomaly.png" : "/images/anomaly.png"}
      width={190}
      height={190}
      alt="anomaly"
    />
  </Link>
);

export default Test;
