<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Éditeur de Plan - Personnalisation</h1>

    <div class="flex gap-6">
      <!-- Panneau de personnalisation -->
      <div class="w-1/3">
        <h2 class="text-lg font-semibold mb-4">Personnalisation des couleurs</h2>

        <!-- Couleurs pour les murs intérieurs -->
        <div class="mb-4">
          <label class="block text-lg font-medium">Couleur des murs intérieurs</label>
          <div class="mt-2 flex flex-wrap gap-2">
            <button
              v-for="color in colors"
              :key="color.value"
              :style="{ backgroundColor: color.value }"
              class="w-10 h-10 rounded-full shadow-md focus:outline-none"
              @click="setInteriorColor(color.value)"
            ></button>
          </div>
        </div>

        <!-- Couleurs pour les murs extérieurs -->
        <div class="mb-4">
          <label class="block text-lg font-medium">Couleur des murs extérieurs</label>
          <div class="mt-2 flex flex-wrap gap-2">
            <button
              v-for="color in colors"
              :key="color.value"
              :style="{ backgroundColor: color.value }"
              class="w-10 h-10 rounded-full shadow-md focus:outline-none"
              @click="setExteriorColor(color.value)"
            ></button>
          </div>
        </div>

        <!-- Sélection de la pièce -->
        <div class="mb-4">
          <label class="block text-lg font-medium">Sélection de la pièce</label>
          <select
            v-model="selectedRoom"
            class="mt-2 p-3 border border-gray-300 rounded-md w-full"
          >
            <option v-for="room in rooms" :key="room" :value="room">
              {{ room }}
            </option>
          </select>
        </div>

        <!-- Couleurs pour les pièces -->
        <div class="mb-4">
          <label class="block text-lg font-medium">Couleur des pièces</label>
          <div class="mt-2 flex flex-wrap gap-2">
            <button
              v-for="color in colors"
              :key="color.value"
              :style="{ backgroundColor: color.value }"
              class="w-10 h-10 rounded-full shadow-md focus:outline-none"
              @click="setRoomColor(color.value)"
            ></button>
          </div>
        </div>
      </div>

      <!-- Visualisation 3D -->
      <div class="w-2/3">
        <h2 class="text-lg font-semibold mb-4">Visualisation en temps réel</h2>
        <div
          ref="threeContainer"
          class="w-full h-96 bg-gray-200 rounded-lg"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import * as THREE from "three";
// Importe OrbitControls si tu veux permettre à l'utilisateur de manipuler la caméra
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  setup() {
    const colors = ref([
      { name: "Rouge clair", value: "#FFC1C1" },
      { name: "Rouge moyen", value: "#FF6B6B" },
      { name: "Rouge foncé", value: "#B22222" },
      { name: "Bleu clair", value: "#ADD8E6" },
      { name: "Bleu moyen", value: "#0000FF" },
      { name: "Bleu foncé", value: "#00008B" },
      { name: "Vert clair", value: "#90EE90" },
      { name: "Vert moyen", value: "#32CD32" },
      { name: "Vert foncé", value: "#006400" },
      { name: "Jaune clair", value: "#FFFFE0" },
      { name: "Jaune moyen", value: "#FFD700" },
      { name: "Jaune foncé", value: "#FFA500" },
      { name: "Gris clair", value: "#D3D3D3" },
      { name: "Gris moyen", value: "#A9A9A9" },
      { name: "Gris foncé", value: "#696969" },
      { name: "Rose clair", value: "#FFB6C1" },
      { name: "Rose moyen", value: "#FF69B4" },
      { name: "Rose foncé", value: "#C71585" },
      { name: "Violet clair", value: "#E6E6FA" },
      { name: "Violet moyen", value: "#9370DB" },
      { name: "Violet foncé", value: "#4B0082" },
      { name: "Orange clair", value: "#FFDAB9" },
      { name: "Orange moyen", value: "#FF8C00" },
      { name: "Orange foncé", value: "#FF4500" },
      { name: "Bleu profond", value: "#002855" },
      { name: "Or lumineux", value: "#FFB700" },
      { name: "Vert tropical doux", value: "#4CAF50" },
      { name: "Gris clair", value: "#F5F5F5" },
      { name: "Blanc pur", value: "#FFFFFF" },
    ]);

    const rooms = ref(["Salon", "Chambre", "Cuisine", "Salle de bain"]);
    const selectedRoom = ref("Salon");

    // Variables pour la scène 3D
    const threeContainer = ref(null);
    let scene, camera, renderer, cube, controls;

    const setInteriorColor = (color) => {
      // Change la couleur du matériau intérieur (cube)
      cube.material.color.set(color);
    };

    const setExteriorColor = (color) => {
      // Change la couleur du fond (extérieur)
      scene.background = new THREE.Color(color);
    };

    const setRoomColor = (color) => {
      // Change la couleur de la pièce sélectionnée (simulée ici par le cube)
      cube.material.color.set(color);
    };

    onMounted(() => {
      initThreeJS();
      animate();
    });

    const initThreeJS = () => {
      // Initialisation de la scène
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000); // Fond noir par défaut

      // Configuration de la caméra
      camera = new THREE.PerspectiveCamera(
        75,
        threeContainer.value.clientWidth / threeContainer.value.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5; // Position de la caméra

      // Rendu
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(
        threeContainer.value.clientWidth,
        threeContainer.value.clientHeight
      );
      threeContainer.value.appendChild(renderer.domElement);

      // Ajout de lumière pour la scène
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(1, 1, 1).normalize();
      scene.add(light);

      // Ajout d'un cube
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshStandardMaterial({ color: "#ffffff" });
      cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      // Contrôles d'orbite (permettent de faire pivoter la caméra autour du cube)
      controls = new OrbitControls(camera, renderer.domElement);
      controls.update();
    };

    const animate = () => {
      requestAnimationFrame(animate);

      // Animation du cube (rotation)
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // Rendu de la scène
      renderer.render(scene, camera);
    };

    return {
      colors,
      rooms,
      selectedRoom,
      setInteriorColor,
      setExteriorColor,
      setRoomColor,
      threeContainer,
    };
  },
};
</script>

<style scoped>
/* Ajoutez ici des styles supplémentaires si nécessaire */
</style>
