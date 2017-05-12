<template>
    <div class="login-view container">
        <h2>Login User</h2>
            <form action="" autocomplete="on">
                <div class="form-group">
                    <label for="">username</label>
                    <input type="text" v-model="name" class="form-control">
                </div>
                <div class="form-group">
                    <label for="">password</label>
                    <input type="password" v-model="pw" class="form-control">
                </div>
              
                <button class="btn btn-primary btn-block" @click="login">Login</button>

            </form>
    </div>
</template>
<script src="./login.js"></script>
