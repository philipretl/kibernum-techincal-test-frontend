<template>
  <div class="card container-fluid w-75 h-75 rounded-3 border mt-5">
    <div class="d-flex flex-row justify-content-center pt-2">
      <img src="https://colombia.kibernum.com/wp-content/uploads/2019/10/logo-kibernum-nuevo-servicios-2.png"
           width="300">
    </div>
    <div class="d-flex flex-column">
      <hr>
      <div class="alert alert-danger alert-dismissible fade show" v-if="hasErrors" role="alert">
        <p v-for="error in errors">
          {{ error }}
        </p>
        <button type="button" class="btn-close" @click="clearErrors" aria-label="Close"></button>
      </div>
      <h4 class="align-self-start ps-3">Add User</h4>
      <form class="d-flex flex-md-row flex-sm-column align-items-center">
        <div class="ps-3">
          <label for="exampleInputEmail1" class="form-label">Name</label>
          <input required v-model="user_name" type="text" class="form-control" id="exampleInputEmail1"
                 aria-describedby="emailHelp">
        </div>
        <div class="ps-3">
          <label for="exampleInputPassword1" class="form-label">Avatar url</label>
          <input required v-model="avatar_url" type="text" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="ps-3 pt-4">
          <button type="submit" v-if="!is_saving" @click.prevent="saveUser" class="btn btn-primary">Submit</button>
          <button type="submit" v-if="is_saving" disabled @click.prevent="saveUser" class="btn btn-primary">Saving...
          </button>
        </div>
      </form>
      <hr>
    </div>
    <div class="d-flex flex-column ps-3">
      <h4 class="align-self-start ">Users List</h4>
      <h5 v-if="is_loading" class="pt-1 text-success">Loading....</h5>
      <div class="d-flex flex-row">
        <table v-if="!is_loading" class="table table-bordered">
          <thead>
          <tr>
            <th>
              <div class="dropdown">
                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1"
                        data-bs-toggle="dropdown" aria-expanded="false">
                  Order by
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><a class="dropdown-item" v-if="order_type === 'desc'" @click="orderBy('asc', 'id')"
                         href="#">Asc</a></li>
                  <li><a class="dropdown-item" v-if="order_type === 'asc'" @click="orderBy('desc', 'id')"
                         href="#">Desc</a></li>
                </ul>
              </div>
            </th>
          </tr>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Avatar</th>
            <th scope="col">Avatar url</th>
            <th scope="col">Name</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in users_list ">
            <td style="width: 5%">{{ user.id }}</td>
            <td style="width: 5%">
              <div class="d-flex flex-row justify-content-start">
                <img :src="user.avatar" width="50">
              </div>
            </td>
            <td style="width: 30%">
              <a :href="user.avatar" target="_blank">
                {{ user.avatar }}
              </a>
            </td>
            <td> {{ user.name }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_name: '',
      avatar_url: '',
      order_type: 'asc'
    }
  },
  mounted() {
    this.$store.dispatch('users_module/loadUsersFromServer');
  },
  computed: {
    users_list() {
      return this.$store.getters['users_module/getUsersList'];
    },
    is_loading() {
      return this.$store.getters['users_module/isLoading'];
    },
    is_saving() {
      return this.$store.getters['users_module/isSaving']
    },
    hasErrors() {
      return this.$store.getters['users_module/hasErrors']
    },
    errors() {
      let errors = this.$store.getters['users_module/getErrors'];
      return errors.map((error) => error.message);
    }
  },
  methods: {
    saveUser() {
      this.$store.dispatch('users_module/saveUserInServer', {
        name: this.user_name,
        avatar: this.avatar_url,
      })
    },
    clearErrors() {
      this.$store.dispatch('users_module/clearErrors');
    },
    orderBy(type, attribute) {
      this.order_type = type;
      this.$store.dispatch('users_module/oderBy', {type: type, attribute: attribute});
    }
  }
}
</script>