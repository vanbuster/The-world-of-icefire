"use client";

import { useMapStore } from "@/stores/mapStore";

const weatherTextures = {
  cloud: "/assets/westeros/generated/weather/cloud-haze-texture-v1.png",
  snow: "/assets/westeros/generated/weather/northern-snow-texture-v1.png",
  smoke: "/assets/westeros/generated/weather/war-smoke-texture-v1.png",
} as const;

export function WeatherLayer() {
  const weatherIntensity = useMapStore((state) => state.weatherIntensity);
  const isHigh = weatherIntensity === "high";
  const isLow = weatherIntensity === "low";
  const snowParticleCount = isHigh ? 30 : isLow ? 10 : 0;
  const snowParticles = Array.from({ length: snowParticleCount }, (_, index) => ({
    id: index,
    left: `${8 + ((index * 13) % 36)}%`,
    top: `${4 + ((index * 17) % 24)}%`,
    delay: `${(index % 7) * -0.8}s`,
    duration: `${6 + (index % 5)}s`,
    opacity: 0.28 + (index % 4) * 0.1,
  }));

  if (weatherIntensity === "off") {
    return (
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        data-weather-layer
        data-weather-mode="off"
      />
    );
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      data-weather-layer
      data-weather-mode={weatherIntensity}
    >
      <div
        className="map-cloud-drift absolute -left-[18%] top-[3%] h-48 w-[52%] rounded-full bg-snow-mist/16 bg-cover bg-center blur-3xl"
        data-cloud-layer
        data-weather-texture="cloud-haze"
        style={{
          animation: "map-cloud-drift 28s ease-in-out infinite alternate",
          backgroundImage: `url(${weatherTextures.cloud})`,
          mixBlendMode: "screen",
          opacity: isHigh ? 1 : 0.48,
        }}
      />
      <div
        className="map-cloud-drift-slow absolute right-[-12%] top-[18%] h-40 w-[42%] rounded-full bg-fog/14 bg-cover bg-center blur-3xl"
        data-weather-texture="cloud-haze-secondary"
        style={{
          animation: "map-cloud-drift-slow 42s ease-in-out infinite alternate",
          backgroundImage: `url(${weatherTextures.cloud})`,
          mixBlendMode: "screen",
          opacity: isHigh ? 1 : 0.45,
        }}
      />
      <div
        className="map-fog-pulse absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(232,240,238,0.09)_28%,transparent_56%)]"
        style={{
          animation: "map-fog-pulse 18s ease-in-out infinite",
          opacity: isHigh ? 1 : 0.34,
        }}
      />

      <div
        className="absolute inset-x-0 top-0 h-[36%] bg-repeat-x"
        data-snow-layer
        data-weather-texture="northern-snow"
        style={{
          backgroundImage: `url(${weatherTextures.snow})`,
          backgroundSize: "34rem 34rem",
          opacity: isHigh ? 1 : 0.58,
        }}
      >
        {snowParticles.map((particle) => (
          <span
            className="map-snow-particle absolute h-1 w-1 rounded-full bg-snow-mist"
            key={particle.id}
            style={{
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              left: particle.left,
              opacity: particle.opacity,
              top: particle.top,
            }}
          />
        ))}
      </div>

      {isHigh ? (
        <div
          className="map-smoke-drift absolute bottom-[12%] left-[18%] h-40 w-[44%] rounded-full bg-war-smoke/18 bg-cover bg-center blur-3xl"
          data-smoke-layer
          data-weather-texture="war-smoke"
          style={{
            animation: "map-smoke-drift 34s ease-in-out infinite alternate",
            backgroundImage: `url(${weatherTextures.smoke})`,
            mixBlendMode: "multiply",
          }}
        />
      ) : null}
    </div>
  );
}
