import apiClient from "./apiService"; // Import du client API pour gérer les requêtes

export default {
  // Créer un projet
  async createProject(data) {
    try {
      const response = await apiClient.post("/projects", data);
      return response.data; // Retourne la réponse de l'API (données du projet créé)
    } catch (error) {
      console.error("Erreur lors de la création du projet :", error);
      throw error; // Lancer l'erreur pour la gérer côté frontend
    }
  },

  // Lire un projet spécifique par ID
  async getProject(id) {
    try {
      const response = await apiClient.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération du projet avec l'ID ${id} :`,
        error
      );
      throw error;
    }
  },

  // Lire tous les projets
  async getProjects() {
    try {
      const response = await apiClient.get("/projects");
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des projets :", error);
      throw error;
    }
  },

  // Mettre à jour un projet
  async updateProject(id, data) {
    try {
      const response = await apiClient.put(`/projects/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la mise à jour du projet avec l'ID ${id} :`,
        error
      );
      throw error;
    }
  },

  // Supprimer un projet
  async deleteProject(id) {
    try {
      const response = await apiClient.delete(`/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la suppression du projet avec l'ID ${id} :`,
        error
      );
      throw error;
    }
  },
};
