import api_utils from '@/store/utils'
import api from './api'

const users = {
    namespaced: true,
    state: {
        errors: [],
        messages: [],
        users_list: [],
        loading: false,
        saving: false,
    },
    getters: {
        getErrors(state) {
            return state.errors
        },
        getMessages(state) {
            return state.messages;
        },
        hasErrors(state) {
            return state.errors.length !== 0;
        },
        hasMessages(state) {
            return state.messages.length !== 0;
        },
        getUsersList(state) {
            return state.users_list;
        },
        isLoading(state) {
            return state.loading;
        },
        isSaving(state) {
            return state.saving;
        }
    },
    mutations: {
        setMessages(state, messages) {
            state.messages = messages;
        },
        setErrors(state, errors) {
            state.errors = errors;
        },
        setUsersList(state, users_list) {
            state.users_list = users_list;
        },
        setLoading(state, is_loading) {
            state.loading = is_loading;
        },
        setSaving(state, is_saving) {
            state.saving = is_saving;
        },
        orderBy(state, params) {
            switch (params.attribute) {
                case 'id' :
                    state.users_list.sort().reverse();
                break;
            }

        }
    },
    actions: {
        loadUsersFromServer: async (context) => {
            context.commit('setUsersList', []);
            context.commit('setLoading', true);
            await api.getUsers();
            context.commit('setLoading', false);

        },
        registerOwnersList(context, response) {

            if (api_utils.containsCodeMessage(response.api_data.messages, 'EMPTY_LIST')) {
                return;
            }
            context.commit(
                'setUsersList',
                response.api_data.data.users
            );
        },
        establishErrors(context, response) {
            context.commit('setErrors', api_utils.handleErrors(response.api_data));
            context.commit('setLoading', false);
        },
        async saveUserInServer(context, user) {
            context.commit('setSaving', true);
            await api.registerUser(user);
            context.commit('setSaving', false);
        },
        clearErrors(context) {
            context.commit('setErrors', []);
        },
        oderBy(context, params) {
            context.commit('orderBy', params);
        }
    }
}

export default users;