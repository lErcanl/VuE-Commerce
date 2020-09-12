<template>
<div>
  <app-Header></app-Header>
    <transition name="fade" mode="out-in">
        <router-view>

  </router-view>
  </transition>

  <app-Footer>
  </app-Footer>
</div>
</template>

<script>
import Header from "./components/shared/header"
import Footer from "./components/shared/Footer"
//import ProductPurchase from "./components/products/productPurchase"
//import ProductSell from "./components/products/productSell"
import ProductList from "./components/products/productList"
//fade-enter-active de opacity'i 1 yap demedik sebebi zaten enter olduğu için kendisi otomatik bu işlemi yapacaktır.
export default {
components:{
  appHeader:Header,
  appFooter:Footer,
  
},
created(){
  this.$store.dispatch("getTradeResult");
  this.$store.dispatch("initApp")
}
}
</script>

<style>
.fade-enter{
opacity:0
}
.fade-enter-active{
  transition: opacity .3s ease-out; 
  
}
.fade-leave{
  
}
.fade-leave-active{
  transition: opacity .3s ease-in-out;
  opacity: 0;
}
</style>