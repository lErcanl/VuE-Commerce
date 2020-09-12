import Vue from "vue"
import VueResource from "vue-resource"
import {router} from "../../router"
const state = {
    products:[]
}

const getters ={
    getProducts(state){
        return state.products
    },
    getProduct(state){
        return id=>state.products.filter(element => //id aslında gönderdiğimiz parametre bu paramentre products array ile kıyaslanıyor eğer id eşit bulunursa o product'ın tüm elemanlarını geri döndürüyor

            {
                return element.id == id;

        })
    }
}

const mutations={
        updateProductList(state,product){
            state.products.push(product);
        }
}
const actions={
        initApp({commit}){
           Vue.http.get("https://confident-nexus-240508.firebaseio.com/productable.json")
           .then(response =>{
               //console.log(response)
               let data=response.body;
               for(let key in data){
                    data[key].id=key;
                    //data[key] dediğimiz yapı aslında benim , count,price,title isimli değerlerim. 
                    //key ise karmaşık olan id yapısı... 
                    //o elamana git onun id'sini key yap olayı tamamen.
                    //bu yazım tarzıyla elde ettiğimiz yeni obje data[key].id tamamen karmaşık id yapılarına sahip bir obje. yani "keylere.""
                    //bu sayede data[key] in içinde elemanın id si de yer almış oluyor.
                    commit("updateProductList",data[key]);
               }
           })
                },
                saveProduct({dispatch, commit , state},product){
                Vue.http.post("https://confident-nexus-240508.firebaseio.com/productable.json",product)
                .then(response =>{
                    //****************ürün listesinin güncellenmesi
                    product.id=response.body.name;
                    commit("updateProductList",product);
                    console.log(state.products);
                   //********Alış, Satış,Bakiye güncellenmesi
                   let tradeResult={
                       purchase:product.price,
                       sale:0,
                       count:product.count
                   }
                   dispatch("setTradeResult",tradeResult);
                   router.replace("/");
                })

                },
                sellProduct({commit,state,dispatch},payload){
            //vueResource İşlemleri

            //pass by referance
            //pass by value araştır.
            let product=state.products.filter(element =>{
                return element.id==payload.id;
            })
            if(product){
               let totalCount=product[0].count-payload.count
               console.log(product[0]);
                Vue.http.patch("https://confident-nexus-240508.firebaseio.com/productable/" + payload.id+".json",{count:totalCount})
                .then(response=>{
                    product[0].count=totalCount;
                    let tradeResult={
                        purchase:0,
                        sale:product[0].price,
                        count:payload.count
                    }
                    dispatch("setTradeResult",tradeResult);
                    router.replace("/");
                 })
 
                }

            }
            // bu işlem producs array'imde bulunan elemanı etkileyecek
            

                }


export default{
    state,
    getters,
    mutations,
    actions
}