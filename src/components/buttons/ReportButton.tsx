'use client';

import { event } from "@/lib/ga";
import { supabase } from "@/supabase/supabase-app";
import handleCloseDialog from "@/utils/handleCloseDialog";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { BsFlagFill } from "react-icons/bs";
import ExplanationFloating from "../ExplanationFloating";
import Input from "../input/Input";
import Button from "./Button";
const ModalSingle = dynamic(() => import('@/components/modal/ModalSingle'))

interface ReportButtonProps {
  listingId: string
  userId?: string | null
}

const reportOptions = [
  {
    id: 1,
    label: 'Phòng trọ đã cho thuê',
    description: 'Người đăng tin quên chưa cập nhật trạng thái phòng trọ'
  },
  {
    id: 2,
    label: 'Mô tả không chính xác',
    description: 'Thông tin mô tả không chính xác (phí thuê, dịch vụ, diện tích, tiện ích, ...)'
  },
  {
    id: 3,
    label: 'Ảnh không chính xác',
    description: 'Ảnh không giống với phòng trong thực tế'
  },
  {
    id: 4,
    label: 'Không thể liên hệ',
    description: 'Không thể liên hệ với người đăng tin hoặc trưởng phòng (nếu có)'
  },
  {
    id: 5,
    label: 'Có dấu hiệu lừa đảo',
    description: 'Người đăng tin không cho xem phòng, thông tin thiếu rõ ràng hay yêu cầu nộp cọc trước, ...'
  },
  {
    id: 6,
    label: 'Giá thuê quá cao?',
    description: 'Đúng vậy, tin đăng phòng có giá thuê quá cao so với thị trường cũng là một vi phạm'
  },
  {
    id: 7,
    label: 'Lý do khác',
    description: 'Hãy mô tả chi tiết về vi phạm của tin đăng này'
  },
]

const ReportButton: React.FC<ReportButtonProps> = ({
  listingId,
  userId,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [reportType, setReportType] = useState<number>(0)
  const [reportDetails, setReportDetails] = useState<string>('')

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      handleCloseDialog(e, modalRef.current!, () => modalRef.current?.close())
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onButtonClick = () => {
    if (!userId) {
      return router.push(`${pathname}?popup=login`)
    }

    !modalRef.current?.open && modalRef.current?.showModal();

    event({
      action: 'report_btn_click',
      params: {
        listing_id: listingId,
        userId: userId,
      }
    })
  }

  const ReportTypeComponent = ({ id, label, description }: { id: number, label: string, description: string }) => {
    return (
      <label className="flex gap-2 items-center">
        <input type="radio" name="radio" checked={reportType === id} onChange={() => setReportType(id)} />
        <span>{label}</span>
        <ExplanationFloating content={description} />
      </label>
    )
  }

  const onReportSubmit = async () => {
    const { data, error } = await supabase
      .from('post_reports')
      .insert([
        { user_id: userId, post_id: listingId, type: reportType, details: reportDetails },
      ])

    if (error) {
      console.log(error)
      return toast.error('Có lỗi xảy ra, vui lòng thử lại sau!')
    }
    toast.success('Cảm ơn bạn đã báo cáo vi phạm này. \nChúng tôi sẽ xem xét và xử lý trong thời gian sớm nhất!')
    modalRef.current?.close();
  }

  return (
    <>
      <button onClick={onButtonClick} className="flex items-center gap-2 cursor-pointer group">
        <div className="relative hover:opacity-80 transition cursor-pointer group-hover:opacity-80">
          <BsFlagFill size={20} className='fill-neutral-500/70' />
        </div>
        <span className="text-neutral-600 underline whitespace-nowrap">Báo vi phạm</span>
      </button>

      <ModalSingle modalRef={modalRef} label="Báo cáo tin đăng" onBack={() => { modalRef.current?.close(); }} className="">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            {reportOptions.map((option) => (
              <>
                <ReportTypeComponent key={option.id} id={option.id} label={option.label} description={option.description} />
                {reportType === option.id && (
                  <Input
                    onChange={(value) => setReportDetails(value)}
                    value={reportDetails}
                    id="details"
                    label="Chi tiết"
                  />
                )}
              </>
            ))}
          </div>

          <p className="text-sm text-neutral-500">
            Những báo cáo vi phạm được chúng tôi xem xét trong tối đa 24 giờ xác định xem họ có vi phạm nguyên tắc không.
            Tin đăng vi phạm sẽ bị yêu cầu chỉnh sửa hoặc xóa bỏ. Tùy mức độ vi phạm, người đăng tin có thể bị khóa tài khoản vĩnh viễn.
          </p>

          <div className="flex justify-end gap-4">
            <div className='w-1/2 sm:w-1/4'>
              <Button
                label='Hủy'
                onClick={(e) => { e.preventDefault(); modalRef.current?.close(); }}
                outline
              />
            </div>
            <div className='w-1/2 sm:w-1/4'>
              <Button
                label='Xong'
                onClick={(e) => { e.preventDefault(); onReportSubmit(); }}
              />
            </div>
          </div>
        </div>
      </ModalSingle>
    </>
  );
}

export default ReportButton;