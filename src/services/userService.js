import apiClient from "./apiService";

export default {
  async getUsers() {
    try {
      const response = await apiClient.get("/users");
      return response;
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      throw error;
    }
  },
  async getUser(id) {
    try {
      const response = await apiClient.get(`/users/${id}`);
      return response;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération de l'utilisateur avec l'ID ${id} :`,
        error
      );
      throw error;
    }
  },
  async createUser(data) {
    try {
      const response = await apiClient.post("/users", data);
      return response;
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
      throw error;
    }
  },
  async updateUser(id, data) {
    try {
      const response = await apiClient.put(`/users/${id}`, data);
      return response;
    } catch (error) {
      console.error(
        `Erreur lors de la mise à jour de l'utilisateur avec l'ID ${id} :`,
        error
      );
      throw error;
    }
  },
  async deleteUser(id) {
    try {
      const response = await apiClient.delete(`/users/${id}`);
      return response;
    } catch (error) {
      console.error(
        `Erreur lors de la suppression de l'utilisateur avec l'ID ${id} :`,
        error
      );
      throw error;
    }
  },
};
