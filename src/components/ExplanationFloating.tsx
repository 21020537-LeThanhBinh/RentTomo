'use client';

import { autoUpdate, flip, offset, shift, useClick, useFloating, useFocus, useHover, useInteractions } from '@floating-ui/react';
import { useState } from "react";
import { AiFillQuestionCircle } from 'react-icons/ai';

interface ExplanationProps {
  content: string;
}

const ExplanationFloating: React.FC<ExplanationProps> = ({
  content,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, context, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context);
  const focus = useFocus(context);
  const click = useClick(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    click,
  ]);

  return (
    <>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="flex-shrink-0"
      >
        <AiFillQuestionCircle size={16} />
      </button>

      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="relative max-w-[360px] border-[1px] rounded-xl bg-white flex gap-4 p-4 z-[5] text-sm font-normal text-neutral-600"
        >
          {content}
        </div>
      )}
    </>
  );
}

export default ExplanationFloating;