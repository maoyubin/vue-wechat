<template>
    <div class="circle">
        <Header title="朋友圈" btn_icon="camera" 
            :isLeft="true" 
            @rightClick="$router.push('/publish')" />
        <div class="container">
            <Scroll ref="refresh" @pulldown="loadData"  @pullup="loadMore">
               <div class="head_wrapper">
                    <div class="user_head">
                        <span>{{user.name  }}</span>
                        <div class="user_img">
                            <img :src="user.avatar" alt="" class="head_img">
                        </div>
                    </div>
                </div>
                <div class="content_wrapper">
                     <CellView 
                        v-for="(moment,index) in momentsList"
                        :key="index"
                        :momentsObj="moment"
                        />
                </div>
            </Scroll>
        </div>
    </div>
</template>

<script>
import Header from '../components/Header';
import jwt_decode from 'jwt-decode';
import CellView from '../components/CellView';
import Scroll from '../components/Scroll';

export default {
    name:"moments",
    data(){
        return {
            momentsList: [],
            page: 2,
            size: 3,
            loading: false
        }
    },
    computed: {
        user(){
            const token = localStorage.mao;
            const decode = jwt_decode(token);
            //console.log(decode);
            return decode;
        }
    },
    methods: {
        getLatestData(){
            if(this.loading) return;
            this.loading = true;
            this.$axios("/api/profiles/latest")
            .then(res => {
                //console.log(res.data);
                this.loading = false;
                this.momentsList = [...res.data];
            });

            setTimeout(() => {
                 //注册事件 解决重置
                this.$refs.refresh.$emit("refresh");
            }, 1000);
        },

        loadData() {
            this.page = 2;
            this.getLatestData();
        },

        loadMore(){
            if(this.loading) return;
            this.loading = true;
            const request = `/api/profiles/${this.page}/${this.size}`;
            this.$axios(request)
            .then(res => {
                this.loading = false;
                const result = [... res.data];
                if(result.length > 0){
                    result.forEach(item => {
                        this.momentsList.push(item);
                    });
                    this.page ++;
                }else {
                    this.$refs.refresh.$emit('loadedDone');
                }
                console.log(this.momentsList);
            });
        }
    },
    created() {
        this.getLatestData();
    },
    mounted(){
       
    },
    components: {
        Header,CellView,Scroll
    }
}
</script>

<style scoped>

.circle {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}

.container {
    width: 100%;
    height: calc(100% - 50px);
    padding-top: 50px;
    overflow: auto;
}

.head_wrapper{
    width: 100%;
    position:relative;
    height:200px;
    background: url(../assets/bg.jpg) no-repeat;
    background-size: 100% 100%;
}

.head_wrapper .user_head {
    position: absolute;
    bottom: -30px;
    right: 16px;
}

.user_img {
    width: 60px;
    height:60px;
    padding:3px;
    border:1px solid #c5c5c5;
}

.user_head img{
    width:100%;
    height: 100%;
}

.user_head span{
    line-height:30px;
    position: absolute;
    right:76px;
    width:200px;
    text-align: right;
    color:white;
}

.content_wrapper {
    width: 100%;
    height: 100%;
}

</style>