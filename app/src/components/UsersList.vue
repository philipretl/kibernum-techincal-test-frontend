<template>
  <!-- Button trigger modal -->
  <div class="d-flex flex-column p-5 shadow bg-body rounded">
    <div class="d-flex flex-row justify-content-between align-content-center">
      <h4 class="align-self-start">Users List</h4>
      <button type="button" class="btn btn-primary mb-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <BootstrapIcon icon="plus-circle-fill" variant="light"/>
        Add user
      </button>
    </div>

    <div class="d-flex flex-row pt-4">
      <h5 v-if="is_loading" class="pt-1 text-success">Loading....</h5>
      <div class="table-responsive-sm">
        <table v-if="!is_loading" class="table table-bordered shadow p-3 mb-5 bg-body rounded">
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
          <tr v-for="(user, index) in users_list " :key="index">
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
</template>a

<script>
export default {
  data() {
    return {
      order_type: 'asc'
    }
  },
  computed: {
    users_list() {
      return this.$store.getters['users_module/getUsersList'];
    },
    is_loading() {
      return this.$store.getters['users_module/isLoading'];
    },
  },
  methods: {
    orderBy(type, attribute) {
      this.order_type = type;
      this.$store.dispatch('users_module/oderBy', {type: type, attribute: attribute});
    }
  }
}
</script>