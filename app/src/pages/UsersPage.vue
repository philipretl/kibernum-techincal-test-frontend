<template>
  <div class="container-fluid w-80 h-75 mt-5">
    <InfoTest/>
    <SaveUser/>
    <UsersList/>
  </div>
</template>

<script>
import UsersList from "@/components/UsersList";
import SaveUser from "@/components/SaveUser"
import InfoTest from "@/components/InfoTest"

export default {
  mounted() {
    this.$store.dispatch('users_module/loadUsersFromServer');
  },
  components: {
    UsersList,
    SaveUser,
    InfoTest
  },
}
</script>