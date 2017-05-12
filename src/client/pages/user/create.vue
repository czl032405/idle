<template>
    <div class="create-view">
        <h2>Create User</h2>
            <form action="">
                <div class="form-group">
                    <label for="">username</label>
                    <input type="text" v-model="name" class="form-control">
                </div>
                <div class="form-group">
                    <label for="">password</label>
                    <input type="password" v-model="pw" class="form-control">
                </div>
                <div class="form-group">
                    <label for="">password again</label>
                    <input type="password" v-model="pwAg" class="form-control">
                </div>
                <button class="btn btn-primary btn-block" @click="create">Create</button>

            </form>
    </div>
</template>
<script src="./create.js"></script>
