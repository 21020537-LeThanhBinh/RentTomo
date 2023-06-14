'use client'

export default function PopupInputContainer({ label, onBack, children }: { label: string, onBack: () => void, children: React.ReactNode }) {
  return (
    <div className="w-full rounded-2xl p-2 pt-12">
      <div className='flex'>
        <button onClick={onBack} className="absolute top-6 text-2xl z-10">🡠</button>
        <div className="absolute top-6 left-0 text-xl font-semibold text-center w-full">
          <span>{label}</span>
        </div>
      </div>

      <div className="pt-8">
        {children}
      </div>
    </div>
  )
}