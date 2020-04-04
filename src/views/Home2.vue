<template>
  <div class="home">
    <div class="l_body">
      <div class='container clearfix'>
        <div class='l_main'>
          <section class="post-list">
            <div v-for="i in list" :key="i.bID" class='post-wrapper'>
              <article class="post ">
                <section class="meta">
                  <h2 class="title">
                    <router-link :to="'/content/' + i.bID">
                      {{ i.btitle }}
                    </router-link>
                  </h2>
                  <time>
                    {{i.bCreateTime}}
                  </time>
                  <div class='cats'>
                    <a href="javascript:void(0)">{{i.bsubmitter}}</a>
                  </div>
                </section>
                <section class="article typo">
                  <article v-html="i.bcontent"></article>
                  <div class="readmore">
                    <a href="/dotnet/asp.net core???????????/">查看更多</a>
                  </div>
                  <div class="full-width auto-padding tags">
                    <a href="javascript:void(0);">{{i.bcategory}}</a>
                  </div>
                </section>
              </article>
            </div>
          </section>


          <nav id="page-nav">
            <router-link :to="'/?page=' + (page>1?page-1:1)" class="prev" rel="prev">
              {{(page>1? "pre": "")}}

            </router-link>
            <router-link :to="'/?page=' + (page>=TotalCount? TotalCount: page+1)" class="next" rel="next">
              {{(page>=TotalCount? "": "Next")}}
            </router-link>

          </nav>


        </div>
        <aside class='l_side'>


          <section class='m_widget categories'>
            <div class='header'>标签</div>
            <div class='content'>

              <ul class="entry">

                <li><a class="flat-box" href="javascript:void(0);">
                  <div class='name'>博客</div>
                  <div class='badget'>11</div>
                </a></li>

                <li><a class="flat-box" href="javascript:void(0);">
                  <div class='name'>随笔</div>
                  <div class='badget'>10</div>
                </a></li>

              </ul>

            </div>
          </section>

        </aside>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {},
  data() {
    return {
      page: 1,
      TotalCount: 1,
      isShow: true,
      list: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      var that = this;
      var urlPage = that.$route.query.page;
      if (urlPage) {
        that.page = urlPage;
      }
      this.$api.get("Blog/?page=" + that.page, null, r => {
        this.list = r.response.data;
        this.page = r.response.page;
        this.TotalCount = r.response.pageCount;
        this.isShow = false;
      });
    }
  },
  watch: {
    $route(to) {
      this.list = [];
      this.isShow = true;
      this.page = to.query.page;
      this.getData();
    }
  }
};
</script>

<style>
article.newhome {
  width: 1200px;
}
</style>
