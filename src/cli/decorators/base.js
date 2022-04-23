module.exports = {
    getTableOptions: function(params) {
        return {
            extended: params.includes('--full') ? true:false
        }
    },

    singleObjectTable: function(object) {
        const tableData = []
        for(const param in object){
            tableData.push({
                key: param,
                value: object[param],
            })
        }

        return tableData
    }
}