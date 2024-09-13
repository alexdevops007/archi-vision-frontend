<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">
      {{ isEditMode ? "Modifier le projet" : "Créer un projet" }}
    </h1>

    <form @submit.prevent="handleSubmit">
      <!-- Nom du projet -->
      <div class="mb-4">
        <label for="name" class="block text-lg font-medium"
          >Nom du projet</label
        >
        <input
          v-model="project.name"
          id="name"
          class="mt-1 p-3 border border-gray-300 rounded-md w-full"
          type="text"
          placeholder="Nom du projet"
          required
        />
      </div>

      <!-- Type du projet -->
      <div class="mb-4">
        <label for="type" class="block text-lg font-medium"
          >Type de projet</label
        >
        <select
          v-model="project.type"
          id="type"
          class="mt-1 p-3 border border-gray-300 rounded-md w-full"
          required
        >
          <option value="Appartement">Appartement</option>
          <option value="Villa">Villa</option>
          <option value="Bureau">Bureau</option>
          <option value="Studio">Studio</option>
          <option value="Immeuble">Immeuble</option>
        </select>
      </div>

      <!-- Nombre de pièces -->
      <div class="mb-4">
        <label for="rooms" class="block text-lg font-medium"
          >Nombre de pièces</label
        >
        <input
          v-model="project.rooms"
          id="rooms"
          class="mt-1 p-3 border border-gray-300 rounded-md w-full"
          type="number"
          placeholder="Nombre de pièces"
          required
        />
      </div>

      <!-- Description du projet -->
      <div class="mb-4">
        <label for="description" class="block text-lg font-medium"
          >Description</label
        >
        <textarea
          v-model="project.description"
          id="description"
          class="mt-1 p-3 border border-gray-300 rounded-md w-full"
          placeholder="Description du projet"
        ></textarea>
      </div>

      <!-- Sélection des couleurs -->
      <div class="mb-6">
        <label class="block text-lg font-medium">Couleurs</label>
        <div class="grid grid-cols-2 gap-4">
          <!-- Couleur intérieure -->
          <div>
            <label for="interiorColor" class="block text-sm font-medium"
              >Couleur intérieure</label
            >
            <div class="flex flex-wrap gap-2 mt-2">
              <button
                v-for="color in colors"
                :key="color.value"
                :style="{ backgroundColor: color.value }"
                class="w-10 h-10 rounded-full shadow-md focus:outline-none"
                :class="{
                  'ring-2 ring-offset-2 ring-bright-gold':
                    project.customization.colors.interior === color.value,
                }"
                @click="setColor('interior', color.value)"
              ></button>
            </div>
          </div>

          <!-- Couleur extérieure -->
          <div>
            <label for="exteriorColor" class="block text-sm font-medium"
              >Couleur extérieure</label
            >
            <div class="flex flex-wrap gap-2 mt-2">
              <button
                v-for="color in colors"
                :key="color.value"
                :style="{ backgroundColor: color.value }"
                class="w-10 h-10 rounded-full shadow-md focus:outline-none"
                :class="{
                  'ring-2 ring-offset-2 ring-bright-gold':
                    project.customization.colors.exterior === color.value,
                }"
                @click="setColor('exterior', color.value)"
              ></button>
            </div>
          </div>
        </div>
      </div>

      <!-- Matériaux -->
      <div class="mb-4">
        <label for="materials" class="block text-lg font-medium"
          >Matériaux</label
        >
        <input
          v-model="project.customization.materials"
          id="materials"
          class="mt-1 p-3 border border-gray-300 rounded-md w-full"
          type="text"
          placeholder="Matériaux du projet"
          required
        />
      </div>

      <!-- Surface -->
      <div class="mb-4">
        <label for="surface" class="block text-lg font-medium"
          >Surface (en m²)</label
        >
        <input
          v-model="project.customization.surface"
          id="surface"
          class="mt-1 p-3 border border-gray-300 rounded-md w-full"
          type="number"
          placeholder="Surface du projet"
          required
        />
      </div>

      <!-- Options supplémentaires pour Villa et Immeuble -->
      <div
        v-if="project.type === 'Villa' || project.type === 'Immeuble'"
        class="mb-4"
      >
        <label class="block text-lg font-medium">Options supplémentaires</label>
        <div class="mt-2 flex gap-4">
          <div>
            <input
              v-model="project.options.jardin"
              type="checkbox"
              id="jardin"
              class="mr-2"
            />
            <label for="jardin" class="text-lg">Jardin</label>
          </div>
          <div>
            <input
              v-model="project.options.piscine"
              type="checkbox"
              id="piscine"
              class="mr-2"
            />
            <label for="piscine" class="text-lg">Piscine</label>
          </div>
          <div>
            <input
              v-model="project.options.garage"
              type="checkbox"
              id="garage"
              class="mr-2"
            />
            <label for="garage" class="text-lg">Garage</label>
          </div>
        </div>
      </div>

      <!-- Propriétaire -->
      <div class="mb-6">
        <label for="owner" class="block text-lg font-medium"
          >Propriétaire</label
        >
        <select
          v-model="project.owner"
          id="owner"
          class="mt-2 p-3 border border-gray-300 rounded-md w-full shadow-sm"
          required
        >
          <option v-for="user in users" :key="user._id" :value="user._id">
            {{ user.firstName }} {{ user.lastName }}
          </option>
        </select>
      </div>

      <!-- Boutons -->
      <div class="flex justify-end gap-4">
        <button
          @click="cancel"
          type="button"
          class="bg-gray-300 text-gray-800 p-3 rounded-md"
        >
          Annuler
        </button>
        <button
          type="submit"
          class="bg-bright-gold text-white p-3 rounded-md shadow-md"
        >
          {{ isEditMode ? "Modifier" : "Enregistrer" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useProjectStore } from "../../store/modules/project";
import { useUserStore } from "../../store/modules/user";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const projectStore = useProjectStore();
    const userStore = useUserStore();
    const router = useRouter();
    const route = useRoute();
    const isEditMode = computed(() => !!route.params.id);

    const project = ref({
      name: "",
      type: "Appartement",
      rooms: 0,
      description: "",
      customization: {
        colors: {
          interior: "#FFFFFF",
          exterior: "#FFFFFF",
        },
        materials: "",
        surface: 0,
      },
      options: {
        jardin: false,
        piscine: false,
        garage: false,
      },
      owner: null,
    });

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

    const setColor = (type, value) => {
      project.value.customization.colors[type] = value;
    };

    const users = computed(() => userStore.users);

    const fetchUsers = async () => {
      await userStore.fetchUsers();
    };

    const fetchProject = async () => {
      if (isEditMode.value) {
        await projectStore.fetchProject(route.params.id);
        Object.assign(project.value, projectStore.project);
      }
    };

    const handleSubmit = async () => {
      if (isEditMode.value) {
        await projectStore.updateProject(route.params.id, project.value);
      } else {
        await projectStore.createProject(project.value);
      }
      router.push("/projects");
    };

    const cancel = () => {
      router.push("/projects");
    };

    onMounted(() => {
      fetchUsers();
      fetchProject();
    });

    return {
      project,
      colors,
      users,
      isEditMode,
      handleSubmit,
      cancel,
      setColor,
    };
  },
};
</script>

<style scoped>
/* Styles pour la palette de couleurs */
.color-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}
.color-button:hover {
  transform: scale(1.1);
}
</style>
