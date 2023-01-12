app.component('product-display', {
    props: {
      premium: {
        type: Boolean,
        reqired:true
      }
    },
    template:
    /*html*/
    `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img v-bind:src="Image">
      </div>
        <div class="product-info">
          <h1>{{ title }}</h1>
          <p v-if="InStock">In Stock Or Ready</p>
          <p v-else>Out Of Stock</p>
          <p>Shiping {{ shipping}}</p>
          <!-- <p v-if="Inventory >= 10">in Stock</p>
          <p v-else-if="Inventory <10 && Inventory > 0">Almost sould Stock</p>
          <p v-else>Out Of Stok</p> -->
          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>
          <div v-for="(variant, index) in variants" 
          :key="variant.id" @mouseover="updateVariant(index)"
          class="color-circle"
          :style="{'backgroundColor': variant.color}"
          ></div>
          <button 
          class="button"
          :class="{disabledButton: !InStock}" 
          @click="addToCart"
          :disabled="!InStock"
          > Add to Cart</button>
        </div>
    </div>
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
  </div>`,
  data(){
    return {
        product: 'Socks',
        brand: 'joe',
        // Inventory: 100,
        selectedVariant:0,
        // InStock:false,
        details: ['50 cotton', '30 wool', '20 polyester'],
        variants: [
            {id:2234, color: 'green', Image: './assets/images/socks_green.jpg', quantity:50},
            {id:2235, color:'blue', Image: './assets/images/socks_blue.jpg', quantity:0},
        ],
        reviews:[],
    }
  },
  methods: {
      addToCart(){
          this.$emit('add-to-cart',this.variants[this.selectedVariant].id)
      },
      updateVariant(index){
          this.selectedVariant = index;
      },
      addReview(review){
        this.reviews.push(review)
      },
  },
  computed: {
      title(){
         return this.brand+' '+this.product
      },
      Image(){
          return this.variants[this.selectedVariant].Image;
      },
      InStock(){
          return this.variants[this.selectedVariant].quantity;
      },
      shipping(){
        if (this.premium){
          return 'Free'
        }
        return 2.99
      },
  }
})