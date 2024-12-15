import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';

interface ArrowButtonsProps {
  onClickLeft?: () => void;
  onClickRight?: () => void;
}

const ArrowButtons: React.FC<ArrowButtonsProps> = ({
  onClickLeft,
  onClickRight,
}) => (
  <>
    <button
      className='absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary p-2 text-white hover:bg-opacity-80'
      onClick={onClickLeft}
    >
      <ArrowLeft size={20} />
    </button>

    <button
      className='absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary p-2 text-white hover:bg-opacity-80'
      onClick={onClickRight}
    >
      <ArrowRight size={20} />
    </button>
  </>
);

export default ArrowButtons;
