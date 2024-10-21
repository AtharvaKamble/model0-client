<script setup>
import axios from 'axios';
import Cookies from 'js-cookie'
import Dialog from 'primevue/dialog';
import Button from '@/components/Button.vue'
import CreateProjectDialog from '~/components/CreateDialog.vue'

import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import PButton from 'primevue/button';

import { ref, onMounted, computed } from 'vue';

const config = useRuntimeConfig();
const API_BASE = config.public.apiBase;

const container = ref(null);
const mousePosition = ref({ x: 0, y: 0 });
const projects = ref([]);

const projectName = ref('');
const projectDescription = ref('');


const dialogVisible = ref(false);

const handleSubmit = async () => {

  const userID = Cookies.get('USER_ID');

  const response = await axios.post(`${API_BASE}api/project/create`, {
    user_id: userID,
    project_name: projectName.value,
    description: projectDescription.value
  });

  fetchProjects();

  dialogVisible.value = false;
};

const fetchProjects = async () => {
  try {
    const userID = Cookies.get('USER_ID');
    const response = await axios.get(`${API_BASE}api/project/?user_id=${userID}`);
    projects.value = response.data;

  } catch (error) {
    console.error('Failed to fetch projects:', error);
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

const openProject = (projectId) => {
  console.log('Opening project:', projectId);
  const projectUrl = `/project/${projectId}`;
  window.open(projectUrl, '_blank');

};

const open = ref(false);


onMounted(fetchProjects);
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-neutral-800 relative overflow-hidden text-black" ref="container">
<!--    <div class="absolute inset-0 pointer-events-none"></div>-->
    <div class="w-full  max-w-4xl relative z-10">
      <div class="bg-white min-h-[45rem] my-10 shadow-md rounded px-8 py-6 transition">
        <div class="w-full flex justify-between mb-10">
          <h2 class="text-5xl font-semibold align-middle">My Projects</h2>
          <button @click="dialogVisible = true" class="p-2 rounded align-middle underline transform underline-offset-4 hover:-translate-y-1 transition">Create a project</button>
        </div>

        <CreateProjectDialog
            :visible="dialogVisible"
            @update:visible="dialogVisible = $event"
            header="Create a new project"
        >
          <form @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-4 mb-4">
              <div>
                <label for="projectName" class="font-semibold block mb-2">Project Name</label>
                <InputText
                    id="projectName"
                    v-model="projectName"
                    class="w-full"
                    autocomplete="off"
                    required
                />
              </div>
              <div>
                <label for="projectDescription" class="font-semibold block mb-2">Project Description</label>
                <Textarea
                    id="projectDescription"
                    v-model="projectDescription"
                    class="w-full"
                    rows="3"
                    autocomplete="off"
                />
              </div>
            </div>
            <div class="flex justify-end gap-2">
              <Button
                  type="button"
                  label="Cancel"
                  severity="secondary"
                  @click="dialogVisible = false"
              >Cancel</Button>
              <Button
                  type="submit"
                  label="Create Project"
              >Create</Button>
            </div>
          </form>
        </CreateProjectDialog>
        <div v-if="projects.length === 0" class="text-center text-gray-500">
          No projects yet. Create your first project!
        </div>

        <div v-else class="space-y-4">
          <div v-for="project in projects" :key="project.id"
               class="border border-gray-200 rounded p-4 transition">
            <h3 class="text-lg font-semibold">{{ project.name }}</h3>
            <p class="text-sm text-gray-600">{{ project.description }}</p>
            <div class="mt-2 flex justify-between items-center">
              <span class="text-sm text-gray-500">Created: {{ formatDate(project.created_at) }}</span>

              <Button @click="openProject(project.id)" filled>Open project</Button>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
