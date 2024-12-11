'use client';
import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from './icons';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

const ButtonWrapper = ({
  text,
  className,
  route,
}: {
  text: string;
  className?: string;
  route: string;
}) => {
  const router = useRouter();
  const handleRoute = () => {
    router.push(route);
  };
  return (
    <div className='my-4' onClick={handleRoute}>
      <Button className={twMerge('py-6', className)}>
        <span className='sub-heading'>{text}</span>
        <span>
          <ArrowRight size={20} className='text-white' />
        </span>
      </Button>
    </div>
  );
};

export default ButtonWrapper;
