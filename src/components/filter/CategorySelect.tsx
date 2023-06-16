import { categoryOptions } from "../input/CategoryInput"

export default function CategorySelect({
  category, setCategory,
}: {
  category: string[], setCategory: (category: string[]) => void,
}) {

  function Item({ label }: { label: string }) {
    return (
      <button
        className={`
        py-2 px-4 border-[1px] flex-1
        ${category.find((item) => item === label) ? 'bg-neutral-800 text-white' : 'bg-white text-neutral-600 hover:border-black'}
        first:rounded-l-xl last:rounded-r-xl
      `}
        onClick={() =>
          setCategory(category.find((item) => item === label) ?
            category.filter((item) => item !== label) :
            [...category, label]
          )
        }
      >
        {label}
      </button>
    )
  }

  return (
    <div className="flex">
      {categoryOptions.map((item) => {
        return (
          <Item label={item.label} key={item.label} />
        )
      })}
    </div>
  )
}