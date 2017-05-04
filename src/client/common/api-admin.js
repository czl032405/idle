import Api from 'common/api';
const ApiAdmin = {
    serverPath: Api.serverPath,
    getJson: Api.getJson,
    go2login() {
        console.info("login");
        // router.push('/user/login');
    }
}


const ApiMap = {
    Admin: {
        User: {
            list: '',
            ban: 'name'
        },
        Hero: {
            list: ''
        }

    }

}

Object.keys(ApiMap).forEach(key1 => {
    Object.keys(ApiMap[key1]).forEach(key2 => {
        Object.keys(ApiMap[key1][key2]).forEach(key3 => {
            ApiAdmin[key1] || (ApiAdmin[key1] = {})
            ApiAdmin[key1][key2] || (ApiAdmin[key1][key2] = {})
            ApiAdmin[key1][key2][key3] || (ApiAdmin[key1][key2][key3] = {})
            ApiAdmin[key1][key2][key3] = ApiAdmin.getJson.bind(ApiAdmin, `/${key1}/${key2}/${key3}`);

        })

    })
})

export default ApiAdmin;

