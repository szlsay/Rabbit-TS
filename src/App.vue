<script lang="ts">
import request from './utils/request'
request.get('/home/index').then((res) => {
  console.log(res)
})
</script>
<template>app</template>
