import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters' //导入相应的模块，*相当于引入了这个组件下所有导出的事例
import * as actions from './actions'
import * as mutations from './mutations'
import DateUtil from '../assets/util/DateUtil'
Vue.use(Vuex)
const state = sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
    //用户表格
    user: {
        id: null,
        username: '',
        password: '',
        email: '',
        integration: 0,
        phone: '',
    },
    //超级管理员
    adminUser: {
        username: '',
        password: '',

    },
    //书详细表格
    bookInfo: {
        bookId: 1,
        bookCategoryId: 1,
        bookCategory: "keji",
        name: "肖申克的救赎",
        detail: "《肖申克的救赎》上映20周年纪念版。  热门美剧《行尸走肉》导演作品。  由悬疑大师斯蒂芬·金作品改编，奥斯卡剧本奖获奖作品。  一场看似无懈可击的谋杀审判，一段跨越二十年的高墙抗争，一曲动人心魄的越狱传奇……蒙冤入狱的银行家安迪·杜弗雷在地狱般的肖申克监狱，凭借理性与希望，二十年如一日坚守自己的救赎之路，救人救己，穿越层层苦难，终逃出监狱……这一个斯蒂芬·金的故事，经达拉邦特改编并拍摄，成为电影史上激动人心的作品，曾获奥斯卡影片、剧本、男主角等七项大奖提名。  翻开这本书，除了重温电影曾带给我们的感动，重温那一幅幅感人至深的画面，还会有很多新的收获：情节逆转——在剧本里，原来竟有那么多情节是与电影不一样；导演解密——导演兼编剧达拉邦特通过对逐个镜头的详细解析，解密了《肖申克的救赎》是如何从剧本变成一部经典大片的；拍摄故事——影片当中的穿帮镜头和各种匪夷所思的拍摄花絮也是身为“肖申克迷”不得不知的秘密……  这不仅仅是经典剧本，更是心灵读本。",
        outline: "肖申克的救赎正版书籍原版英文版引进翻译斯蒂芬金小说肖生克电影原著史蒂芬金外国悬疑恐怖惊",
        press: "新华出版社",
        publishDate: "",
        version: "精装版",
        size: "大32开",
        translator: "林少辉",
        isbn: "ABS213123",
        pages: 450,
        price: 25,
        number: 4,
        marketPrice: 26,
        memberPrice: 25,
        star: 4,
        catalog: "丽塔·海华斯和达拉邦特的救赎——斯蒂芬·金<br>斯蒂芬· 金和达拉邦特的救赎—— 弗兰克· 达拉邦特<br>肖申克的救赎<br>剧照<br>必要调整： 从脚本到银幕的历程—— 弗兰克· 达拉邦特<br>分镜剧本<br>后记： 来自壕沟里的备忘录—— 弗兰克· 达拉邦特<br>通往自由之路—— 慕容雪村王淩 ",
        imageUrl: '../../assets/images/books/xskdjs.jpg',
        author: "Mother Fucker",
        date: "2016-07-12 20:30",
        is_shelf: true,
        store_mount: 0,
    },
    loginForm: {
        username: "abc",
        password: 123456
    },
    //添加地址表单
    address: {
        userId: 0,
        province: '',
        city: '',
        district: '',
        detail: '',
        phone: '',
        receiver: '',
    },
    //注册表单
    ruleForm: {
        email: '',
        code: '',
        username: '',
        pass: '',
        checkPass: '',
        phone: ''
    },
    //书分类
    categories: [{
        id:'',
        name:'',
        child:[],
    }],

    //分类id用于页面之间传输分类
    cate_id:0,


}
const store = new Vuex.Store({
    state, //共同维护的一个状态，state里面可以是很多个全局状态
    getters, //获取数据并渲染
    actions, //数据的异步操作
    mutations, //处理数据的唯一途径，state的改变或赋值只能在这里
})

export default store //导出store并在main.js中应用注册