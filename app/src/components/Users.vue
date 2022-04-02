<template>
  <div class="card container-fluid w-75 h-75 rounded-3 border">
    <div class="d-flex flex-row justify-content-center pt-2">
      <img src="https://colombia.kibernum.com/wp-content/uploads/2019/10/logo-kibernum-nuevo-servicios-2.png"
           width="300">
    </div>
    <div class="d-flex flex-column">
      <hr>
      <h4 class="align-self-start ps-3">Add User</h4>
      <form class="d-flex flex-md-row flex-sm-column align-items-center">
        <div class="ps-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
        </div>
        <div class="ps-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="ps-3 pt-4">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
      <hr>
    </div>
    <div class="d-flex flex-column">
      <h4 class="align-self-start ps-3">Users List</h4>
      <div class="d-flex flex-row pt-5">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Name</th>
              <th scope="col">Avatar</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
            </tr>
            </tbody>
          </table>
      </div>
    </div>
  </div>
</template>