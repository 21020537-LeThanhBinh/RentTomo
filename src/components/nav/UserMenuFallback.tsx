import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../profile/Avatar';

export default function UserMenuFallback({ isWhite = false }: { isWhite?: boolean }) {
  return (
    <div className={`flex justify-end flex-shrink-0 relative ${isWhite && 'text-white'}`} >
      <div className="flex flex-row items-center gap-3">
        <button className="p-4 md:py-2 md:pl-4 md:pr-3 border-[1px] border-neutral-200 flex flex-row items-center gap-2 rounded-full cursor-pointer hover:shadow-md transition">
          <AiOutlineMenu className='block lg:hidden' />
          <div className='font-semibold hidden lg:block whitespace-nowrap truncate'>
            Tài khoản
          </div>
          <div className="hidden md:block flex-shrink-0">
            <Avatar />
          </div>
        </button>
      </div>
    </div>
  );
};