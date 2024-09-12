<template>
  <div v-if="user" class="max-w-lg mx-auto bg-white p-8 shadow-md rounded-lg">
    <h1 class="text-2xl font-bold mb-6">
      <i class="fas fa-user"></i> {{ user.firstName }} {{ user.lastName }}
    </h1>
    <p>
      <strong><i class="fas fa-envelope"></i> Email : </strong>{{ user.email }}
    </p>
    <p>
      <strong><i class="fas fa-user-tag"></i> Rôle : </strong>{{ user.role }}
    </p>

    <!-- Bouton Modifier -->
    <router-link
      :to="`/users/edit/${user._id}`"
      class="mt-4 inline-block bg-yellow-500 text-white py-2 px-4 rounded-md"
    >
      <i class="fas fa-edit"></i> Modifier
    </router-link>

    <!-- Bouton Retour -->
    <button
      @click="goBack"
      class="mt-4 inline-block bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
    >
      <i class="fas fa-arrow-left"></i> Retour
    </button>
  </div>

  <!-- Affichage d'un indicateur de chargement -->
  <div v-else class="text-center">
    <i class="fas fa-spinner fa-spin"></i> Chargement de l'utilisateur...
  </div>
</template>

<script>
import { useUserStore } from "../../store/modules/user";
import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router"; // Importer useRoute et useRouter

export default {
  setup() {
    const store = useUserStore();
    const route = useRoute(); // Obtenir la route actuelle pour extraire l'ID
    const router = useRouter(); // Utiliser le router pour redirection

    // Récupérer l'ID de l'utilisateur depuis la route
    const userId = route.params.id;

    // Charger l'utilisateur au montage du composant
    onMounted(() => {
      if (userId) {
        store.fetchUser(userId);
      } else {
        console.error("L'ID de l'utilisateur est manquant !");
      }
    });

    // Fonction pour revenir à la liste des utilisateurs
    const goBack = () => {
      router.push("/users");
    };

    // Récupérer l'utilisateur depuis le store
    const user = computed(() => store.user);

    return {
      user,
      goBack, // Ajouter la fonction goBack pour le bouton Retour
    };
  },
};
</script>
