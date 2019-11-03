<template>
    <div class="img_wrap">
        <div class="isImg img_upload">
            <button class="btn_upload">
                <input @change="addFile" type="file" ref="myFile" multiple="multiple" accept="img/*" >
            </button>
        </div>
    </div>
  
</template>

<script>
export default {
    name:"upload",
    methods: {
        addFile(){
            console.log(this.$refs.myFile.files);
        }
    },
    props: {
        
    }
}
</script>

<style scoped>
.isImg {
    box-sizing: border-box;
    width: 30%;
    height: 6rem;
    float: left;
    margin-right: 8px;
    margin-bottom: 8px;
    position: relative;
}

 .btn_upload {
     width: 100%;
     height:100%;
     outline: none;
     border: none;
     background-image: url(../assets/upload.png);
     background-size: 100% 100%;
 }

 .btn_upload input {
     display: inline-block;
     width: 100%;
     height: 100%;
     opacity: 0;
 }

</style>
