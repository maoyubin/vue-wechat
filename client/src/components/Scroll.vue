<template>

<div class="scroll-wrap"  ref="wrapper">
    <div>
        <!-- 下拉刷新 -->
        <div class="pulldown" v-show="dragTip.showLoading">
            <div class="clear">
                <div class="fl">
                    <img width="16" src="../assets/scroll_load.gif" alt="">
                    <div class="fl">
                        {{dragTip.text}}
                    </div>
                </div>
            </div>
        </div>


        <slot> </slot>

        <!-- 上拉加载 -->
    </div>
</div>

</template>

<script>
import BScroll from '@better-scroll/core';

export default {
    name: 'scroll',
     data(){
        return {
            scroll: {},
            dragTip: {
                text: "下拉刷新",
                showLoading: false
            }
        };
    },
    mounted(){
        setTimeout(() => {
            this.initScroll();
        }, 2000);
    },
    methods:{
        initScroll(){
            //alert(this.$refs.wrapper); 
            console.log('the wrapper is '+this.$refs.wrapper);
            if(!this.$refs.wrapper) {
                return;
            }
            const options = {
                scrollY: true, // 因为scrollY默认为true，其实可以省略
                probeType: 1
            };
            this.scroll = new BScroll(this.$refs.wrapper, options);

            //add 下拉事件
            this.scroll.on('scroll', pos => {
                this.dragTip.showLoading = true;

                if(pos.y > 50){
                    this.dragTip.text = "释放刷新";
                }
            });

            this.scroll.on('touchEnd', pos => {
                if(pos.y > 50){
                    this.dragTip.text = "刷新中";
                    //重新初始化

                    //注册下拉事件
                    this.$emit('pulldown');
                    this.$on('refresh' ,this.reset);
                }

            });
        
        },

        reset(){
            console.log('into reset method');
            setTimeout(() => {
                this.dragTip = {
                    text: "下拉刷新",
                    showLoading: false
                }
            }, 600);
        }
    }
}
</script>>

<style scoped>
    .scroll-wrap {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .fl {
        display: inline-block;
    }

    .fl img {
        vertical-align: middle;
        margin-right: 0.2rem;
    }

    .pulldown{
        width: 100%;
        height: 50px;
        position: relative;
        color: #888;
    }

    .clear {
        padding: 10px 0px;
        font-size: 0.28rem;
        position: absolute;
        left: 50%;
        top: 5px;
        transform: translate(-50%, 0);
    }
</style>