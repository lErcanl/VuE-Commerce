import Vue from "vue"
export const setTradeResult = ({state,commit},tradeResult)=>{

    commit("updateTradeResult",tradeResult);
    let tradeData={
        purchase:state.purchase,
        sale:state.sale
    }
    Vue.http.put("https://confident-nexus-240508.firebaseio.com/trade-result.json",tradeData)
    .then(response => {

    })
}
//put işlemi var olan bir kayıtın üstüne ekleme yapar. yeni bir kayıt oluşturmaz


export const getTradeResult = ({commit})=>{
//updateTradeResult'ı çağırmak istediğimiz için commit kullandık.
    Vue.http.get("https://confident-nexus-240508.firebaseio.com/trade-result.json")
    .then(response=>{
        console.log(response)
        commit("updateTradeResult",response.body);
    })

}