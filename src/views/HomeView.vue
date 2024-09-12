<template>
  <div
    class="min-h-screen bg-gray-900 flex flex-col justify-center items-center"
  >
    <!-- Header Section -->
    <header class="text-center mb-8">
      <h1 class="text-4xl font-bold text-bright-gold mb-4">
        <i class="fas fa-home"></i> Bienvenue sur ArchiVision
      </h1>
      <p class="text-lg text-gray-300">
        Votre solution moderne pour la création de maquettes et la gestion de
        projets architecturaux.
      </p>
    </header>

    <!-- Features Section -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Feature 1 -->
      <div class="bg-white p-6 rounded-lg shadow-md text-center">
        <i class="fas fa-users text-bright-gold text-4xl mb-4"></i>
        <h2 class="text-2xl font-bold text-deep-blue mb-2">
          Gestion des utilisateurs
        </h2>
        <p class="text-gray-600">
          Créez et gérez facilement les utilisateurs, architectes et
          administrateurs de votre projet.
        </p>
        <router-link
          to="/users"
          class="mt-4 inline-block bg-deep-blue text-white py-2 px-4 rounded-md hover:bg-blue-800"
        >
          <i class="fas fa-arrow-right"></i> Gérer les utilisateurs
        </router-link>
      </div>

      <!-- Feature 2 -->
      <div class="bg-white p-6 rounded-lg shadow-md text-center">
        <i class="fas fa-drafting-compass text-soft-green text-4xl mb-4"></i>
        <h2 class="text-2xl font-bold text-deep-blue mb-2">Maquettes 2D/3D</h2>
        <p class="text-gray-600">
          Générez des maquettes interactives en 2D et 3D pour vos projets
          immobiliers.
        </p>
        <router-link
          to="/projects"
          class="mt-4 inline-block bg-deep-blue text-white py-2 px-4 rounded-md hover:bg-blue-800"
        >
          <i class="fas fa-arrow-right"></i> Voir les projets
        </router-link>
      </div>

      <!-- Feature 3 -->
      <div class="bg-white p-6 rounded-lg shadow-md text-center">
        <i class="fas fa-cogs text-deep-blue text-4xl mb-4"></i>
        <h2 class="text-2xl font-bold text-deep-blue mb-2">Personnalisation</h2>
        <p class="text-gray-600">
          Personnalisez les matériaux, couleurs, et styles selon vos besoins.
        </p>
        <router-link
          to="/customize"
          class="mt-4 inline-block bg-deep-blue text-white py-2 px-4 rounded-md hover:bg-blue-800"
        >
          <i class="fas fa-arrow-right"></i> Personnaliser
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* Ajout de styles spécifiques si nécessaire */
</style>
