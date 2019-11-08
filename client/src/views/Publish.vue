<template>
    <div class="publish">
        <div class="header">
            <button @click="$router.go(-1)">取消</button>
            <button @click="publish">发表</button>
        </div>

        <div class="content">
            <div class="text_wrap">
                <textarea placeholder="请填写信息..." v-model="text"></textarea>

                <Upload :loading="loading" @getImgs="getImgs"></Upload>

            </div>
        </div>

        <Loading :loading="loading"/>
    </div>
</template>

<script>
import Upload from '../components/Upload';
import Loading from '../components/Loading';
import jwt_decode from 'jwt-decode';

export default {
    name:"publish",
    data(){
        return {
            text: "",
            imgs:[],
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
    methods:{
         publish(){
             this.loading = true;
             //console.log(this.imgs);
             const postData = {
                 name: this.user.name,
                 img: this.user.avatar,
                 text: this.text,
                 imgs: this.imgs.join('|')
             };
            console.log(postData);

            this.$axios.post('/api/profiles/add', postData)
             .then(res => {
                 console.log('publish success !!');
                 this.loading = false;
                 this.$router.push('/moments');
             });
        },
        getImgs(imgs){
            imgs.forEach(file => {
                this.uploadFile(file);
            });
        },
        uploadFile(file){
            let reader = new FileReader();
            const _this = this;
            reader.onload = function(e){
                //console.log(e.target.result);
                _this.imgs.push(e.target.result);
            };

            reader.readAsDataURL(file);
        }
    },
    components: {
        Upload, Loading
    }
}
</script>

<style scoped>
.publish {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}

.header {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    display: flex;
    padding: 0 10px;
    line-height: 50px;
    justify-content: space-between;
}

.header button {
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 16px;
}

.header button:nth-child(2) {
    color: #20af0e;
}

.content {
    width: 100%;
    box-sizing: border-box;
    padding: 16px;
}

.text_wrap textarea {
    width: 100%;
    font-size: 14px;
    min-height: 60px;
    border: none;
    outline: none;
}

.text_wrap {
    margin-bottom: 16px;
}

</style>