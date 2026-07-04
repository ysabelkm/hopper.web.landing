import Image from 'next/image';

export const PhoneMockup = () => {
  return (
    <div className="relative w-[1280px] h-[2260px] overflow-visible">
      <Image
        src="/mockups/holdingphonemockup.png"
        alt="Hopper app on phone"
        fill
        className="object-contain [transform:scale(-3.6,3.6)_translateX(-5%)] [filter:contrast(1.1)_brightness(1.05)_saturate(1.1)]"
        priority
      />
    </div>
  );
};
