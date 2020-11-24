import applicationUserManager from "./applicationusermanager";
const userAuth = {
  data() {
    return {
      user: {
        name: "",
        isAuthenticated: false
      }
    };
  },
  methods: {
    async refreshUserInfo() {
      const userIds = await applicationUserManager.getUser();
      if (userIds) {
        this.user.name = userIds.profile.name;
        this.user.isAuthenticated = true;
        var exdate = this.formatUnixtimestamp(userIds.expires_at);
        window.localStorage.setItem("USER_EXP", exdate);
       window.localStorage.setItem("USER_NAME", this.user.name);
      } else {
        this.user.name = "";
        this.user.isAuthenticated = false;
      }
    },
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
  },
  async created() {
    await this.refreshUserInfo();
  }
};
export default userAuth;
