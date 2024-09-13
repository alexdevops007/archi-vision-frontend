import { defineStore } from "pinia";
import projectService from "../../services/projectService";

export const useProjectStore = defineStore("projectStore", {
  state: () => ({
    projects: [],
    project: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchProjects() {
      this.loading = true;
      try {
        const projects = await projectService.getProjects();
        this.projects = projects; // Affecte directement la réponse
      } catch (error) {
        this.error = error.message;
        console.error("Erreur lors de la récupération des projets :", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchProject(id) {
      this.loading = true;
      try {
        const project = await projectService.getProject(id);
        this.project = project; // Affecte directement la réponse
      } catch (error) {
        this.error = error.message;
        console.error(
          `Erreur lors de la récupération du projet avec l'ID ${id} :`,
          error
        );
      } finally {
        this.loading = false;
      }
    },

    async createProject(projectData) {
      this.loading = true;
      try {
        await projectService.createProject(projectData);
        await this.fetchProjects(); // Recharge la liste après création
      } catch (error) {
        this.error = error.message;
        console.error("Erreur lors de la création du projet :", error);
      } finally {
        this.loading = false;
      }
    },

    async updateProject(id, projectData) {
      this.loading = true;
      try {
        await projectService.updateProject(id, projectData);
        await this.fetchProjects(); // Recharge la liste après mise à jour
      } catch (error) {
        this.error = error.message;
        console.error(
          `Erreur lors de la mise à jour du projet avec l'ID ${id} :`,
          error
        );
      } finally {
        this.loading = false;
      }
    },

    async deleteProject(id) {
      this.loading = true;
      try {
        await projectService.deleteProject(id);
        await this.fetchProjects(); // Recharge la liste après suppression
      } catch (error) {
        this.error = error.message;
        console.error(
          `Erreur lors de la suppression du projet avec l'ID ${id} :`,
          error
        );
      } finally {
        this.loading = false;
      }
    },
  },
});
