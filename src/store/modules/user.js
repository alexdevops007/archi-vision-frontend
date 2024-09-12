import { defineStore } from "pinia";
import userService from "../../services/userService";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [],
    user: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchUsers() {
      this.loading = true;
      try {
        const response = await userService.getUsers();
        this.users = response.data;
      } catch (error) {
        this.error = error.message;
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error
        );
      } finally {
        this.loading = false;
      }
    },

    async fetchUser(id) {
      this.loading = true;
      try {
        const response = await userService.getUser(id);
        this.user = response.data;
      } catch (error) {
        this.error = error.message;
        console.error(
          `Erreur lors de la récupération de l'utilisateur avec l'ID ${id} :`,
          error
        );
      } finally {
        this.loading = false;
      }
    },

    async createUser(userData) {
      this.loading = true;
      try {
        await userService.createUser(userData);
        await this.fetchUsers(); // Recharger la liste des utilisateurs après création
      } catch (error) {
        this.error = error.message;
        console.error("Erreur lors de la création de l'utilisateur :", error);
      } finally {
        this.loading = false;
      }
    },

    async updateUser(id, userData) {
      this.loading = true;
      try {
        await userService.updateUser(id, userData);
        await this.fetchUsers(); // Recharger la liste des utilisateurs après modification
      } catch (error) {
        this.error = error.message;
        console.error(
          `Erreur lors de la mise à jour de l'utilisateur avec l'ID ${id} :`,
          error
        );
      } finally {
        this.loading = false;
      }
    },

    async deleteUser(id) {
      this.loading = true;
      try {
        await userService.deleteUser(id);
        await this.fetchUsers(); // Recharger la liste des utilisateurs après suppression
      } catch (error) {
        this.error = error.message;
        console.error(
          `Erreur lors de la suppression de l'utilisateur avec l'ID ${id} :`,
          error
        );
      } finally {
        this.loading = false;
      }
    },
  },
});
