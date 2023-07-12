'use client';

import ItemSelect from "./ItemSelect";

interface CategoryInputProps {
  onChange: (value: string) => void;
  value: string;
}

export const categoryOptions = [
  { label: "Phòng cho thuê", value: "Phòng cho thuê" },
  { label: "Căn hộ", value: "Căn hộ" },
  { label: "Ký túc xá", value: "Ký túc xá" },
  { label: "Nhà nguyên căn", value: "Nhà nguyên căn" },
]

const CategoryInput: React.FC<CategoryInputProps> = ({
  onChange,
  value,
}) => {
  return (
    <ItemSelect
      onChange={(value: any) => onChange(value?.label)}
      value={{ label: value }}
      options={categoryOptions}
      placeholder="Chọn loại phòng"
      required
    />
  );
}

export default CategoryInput;