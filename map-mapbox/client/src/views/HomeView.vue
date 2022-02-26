<template>
  <div class="h-screen relative">
    <GeoErrorModal
      v-if="geoError"
      :geoErrorMsg="geoErrorMsg"
      @closeGeoError="closeGeoError"
    />
    <MapFeatures
      :coords="coords"
      :fetchCoords="fetchCoords"
      :searchResults="searchResults"
      @getGeolocation="getGeolocation"
      @toggleSearchResults="toggleSearchResults"
      @plotResult="plotResult"
      @removeResult="removeResult"
      class="w-full md:w-auto absolute md:top-[40px] md:left-[60px] z-[2]"
    />
    <div id="map" class="h-full z-[1]"></div>
  </div>
</template>

<script>
import leaflet from "leaflet";
import { onMounted, ref } from "vue";
import GeoErrorModal from "@/components/GeoErrorModal.vue";
import MapFeatures from "@/components/MapFeatures.vue";

export default {
  name: "HomeView",
  components: { GeoErrorModal, MapFeatures },
  setup() {
    let map;
    onMounted(() => {
      // map 초기화
      map = leaflet.map("map").setView([51.505, -0.09], 10);

      // add tile layer
      leaflet
        .tileLayer(
          `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_API_KEY}`,
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken: process.env.VUE_APP_API_KEY,
          }
        )
        .addTo(map);

      // 검색후 맵 이동시에 검색 결과창 닫기
      map.on("moveend", () => {
        closeSearchResults();
      });

      // 사용자 위치 가져오기
      getGeolocation();
    });

    const coords = ref(null);
    const fetchCoords = ref(null);
    const geoMarker = ref(null);
    const geoError = ref(null);
    const geoErrorMsg = ref(null);

    const getGeolocation = () => {
      // 현재위치 사용 미사용 전환(초기화용)
      if (coords.value) {
        coords.value = null;
        sessionStorage.removeItem("coords");
        map.removeLayer(geoMarker.value);
        return;
      }
      // check session storage
      if (sessionStorage.getItem("coords")) {
        coords.value = JSON.parse(sessionStorage.getItem("coords"));
        plotGeolocation(coords.value);
        return;
      }
      fetchCoords.value = true;
      navigator.geolocation.getCurrentPosition(setCoords, getLocError);
    };

    const setCoords = (pos) => {
      // stop fetching coords
      fetchCoords.value = null;

      // set coords in session storage
      const setSessionCoords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };

      sessionStorage.setItem("coords", JSON.stringify(setSessionCoords));

      // set ref coords value
      coords.value = setSessionCoords;

      plotGeolocation(coords.value);
    };

    const getLocError = (err) => {
      // 좌표 가져오기 중지
      fetchCoords.value = null;
      geoError.value = true;
      geoErrorMsg.value = err.message;
    };

    const plotGeolocation = (coords) => {
      // create custom marker
      const customMarker = leaflet.icon({
        iconUrl: require("../assets/map-marker-red.svg"),
        iconSize: [35, 35],
      });

      // create new marker with coords and custom icon
      geoMarker.value = leaflet
        .marker([coords.lat, coords.lng], {
          icon: customMarker,
        })
        .addTo(map);

      // set map view to current location
      map.setView([coords.lat, coords.lng], 10);
    };

    // 에러 모달 닫기
    const closeGeoError = () => {
      geoError.value = null;
      geoErrorMsg.value = null;
    };

    const resultMarker = ref(null);
    const plotResult = (coords) => {
      // If there is already a marker, remove it. Only allow 1
      if (resultMarker.value) {
        map.removeLayer(resultMarker.value);
      }
      const customMarker = leaflet.icon({
        iconUrl: require("../assets/map-marker-blue.svg"),
        iconSize: [35, 35], // size of the icon
      });
      resultMarker.value = leaflet
        .marker([coords.coordinates[1], coords.coordinates[0]], {
          icon: customMarker,
        })
        .addTo(map);
      map.setView([coords.coordinates[1], coords.coordinates[0]], 13);

      //! 결과창 닫기
      closeSearchResults();
    };

    const searchResults = ref(null);
    // input에 focus되면 검색 결과창 보이게
    const toggleSearchResults = () => {
      searchResults.value = !searchResults.value;
    };
    const closeSearchResults = () => {
      searchResults.value = null;
    };

    const removeResult = () => {
      map.removeLayer(resultMarker.value);
    };

    return {
      coords,
      fetchCoords,
      closeGeoError,
      geoError,
      geoErrorMsg,
      getGeolocation,
      plotResult,
      searchResults,
      toggleSearchResults,
      closeSearchResults,
      removeResult,
    };
  },
};
</script>
