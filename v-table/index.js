var app = new Vue({
    el:'#app',
    data: {
        columns: [
            {
                title: '姓名',
                key: 'name'
            },
            {
                title: '年龄',
                key: 'age',
                sortable: true
            },
            {
                title: '出生日期',
                key: 'birthday',
                sortable: true
            },
            {
                title: '地址',
                key: 'address'
            }
        ],
        data: [
            {
                name: '王小明',
                age: 18,
                birthday: '1999-01-23',
                address: '北京市朝阳区'
            },
            {
                name: '王小红',
                age: 20,
                birthday: '1995-10-23',
                address: '深圳'
            },
            {
                name: '李小强',
                age: 20,
                birthday: '1992-01-23',
                address: '上海市松江区'
            },
            {
                name: '大健康',
                age: 30,
                birthday: '1980-01-23',
                address: '湖南长沙'
            }
        ],
        
    },
    methods: {
        handleAdd() {
            this.data.push({
                name: '刘晓彤',
                age:19,
                birthday: '1992-10-23',
                address: '甘肃'
            })
        }
    }
})