<template>
    <div class="hero-create-view ">
        <form action="">
            <h2>create Hero</h2>
            <div class="form-group">
                <input type="text" v-model="name" class="form-control" placeholder="hero name">
            </div>
            <button class="btn btn-primary btn-block" @click.prevent="createHero">create</button>
        </form>

    </div>
</template>
<script src="./create.js"></script>
