<script setup>
import axios from 'axios';
import Cookies from "js-cookie";
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Button from '@/components/Button.vue';
import CreateModelDialog from "~/components/CreateDialog.vue";
import CreateProjectDialog from "~/components/CreateDialog.vue";
import Textarea from "primevue/textarea";
import InputText from "primevue/inputtext";

const route = useRoute();
const config = useRuntimeConfig();

const projectId = route.params.project_id;
const API_BASE = config.public.apiBase;

const project = ref(null);
const models = ref([]);
const dialogVisible = ref(false);
const modelName = ref('');
const modelDescription = ref('');

const fetchProjectData = async () => {
  try {
    // const response = await axios.get(`${API_BASE}/api/project/${projectId}`);
    // project.value = response.data;
  } catch (error) {
    console.error('Failed to fetch project:', error);
  }
};

const fetchModels = async () => {
  try {
    const response = await axios.get(`${API_BASE}api/model/?project_id=${projectId}`);
    models.value = response.data;
  } catch (error) {
    console.error('Failed to fetch models:', error);
  }
};

const handleCreateModel = async () => {

  const userID = Cookies.get('USER_ID');

  const response = await axios.post(`${API_BASE}api/model/create/`, {
    model_name: modelName.value,
    description: modelDescription.value,
    project_id: projectId,
  });

  fetchModels();

};

const emit = defineEmits(['updateModelStatus']);

const copyStatus = reactive({});

const toggleModelStatus = (model) => {
  const newStatus = model.status === 'active' ? 'inactive' : 'active';
  emit('updateModelStatus', { modelId: model.id, newStatus });
};

const copyModelId = async (modelId) => {
  try {
    await navigator.clipboard.writeText(modelId.toString());
    copyStatus[modelId] = true;
    setTimeout(() => {
      copyStatus[modelId] = false;
    }, 5000);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};


onMounted(() => {
  fetchProjectData();
  fetchModels();

});
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-7xl mx-auto">
      <div v-if="project" class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ project.name }}</h1>
        <p class="text-gray-600">{{ project.description }}</p>
      </div>

      <div class="mb-20 flex justify-between items-center">
        <h2 class="text-7xl font-semibold text-gray-800">Your Models</h2>
        <Button @click="dialogVisible = true"  >Create New Model</Button>
      </div>


      <CreateProjectDialog
          :visible="dialogVisible"
          @update:visible="dialogVisible = $event"
          header="Create a new model"
      >

        <form @submit.prevent="handleCreateModel">
          <div class="flex flex-col gap-4 mb-4">
            <div>
              <label for="modelName" class="font-semibold block mb-2">Model Name</label>
              <InputText
                  id="modelName"
                  v-model="modelName"
                  class="w-full"
                  autocomplete="off"
                  required
              />
            </div>
            <div>
              <label for="modelDescription" class="font-semibold block mb-2">Model Description</label>
              <Textarea
                  id="modelDescription"
                  v-model="modelDescription"
                  class="w-full"
                  rows="3"
                  autocomplete="off"
              />
            </div>
            <div>
              <label for="modelType" class="font-semibold block mb-2">Model Type</label>
              <Dropdown
                  id="modelType"
                  v-model="modelType"
                  :options="modelTypes"
                  optionLabel="name"
                  optionValue="value"
                  placeholder="Select a model type"
                  class="w-full"
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
                label="Create Model"
            >Create</Button>
          </div>
        </form>
      </CreateProjectDialog>

<!--      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">-->
<!--        <div v-for="model in models" :key="model.id" class="bg-white rounded-lg shadow-md overflow-hidden">-->
<!--          <div class="p-6">-->
<!--            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ model.name }}</h3>-->
<!--            <p class="text-gray-600 mb-4">{{ model.description }}</p>-->
<!--            <div class="flex justify-between items-center">-->
<!--              <span class="text-sm text-gray-500">Created: {{ new Date(model.created_at).toLocaleDateString() }}</span>-->
<!--              <Button @click="openModel(model.id)" filled>Open Model</Button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="model in models" :key="model.id" class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-6">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-xl font-semibold text-gray-900">{{ model.name }}</h3>
              <span :class="[
            'px-2 py-1 text-xs font-semibold rounded-full',
            model.status === 'active' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
          ]">
            {{ model.status === 'active' ? 'Active' : 'Inactive' }}
          </span>
            </div>
            <p class="text-gray-600 mb-4">{{ model.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500">Created: {{ new Date(model.created_at).toLocaleDateString() }}</span>
            </div>
            <div class="flex justify-between items-center mt-4">
              <button
                  @click="copyModelId(model.id)"
                  class="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                {{ copyStatus[model.id] ? 'Copied' : 'Copy ID' }}
              </button>
              <Button
                  @click="toggleModelStatus(model)"
                  class="text-white font-semibold py-2 px-4 rounded"
                  filled
              >
                {{ model.status === 'active' ? 'Undeploy' : 'Deploy' }}
              </Button>
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