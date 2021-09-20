Vue.component("modal", {
    template: "#modal-template"
});


const app = new Vue({
    el: '#app',
    created () {
        axios.get('http://api.programator.sk/gallery')
        .then(response => 
        {
            this.categories = response.data.galleries
        })
    },
    data:{
        showModal: false,
        background: 'images/priroda.jpeg',
        category_name: 'Kategórie',
        in_category: false,
        categories:[],
        images: [],
        
        formData: {
            name: null
        },
        message: null
    },

    methods:{
        setCategory(category){
            this.category_name = category.name;
            this.in_category = true;
            images = [],

            axios.get('http://api.programator.sk/gallery/'+ category.path )
            .then(response => 
            {
                this.images = response.data.images
            }).catch(error =>
            {
                console.log(error)
            })
        },
        changeHeader(e){
            var header = $('.header');
            var bg = $(e.target).attr("src")

            header.fadeOut(200, function () {
                header.css("background-image", 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('+ bg +')')
                header.fadeIn(200);
            });
        },
        createCategory(){
            axios.post('http://api.programator.sk/gallery', this.formData )
            .then(response => 
            {
                this.formData = ''
                this.setCategory(response)
                $emit('close')
            })
            .catch(error =>
            {
                console.log(error)
            })
        }
    }
})