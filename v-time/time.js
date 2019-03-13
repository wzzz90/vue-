var Time = {
    getUnix() {
        return new Date().getTime();
    },
    // 获取今天的0点的时间戳
    getTodayUnix() {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },

    // 获取标准年月日
    getLastDate(time) {
        var date = new Date(time);
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

        return date.getFullYear() + '-' + month + '-' + day;
    },

    getTips(timestamp) {
        var now = this.getUnix();
        var today = this.getTodayUnix();

        var timer = (now - timestamp) / 1000;
        var tip = '';

        if(timer <= 0 || Math.floor(timer/60) <= 0) {
            tip = '刚刚'
        } else if(timer < 3600) {
            tip = Math.floor(timer/60) + '分钟前'
        }  else if(timer >= 3600 && (timestamp - today >= 0)) {
            tip = Math.floor(timer/3600) + '小时前'
        } else if(timer/86400 <= 31) {
            tip = Math.ceil(timer/86400) + '天前'
        } else {
            tip = this.getLastDate(timestamp)
        }

        return tip;
    }
}

Vue.directive('time', {
    bind(el, binding) {
        el.innerHTML = Time.getTips(binding.value);

        el.__timeOut__ = setInterval(()=> {
            el.innerHTML = Time.getTips(binding.value);
        }, 60000)
    },
    unbind(el) {
        clearInterval(el.__timeOut__);
        delete el.__timeOut__;
    }
})