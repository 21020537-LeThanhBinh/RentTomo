import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-neutral-800">
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 flex gap-8 py-8 flex-wrap md:gap-0">
        <div className="md:flex-1 flex flex-col gap-2">
          <p className="text-white text-lg font-semibold">RentTomo</p>
          <p className="text-neutral-500 text-sm">Copyright Ⓒ 2023</p>
        </div>

        <div className="md:flex-1 flex flex-col gap-2">
          <p className="text-white text-lg font-semibold">About</p>
          <Link href="#" className="text-neutral-500 text-sm">About Us</Link>
          <Link href="#" className="text-neutral-500 text-sm">Blog</Link>
          <Link href="#" className="text-neutral-500 text-sm">Contact</Link>
        </div>

        <div className="md:flex-1 flex flex-col gap-2">
          <p className="text-white text-lg font-semibold">Legal</p>
          <Link href="#" className="text-neutral-500 text-sm">Terms & Conditions</Link>
          <Link href="/privacy-policy" className="text-neutral-500 text-sm">Privacy Policy</Link>
        </div>

        <div className="md:flex-1 flex flex-col gap-2">
          <p className="text-white text-lg font-semibold">Help</p>
          <Link href="/#faq" className="text-neutral-500 text-sm">FAQ</Link>
          <Link href="#" className="text-neutral-500 text-sm">Support</Link>
        </div>

        <div className="md:flex-1 flex flex-col gap-2">
          <p className="text-white text-lg font-semibold">Follow Us</p>
          <ul className="flex items-center gap-6">
            <li>
              <Link href="https://www.facebook.com/renttomo/" target="_blank" aria-label="Facebook" className="block">
                <svg className="w-6 h-6 text-neutral-500 hover:scale-110 transition" width="30" height="30" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.2106 0.48291H1.75153C1.04307 0.48291 0.470703 1.05528 0.470703 1.76374V31.2229C0.470703 31.9313 1.04307 32.5037 1.75153 32.5037H31.2106C31.9191 32.5037 32.4915 31.9313 32.4915 31.2229V1.76374C32.4915 1.05528 31.9191 0.48291 31.2106 0.48291ZM27.5122 9.82897H24.9546C22.9493 9.82897 22.561 10.7816 22.561 12.1825V15.2685H27.3481L26.7237 20.0996H22.561V32.5037H17.5698V20.1036H13.3951V15.2685H17.5698V11.7062C17.5698 7.57151 20.0954 5.31805 23.7858 5.31805C25.555 5.31805 27.072 5.45013 27.5163 5.51017V9.82897H27.5122Z" fill="currentColor" /></svg>
              </Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com/in/b%C3%ACnh-l%C3%AA-42b40a251/" target="_blank" aria-label="Linkedin" className="block">
                <svg className="w-6 h-6 text-neutral-500 hover:scale-110 transition" width="30" height="30" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.198 0.48291H1.73884C1.03038 0.48291 0.458008 1.05528 0.458008 1.76374V31.2229C0.458008 31.9313 1.03038 32.5037 1.73884 32.5037H31.198C31.9064 32.5037 32.4788 31.9313 32.4788 31.2229V1.76374C32.4788 1.05528 31.9064 0.48291 31.198 0.48291ZM9.95617 27.7686H5.20509V12.4867H9.95617V27.7686ZM7.58263 10.3973C7.03798 10.3973 6.50557 10.2358 6.05271 9.93325C5.59985 9.63066 5.24689 9.20057 5.03846 8.69738C4.83004 8.1942 4.7755 7.6405 4.88176 7.10632C4.98801 6.57214 5.25029 6.08146 5.63541 5.69634C6.02053 5.31121 6.51121 5.04894 7.04539 4.94268C7.57958 4.83643 8.13327 4.89096 8.63646 5.09939C9.13965 5.30782 9.56973 5.66078 9.87232 6.11363C10.1749 6.56649 10.3364 7.09891 10.3364 7.64356C10.3324 9.16454 9.09962 10.3973 7.58263 10.3973ZM27.7437 27.7686H22.9966V20.3358C22.9966 18.5626 22.9646 16.2852 20.527 16.2852C18.0574 16.2852 17.6772 18.2144 17.6772 20.2077V27.7686H12.9341V12.4867H17.4891V14.5761H17.5531C18.1855 13.3753 19.7345 12.1065 22.048 12.1065C26.8591 12.1065 27.7437 15.2725 27.7437 19.3872V27.7686Z" fill="currentColor" /></svg>
              </Link>
            </li>
            <li>
              <Link href="https://github.com/lethanksbinh/RentxFriend" target="_blank" aria-label="Twitter" className="block">
                <svg className="w-6 h-6 text-neutral-500 hover:scale-110 transition" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" /></svg>
              </Link>
            </li>
            <li className="flex-shrink-0">
              <Image
                src="/images/tako.png"
                alt="tako"
                width={30}
                height={30}
                className="w-6 h-6 text-white hover:scale-110 transition"
              />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;