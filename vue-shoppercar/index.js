var app = new Vue({
    el: "#app",
    data: {
        list: [
            {
                id: 1,
                name: 'IPhone 7',
                price: 6188,
                count: 1,
                check: false,
            },
            {
                id: 2,
                name: 'IPad Pro',
                price: 5888,
                count: 1,
                check: false,
            },
            {
                id: 3,
                name: 'MacBook Pro',
                price: 21488,
                count: 1,
                check: false,
            },
            {
                id: 4,
                name: 'MacBook Air',
                price: 12988,
                count: 1,
                check: false,
            }
        ]
    },
    computed: {
        totalPrice:function() {
            var total = 0;
            var filterList = this.list.filter(function(val) {
                return val.checked === true
            })
            for(var i = 0; i< filterList.length;i++) {
                total += (filterList[i].price * this.list[i].count)
            }
            
            return total.toString().replace(/\B(?=(\d{3})+$)/g,','); 
        }
    },
    methods: {

        handleReduce(index) {
            if(this.list[index].count == 1) return;
            this.list[index].count--
        },

        handleAdd(index) {
            this.list[index].count++
        },

        handleRemove(index) {
            this.list.splice(index, 1)
        }
    }
})