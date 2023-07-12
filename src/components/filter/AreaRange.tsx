import { BsDashLg } from "react-icons/bs"
import ReactSlider from "react-slider"
import Input from "../input/Input"

export default function AreaRange({
  minArea, setMinArea,
  maxArea, setMaxArea
}: {
  minArea: number, setMinArea: (value: number) => void,
  maxArea: number, setMaxArea: (value: number) => void
}) {
  return (
    <>
      <ReactSlider
        min={0}
        max={150}
        defaultValue={[0, 150]}
        ariaLabel={['Lower thumb', 'Upper thumb']}
        ariaValuetext={state => `Thumb value ${state.valueNow}`}
        pearling
        value={[minArea, maxArea]}
        onChange={(value) => {
          setMinArea(value[0])
          setMaxArea(value[1])
        }}
        className="flex items-center w-full h-[50px]"
        thumbClassName="border-[1px] rounded-full w-8 h-8 bg-primary-500 cursor-pointer bg-white flex justify-center items-center text-sm font-semibold shadow-md"
        trackClassName="price-range-track"
      />
      <div className="flex justify-between items-center gap-4">
        <Input
          id="minArea"
          label="Tối thiểu"
          value={minArea.toString()}
          onChange={(value) => setMinArea(value ? parseInt(value) : 0)}
        />
        <BsDashLg size={30} />
        <Input
          id="maxArea"
          label="Tối đa"
          value={maxArea.toString()}
          onChange={(value) => setMaxArea(value ? parseInt(value) : 0)}
        />
      </div>
    </>
  )
}