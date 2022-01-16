<template>
  <div class="home">
    <!-- slot에서 값을 가져오기 -->
    <CarouselItem
      class="carousel"
      v-slot="{ currentSlide }"
      :navigation="true"
      :pagination="true"
      :startAutoPlay="false"
      :timeout="5000"
    >
      <SlideItem v-for="(slide, index) in carouselSlides" :key="index">
        <div v-show="currentSlide === index + 1" class="slide-info">
          <img :src="require(`../assets/${slide}.jpg`)" alt="slide img" />
        </div>
      </SlideItem>
    </CarouselItem>
  </div>
</template>

<script>
import CarouselItem from "../components/CarouselItem.vue";
import SlideItem from "../components/SlideItem.vue";

export default {
  name: "HomeView",
  components: { CarouselItem, SlideItem },
  setup() {
    const carouselSlides = ["bg-1", "bg-2", "bg-3"];

    return { carouselSlides };
  },
};
</script>

<style lang="scss" scoped>
.carousel {
  position: relative;
  max-height: 100vh;
  height: 100vh;
  .slide-info {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    max-height: 100%;
    height: 100%;
    img {
      min-width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
