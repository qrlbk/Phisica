"use client";

import { useMemo, useRef } from "react";
import { AdditiveBlending, BackSide, FrontSide, Mesh, ShaderMaterial, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { noiseCommon } from "./glsl/common";

const sunSurfaceVertex = /* glsl */ `
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

const sunSurfaceFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uCameraPos;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  ${noiseCommon}
  void main() {
    vec2 uv = vUv * vec2(6.0, 3.0);
    float gran = fbm(uv + uTime * 0.04);
    float swirls = fbm(uv * 2.3 - uTime * 0.025);
    float hot = smoothstep(0.55, 1.0, gran * 0.65 + swirls * 0.35);
    vec3 core = vec3(1.0, 0.72, 0.22);
    vec3 mid = vec3(1.0, 0.45, 0.08);
    vec3 rimCol = vec3(1.0, 0.88, 0.45);
    vec3 col = mix(core, mid, gran);
    col = mix(col, rimCol, hot * 0.55);
    vec3 viewDir = normalize(uCameraPos - vPosW);
    float fresnel = pow(1.0 - max(dot(vNormalW, viewDir), 0.0), 2.8);
    col += vec3(1.0, 0.55, 0.12) * fresnel * 0.9;
    col += vec3(1.0, 0.35, 0.05) * smoothstep(0.4, 1.0, swirls) * 0.25;
    gl_FragColor = vec4(col, 1.0);
  }
`;

const coronaVertex = /* glsl */ `
  varying vec3 vNormalView;
  void main() {
    vNormalView = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const coronaFragment = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormalView;
  uniform vec3 uColor;
  void main() {
    vec3 nv = normalize(vNormalView);
    float rim = pow(1.0 - abs(nv.z), 2.6);
    float pulse = 0.85 + 0.15 * sin(uTime * 1.4);
    float alpha = rim * 0.38 * pulse;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

export function SunBody() {
  const surfaceRef = useRef<Mesh>(null);
  const coronaRef = useRef<Mesh>(null);
  const chromoRef = useRef<Mesh>(null);
  const { camera } = useThree();

  const surfaceMat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uCameraPos: { value: new Vector3() }
        },
        vertexShader: sunSurfaceVertex,
        fragmentShader: sunSurfaceFragment
      }),
    []
  );

  const coronaMat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new Vector3(1, 0.45, 0.12) }
        },
        vertexShader: coronaVertex,
        fragmentShader: coronaFragment,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        side: BackSide
      }),
    []
  );

  const chromoMat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new Vector3(1, 0.25, 0.05) }
        },
        vertexShader: coronaVertex,
        fragmentShader: coronaFragment,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        side: FrontSide
      }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    surfaceMat.uniforms.uTime.value = t;
    coronaMat.uniforms.uTime.value = t;
    chromoMat.uniforms.uTime.value = t;
    surfaceMat.uniforms.uCameraPos.value.copy(camera.position);
    if (surfaceRef.current) {
      surfaceRef.current.rotation.y = t * 0.018;
    }
  });

  return (
    <group>
      <mesh ref={surfaceRef} material={surfaceMat}>
        <sphereGeometry args={[0.9, 96, 96]} />
      </mesh>
      <mesh ref={chromoRef} scale={1.06} material={chromoMat}>
        <sphereGeometry args={[0.9, 48, 48]} />
      </mesh>
      <mesh ref={coronaRef} scale={1.22} material={coronaMat}>
        <sphereGeometry args={[0.9, 32, 32]} />
      </mesh>
      <mesh scale={1.45}>
        <sphereGeometry args={[0.9, 28, 28]} />
        <meshBasicMaterial color="#ff6b1a" transparent opacity={0.09} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh scale={1.85}>
        <sphereGeometry args={[0.9, 20, 20]} />
        <meshBasicMaterial color="#ff9f40" transparent opacity={0.045} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}
