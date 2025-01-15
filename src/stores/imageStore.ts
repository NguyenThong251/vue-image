import { defineStore } from "pinia";
import { ref } from "vue";

export const useImageStore = defineStore("imageStore", () => {
  const images = ref<string[]>([]);
  const currentIndex = ref(0);
  const isLoading = ref(false);
  // const fetchImages = async () => {
  //   try {
  //     const response = await fetch("");
  //     const data = await response.json();
  //     images.value = data;
  //   } catch (error) {
  //     console.error("Error fetching images:", error);
  //   }
  // };
  const fetchImages = async () => {
    try {
      isLoading.value = true;
      // Import JSON cục bộ
      const data = await import("../utils/images.json");
      images.value = data.default || data;
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      isLoading.value = false;
    }
  };
  const previousImage = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--;
    }
  };

  const nextImage = () => {
    if (currentIndex.value < images.value.length - 1) {
      currentIndex.value++;
    }
  };

  return {
    images,
    isLoading,
    currentIndex,
    fetchImages,
    previousImage,
    nextImage,
  };
});
