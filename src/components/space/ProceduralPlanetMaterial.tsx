"use client";

import { useEffect, useMemo, useRef } from "react";
import { Color, ShaderMaterial, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { noiseCommon } from "./glsl/common";

function hexToVec3(hex: string): Vector3 {
  const c = new Color(hex);
  return new Vector3(c.r, c.g, c.b);
}

const planetVert = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  void main() {
    vUv = uv;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vPosW = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const rockyFrag = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uCameraPos;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  ${noiseCommon}
  void main() {
    vec2 uv = vUv * vec2(8.0, 4.0);
    float n = fbm(uv);
    float craters = smoothstep(0.35, 0.72, fbm(uv * 3.7));
    vec3 dark = uBase * 0.55;
    vec3 lit = mix(uBase * 0.78, uBase * 1.12, n);
    vec3 col = mix(lit, dark, craters * 0.55);
    vec3 L = normalize(-vPosW);
    vec3 V = normalize(uCameraPos - vPosW);
    float diff = max(dot(vNormalW, L), 0.0);
    float wrap = 0.28;
    float shade = clamp((diff + wrap) / (1.0 + wrap), 0.0, 1.0);
    col *= 0.32 + 0.68 * shade;
    vec3 H = normalize(L + V);
    float spec = pow(max(dot(vNormalW, H), 0.0), 14.0) * 0.1;
    gl_FragColor = vec4(col + vec3(spec), 1.0);
  }
`;

const venusFrag = /* glsl */ `
  uniform vec3 uBase;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  ${noiseCommon}
  void main() {
    vec2 uv = vUv * vec2(5.0, 14.0);
    float bands = sin(vUv.y * 24.0 + fbm(uv) * 2.5) * 0.5 + 0.5;
    float swirl = fbm(uv * 1.8 + uTime * 0.01);
    vec3 pale = uBase * 1.05;
    vec3 deep = uBase * 0.62;
    vec3 col = mix(deep, pale, bands * 0.55 + swirl * 0.35);
    vec3 L = normalize(-vPosW);
    float diff = max(dot(vNormalW, L), 0.0);
    col *= 0.38 + 0.62 * diff;
    gl_FragColor = vec4(col, 1.0);
  }
`;

const earthFrag = /* glsl */ `
  uniform vec3 uCameraPos;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  ${noiseCommon}
  void main() {
    vec2 uv = vUv * vec2(7.0, 3.5);
    float landMask = smoothstep(0.38, 0.58, fbm(uv * 1.2));
    float detail = fbm(uv * 4.0);
    vec3 ocean = vec3(0.02, 0.12, 0.42);
    vec3 shallow = vec3(0.05, 0.28, 0.52);
    vec3 land = mix(vec3(0.12, 0.38, 0.14), vec3(0.35, 0.28, 0.18), detail);
    land = mix(land, vec3(0.55, 0.52, 0.48), smoothstep(0.55, 0.85, detail) * 0.35);
    vec3 col = mix(ocean, shallow, smoothstep(0.2, 0.45, landMask));
    col = mix(col, land, smoothstep(0.48, 0.62, landMask));
    float clouds = smoothstep(0.55, 0.88, fbm(uv * 9.0 + uTime * 0.02));
    col = mix(col, vec3(0.92, 0.95, 1.0), clouds * 0.38);
    vec3 L = normalize(-vPosW);
    vec3 V = normalize(uCameraPos - vPosW);
    float diff = max(dot(vNormalW, L), 0.0);
    col *= 0.35 + 0.65 * diff;
    vec3 H = normalize(L + V);
    float spec = pow(max(dot(vNormalW, H), 0.0), 48.0) * 0.32;
    col += vec3(spec) * (1.0 - landMask * 0.85);
    gl_FragColor = vec4(col, 1.0);
  }
`;

const gasGiantFrag = /* glsl */ `
  uniform vec3 uDeep;
  uniform vec3 uBand;
  uniform vec3 uBright;
  uniform float uTime;
  uniform float uBandFreq;
  uniform float uTurbulence;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  ${noiseCommon}
  void main() {
    float lat = vUv.y;
    float bands = sin(lat * uBandFreq + fbm(vUv * vec2(6.0, 14.0) + uTime * 0.015) * uTurbulence);
    bands = bands * 0.5 + 0.5;
    float storm = smoothstep(0.72, 0.95, fbm(vUv * vec2(5.0, 8.0)));
    vec3 col = mix(uDeep, uBand, bands);
    col = mix(col, uBright, storm * 0.4);
    float v = fbm(vUv * vec2(12.0, 22.0));
    col *= 0.88 + 0.12 * v;
    vec3 L = normalize(-vPosW);
    float diff = max(dot(vNormalW, L), 0.0);
    col *= 0.42 + 0.58 * diff;
    gl_FragColor = vec4(col, 1.0);
  }
`;

const iceGiantFrag = /* glsl */ `
  uniform vec3 uDeep;
  uniform vec3 uBright;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  ${noiseCommon}
  void main() {
    float lat = vUv.y;
    float soft = sin(lat * 18.0 + fbm(vUv * vec2(4.0, 10.0) + uTime * 0.012) * 1.8) * 0.5 + 0.5;
    float mist = fbm(vUv * vec2(9.0, 16.0));
    vec3 col = mix(uDeep, uBright, soft * 0.65 + mist * 0.22);
    vec3 L = normalize(-vPosW);
    float diff = max(dot(vNormalW, L), 0.0);
    col *= 0.45 + 0.55 * diff;
    gl_FragColor = vec4(col, 1.0);
  }
`;

export type PlanetVisualKind = "rocky" | "venus" | "earth" | "jupiter" | "saturn" | "iceGiant";

export function usePlanetVisualKind(planetId: string): PlanetVisualKind {
  switch (planetId) {
    case "mercury":
    case "mars":
    case "pluto":
      return "rocky";
    case "venus":
      return "venus";
    case "earth":
      return "earth";
    case "jupiter":
      return "jupiter";
    case "saturn":
      return "saturn";
    case "uranus":
    case "neptune":
      return "iceGiant";
    default:
      return "rocky";
  }
}

export function ProceduralPlanetMaterial({
  planetId,
  baseColorHex
}: {
  planetId: string;
  baseColorHex: string;
}) {
  const kind = usePlanetVisualKind(planetId);
  const { camera } = useThree();
  const matRef = useRef<ShaderMaterial | null>(null);

  const material = useMemo(() => {
    const base = hexToVec3(baseColorHex);
    if (kind === "earth") {
      return new ShaderMaterial({
        uniforms: {
          uCameraPos: { value: new Vector3() },
          uTime: { value: 0 }
        },
        vertexShader: planetVert,
        fragmentShader: earthFrag
      });
    }
    if (kind === "venus") {
      return new ShaderMaterial({
        uniforms: {
          uBase: { value: base.clone() },
          uTime: { value: 0 }
        },
        vertexShader: planetVert,
        fragmentShader: venusFrag
      });
    }
    if (kind === "jupiter") {
      return new ShaderMaterial({
        uniforms: {
          uDeep: { value: new Vector3(0.45, 0.22, 0.08) },
          uBand: { value: new Vector3(0.78, 0.55, 0.32) },
          uBright: { value: new Vector3(0.92, 0.78, 0.55) },
          uTime: { value: 0 },
          uBandFreq: { value: 38 },
          uTurbulence: { value: 2.8 }
        },
        vertexShader: planetVert,
        fragmentShader: gasGiantFrag
      });
    }
    if (kind === "saturn") {
      return new ShaderMaterial({
        uniforms: {
          uDeep: { value: new Vector3(0.42, 0.32, 0.14) },
          uBand: { value: new Vector3(0.72, 0.58, 0.35) },
          uBright: { value: new Vector3(0.88, 0.78, 0.52) },
          uTime: { value: 0 },
          uBandFreq: { value: 32 },
          uTurbulence: { value: 2.2 }
        },
        vertexShader: planetVert,
        fragmentShader: gasGiantFrag
      });
    }
    if (kind === "iceGiant") {
      const isNeptune = planetId === "neptune";
      return new ShaderMaterial({
        uniforms: {
          uDeep: {
            value: isNeptune ? new Vector3(0.04, 0.08, 0.42) : new Vector3(0.08, 0.35, 0.38)
          },
          uBright: {
            value: isNeptune ? new Vector3(0.25, 0.45, 0.95) : new Vector3(0.45, 0.82, 0.88)
          },
          uTime: { value: 0 }
        },
        vertexShader: planetVert,
        fragmentShader: iceGiantFrag
      });
    }
    return new ShaderMaterial({
      uniforms: {
        uBase: { value: base.clone() },
        uCameraPos: { value: new Vector3() }
      },
      vertexShader: planetVert,
      fragmentShader: rockyFrag
    });
  }, [kind, planetId, baseColorHex]);

  matRef.current = material;

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  useFrame(({ clock }) => {
    const m = matRef.current;
    if (!m) return;
    const t = clock.getElapsedTime();
    if (m.uniforms.uCameraPos) {
      m.uniforms.uCameraPos.value.copy(camera.position);
    }
    if ("uTime" in m.uniforms) {
      (m.uniforms.uTime as { value: number }).value = t;
    }
  });

  return <primitive object={material} attach="material" />;
}
