import Clamp from './champ'
const champ = {
    install (Vue, options) {
        Vue.filter('clamp',Clamp)
    }
}

export default champ