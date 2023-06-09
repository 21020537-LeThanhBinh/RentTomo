'use client';

import ItemSelect from "./ItemSelect";

interface CategoryInputProps {
  onChange: (value: string) => void;
  value: string;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  onChange,
  value
}) => {
  return (
    <ItemSelect
      onChange={(value: any) => onChange(value?.value)}
      value={{ label: value, value: value }}
      options={[
        { label: "Phòng cho thuê", value: "Phòng cho thuê" },
        { label: "Ký túc xá", value: "Ký túc xá" },
        { label: "Nhà nguyên căn", value: "Nhà nguyên căn" },
        { label: "Căn hộ", value: "Căn hộ" }
      ]}
      placeholder="Chọn loại phòng"
    />
  );
}

export default CategoryInput;