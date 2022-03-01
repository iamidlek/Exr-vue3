import { createStore } from "vuex";
import infoStore from "./infoStore.js";

export default createStore({
  modules: {
    infoStore,
  },
});
