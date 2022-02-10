import DOMHandler from "../../dom_handler.js"
import { ProductsFetcher } from "../services/products_fetcher.js"
import STORE from "../store.js"

const Main=(()=>{
    async function onHandleSearch(e){
        e.preventDefault()
        const { input } = e.target
        const searchProducts=  await ProductsFetcher.search(input.value)
        STORE.setProducts(searchProducts)
        DOMHandler.render(Main)
    }
    return {
        render: function (){
            let products=STORE.getAllProducts()
            console.log(products)
            let listProducts=products.map( product =>
                `<div class="card text-center" style="width: 18rem;">
                    ${product.discount ? `<div class="dscto">-${product.discount}%</div>` : ""}
                    <img src=${ product.url_image ? product.url_image: "./assets/images/no-image.png"} class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <hr>
                        <div>
                            <div class="precio-dscto">
                                <span class=${product.discount ? "tachado":""}>$${product.price}</span>
                                ${product.discount ? `<span>$${(product.price*(100-product.discount)/100).toFixed(1)}</span>` : ""}
                            </div>
                            <img src="../assets/icons/car.svg" alt="">
                        </div>
                    </div>
                </div>`)
            return `
                <nav class="navbar navbar-light bg-info">
                    <div class="container">
                    <img src="../assets/images/logo.png" alt="">
                    <form class="search-product">
                        <div class="d-flex">
                            <input class="form-control me-2" name="input" type="search" placeholder="Encuentra tu producto" aria-label="Search">
                            <button class="btn-search" type="submit"><img src="./assets/icons/search.svg" alt="" width="20px"></button>
                        </div>
                    </form>
                </div>
                </nav>
                <div class="filter">
                    <select class="select-category" aria-label=".form-select-sm example">
                        <option selected>Compra por Categoría</option>
                        <option value="1">Bebida</option>
                        <option value="2">Pisco</option>
                        <option value="3">Snack</option>
                    </select>
                    <div class="js-checkbox">
                        <div>
                            <label>Ordenar por:</label>
                        </div>
                        <div class="byPrice">
                            <input class="js-price" type="checkbox">
                            <span>Precio</span>
                        </div>
                    </div> 
                </div>
                <div class="cards-container">
                ${listProducts.join("")}
                </div>
                `
        },
        initEventListeners: function(){
            const form= document.querySelector(".search-product")
            if (form){
                document.addEventListener('submit',onHandleSearch)
            }
        }
        
    }
})()

export default Main