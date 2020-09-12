import Vue from "vue";

import Vuex from "vuex";

import Product from "./modules/product"
Vue.use(Vuex);
import * as getters from "./getters";
import * as mutations from "./mutations";
import * as actions from "./actions";

export const store= new Vuex.Store({
    state:{
            purchase:0.0,
            sale:0.0,
            balance:0.0
    },
    getters,
    mutations,
    actions,
    modules:{
        Product
    }
})