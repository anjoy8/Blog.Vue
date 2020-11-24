<template>
  <div>
    <div desktop="12" tablet="8">
      <dl>
        <dt>Login successful</dt>
        <dt>Your browser should be redirected soon</dt>
      </dl>
    </div>
  </div>
</template>

<script>
import applicationUserManager from "../Auth/applicationusermanager";

export default {
  name: "logincallback-view",
  data() {
    return {};
  },
  async created() {
    try {
      await applicationUserManager.signinRedirectCallback();
      let user = await applicationUserManager.getUser();
      this.$store.commit("saveToken", user.access_token);
      var exdate = this.formatUnixtimestamp(user.expires_at);
      window.localStorage.setItem("USER_EXP", exdate);
      window.localStorage.setItem("USER_NAME", user.profile.name);
      this.$router.push({ name: "home" });
    } catch (e) {
      console.log(e);
      this.$root.$emit("show-snackbar", { message: e });
    }
  },
  methods: {
    formatUnixtimestamp(unixtimestamp) {
      if (!unixtimestamp) {
        return unixtimestamp;
      }
      var unixtimestamp = new Date(unixtimestamp * 1000);
      var year = 1900 + unixtimestamp.getYear();
      var month = "0" + (unixtimestamp.getMonth() + 1);
      var date = "0" + unixtimestamp.getDate();
      var hour = "0" + unixtimestamp.getHours();
      var minute = "0" + unixtimestamp.getMinutes();
      var second = "0" + unixtimestamp.getSeconds();
      return (
        year +
        "-" +
        month.substring(month.length - 2, month.length) +
        "-" +
        date.substring(date.length - 2, date.length) +
        " " +
        hour.substring(hour.length - 2, hour.length) +
        ":" +
        minute.substring(minute.length - 2, minute.length) +
        ":" +
        second.substring(second.length - 2, second.length)
      );
    }
  }
};
</script>

<style>
</style>
