<template>
  <div class="dynamic-points">
    <span v-for='point in points' :key='point' class="point"></span>
  </div>
</template>


<script>
export default {
  name: 'DynamicPoints',
  data() {
    return {
      points: [0, 1, 2, 3, 4],
    }
  },
}
</script>


<style lang='less'>
@import '../assets/css/_variable.less';

.dynamic-points {
  .point {
    display: inline-block;
    width: .05rem;
    height: .05rem;
    border-radius: 50%;
    margin: 0 .05rem;
    animation: dynamic linear 1s infinite;

    &:nth-child(1) {
      animation-delay: 0s;
      background-color: @green;
    }
    &:nth-child(2) {
      animation-delay: 0.15s;
      background-color: @pink;
    }
    &:nth-child(3) {
      animation-delay: 0.3s;
      background-color: @danger;

    }
    &:nth-child(4) {
      animation-delay: 0.45s;
      background-color: @blue;

    }
    &:nth-child(5) {
      animation-delay: 0.6s;
      background-color: @yellow;
    }
  }
}

@keyframes dynamic {
  0%, 60%, 100% {
    transform: scale(1);
  }
  30% {
    transform: scale(2.5);
  }
}
</style>