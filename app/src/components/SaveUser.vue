<template>

  <div class="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
       aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog  modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="align-self-start">Add User</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="alert alert-danger alert-dismissible fade show m-3" v-if="hasErrors" role="alert">
          <p v-for="(error, index) in errors" :key="index">
            {{ error }}
          </p>
          <button type="button" class="btn-close" @click="clearErrors" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="d-flex flex-column align-content-center">
            <img v-if="isImage(avatar_url)" :src="avatar_url"
                 class="rounded-circle align-self-center" alt="Rounded Image" width="200" height="200">
            <img v-else src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                 class="rounded-circle align-self-center" alt="Rounded Image" width="200" height="200">
            <p class="text-muted align-self-center pt-2">Avatar preview</p>
          </div>
          <form class="d-flex flex-column align-items-between">
            <div class="ps-3">
              <label for="exampleInputEmail1" class="form-label">Name</label>
              <input required v-model="user_name" type="text" class="form-control" id="exampleInputEmail1"
                     aria-describedby="emailHelp">
            </div>
            <div class="ps-3">
              <label for="exampleInputPassword1" class="form-label">Avatar url</label>
              <input required v-model="avatar_url" type="text" class="form-control" id="exampleInputPassword1">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" v-if="!is_saving" @click.prevent="saveUser" class="btn btn-primary">Submit</button>
          <button type="submit" v-if="is_saving" disabled @click.prevent="saveUser" class="btn btn-primary">
            Saving...
          </button>
        </div>
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
    }
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
    async saveUser() {
      let result = await this.$store.dispatch('users_module/saveUserInServer', {
        name: this.user_name,
        avatar: this.avatar_url,
      })
      if (result) {
        this.user_name = '';
        this.avatar_url = '';
      }
    },
    clearErrors() {
      this.$store.dispatch('users_module/clearErrors');
    },
    isImage(url) {
      return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    },
  }
}
</script>