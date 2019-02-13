const colors = [
    {
        name: 'R',
        num: 255
    },
    {
        name: 'G',
        num: 255
    },
    {
        name: 'B',
        num: 255
    }
]

new Vue({
    el: '#app',
    data: {
        colors: colors
    },
    computed: {
        changeRGB: function() {
            let rgb = '#';
            for(let i = 0; i < colors.length; i++) {
                let cCode = '0' + parseInt(this.colors[i].num).toString(16)
                cCode = cCode.slice(-2).toUpperCase()
                rgb += cCode
            }
            return rgb
        },
        changeGroundColor: function() {
            return {
                background: this.changeRGB
            }
        }
    },
    methods: {
        selectColor: function(e) {
            e.target.select()
        }
    }
})