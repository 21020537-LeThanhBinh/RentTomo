import { BsDashLg } from "react-icons/bs"
import ReactSlider from "react-slider"
import Input from "../input/Input"

export default function PriceRange({
  minPrice, setMinPrice,
  maxPrice, setMaxPrice,
}: {
  minPrice: number, setMinPrice: (minPrice: number) => void,
  maxPrice: number, setMaxPrice: (maxPrice: number) => void,
}) {
  return (
    <>
      <ReactSlider
        min={0}
        max={15}
        defaultValue={[0, 15]}
        step={0.1}
        ariaLabel={['Lower thumb', 'Upper thumb']}
        ariaValuetext={state => `Thumb value ${state.valueNow}`}
        pearling
        value={[minPrice, maxPrice]}
        onChange={(value) => {
          setMinPrice(value[0])
          setMaxPrice(value[1])
        }}
        className="flex items-center w-full h-[50px]"
        thumbClassName="border-[1px] rounded-full w-8 h-8 bg-primary-500 cursor-pointer bg-white flex justify-center items-center text-sm font-semibold shadow-md"
        trackClassName="price-range-track"
      />
      <div className="flex justify-between items-center gap-4">
        <Input
          id="minPrice"
          label="Tối thiểu"
          value={minPrice.toString()}
          onChange={(value) => setMinPrice(value ? parseInt(value) : 0)}
        />
        <BsDashLg size={30} />
        <Input
          id="maxPrice"
          label="Tối đa"
          value={maxPrice.toString()}
          onChange={(value) => setMaxPrice(value ? parseInt(value) : 0)}
        />
      </div>
    </>
  )
}