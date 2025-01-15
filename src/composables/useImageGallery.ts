import { computed, ref } from "vue";
import type { Ref } from "vue";
export function useImageGallery(
  fetchImages: () => Promise<void>,
  images: Ref<string[]>
) {
  const currentIndex = ref(0);

  const currentImage = computed(() => images.value[currentIndex.value] || "");

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

  const initializeGallery = async () => {
    await fetchImages();
    currentIndex.value = 0; // Đặt lại index sau khi tải dữ liệu
  };

  return {
    currentImage,
    currentIndex,
    previousImage,
    nextImage,
    initializeGallery,
  };
}
