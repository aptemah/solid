$(function(){
    /**
     * Модуль корзины
     */
    function Cart() {
        var items = [];

        this.addItem = function(item) {
            items.push(item);

            /**
             * после добавления элемента в корзину публикуем событие   
             * itemAdded
             */
            eventAggregator.publish("itemAdded", item);
        };
    }

    /**
     * Представление корзины
     */
    var cartView = (function() {
        /**
         * представление корзины подписано на событие itemAdded
         * и при наступлении этого события - отображает новый элемент
         */
        eventAggregator.subscribe('itemAdded', function(eventArgs) {
            var newItem = $('<li></li>')
                .html(eventArgs.getDescription())
                .attr('id-cart', eventArgs.getId())
                .appendTo('#cart');
        });
    })();

    /**
     * Контроллер корзины. Контроллер подписан на событие productSelected  
     * и добавляет выбранный продукт в корзину
     */
    var cartController = (function(cart) {
        eventAggregator.subscribe('productSelected', function(eventArgs) {
            cart.addItem(eventArgs.product);
        });
    })(new Cart());

    /**
     * Модель Продукта
     */
    function Product(id, description) {
        this.getId = function() {
            return id;
        };
        this.getDescription = function() {
            return description;
        };
    }

    var products = [
        new Product(1, 'MacBook Air'),
        new Product(2, 'iPhone 5s'),
        new Product(3, 'iPad mini')
    ];

    /**
     * Представление продукта
     */
    var productView = (function() {
        function onProductSelected() {
            var productId = $(this).attr('id');
            var product = $.grep(products, function(x) {
                return x.getId() == productId;
            })[0];
            eventAggregator.publish('productSelected', {
                product: product
            });
        }

        products.forEach(function(product) {
            var newItem = $('<li></li>')
                .html(product.getDescription())
                .attr('id', product.getId())
                .dblclick(onProductSelected)
                .appendTo('#products');
        });
    })();
})