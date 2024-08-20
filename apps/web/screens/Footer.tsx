/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { SiInstagram, SiYoutube, SiX } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import Logo from "../public/logo.png";

const Footer = () => {
  return (
    <div className="border border-y-4 bottom-0 w-full p-4 bg-neutral-900 dark:bg-slate-900 px-6 lg:px-36 print:hidden">
      <div className="md:max-w-screen-2xl mt-4 mx-auto flex flex-row items-start justify-between w-full">
        <div className="flex flex-col md:flex-row w-3/5 md:justify-between">
          <div className="ml-21">
            <Link href={"https://app.100xdevs.com/"} target="_blank" rel="noopener noreferrer">
              <Image src={Logo} alt="Logo" width={300} height={200} className="hover:opacity-80" />
            </Link>
          </div>
          <div className="flex flex-col justify-center my-8 md:my-0">
            <h3 className="font-semibold text-neutral-100 mb-4">Quick Links</h3>
            <Link
              href={"https://app.100xdevs.com/"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 text-neutral-200"
            >
              100xdevs
            </Link>
            <Link
              href={"https://github.com/iSouvikKhan/aptitude-test/"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 text-neutral-200"
            >
              GitHub
            </Link>
            <Link href={"/tnc"} className="hover:text-blue-500 text-neutral-200">
              Terms & Conditions
            </Link>
            <Link href={"/privacy-policy"} className="hover:text-blue-500 text-neutral-200">
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div>
            <h4 className="text-neutral-200 font-semibold mb-2">Follow us</h4>
            <div className="flex gap-x-2">
              <Link target="_blank" rel="noopener noreferrer" href={"https://twitter.com/kirat_tw"}>
                <SiX className="text-white hover:text-blue-500" />
              </Link>
              <Link target="_blank" rel="noopener noreferrer" href={"https://www.instagram.com/kirat_ins/"}>
                <SiInstagram className="text-white hover:text-blue-500" />
              </Link>
              <Link target="_blank" rel="noopener noreferrer" href={"https://www.youtube.com/@harkirat1"}>
                <SiYoutube className="text-white hover:text-blue-500" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
