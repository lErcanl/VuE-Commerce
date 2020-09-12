<template>
  <div class="container">
        <div class="loading" :style=isLoading>
    <div class="lds-ripple">
        <div></div>
        <div></div>
    </div>
</div>
    <div class="row">
        <div class="col-6 offset-3 pt-3 card mt-5 shadow">
            <div class="card-body">
                <h3>Ürün Çıkışı</h3>
                <hr>
                <div class="form-group" >
                    <label>Ürün Adı</label>
                    <select class="form-control"  v-model="selectedProduct" @change="productSelected">
                        <option selected disabled>lütfen bir ürün seçiniz</option>
                        <option 
                        :disabled="product.count==0"
                        v-for="product in getProducts" 
                        :value="product.id">{{product.title}}
                            
                        </option>
                       
                    </select>
                </div>
               <transition name="fade" mode="out-in">
                <div class="card mb-2 border border-danger" v-if="product!=null">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 text-center">
                                <div class="mb-3">
                                    <span class="badge badge-info ">{{product.count}}</span>
                                    <span class="badge badge-primary">{{product.price}}</span>
                                </div>
                                <p class="border border-warning p-2 text-secondary">{{product.description}}</p>
                            </div>
                        </div>
                    </div>
                </div>

                </transition>

                <div class="form-group" v-if="product!=null">
                    <label>Adet</label>
                    <input v-model="product_count" :class="getCount(product.count)" type="text" class="form-control" placeholder="Ürün adetini giriniz..">
                </div>

                <hr>
                <button  v-if="product!=null" class="btn btn-primary" :disabled="save_Condition" @click="save">Kaydet</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
   import {mapGetters} from "vuex"

export default {
    data(){
        return{
            selectedProduct:null,
            product:null,
            product_count:null,
      saveButtonClick:false

        }

    },
  computed:{
      ...mapGetters(["getProducts"]),
           isLoading(){
                if(this.saveButtonClick){
                    return{
                        display:"block"
                    }
                }
                    else{
                        return{ 
                            display:"none"
                        } 
                    }
                
            },
                save_Condition(){
        if(this.product.count>=this.product_count){
            return false;
        }
        else{
            return true;
        }
        
    }
  },
  
  
  methods:{
      productSelected(){
            this.product = this.$store.getters.getProduct(this.selectedProduct)[0] // seçilen ilk eleman.
            
      },
      save(){
       this.saveButtonClick=true;

          let product=
          {
              id:this.selectedProduct,
              count:this.product_count
          }

          this.$store.dispatch("sellProduct",product);
      },
      getCount(count){
          return{
          'bg-danger text-white':count<this.product_count,

          }
      }


  },
        beforeRouteLeave(to,from,next){
 if(!this.saveButtonClick  && (this.selectedProduct!==null || this.product_count>0) )
 {
     if(confirm("Kaydedilmiş değişiklikler var çıkmak istiyormusunuz ?")){
     next();
     }
 else{
     next(false);
 }
 }
 else{
     next();
 }
        }
}
</script>

<style scoped> 
 .border-danger {
            border-style: dashed !important;
        }
</style>