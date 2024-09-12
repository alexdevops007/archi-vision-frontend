<template>
  <div class="max-w-md mx-auto bg-white p-8 shadow-md rounded-lg">
    <h1 class="text-2xl font-bold mb-6" v-if="isEditMode">
      <i class="fas fa-user-edit"></i> Modifier l'utilisateur
    </h1>
    <h1 class="text-2xl font-bold mb-6" v-else>
      <i class="fas fa-user-plus"></i> Créer un utilisateur
    </h1>

    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="firstName" class="block text-sm font-medium text-gray-700">Prénom</label>
        <input v-model="user.firstName" id="firstName" class="mt-1 p-2 border border-gray-300 rounded-md w-full" type="text" required />
      </div>

      <div class="mb-4">
        <label for="lastName" class="block text-sm font-medium text-gray-700">Nom</label>
        <input v-model="user.lastName" id="lastName" class="mt-1 p-2 border border-gray-300 rounded-md w-full" type="text" required />
      </div>

      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input v-model="user.email" id="email" class="mt-1 p-2 border border-gray-300 rounded-md w-full" type="email" required />
      </div>

      <!-- Champ Mot de passe (seulement si création) -->
      <div class="mb-4" v-if="!isEditMode">
        <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
        <input v-model="user.password" id="password" class="mt-1 p-2 border border-gray-300 rounded-md w-full" type="password" required />
      </div>

      <div class="mb-4">
        <label for="role" class="block text-sm font-medium text-gray-700">Rôle</label>
        <select v-model="user.role" id="role" class="mt-1 p-2 border border-gray-300 rounded-md w-full">
          <option value="user">Utilisateur</option>
          <option value="architect">Architecte</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div class="flex justify-between">
        <!-- Bouton "Annuler/Retour" -->
        <button @click="cancel" type="button" class="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">
          <i class="fas fa-arrow-left"></i> Retour
        </button>

        <!-- Bouton "Créer" ou "Modifier" -->
        <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          <i class="fas fa-save"></i> {{ isEditMode ? "Modifier" : "Créer" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { useUserStore } from "../../store/modules/user";
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router"; // Importer useRoute pour récupérer l'ID de l'utilisateur

export default {
  setup() {
    const store = useUserStore();
    const router = useRouter();
    const route = useRoute(); // Récupérer la route active
    const userId = route.params.id; // Obtenir l'ID de l'utilisateur depuis les paramètres de la route

    const isEditMode = computed(() => !!userId); // Edit mode si userId est défini

    const user = ref({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "user",
    });

    const fetchUser = async () => {
      if (userId) {
        await store.fetchUser(userId); // Récupérer l'utilisateur par l'ID
        Object.assign(user.value, store.user); // Injecter les données dans user.value
      }
    };

    const handleSubmit = async () => {
      if (isEditMode.value) {
        await store.updateUser(userId, user.value);
      } else {
        await store.createUser(user.value);
      }

      router.push("/users"); 
    };

    // Fonction pour annuler/retourner à la page "/users"
    const cancel = () => {
      router.push("/users");
    };

    onMounted(fetchUser);

    return {
      user,
      isEditMode,
      handleSubmit,
      cancel, 
    };
  },
};
</script>
