import React from 'react';
import Image from 'next/image';

const AdBanner = ({ imageSrc, altText = "Advertisement", className = "" }) => {
  if (!imageSrc) return null;

  return (
    <div className={`w-full ${className}`}>
      <Image
        src={imageSrc}
        alt={altText}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        className="block"
      />
    </div>
  );
};

export default AdBanner;
