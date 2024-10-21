<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 relative overflow-hidden"
       @mousemove="handleMouseMove" ref="container">
    <div class="absolute inset-0 pointer-events-none" :style="gradientStyle"></div>
    <div class="w-full max-w-4xl relative z-10">
      <div class="bg-white shadow-md rounded-lg px-8 py-6 transition">
        <h2 class="text-2xl font-semibold text-center mb-6">My Projects</h2>

        <div v-if="projects.length === 0" class="text-center text-gray-500">
          No projects yet. Create your first project!
        </div>

        <div v-else class="space-y-4">
          <div v-for="project in projects" :key="project.id"
               class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <h3 class="text-lg font-semibold">{{ project.name }}</h3>
            <p class="text-sm text-gray-600">{{ project.description }}</p>
            <div class="mt-2 flex justify-between items-center">
              <span class="text-sm text-gray-500">Created: {{ formatDate(project.created_at) }}</span>
<!--              <button @click="openProject(project.id)"-->
<!--                      class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">-->
<!--                Open-->
<!--              </button>-->

              <Button @click="openProject(project.id)" filled>Open</Button>

            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-center">
          <button @click="createNewProject"
                  class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
            Create New Project
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import Cookies from 'js-cookie'
import Button from '@/components/Button.vue'
import { ref, onMounted, computed } from 'vue';

const config = useRuntimeConfig();
const API_BASE = config.public.apiBase;

const container = ref(null);
const mousePosition = ref({ x: 0, y: 0 });
const projects = ref([]);


const handleMouseMove = (event) => {
  if (container.value) {
    const rect = container.value.getBoundingClientRect();
    mousePosition.value = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }
};

const gradientStyle = computed(() => {
  const { x, y } = mousePosition.value;
  return {
    background: `radial-gradient(600px at ${x}px ${y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
  };
});

const fetchProjects = async () => {
  try {
    const userID = Cookies.get('USER_ID');
    const response = await axios.get(`${API_BASE}api/project/?user_id=${userID}`);
    projects.value = response.data;
    console.log(response)
  } catch (error) {
    console.error('Failed to fetch projects:', error);
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

const openProject = (projectId) => {
  console.log('Opening project:', projectId);
};

const createNewProject = () => {
  console.log('Creating new project');
};

onMounted(fetchProjects);
</script>