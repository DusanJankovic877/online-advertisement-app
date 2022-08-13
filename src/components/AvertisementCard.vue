<template>
    <div class="card" style="width: 18rem;">
      <img src="" class="card-img-top" alt="">slika
      <div class="card-body">
        <h5 class="card-title">Card title</h5>title/ ime
        <p class="card-text">description</p>
        <p class="card-text">cena</p>
        <p class="card-text">grad</p>
        <p class="card-text">kategorije</p>
        <button class="btn btn-warning">edit</button>
        <button class="btn btn-danger">ddelete</button>
      </div>
    </div>
    {{avertisements}}
</template>

<script>
export default {
props:{

    avertisements: {type: Array}
}
}
</script>

<style>

</style>