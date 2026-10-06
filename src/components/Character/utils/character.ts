import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  dracoLoader.setWorkerLimit(2);
  loader.setDRACOLoader(dracoLoader);

  let disposed = false;
  let disposeCharTimeline: (() => void) | null = null;

  // (Re)builds the character scroll timeline, first tearing down the timers
  // from any previous call so they don't stack up across resizes.
  const resetCharTimeline = (character: THREE.Object3D) => {
    disposeCharTimeline?.();
    disposeCharTimeline = null;
    const clearCharTimeline = setCharTimeline(character, camera);
    if (disposed) {
      clearCharTimeline();
    } else {
      disposeCharTimeline = clearCharTimeline;
    }
  };

  const loadCharacter = async (): Promise<GLTF | null> => {
    try {
      const encryptedBlob = await decryptFile(
        "/models/character.enc?v=2",
        "MyCharacter12"
      );
      const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

      return new Promise<GLTF | null>((resolve, reject) => {
        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          (gltf) => {
            character = gltf.scene;
            renderer.compileAsync(character, camera, scene).then(() => {
              character.traverse((child: THREE.Object3D) => {
                if ((child as THREE.Mesh).isMesh) {
                  const mesh = child as THREE.Mesh;

                  // Change clothing colors to match site theme
                  if (mesh.material) {
                    if (mesh.name === "BODY.SHIRT") { // The shirt mesh
                      const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                      newMat.color = new THREE.Color("#8B4513");
                      mesh.material = newMat;
                    } else if (mesh.name === "Pant") {
                      const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                      newMat.color = new THREE.Color("#000000");
                      mesh.material = newMat;
                    }
                  }

                  child.castShadow = true;
                  child.receiveShadow = true;
                  mesh.frustumCulled = true;
                }
              });
              resolve(gltf);
              resetCharTimeline(character);
              setAllTimeline();
              character.getObjectByName("footR")!.position.y = 3.36;
              character.getObjectByName("footL")!.position.y = 3.36;

              // Monitor scale is handled by GsapScroll.ts animations

              dracoLoader.dispose();
            });
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // Clears timers started by setCharTimeline. Safe to call before the model
  // finishes loading: the interval is then cleared as soon as it is created.
  const dispose = () => {
    disposed = true;
    disposeCharTimeline?.();
    disposeCharTimeline = null;
  };

  return { loadCharacter, resetCharTimeline, dispose };
};

export default setCharacter;
