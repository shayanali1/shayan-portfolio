import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    const canvasElem = canvasDiv.current;
    if (canvasElem) {
      const rect = canvasElem.getBoundingClientRect();
      const container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
      } catch (e) {
        console.warn("WebGL not supported, falling back gracefully:", e);
        const progress = setProgress((value) => setLoading(value));
        progress.loaded();
        return;
      }

      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasElem.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: THREE.Object3D | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      const progress = setProgress((value) => setLoading(value));
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const {
        loadCharacter,
        resetCharTimeline,
        dispose: disposeCharacter,
      } = setCharacter(renderer, scene, camera);

      let resizeHandler: (() => void) | null = null;

      loadCharacter()
        .then((gltf) => {
          if (gltf) {
            const animations = setAnimations(gltf);
            if (hoverDivRef.current) {
              animations.hover(gltf, hoverDivRef.current);
            }
            mixer = animations.mixer;
            const character = gltf.scene;
            scene.add(character);
            headBone = character.getObjectByName("spine006") || null;
            screenLight = character.getObjectByName("screenlight") || null;
            if (prefersReducedMotion) {
              progress.clear();
              light.turnOnLights();
            } else {
              progress.loaded().then(() => {
                setTimeout(() => {
                  light.turnOnLights();
                  animations.startIntro();
                }, 2500);
              });
            }
            resizeHandler = () =>
              handleResize(renderer, camera, canvasDiv, () =>
                resetCharTimeline(character)
              );
            window.addEventListener("resize", resizeHandler);
          }
        })
        .catch((err) => {
          console.error("Character model load failed, continuing gracefully:", err);
          progress.loaded();
        });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      // Single stable handler: re-adding the same function to the same element
      // is a no-op, so touchmove listeners no longer accumulate per touch.
      const onTouchMove = (event: TouchEvent) => {
        handleTouchMove(event, (x, y) => (mouse = { x, y }));
      };
      const touchMoveTargets = new Set<HTMLElement>();
      const touchStartTimers = new Set<ReturnType<typeof setTimeout>>();
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        const timer = setTimeout(() => {
          touchStartTimers.delete(timer);
          if (element) {
            element.addEventListener("touchmove", onTouchMove);
            touchMoveTargets.add(element);
          }
        }, 200);
        touchStartTimers.add(timer);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }

      // Visibility & Intersection tracking: pause rendering when tab is hidden or off-screen
      let isTabVisible = !document.hidden;
      let isSceneInView = true;

      const onVisibilityChange = () => {
        isTabVisible = !document.hidden;
        if (isTabVisible) {
          clock.getDelta(); // flush stale delta
        }
      };
      document.addEventListener("visibilitychange", onVisibilityChange);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isSceneInView = entry.isIntersecting;
            if (isSceneInView) {
              clock.getDelta(); // flush stale delta
            }
          });
        },
        { rootMargin: "150px" }
      );
      observer.observe(canvasElem);

      let rafId: number;
      const animate = () => {
        rafId = requestAnimationFrame(animate);
        if (!isTabVisible || !isSceneInView) return;

        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(rafId);
        observer.disconnect();
        document.removeEventListener("visibilitychange", onVisibilityChange);
        disposeCharacter();
        touchStartTimers.forEach((timer) => clearTimeout(timer));
        touchStartTimers.clear();
        touchMoveTargets.forEach((element) =>
          element.removeEventListener("touchmove", onTouchMove)
        );
        touchMoveTargets.clear();
        scene.traverse((obj: THREE.Object3D) => {
          const mesh = obj as THREE.Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m) => m.dispose());
            } else {
              mesh.material.dispose();
            }
          }
        });
        scene.clear();
        renderer.dispose();
        if (resizeHandler) {
          window.removeEventListener("resize", resizeHandler);
        }
        if (canvasElem) {
          canvasElem.removeChild(renderer.domElement);
        }
        document.removeEventListener("mousemove", onMouseMove);
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
