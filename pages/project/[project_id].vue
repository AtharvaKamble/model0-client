<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Button from '@/components/Button.vue';

const route = useRoute();
const projectId = route.params.id;

const project = ref(null);
const models = ref([]);

const fetchProjectData = async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/project/${projectId}`);
    project.value = response.data;
  } catch (error) {
    console.error('Failed to fetch project:', error);
  }
};

const fetchModels = async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/project/${projectId}/models`);
    models.value = response.data;
  } catch (error) {
    console.error('Failed to fetch models:', error);
  }
};

const createNewModel = () => {
  console.log('Creating new model');
  // Implement the logic to create a new model
};

const openModel = (modelId) => {
  console.log('Opening model:', modelId);
  // Implement the logic to open a model
};



onMounted(() => {
  fetchProjectData();
  fetchModels();

  console.log(projectId)
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-7xl mx-auto">
      <div v-if="project" class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ project.name }}</h1>
        <p class="text-gray-600">{{ project.description }}</p>
      </div>

      <div class="mb-6 flex justify-between items-center">
        <h2 class="text-2xl font-semibold text-gray-800">Models</h2>
        <Button @click="createNewModel" filled>Create New Model</Button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="model in models" :key="model.id" class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ model.name }}</h3>
            <p class="text-gray-600 mb-4">{{ model.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500">Created: {{ new Date(model.created_at).toLocaleDateString() }}</span>
              <Button @click="openModel(model.id)" filled>Open Model</Button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="models.length === 0" class="text-center text-gray-500 mt-8">
        No models yet. Create your first model!
      </div>
    </div>
  </div>
</template>