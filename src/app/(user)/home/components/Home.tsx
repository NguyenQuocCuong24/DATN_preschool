'use client'

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

const images = [
  "/assets/images/banner2.png",
  "/assets/images/img_respon01.png",
  "/assets/images/img_respon02.png",
  // "/assets/images/cover_scaled.png",
];

const imageDescriptions = [
  [
    "Bản tin", "Hình ảnh", "Thời khóa Biểu", "Dinh dưỡng hàng ngày", "Biểu đồ sức khỏe", "Học phí", "Xin phép nghỉ học", "Dặn thuốc", "Lời nhắc đầu ngày"
  ],
  [
    "Quản lý trên thiết bị", "Không cần cài đặt", "Dữ liệu tập trung", "Quản lý từ xa"
  ],
  [
    "Khẩu phần dinh dưỡng", "Quản lý thu chi", "Theo dõi sức khỏe trẻ", "Báo cáo Phòng giáo dục", "Tin nhắn"
  ],
  [],
];

export default function Slider() {
  const extendedImages = [...images, images[0]]; // Clone ảnh đầu
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Auto next
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Reset sau khi đến ảnh clone
  useEffect(() => {
    const slider = sliderRef.current;
    const handleTransitionEnd = () => {
      if (currentIndex === extendedImages.length - 1) {
        setIsAnimating(false); // tắt animation
        setCurrentIndex(0); // reset về index 0 (ảnh đầu thật)
      }
    };

    slider?.addEventListener("transitionend", handleTransitionEnd);
    return () => slider?.removeEventListener("transitionend", handleTransitionEnd);
  }, [currentIndex, extendedImages.length]);

  // Bật lại animation sau khi reset
  useEffect(() => {
    if (!isAnimating) {
      requestAnimationFrame(() => setIsAnimating(true));
    }
  }, [isAnimating]);

  const nextSlide = () => setCurrentIndex((prev) => prev + 1);
  const prevSlide = () => {
    if (currentIndex === 0) {
      setIsAnimating(false);
      setCurrentIndex(images.length - 1);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div>
      <div className="relative w-full h-[500px] overflow-hidden group">
        <Image
          src="/assets/images/bg_slide02.png"
          alt="Background"
          fill
          className="object-cover z-0"
        />

        <div className="relative z-10 h-full w-full overflow-hidden">
          <div
            ref={sliderRef}
            className={`flex h-full will-change-transform ${isAnimating ? "transition-transform duration-[1400ms] ease-in-out" : ""
              }`}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {extendedImages.map((img, index) => (
              <div key={index} className="w-full flex flex-shrink-0 h-full">
                <div className="w-[50%] flex flex-col justify-center items-center px-10">
                  {Array.isArray(imageDescriptions[index % images.length]) &&
                    imageDescriptions[index % images.length].map((text, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 mb-4 w-full max-w-md"
                      >
                        <CheckCircle className="text-green-600 w-6 h-6 flex-shrink-0" />
                        <span className="text-xl font-semibold text-gray-800 leading-tight">
                          {text}
                        </span>
                      </div>
                    ))}
                </div>

                <div className="w-[40%] relative">
                  <Image
                    src={img}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-contain"
                    priority={index === currentIndex}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Nút chuyển */}
          <button
            onClick={prevSlide}
            className="absolute cursor-pointer top-1/2 left-1/12 z-20 transform -translate-y-1/2 bg-white/70 hover:bg-white p-3 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute cursor-pointer top-1/2 right-1/12 z-20 transform -translate-y-1/2 bg-white/70 hover:bg-white p-3 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronRight size={28} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex % images.length ? "bg-white" : "bg-white/40"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className=" flex items-center justify-center bg-white py-10">
        <h1 className="text-5xl font-stix-two text-center">
          Phân hệ trong Quản lý trường bán trú trực tuyến
        </h1>
      </div>
    </div>
  );
}
