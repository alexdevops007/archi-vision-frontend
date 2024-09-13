<template>
  <div class="max-w-7xl mx-auto py-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">
        <i class="fas fa-building"></i> Gestion des Projets
      </h1>
      <router-link
        to="/projects/create"
        class="bg-green-500 text-white py-2 px-4 rounded-md"
      >
        <i class="fas fa-plus"></i> Ajouter un projet
      </router-link>
    </div>

    <!-- Afficher un indicateur de chargement si nécessaire -->
    <div v-if="loading" class="text-center text-gray-600">
      <i class="fas fa-spinner fa-spin"></i> Chargement des projets...
    </div>

    <!-- Table des projets -->
    <table v-else class="min-w-full bg-white shadow-md rounded-lg">
      <thead>
        <tr class="bg-gray-50 text-left">
          <th class="p-4">Nom</th>
          <th class="p-4">Type</th>
          <th class="p-4">Pièces</th>
          <th class="p-4">Surface (m²)</th>
          <th class="p-4">Propriétaire</th>
          <th class="p-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="project in projects"
          :key="project._id"
          class="hover:bg-gray-100"
        >
          <td class="p-4">{{ project.name }}</td>
          <td class="p-4">{{ project.type }}</td>
          <td class="p-4">{{ project.rooms }}</td>
          <td class="p-4">{{ project.customization.surface }}</td>
          <td class="p-4">
            {{ project.owner.firstName }} {{ project.owner.lastName }}
          </td>
          <td class="p-4">
            <router-link
              :to="`/projects/${project._id}`"
              class="text-blue-500 mr-2"
            >
              <i class="fas fa-eye"></i> Détails
            </router-link>
            <router-link
              :to="`/projects/edit/${project._id}`"
              class="text-yellow-500 mr-2"
            >
              <i class="fas fa-edit"></i> Modifier
            </router-link>
            <button @click="deleteProject(project._id)" class="text-red-500">
              <i class="fas fa-trash-alt"></i> Supprimer
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useProjectStore } from "../../store/modules/project";
import { onMounted, computed } from "vue";

export default {
  setup() {
    const projectStore = useProjectStore();

    // Charger les projets au montage du composant
    onMounted(() => {
      projectStore.fetchProjects();
    });

    const projects = computed(() => projectStore.projects);
    const loading = computed(() => projectStore.loading);

    const deleteProject = async (id) => {
      if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
        await projectStore.deleteProject(id);
      }
    };

    return {
      projects,
      loading,
      deleteProject,
    };
  },
};
</script>
