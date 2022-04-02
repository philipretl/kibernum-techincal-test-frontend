import { createStore } from "vuex"
import users from "@/store/modules/users";

const store = createStore({
    state:{
        name: "Vue"
    },
    modules: {
        users_module: users
    }
})

export default store