import React, { useEffect, useRef, useState } from 'react';

interface MobileCarouselProps {
  children: React.ReactNode[];
  autoPlayInterval?: number;
  desktopGridClass?: string;
}

export function MobileCarousel({ 
  children, 
  autoPlayInterval = 5000,
  desktopGridClass = "hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6"
}: MobileCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play logic
  useEffect(() => {
    if (!autoPlayInterval) return;

    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      
      const nextIndex = (activeIndex + 1) % children.length;
      const scrollAmount = scrollRef.current.offsetWidth * nextIndex;
      
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
      
      setActiveIndex(nextIndex);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [activeIndex, children.length, autoPlayInterval]);

  // Sync index on manual scroll
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollPosition = e.currentTarget.scrollLeft;
    const itemWidth = e.currentTarget.offsetWidth;
    const newIndex = Math.round(scrollPosition / itemWidth);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <div className="md:contents">
      {/* Mobile Carousel View */}
      <div className="md:hidden relative group">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {children.map((child, index) => (
            <div key={index} className="min-w-full snap-center px-2">
              {child}
            </div>
          ))}
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-2">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                scrollRef.current?.scrollTo({
                  left: scrollRef.current.offsetWidth * index,
                  behavior: 'smooth'
                });
                setActiveIndex(index);
              }}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                index === activeIndex ? 'w-6 bg-primary' : 'w-1.5 bg-white/20'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Grid View (Hidden on mobile) */}
      <div className={desktopGridClass}>
        {children}
      </div>
    </div>
  );
}
