<template>
  <div class="home">
    <CarouselItem class="carousel">
      <SlideItem v-for="(slide, index) in carouselSlides" :key="index">
        <div class="slide-info">
          <img :src="require(`../assets/${slide}.jpg`)" />
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
