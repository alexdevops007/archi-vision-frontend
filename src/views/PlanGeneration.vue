<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">
      Génération de Plans et Personnalisation
    </h1>
    <PlanEditor />
  </div>
</template>

<script>
import PlanEditor from "../components/plan/PlanEditor.vue";

export default {
  components: {
    PlanEditor,
  },
};
</script>
