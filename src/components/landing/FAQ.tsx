import { BiChevronDown } from "react-icons/bi";

const Questions = () => {
  return (
    <div className="px-4 md:px-8">
      <h2 className=" mb-[1.3125rem] text-center text-[1.5rem] font-bold text-very-dark-blue md:text-[2rem]">
        Câu hỏi thường gặp
      </h2>
      <p className="mx-auto max-w-[46ch] text-center text-neutral-500 md:text-lg">
        Đây là một số câu hỏi thường gặp. Nếu bạn có bất kỳ câu hỏi nào khác
        muốn được trả lời, vui lòng liên hệ với chúng tôi qua email.
      </p>

      <div className="mx-auto mt-[3.5rem] mb-[3.125rem] max-w-[33.75rem]">
        <details className="border-t border-very-dark-blue/50">
          <summary className="flex w-full cursor-pointer items-center justify-between rounded-md py-[1.1875rem] font-bold tracking-[-0.02em] transition duration-300 hover:text-soft-red md:pr-[1.3125rem] md:text-lg">
            Ai có thể đăng tin?
            <div>
              <BiChevronDown size={25} className="fill-sky-500 transition-all duration-300 ease-in-out" />
            </div>
          </summary>
          <p className="px-4 py-3 text-neutral-500 transition-all duration-500 ease-in-out md:text-[1rem]">
            Người đăng tin phải là chủ sở hữu của phòng trọ hoặc là người được
            sự cho phép của chủ sở hữu. Nếu bạn là sinh viên đang thuê trọ cần tìm bạn cùng phòng,
            hãy hỏi ý kiến của chủ trọ trước khi đăng tin.
          </p>
        </details>
        <details className="border-t border-very-dark-blue/50">
          <summary className="flex w-full cursor-pointer items-center justify-between rounded-md py-[1.1875rem] font-bold tracking-[-0.02em] transition duration-300 hover:text-soft-red md:pr-[1.3125rem] md:text-lg">
            Làm thế nào để tìm bạn cùng phòng phù hợp?
            <div>
              <BiChevronDown size={25} className="fill-sky-500 transition-all duration-300 ease-in-out" />
            </div>
          </summary>
          <p className="px-4 py-3 text-neutral-500 md:text-[1rem]">
            Hãy cố gắng tìm những người cùng độ tuổi và có thói quen sinh hoạt, giờ giấc tương đồng với bạn.
            Tuy tính cách và sở thích không phải yếu tố quan trọng cho sự hòa hợp, nhưng bạn cũng có thể
            dựa vào đó để tìm người bạn cho là thú vị hơn.
          </p>
        </details>
        <details className="border-t border-very-dark-blue/50">
          <summary className="flex w-full cursor-pointer items-center justify-between rounded-md py-[1.1875rem] font-bold tracking-[-0.02em] transition duration-300 hover:text-soft-red md:pr-[1.3125rem] md:text-lg">
            Làm thế nào để tìm phòng trọ phù hợp?
            <div>
              <BiChevronDown size={25} className="fill-sky-500 transition-all duration-300 ease-in-out" />
            </div>
          </summary>
          <p className="px-4 py-3 text-neutral-500 md:text-[1rem]">
            Những yếu tố quan trọng nhất khi tìm phòng trọ là giá cả, vị trí, diện tích và tiện nghi.
            Đôi khi bạn cần phải đánh đổi một vài yếu tố do không không đủ lựa chọn, khi đó, hãy cân nhắc
            kỹ lưỡng độ quan trọng của từng yếu tố để chọn được phòng trọ phù hợp nhất.
          </p>
        </details>
        <details className="border-y border-very-dark-blue/50">
          <summary className="flex w-full cursor-pointer items-center justify-between rounded-md py-[1.1875rem] font-bold tracking-[-0.02em] transition duration-300 hover:text-soft-red md:pr-[1.3125rem] md:text-lg">
            Làm thế nào để tránh bị lừa khi thuê trọ?
            <div>
              <BiChevronDown size={25} className="fill-sky-500 transition-all duration-300 ease-in-out" />
            </div>
          </summary>
          <p className="px-4 py-3 text-neutral-500 md:text-[1rem]">
            Có rất nhiều trang web và video về vấn đề này để bạn tham khảo. Ví dụ:
            <p className="hover:underline pl-4"><a href="https://homedy.com/news/nam-long-7-dieu-nay-sinh-vien-di-thue-nha-tro-khong-lo-bi-ho-ne4260">“Nằm lòng” 7 điều này sinh viên đi thuê nhà trọ không lo bị hớ</a></p>
            <p className="hover:underline pl-4"><a href="https://www.youtube.com/watch?v=nhGs6IXmD4I&ab_channel=TH%C6%AFVI%E1%BB%86NPH%C3%81PLU%E1%BA%ACT">Giúp Sinh Viên Tránh Bẫy Lừa Đảo Khi Thuê Trọ | TVPL</a></p>
          </p>
        </details>
      </div>

      {/* <div className="mt-8 flex justify-center">
        <a
          href="#"
          className="rounded-md border-[0.188rem] border-sky-500 bg-sky-500 py-[0.6558rem] px-[1.5201rem] text-white transition duration-300 hover:bg-white hover:text-sky-500"
        >
          More info
        </a>
      </div> */}
    </div>
  );
};

export default Questions;