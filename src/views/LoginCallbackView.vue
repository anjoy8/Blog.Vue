<template>
<div>
  <div desktop=12 tablet=8>
    <dl>
      <dt>Login successful</dt>
      <dt>Your browser should be redirected soon</dt>
    </dl>
  </div>
</div>
</template>

<script>
import applicationUserManager from '../Auth/applicationusermanager'

export default {
  name: 'logincallback-view',
  data () {
    return {
    }
  },
  async created () {
    try {
      await applicationUserManager.signinRedirectCallback()
        let user = await applicationUserManager.getUser()
        this.$store.commit("saveToken", user.access_token);
        window.localStorage.setItem("USER_NAME", user.profile.name);
        this.$router.push({name: 'home'})
    } catch (e) {
      console.log(e)
      this.$root.$emit('show-snackbar', { message: e })
    }
  }
}
</script>

<style>

</style>
