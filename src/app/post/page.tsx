'use client'

import { useMemo, useState } from "react"

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export default function SearchPage() {
  const [step, setStep] = useState(STEPS.CATEGORY)
  
  const onNext = () => {
    setStep((value) => value + 1)
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Tạo bài viết'
    }

    return 'Tiếp theo'
  }, [step])

  return (
    <>
      CATEGORY
    </>
  )
}
