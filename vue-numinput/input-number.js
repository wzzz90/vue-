Vue.component('input-number', {
    template: `<div class="input-number">
        <input type="text" :value="currentValue" @change="handleChange" @keyup.up="handleUp" @keyup.down="handleDown">
        <button @click="handleDown" :disabled="currentValue <= min">-</button>
        <button @click="handleUp" :disabled="currentValue >= max">+</button>
        <button @click="handleUpmore" :disabled="currentValue >= max">+10</button>
    </div>`,
    props: {
        min: {
            type: Number,
            default: -Infinity
        },
        max: {
            type: Number,
            default: Infinity
        },
        value: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            currentValue: this.value
        }
    },
    watch: {
        currentValue(val) {
            this.$emit('input', val)
        },
        value(val) {
            this.updateValue(val)
        }
    },
    methods: {
        updateValue(val) {
            if(val > this.max) val = this.max;
            if(val < this.min) val = this.min;

            this.currentValue = val
        },
        handleChange(event) {
            var val = event.target.value.trim(),
                min = this.min,
                max = this.max;
            
            if(checkNumber(val)) {
                val = Number(val)
                this.currentValue = val
                if(val > max) {
                    this.currentValue = max
                } else if(val < min){
                    this.currentValue = min
                }
            } else {
                
                event.target.value = this.currentValue
            }
            

        },
        handleDown() {
            if(this.currentValue <= this.min) return;
            this.currentValue--
        },
        handleUp() {
            if(this.currentValue >= this.max) return;
            this.currentValue++
        },
        handleUpmore() {
            if(this.currentValue >= this.max) return;
            this.currentValue += 10 
        }
    },

    mounted() {
        this.updateValue(this.value)
    }
})

//验证字符串是否是数字
function checkNumber(theObj) {
    var reg = /^[0-9]+.?[0-9]*$/;
    if (reg.test(theObj)) {
      return true;
    }
    return false;
  }