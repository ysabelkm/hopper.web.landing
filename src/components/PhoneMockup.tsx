import Image from 'next/image';

export const PhoneMockup = () => {
  return (
    <div className="relative w-[340px] h-[600px]">
      <Image
        src="/holdingphonemockup.png"
        alt="Hopper app on phone"
        fill
        className="object-contain [transform:scale(-1.8,1.8)_translateX(-5%)] [filter:contrast(1.1)_brightness(1.05)_saturate(1.1)]"
        priority
      />
    </div>
  );
};
