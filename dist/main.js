Vue.component("modal",{template:"#modal-template"}),new Vue({el:"#app",mounted(){axios.get("http://api.programator.sk/gallery").then((a=>{this.categories=a.data.galleries})).catch((a=>{console.log(a)}))},data:{showModal:!1,in_category:!1,category_name:"Kategórie",categories:[],images:[],formData:{name:null,path:null},message:null},methods:{renderCategory(a){this.category_name=a.name,this.in_category=!0,images=[],axios.get("http://api.programator.sk/gallery/"+a.path).then((a=>{this.images=a.data.images})).catch((a=>{console.log(a)}))},changeHeader(a){var e=$(".header"),t=$(a.target).attr("src");e.fadeOut(200,(function(){e.css("background-image","linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("+t+")"),e.fadeIn(200)}))},createCategory(){axios.post("http://api.programator.sk/gallery",this.formData).then((a=>{this.formData="",this.showModal=!1,console.log(a)})).catch((a=>{console.log(a)}))}}});