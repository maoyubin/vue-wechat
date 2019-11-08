<template>
    <div class="information">
        <Header
            :is-left="true"
            title="详细资料"
            btn_icon="ellipsis-h"
        />
    <div class="container">
        <div class="cell-wrapper">
               <div class="cell-title" v-if="user">
                   <img :src="user.avatar" alt="">
                   <span>{{user.name}}</span>
               </div>
           </div>
           </div>
    </div>
    
</template>

<script>
import Header from '../components/Header';
import jwt_decode from 'jwt-decode';

export default {
    name:"information",
    methods:{
        
    },
    computed: {
        user(){
            return this.$store.getters.targetUser;
        }
    },
    components: {
        Header
    }
    
}
</script>

<style scoped>
.cell-wrapper {
    background-color: #fff;
    box-sizing: border-box;
    color: inherit;
    min-height: 80px;
    display: flex;
    font-size: 16px;
    line-height: 1;
    overflow: hidden;
    padding:0 8px;
    width: 100%;
    line-height: 80px;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
}

.cell-title {
    flex:1;
}

.cell-title img {
    width: 4rem;
    height: 4rem;
    vertical-align: middle;
    margin-right: 0.6rem;
}

.cell-title span {
    display: inline-block;
    vertical-align: middle;
}

.container {
    width: 100%;
    height: calc(100% - 50px);
    margin-top: 50px;
    overflow: auto;
}

</style>