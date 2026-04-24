"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Camera, ExternalLink } from "lucide-react";
import { photoAlbums, PhotoAlbum } from "@/data/photos";

export default function PhotoCarousel() {
  const [activeAlbum, setActiveAlbum] = useState<PhotoAlbum>(photoAlbums[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const photos = activeAlbum.photos;

  const goNext = useCallback(() => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, goNext]);

  // Reset index when switching albums
  useEffect(() => {
    setCurrentIndex(0);
    setImageLoaded(false);
  }, [activeAlbum]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  if (photos.length === 0) return null;

  return (
    <div className="bg-[#1a1a2e] border border-purple-800/40 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black flex items-center gap-2">
          <Camera className="w-6 h-6 text-purple-400" />
          Photos
          <a
            href={activeAlbum.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors ml-2"
          >
            View full album <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded-lg hover:bg-purple-900/30 text-gray-500 hover:text-purple-300 transition-colors"
        >
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isOpen && (
      <>
      {/* Album tabs */}
      <div className="flex gap-2 mb-4 mt-4 overflow-x-auto">
        {photoAlbums.map((album) => (
          <button
            key={album.id}
            onClick={() => {
              setActiveAlbum(album);
              setIsAutoPlaying(true);
            }}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
              activeAlbum.id === album.id
                ? "bg-purple-600 text-white"
                : "bg-[#121212] text-gray-400 hover:text-white hover:bg-purple-900/30 border border-gray-800/40"
            }`}
          >
            {album.id}
          </button>
        ))}
      </div>

      {/* Carousel */}
      <div
        className="relative aspect-[3/4] md:aspect-video bg-black/50 rounded-xl overflow-hidden group"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Image */}
        <img
          src={photos[currentIndex]}
          alt={`${activeAlbum.title} - Photo ${currentIndex + 1}`}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          draggable={false}
        />

        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Nav buttons */}
        <button
          onClick={goPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Next photo"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Counter */}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          {currentIndex + 1} / {photos.length}
        </div>
      </div>

      {/* Dot indicators (show max 15 dots) */}
      <div className="flex justify-center gap-1.5 mt-3">
        {photos.length <= 15
          ? photos.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentIndex(i);
                  setImageLoaded(false);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex ? "bg-purple-500 w-4" : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))
          : /* For many photos, show a progress bar instead */
            <div className="w-full max-w-xs h-1 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / photos.length) * 100}%` }}
              />
            </div>
        }
      </div>
      </>
      )}
    </div>
  );
}
