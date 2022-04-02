import client_stores from './client.js'
import store from '@/store'
import utils from '@/store/utils'

const user_list_url = process.env.VUE_APP_USER_LIST_URL;
const user_save_url = process.env.VUE_APP_USER_SAVE_URL;

export default {

    getUsers: async () => {
        let response;
        try {
            response = await client_stores.get(user_list_url);
        } catch (error) {
            response = error.response;
        }
        if (response.status === 400) {
            await store.dispatch(
                'users_module/establishErrors',
                {
                    api_data: response.data,
                    code: response.status
                }
            );
            return;
        }
        if (response.status !== 200) {
            await utils.handleErrorsFromServer(
                response.data.errors,
                response.data.messages,
                response.status
            );
            return;
        }
        await store.dispatch(
            'users_module/registerOwnersList',
            {api_data: response.data, code: response.status}
        );
    },
    registerUser: async (user) => {
        let response;
        try {
            //call to axios
            response = await client_stores.post(user_save_url, user);
        } catch (error) {
            response = error.response;
        }
        if (response.status === 400) {
            console.log('error 400', response);
            await store.dispatch( 'users_module/establishErrors',
                {
                    api_data: response.data,
                    code: response.status
                }
            );
            return;
        }
        if (response.status !== 200) {
            console.log('error != 200')
            await utils.handleErrorsFromServer(
                response.data.errors,
                response.data.messages,
                response.status
            );
            return;
        }
        await store.dispatch(
            'users_module/loadUsersFromServer'
        );
    }
}