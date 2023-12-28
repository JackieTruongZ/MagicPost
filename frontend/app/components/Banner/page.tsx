'use client'
import React, { useEffect, useRef } from 'react';
import './style.css';

const Banner = () => {
  // const bannerContainerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const resizeHandler = () => {
  //     const bannerContainer = bannerContainerRef.current;
  //     const bannerImg = bannerContainer?.querySelector('.banner-img') as HTMLImageElement;
  //     const containerWidth = bannerContainer?.getBoundingClientRect().width;
  //     if (bannerContainer && bannerImg && containerWidth) {
  //       const containerHeight = containerWidth * 0.4; // Adjust the height ratio as needed
  //       bannerContainer.style.height = `${containerHeight}px`;
  //       bannerImg.style.height = `${containerHeight}px`;
  //     }
  //   };

  //   window.addEventListener('resize', resizeHandler);
  //   resizeHandler();

  //   return () => {
  //     window.removeEventListener('resize', resizeHandler);
  //   };
  // }, []);

  return (
    <div className='banner-container'>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/magicpost-480e1.appspot.com/o/bg03.png?alt=media&token=dc31dafc-0e20-4eff-9027-bb58f93adf67"
        alt="banner"
        className='banner-img'
      />
    </div>
  );
};

export default Banner;