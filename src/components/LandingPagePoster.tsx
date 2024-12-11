/* eslint-disable @next/next/no-img-element */
import React from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';

const LandingPagePoster = ({
  className,
  alt,
  imgUrl,
  // style,
}: {
  className: string;
  alt: string;
  imgUrl: string;
  // style: React.CSSProperties;
}) => {
  return (
    <div className={`absolute ${className} `}>
      <MaxWidthWrapper>
        <img
          src={imgUrl}
          alt={alt}
          height={200}
          width={150}
          className='z-0 rounded-t-md'
        />
        <div className='z-10 h-[150px] w-full bg-gradient-to-b from-red-500/10'></div>
      </MaxWidthWrapper>
    </div>
  );
};

export default LandingPagePoster;
