<template>
    <div class="flex flex-col items-center p-4">
        <div class="mb-4">
            <img :src="currentImage" alt="Gallery Image" class="w-[500px] h-[500px] object-cover border rounded-lg" />
        </div>
        <!-- <input v-model="currentImage" type="text" placeholder="Enter image URL"
            class="w-full px-4 py-2 border rounded-md" /> -->
        <div class="mb-4 text-sm text-gray-600 flex items-center gap-2 w-full">
            <input v-model="currentImage" type="text" placeholder="Enter image URL"
                class="w-full px-4 py-2 border rounded-md" />
            <button @click="copyToClipboard" class="px-2 py-1 text-white bg-gray-500 rounded hover:bg-gray-600">
                Copy
            </button>
        </div>
        <div class="flex gap-4">
            <button @click="previousImage" class="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md "
                :disabled="currentIndex === 0" :class="{
                    'bg-blue-500 hover:bg-blue-600': currentIndex > 0,
                    'bg-blue-300': currentIndex === 0
                }">
                PREV
            </button>
            <button @click="nextImage" class="cursor-pointer px-4 py-2 bg-green-500 text-white rounded-md "
                :disabled="currentIndex === images.length - 1" :class="{
                    'bg-green-500 hover:bg-green-600': currentIndex < images.length - 1,
                    'bg-green-300': currentIndex === images.length - 1
                }">
                NEXT
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useImageStore } from "../stores/imageStore";
import { storeToRefs } from "pinia";
import { useImageGallery } from "../composables/useImageGallery";

const imageStore = useImageStore();
const { images } = storeToRefs(imageStore);
const { fetchImages } = imageStore;
import { useToast } from "primevue/usetoast";

const toast = useToast();

const showNotification = () => {
    toast.add({
        severity: "success",
        summary: "Success",
        detail: "This is a success message.",
        life: 3000,
    });
};
// Sử dụng composable
const {
    currentImage,
    currentIndex,
    previousImage,
    nextImage,
    initializeGallery,
} = useImageGallery(fetchImages, images);
const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(currentImage.value);
    } catch (error) {
    }
};
onMounted(() => {
    initializeGallery();
});
</script>