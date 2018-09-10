<template>
  <section class="showChose" v-show="showChose" @click="closeOut()">
    <section class="address" @click.stop>
      <section class="title">
        <h4>选择地址</h4>
        <span @click="closeOut()">×</span>
      </section>
      <section class="title">
        <div
          class="area"
          v-for="(ad, index) in addressArr"
          @click="addressSelected(index)"
          :class="{ 'active': index === addressNavActive }"
          :key="index">{{ ad.name }}
        </div>
        <div
          class="area"
          @click="addressSelected(addressArr.length)"
          v-show="showLastNav"
          :class="(addressNavActive === addressArr.length) ? 'active' : '' ">
          {{ '请选择' }}
        </div>
      </section>
      <section class="address-options">
        <div class="adsloading" v-show="showLoading">
          <img :src="ldsrc">
        </div>
        <ul v-for="(addresses,i) in info" :key="i" v-show="addressNavActive === i">
          <li
            class="addList"
            v-for="(v,k) in addresses"
            :key="k"
            @click="getAddressId(v, k, i)"
            :class="{ 'active' : addressArr[i] && addressArr[i].name === k }">
            {{ k }}
          </li>
        </ul>
      </section>
    </section>
  </section>
</template>

<style lang="scss" scoped>
  .myAddress {
    width: 100%;
    background-color: white;
    border-top: 4px solid rgba(245, 245, 245, 1);
    color: #333;
  }

  .myAddress .cont {
    border-bottom: 1px solid rgba(245, 245, 245, 0.8);
  }

  .address-options {
    position: relative;
    width: 100%;
    height: 60vw;
    max-height: calc(100vh - 28vw - 20vw);
  }

  .adsloading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    padding-top: 22vw;
    text-align: center;
  }

  .adsloading img {
    width: 10vw;
    height: 10vw;
    background: rgba(120, 120, 120, 0.8);
    transform: translate(0, -50%);

    padding: 1.5vw;
    border-radius: 1.5vw;
  }

  .myAddress .cont span {
    display: inline-block;
    font-size: 2.8vw;
    color: #333;
    line-height: 10vw;
    margin-left: 3.2vw;
  }

  .myAddress .cont section {
    float: left;
  }

  .myAddress .cont p {
    display: inline-block;
    font-size: 2.8vw;
    color: #333333;
    line-height: 10vw;
    margin-left: 10vw;
  }

  .myAddress .cont .pic2 {
    float: right;
    width: 1.4vw;
    height: 2.4vw;
    margin: 3.2vw 3.2vw 3.2vw 0;
  }

  .myAddress .cont p.text {
    margin-left: 7.2vw;
  }

  .showChose {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.7);
    box-shadow: 0 -1px 5px 1px #000;
  }

  .address {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 121;
    background: #fff;
    width: 100%;
    animation: myaddress .5s ease 1;
  }
  @keyframes myaddress {
    from { transform: translateY(100%) }
    to { transform: translateY(0) }
  }

  .title {
    position: relative;
  }

  .title h4 {
    width: 100%;
    padding-right: 8vw;
    font-size: 4.2vw;
    font-weight: normal;
    text-indent: 4vw;
    letter-speacing: 0.2em;
  }

  .title span {
    position: absolute;
    right: 2vw;
    top: 0;
    font-size: 4.5vw;
    width: 6vw;
    color: #D8D8D8;
  }

  .title h4,
  .title span {
    text-align: center;
    line-height: 10vw;
  }

  .area {
    display: inline-block;
    font-size: 4vw;
    line-height: 10vw;
    margin-left: 4.2vw;
    color: #333;
    max-width: 6em;
    overflow: hidden;
    word-wrap: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .addList {
    width: 100%;
    padding-left: 3.2vw;
    padding: 0 5%;
    font-size: 4vw;
    line-height: 10vw;
    color: #333;
  }

  /* 修改的格式 */
  .address ul {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    over-flow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .address .title .active {
    color: #cc1155;
    border-bottom: 0.2vw solid #cc1155;
  }

  .address ul .active {
    color: #cc1155;
  }
</style>

<script>
export { default } from './flla';
</script>
