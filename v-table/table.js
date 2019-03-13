Vue.component('vTable', {
    props: {
        data: {
            type: Array,
            default: function() {
                return []
            }
        },
        columns: {
            type: Array,
            default: function() {
                return []
            }
        }

    },
    data() {
        return {
            currentColumns: [],
            currentData: []
        }
    },
    render(h) {
        var _this = this;
        var ths = [];

        this.currentColumns.forEach((col, index) => {
            if(col.sortable) {
                ths.push(h('th', [
                    h('span', col.title),
                    h('a', {
                        class: {
                            on: col._sortType === 'asc'
                        },
                        on: {
                            click:function() {
                                _this.handleSortByAsc(index)
                            }
                        }
                    }, '↑'),
                    h('a', {
                        class: {
                            on: col._sortType === 'desc'
                        },
                        on: {
                            click:function() {
                                _this.handleSortByDesc(index)
                            }
                        }
                    }, '↓'),
                    
                ]))
            } else {
                ths.push(h('th', col.title))
            }
        })

        var trs = []
        this.currentData.forEach((row, index) => {
            var tds = [];
            _this.currentColumns.forEach((cell) => {
                tds.push(h('td', row[cell.key]))
            })
            trs.push(h('tr', tds))
        })

        return h('table', [
            h('thead', [
                h('tr', ths)
            ]),
            h('tbody', trs)
        ])
    },
    methods: {

        makeData() {
            this.currentData = this.data.map((row, index) => {
                row._index = index;
                return row;
            })
        },

        makeColumns() {
            this.currentColumns = this.columns.map((col, index) => {
                col._index = index;
                col._sortType = 'normal'
                return col;
            })
        },

        handleSortByAsc(index) {
            var key = this.currentColumns[index].key

            this.currentColumns.forEach((col) => {
                col._sortType = 'normal'
            })

            this.currentColumns[index]._sortType = 'asc'

            this.currentData.sort((a, b) => {
                return a[key] < b[key] ? 1 : -1
            })
        },

        handleSortByDesc(index) {
            var key = this.currentColumns[index].key

            this.currentColumns.forEach((col) => {
                col._sortType = 'normal'
            })

            this.currentColumns[index]._sortType = 'desc'

            this.currentData.sort((a, b) => {
                return a[key] < b[key] ? -1 : 1
            })
        }

    },
    watch: {
        data: function() {
            this.makeData();

            var sortColumns = this.currentColumns.filter((col) => {
                return col._sortType != 'normal'
            })
            console.log(sortColumns)

            if(sortColumns.length > 0) {
                if(sortColumns[0]._sortType == 'asc') {
                    this.handleSortByAsc(sortColumns[0]._index)
                } else {
                    this.handleSortByDesc(sortColumns[0]._index)
                }
            }
        }
    },

    mounted () {
        this.makeData();
        this.makeColumns()
    }

})