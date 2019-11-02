<template>

<div class="scroll-wrap"  ref="wrapper">
    <div>
        <!-- 下拉刷新 -->
        <div class="pulldown">
            <div class="clear">
                <div class="fl">
                    <img src="../assets/scroll_load.gif" alt="">
                    <div class="fl">
                        下拉刷新
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
            scroll: {}
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
        
        }
    }
}
</script>>

<style scoped>
    .scroll-wrap {
        width: 100%;
        height: 100%;
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
        height: 150px;
        position: relative;
        color: #888;
    }

    .clear {
        padding: 10px 0px;
        font-size: 0.28rem;
        position: absolute;
        left: 50%;
        top: 70px;
        transform: translate(-50%, 0);
    }
</style>