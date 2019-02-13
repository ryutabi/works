new Vue({
    el: '#app',
    data: {
        code: '',
        colors: [],
        id: 0
    },
    computed: {
        changeGroundColor: function() {
            return {
                background: '#' + this.code
            }
        }
    },
    methods: {
        addMyColor: function() {
            const check = this.code.match(/^[0-9A-Fa-f]{3,6}$/)
            if(!this.code || check === null) {
                alert('カラーコードを入力してください。\n Example： ffffff, 808080')
                return
            }
            this.colors.unshift({
                colorCode: '#' + this.code,
                id: this.id
            })
            this.id++
        },
        selected: function(e) {
            e.target.select()
        },
        copyColor: function(x) {
            let indexNum;
            this.colors.some(function(element, index) { // 要素とindex番号を引数
                if(element.id === x) { // 要素のidとcolors.idが一致
                    indexNum = index // その要素のindex番号を取得
                }
            })
            // 任意のテキストをコピーする
            const textarea = document.createElement('textarea') // 任意のtextareaを作成
            textarea.value = this.colors[indexNum].colorCode // textareaのvalueを入力
            document.body.appendChild(textarea) // appendする
            textarea.select() // textareaのvalueを選択
            document.execCommand('copy') // 選択したvalueをcopy
            textarea.parentElement.removeChild(textarea) // textareaをremoveChild
            alert(this.colors[indexNum].colorCode + '\n' + 'コピーしました！')
        },
        deleteColor: function(x) {
            let indexNum;
            const confirmation = confirm('削除しますか？')
            if(confirmation === true) {
                this.colors.some(function(element, index) { // 要素とindex番号を引数
                    if(element.id === x) { // 要素のidとcolors.idが一致
                        indexNum = index // その要素のindex番号を取得
                    }
                })
            }
            this.colors.splice(indexNum, 1)
        }
    }
})