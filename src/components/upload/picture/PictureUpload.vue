<template>
  <a-upload
    id="upload"
    list-type="picture-card"
    :file-list="props.fileList"
    :limit="limit"
    :show-remove-button="showRemoveButton"
    action="/"
    :on-before-upload="beforeUpload"
    :on-before-remove="beforeRemove"
    image-preview
  ></a-upload>
  <a-modal v-model:visible="data.sureCropper" :simple="true" @ok="openClip" @cancel="normalUpload">
    <div>是否需要进行裁剪</div>
  </a-modal>
  <a-modal
    v-model:visible="data.visibleCropper"
    width="auto"
    class="changeCropper"
    :simple="true"
    @ok="handleOk"
    @cancel="data.visibleCropper = !data.visibleCropper"
  >
    <vue-cropper
      ref="cropper"
      class="cropper"
      :img="data.option.img"
      :output-size="data.option.outputSize"
      :output-type="data.option.outputType"
      :info="data.option.info"
      :can-scale="data.option.canScale"
      :auto-crop="data.option.autoCrop"
      :fixed="data.option.fixed"
      :full="data.option.full"
      :fixed-box="data.option.fixedBox"
      :can-move="data.option.canMove"
      :can-move-box="data.option.canMoveBox"
      :original="data.option.original"
      :center-box="data.option.centerBox"
      :height="data.option.height"
      :info-true="data.option.infoTrue"
      :max-img-size="data.option.maxImgSize"
      :enlarge="data.option.enlarge"
      :mode="data.option.mode"
      @realTime="realTime"
    ></vue-cropper>
  </a-modal>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import { VueCropper } from 'vue-cropper'
import 'vue-cropper/dist/index.css'
export default {
  components: {
    VueCropper
  },
  props: {
    accept: {
      type: String,
      default: ''
    },
    fileList: {
      type: Array,
      default: () => []
    },
    // 上传数量限制
    limit: {
      type: Number,
      default: 0
    },
    showRemoveButton: {
      type: Boolean,
      default: true
    },
    // 自定义裁剪配置
    clipOption: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['upload', 'beforeRemove'],
  setup(props, { emit }) {
    const upload = ref()
    const cropper = ref()
    const data = reactive({
      sureCropper: false,
      visibleCropper: false,
      currentImg: '',
      option: {
        img: '', // 裁剪图片的地址
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式\
        info: true, // 裁剪框的大小信息
        canScale: true, // 	图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 500, // 默认生成截图框宽度 0 ~ max
        // autoCropHeight: 500, // 默认生成截图框高度 0 ~ max
        fixed: false, // 是否开启截图框宽高固定比例
        full: false, // 是否输出原图比例的截图
        fixedBox: false, // 固定截图框大小
        canMove: true, // 上传图片是否可以移动
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        high: true, // 	是否按照设备的dpr 输出等比例图片
        infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        maxImgSize: 3000, // 限制图片最大宽度和高度 0 ~ max
        enlarge: 1, // 图片根据截图框输出比例倍数0 ~ max(建议不要太大不然会卡死的呢)
        mode: 'contain' // 图片默认渲染方式
      },
      clipInfo: {}, // 已裁剪图片信息
      imgInfo: {} // 保存上传文件信息
    })
    /**上传前钩子函数 */
    function beforeUpload(file) {
      data.imgInfo = file
      const start = file.type.indexOf('/') + 1
      const end = file.type.length
      data.option.outputType = file.type.substring(start, end)
      // 图片转成流
      data.currentImg = window.URL.createObjectURL(file)
      // 终止上传，进行图片裁剪
      data.sureCropper = true
      return false
    }
    function realTime(realTimeData) {
      data.clipInfo = realTimeData
    }
    /**打开裁剪框 */
    function openClip() {
      data.visibleCropper = !data.visibleCropper
      data.option.img = data.currentImg
    }

    /**未裁剪上传 */
    function normalUpload() {
      emit('upload', data.imgInfo, data.currentImg)
      data.sureCropper = !data.sureCropper
    }
    /**
     * base64转成files
     * @param dataurl
     */
    function transformToFiles(dataUrl, fileName) {
      const arr = dataUrl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], fileName, { type: mime })
    }
    /**已裁剪上传 */
    function handleOk() {
      cropper.value.getCropBlob(blobData => {
        const blob = window.URL.createObjectURL(blobData)
        const img = new Image()
        img.src = blob
        img.onload = function () {
          const w = data.clipInfo.w
          let h = data.clipInfo.h
          const scale = w / h
          h = w / scale
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          canvas.width = w
          canvas.height = h
          ctx.drawImage(img, 0, 0, w, h)
          const cropperPic = canvas.toDataURL(data.option.outputType)
          const files = transformToFiles(cropperPic, data.imgInfo.name)
          emit('upload', files, blob)
        }
      })
    }
    // 重新上传主动打开文件选择框--仅限单文件上传
    function open() {
      const dom = document.getElementById('upload')
      dom.childNodes[2].childNodes[1].click()
    }
    //
    function beforeRemove(e) {
      emit('beforeRemove', e)
    }
    watch(
      () => props.clipOption,
      () => {
        data.option = {
          ...data.option,
          ...props.clipOption
        }
      },
      {
        immediate: true,
        deep: true
      }
    )
    return {
      upload,
      cropper,
      data,
      props,
      beforeUpload,
      openClip,
      handleOk,
      normalUpload,
      realTime,
      open,
      beforeRemove
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.arco-upload-list-picture) {
  padding: 8px;
  background: #ffffff;
  border: 1px dashed rgb(229, 230, 235);
}
.cropper {
  width: 600px;
  height: 500px;
}
</style>
<style lang="scss">
.changeCropper {
  .arco-modal-body {
    overflow: hidden;
  }
}
</style>
