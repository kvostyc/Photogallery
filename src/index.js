Vue.component("modal", {
    template: "#modal-template"
});


const app = new Vue({
    el: '#app',
    mounted () {
        axios.get('http://api.programator.sk/gallery')
        .then(response => 
        {
            this.categories = response.data.galleries
        }).catch(error =>
        {
                console.log(error)
        })
    },
    data:{
        showModal: false,
        in_category: false,
        categoryName: 'Kategórie',
        categories: [],
        images: [],
        
        formData: {
            name: null,
            path: null,
        },
        message: null
    },

    methods:{

        //Nastav kategóriu
        renderCategory(category){
            this.categoryName = category.name;
            this.in_category = true;
            this.images = [],

            axios.get('http://api.programator.sk/gallery/'+ category.path )
            .then(response => 
            {
                this.images = response.data.images
            }).catch(error =>
            {
                console.log(error)
            })
        },
        
        //Dynamický header image
        changeHeader(e){
            var header = $('.header');
            var bg = $(e.target).attr("src")

            header.fadeOut(200, function () {
                header.css("background-image", 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('+ bg +')')
                header.fadeIn(200);
            });
        },

        //Vytvor novú kategóriu
        createCategory(){
            axios.post('http://api.programator.sk/gallery', this.formData )
            .then(response => 
            {
                this.formData = ''
                this.showModal = false
                console.log(response)
            })
            .catch(error =>
            {
                console.log(error)
            })
        }
    }
})