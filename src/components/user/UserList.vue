<template>
  <div class="max-w-7xl mx-auto py-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">
        <i class="fas fa-users"></i> Gestion des Utilisateurs
      </h1>
      <router-link
        to="/users/new"
        class="bg-green-500 text-white py-2 px-4 rounded-md"
      >
        <i class="fas fa-user-plus"></i> Ajouter un utilisateur
      </router-link>
    </div>

    <!-- Afficher un indicateur de chargement si nécessaire -->
    <div v-if="loading" class="text-center text-gray-600">
      <i class="fas fa-spinner fa-spin"></i> Chargement des utilisateurs...
    </div>

    <table v-else class="min-w-full bg-white shadow-md rounded-lg">
      <thead>
        <tr class="bg-gray-50 text-left">
          <th class="p-4">Prénom</th>
          <th class="p-4">Nom</th>
          <th class="p-4">Email</th>
          <th class="p-4">Rôle</th>
          <th class="p-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id" class="hover:bg-gray-100">
          <td class="p-4">{{ user.firstName }}</td>
          <td class="p-4">{{ user.lastName }}</td>
          <td class="p-4">{{ user.email }}</td>
          <td class="p-4">{{ user.role }}</td>
          <td class="p-4">
            <router-link :to="`/users/${user._id}`" class="text-blue-500 mr-2">
              <i class="fas fa-eye"></i> Détails
            </router-link>
            <router-link
              :to="`/users/edit/${user._id}`"
              class="text-yellow-500 mr-2"
            >
              <i class="fas fa-edit"></i> Modifier
            </router-link>
            <button @click="deleteUser(user._id)" class="text-red-500">
              <i class="fas fa-trash-alt"></i> Supprimer
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useUserStore } from "../../store/modules/user";
import { onMounted, computed } from "vue";

export default {
  setup() {
    const store = useUserStore();

    // Charger les utilisateurs au montage du composant
    onMounted(() => {
      store.fetchUsers();
    });

    const users = computed(() => store.users);
    const loading = computed(() => store.loading);

    const deleteUser = async (id) => {
      if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
        await store.deleteUser(id);
      }
    };

    return {
      users,
      loading,
      deleteUser,
    };
  },
};
</script>
