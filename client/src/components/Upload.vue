<template>
    <div class="img_wrap">
        <div 
            v-if="showFileData.length > 0" 
            class="isImg" 
            v-for="(file_img,index) in showFileData" 
            :key="index"
            >
            <img :src="file_img" alt="">
            <button class="remove" @click="removeImg(file_img)">X</button>
        </div>

        <div class="isImg img_upload" v-if="showFileData.length < 9">
            <button class="btn_upload">
                <input @change="addFile" type="file" ref="myFile" multiple="multiple" accept="img/*" >
            </button>
        </div>
    </div>
  
</template>

<script>
export default {
    name:"upload",
    data(){
        return {
            showFileData: [],
            allUploadFies: []
        };
    },
    methods: {
        addFile(){
            //console.log(this.$refs.myFile.files);
            let files = [... this.$refs.myFile.files];
            if(this.showFileData.length + files.length > 9){
                alert('the most img is 9 !');
                return;
            }

            files.forEach(file => {
                this.allUploadFies.push(file);
                let objUrl = this.getObjectURL(file);
                this.showFileData.push(objUrl);
            });

            this.$emit("getImgs", this.allUploadFies);
        },

        getObjectURL(file){
            let url = null;
            if(window.createObjectURL != undefined){
                //basic
                url = window.createObjectURL(file);
            }else if(window.URL != undefined){
                //mozilla
                url = window.URL.createObjectURL(file);
            }else{
                //webkit 
                url = window.webkitURL.createObjectURL(file);
            }

            //console.log("the url is "+url);
            return url;
        },

        removeImg(file_img){
            this.showFileData.forEach((file,index) => {
                if(file == file_img){
                    this.showFileData.splice(index,1);
                }
            });
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

 .isImg img {
     width: 100%;
     height: 100%;
 }

 .isImg .remove {
     position: absolute;
     top: -8px;
     right: -5px;
     border: none;
     outline:none;
     width: 20px;
     height: 20px;
     padding: 0;
     text-align: center;
     color: white;
     background-color: #3baffd;
     line-height: 10px;
     border-radius: 50px;
 }

</style>
