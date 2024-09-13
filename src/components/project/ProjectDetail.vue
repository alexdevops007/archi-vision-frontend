<template>
  <div class="container mx-auto p-6">
    <!-- Vérifie si le projet est bien chargé -->
    <div v-if="project">
      <h1 class="text-2xl font-bold mb-4">{{ project.name }}</h1>

      <p class="text-lg mb-4">
        <strong>Type de projet: </strong> {{ project.type }}
      </p>

      <p class="text-lg mb-4">
        <strong>Nombre de pièces: </strong> {{ project.rooms }}
      </p>

      <p class="text-lg mb-4">
        <strong>Surface: </strong> {{ project.customization.surface }} m²
      </p>

      <p class="text-lg mb-4">
        <strong>Matériaux: </strong> {{ project.customization.materials }}
      </p>

      <p class="text-lg mb-4">
        <strong>Propriétaire: </strong> {{ project.owner?.firstName }} {{ project.owner?.lastName }}
      </p>

      <div class="mt-6 flex justify-between">
        <router-link
          :to="`/projects/edit/${project._id}`"
          class="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition"
        >
          <i class="fas fa-edit"></i> Modifier le projet
        </router-link>

        <router-link
          to="/projects"
          class="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
        >
          <i class="fas fa-arrow-left"></i> Retour à la liste
        </router-link>
      </div>
    </div>

    <!-- Affiche un message de chargement si les données ne sont pas encore disponibles -->
    <div v-else class="text-center">
      <i class="fas fa-spinner fa-spin"></i> Chargement des détails du projet...
    </div>
  </div>
</template>

<script>
import { useProjectStore } from "../../store/modules/project";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const projectStore = useProjectStore();
    const route = useRoute();
    const project = ref(null);

    onMounted(async () => {
      await projectStore.fetchProject(route.params.id);
      project.value = projectStore.project;
    });

    return {
      project,
    };
  },
};
</script>
