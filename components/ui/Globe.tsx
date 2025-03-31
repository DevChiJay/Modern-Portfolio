"use client";
import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Object3DNode, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";

// Helper function to validate numerical values
const isValidNumber = (value: any): boolean => {
  return typeof value === "number" && !isNaN(value) && isFinite(value);
};

// Helper function to ensure we have valid coordinates
const validateCoordinates = (data: Position[]): Position[] => {
  return data.filter((item) => {
    // Validate all required numerical values
    return (
      isValidNumber(item.startLat) &&
      isValidNumber(item.startLng) &&
      isValidNumber(item.endLat) &&
      isValidNumber(item.endLng) &&
      isValidNumber(item.arcAlt)
    );
  });
};

// Safe value accessor functions
const getSafeValue = (value: any, defaultValue: number): number => {
  return isValidNumber(value) ? value : defaultValue;
};

// Add a new helper function to safely handle strings
const safeString = (value: any): string => {
  if (value === null || value === undefined) {
    return '';
  }
  return typeof value === 'string' ? value : String(value);
};

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: Object3DNode<ThreeGlobe, typeof ThreeGlobe>;
  }
}

extend({ ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

let numbersOfRings = [0];

export function Globe({ globeConfig, data }: WorldProps) {
  // Filter invalid data entries before processing
  const validData = validateCoordinates(data);

  const [globeData, setGlobeData] = useState<
    | {
        size: number;
        order: number;
        color: (t: number) => string;
        lat: number;
        lng: number;
      }[]
    | null
  >(null);

  const globeRef = useRef<ThreeGlobe | null>(null);

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  };

  useEffect(() => {
    if (globeRef.current) {
      _buildData();
      _buildMaterial();
    }
  }, [globeRef.current]);

  const _buildMaterial = () => {
    if (!globeRef.current) return;

    const globeMaterial = globeRef.current.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };
    
    // Ensure color values are valid strings
    globeMaterial.color = new Color(safeString(globeConfig.globeColor || "#1d072e"));
    globeMaterial.emissive = new Color(safeString(globeConfig.emissive || "#000000"));
    globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
    globeMaterial.shininess = globeConfig.shininess || 0.9;
  };

  const _buildData = () => {
    const arcs = validData;
    let points = [];
    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i];
      const rgb = hexToRgb(arc.color) as { r: number; g: number; b: number };
      // Only add points with valid coordinates
      if (isValidNumber(arc.startLat) && isValidNumber(arc.startLng)) {
        points.push({
          size: defaultProps.pointSize,
          order: getSafeValue(arc.order, 0),
          color: (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
          lat: arc.startLat,
          lng: arc.startLng,
        });
      }

      if (isValidNumber(arc.endLat) && isValidNumber(arc.endLng)) {
        points.push({
          size: defaultProps.pointSize,
          order: getSafeValue(arc.order, 0),
          color: (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
          lat: arc.endLat,
          lng: arc.endLng,
        });
      }
    }

    // remove duplicates for same lat and lng
    const filteredPoints = points.filter(
      (v, i, a) =>
        a.findIndex((v2) =>
          ["lat", "lng"].every(
            (k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"]
          )
        ) === i
    );

    setGlobeData(filteredPoints);
  };

  useEffect(() => {
    if (globeRef.current && globeData) {
      globeRef.current
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .showAtmosphere(defaultProps.showAtmosphere)
        .atmosphereColor(safeString(defaultProps.atmosphereColor))
        .atmosphereAltitude(defaultProps.atmosphereAltitude)
        .hexPolygonColor((e) => {
          return safeString(defaultProps.polygonColor);
        });
      startAnimation();
    }
  }, [globeData]);

  const startAnimation = () => {
    if (!globeRef.current || !globeData) return;

    globeRef.current
      .arcsData(validData)
      .arcStartLat((d) =>
        getSafeValue((d as { startLat: number }).startLat * 1, 0)
      )
      .arcStartLng((d) =>
        getSafeValue((d as { startLng: number }).startLng * 1, 0)
      )
      .arcEndLat((d) =>
        getSafeValue((d as { endLat: number }).endLat * 1, 0)
      )
      .arcEndLng((d) =>
        getSafeValue((d as { endLng: number }).endLng * 1, 0)
      )
      .arcColor((e: any) => {
        const color = (e as { color: string }).color;
        return safeString(color || "#FFFFFF");
      })
      .arcAltitude((e) => {
        return getSafeValue((e as { arcAlt: number }).arcAlt * 1, 0.1);
      })
      .arcStroke((e) => {
        return [0.32, 0.28, 0.3][Math.round(Math.random() * 2)];
      })
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap((e) =>
        getSafeValue((e as { order: number }).order * 1, 0)
      )
      .arcDashGap(15)
      .arcDashAnimateTime((e) => defaultProps.arcTime);

    globeRef.current
      .pointsData(globeData)
      .pointColor((e) => {
        const color = (e as { color: string }).color;
        return safeString(color || "#FFFFFF");
      })
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2);

    // Ensure rings data is valid before setting
    globeRef.current
      .ringsData([])
      .ringColor((e: any) => (t: any) => {
        try {
          return e.color(t);
        } catch (err) {
          return "rgba(255,255,255,0.5)"; // Fallback color
        }
      })
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings
      );
  };

  useEffect(() => {
    if (!globeRef.current || !globeData) return;

    const interval = setInterval(() => {
      if (!globeRef.current || !globeData) return;
      numbersOfRings = genRandomNumbers(
        0,
        Math.max(1, globeData.length), // Ensure at least 1 to avoid empty range
        Math.min(
          Math.floor((globeData.length * 4) / 5),
          globeData.length // Don't try to generate more numbers than available data
        )
      );

      // Check if we have any valid indices before updating
      if (numbersOfRings.length > 0) {
        globeRef.current.ringsData(
          globeData.filter((d, i) => numbersOfRings.includes(i))
        );
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [globeRef.current, globeData]);

  return (
    <>
      <threeGlobe ref={globeRef} />
    </>
  );
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffaaff, 0);
  }, []);

  return null;
}

export function World(props: WorldProps) {
  const { globeConfig } = props;
  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 400, 2000);
  return (
    <Canvas scene={scene} camera={new PerspectiveCamera(50, aspect, 180, 1800)}>
      <WebGLRendererConfig />
      <ambientLight 
        color={safeString(globeConfig.ambientLight || "#FFFFFF")} 
        intensity={0.6} 
      />
      <directionalLight
        color={safeString(globeConfig.directionalLeftLight || "#FFFFFF")}
        position={new Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={safeString(globeConfig.directionalTopLight || "#FFFFFF")}
        position={new Vector3(-200, 500, 200)}
      />
      <pointLight
        color={safeString(globeConfig.pointLight || "#FFFFFF")}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <Globe {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotateSpeed={1}
        autoRotate={true}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}

export function hexToRgb(hex: string) {
  // Default to a valid color if hex is invalid
  if (!hex || typeof hex !== "string") {
    return { r: 255, g: 255, b: 255 }; // Default to white
  }

  try {
    // Safely handle the string operations
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 255, g: 255, b: 255 }; // Default to white if parsing fails
  } catch (e) {
    // If any string operations fail, return default color
    return { r: 255, g: 255, b: 255 };
  }
}

export function genRandomNumbers(min: number, max: number, count: number) {
  // Safety checks for valid inputs
  if (!isValidNumber(min) || !isValidNumber(max) || !isValidNumber(count)) {
    return [];
  }

  // Ensure min is less than max
  if (min >= max) {
    return [];
  }

  // Ensure we don't try to generate more unique numbers than the range allows
  const possibleNumbers = max - min;
  const safeCount = Math.min(possibleNumbers, count);

  const arr = [];
  let attempts = 0;
  const maxAttempts = safeCount * 10; // Avoid infinite loops

  while (arr.length < safeCount && attempts < maxAttempts) {
    attempts++;
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}
