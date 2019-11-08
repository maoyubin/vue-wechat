<template>
    <div class="address_book">
       <Header title="通讯录" btn_icon="user-plus"/>
        <div class="container">
            <div class="search_wrapper">
                <div class="search_content">
                    <i class="fa fa_search"></i>
                    <input type="text" placeholder="搜索" v-model="search_value">
                </div>
            </div>


            <div class="content_wrapp">
                <Cell v-for="(friend) in friendsList" :key="friend._id"
                    :user="friend"
                />
            </div>

            <div class="count_wrap">
                <span>{{friendsList.length}} 为联系人</span>
            </div>
        </div>
    </div>

</template>

<script>
import Header from '../components/Header';
import Cell from '../components/UserCell';

export default {
    name:"contacts",
    data(){
        return {
            friendsList: [],
            search_value: "",
            allFriends: []
        };
    },
    created() {
        this.getFriendsList();
    },
    methods: {
        getFriendsList(){
            this.$axios.get("/api/users/all")
            .then(res => {
                this.friendsList = res.data;
                this.allFriends = res.data;
                //console.log(this.friendsList);
            });
        },

        filterData(){
            this.friendsList = this.allFriends.filter( friend => {
                return friend.name.indexOf(this.search_value) != -1;
            });
        }
    },
    watch:{
        search_value(){
            this.filterData();
        }
    },
    components: {
        Header,Cell
    }
    
}
</script>

<style scoped>

.address_book {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.container {
    width: 100%;
    height: calc(100% - 50px);
    margin-top: 50px;
    overflow: auto;
}

.search_wrapper {
   background-color: #f1f1f1;
   padding: 8px;
   box-sizing: border-box;
   width: 100%;
}

.search_content {
    height: 40px;
    background: #fff;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 16px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
}

.search_content i {
    color: #888;
    margin-right: 10px;
}

.search_content input {
    height: 36px;
    width: 90%;
    outline: none;
    border: none;
    font-size: 14px;
}

.count_wrap {
    min-height: 50px;
    background-color: #fff;
    box-sizing: border-box;
    color:#888;
    font-size: 16px;
    width: 100%;
    line-height: 50;
    text-align: center;
}

</style>