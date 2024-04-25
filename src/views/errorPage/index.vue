<template>
  <div class="errorPage">
    <img src="@/assets/img/errorPage.png" alt="404" />
    <div class="turnPage">
      <p>
        <span @click="$router.go(-1)">
          <icon-refresh />
          刷新页面
        </span>
      </p>
      <p>
        <span @click="$router.replace('/')">
          <icon-undo />
          返回首页
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.errorPage {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & > img {
    max-width: 100%;
  }
  .turnPage {
    display: flex;
    align-items: center;
    & > p {
      margin: 50px;
      & > span {
        font-size: 16px;
        color: rgb(79, 149, 248);
        cursor: pointer;
        & > svg {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
