<template>
    <div>

        <div class="l_body">
            <div class="container clearfix">


                <div class="l_main">
                    <article id="" class="post white-box article-type-post" itemscope="" itemprop="blogPost">
                        <section class="meta">
                            <h2 class="title">
                                <a href="javascript:void(0);">
                                    {{dat.btitle}}
                                </a>
                            </h2>
                            <time>
                                {{dat.bCreateTime}}
                            </time>
                            <div class="cats">
                                <a href="/categories/dotnet/">{{dat.bsubmitter}}</a>
                            </div>
                        </section>
                        <section class="article typo">
                            <div class="article-entry" itemprop="articleBody">
                                <blockquote>
                                    <p>
                                        {{dat.digest}}
                                    </p>
                                </blockquote>

                                <article v-html="dat.bcontent"></article>


                            </div>
                            <div class="article-tags tags">
                                <a href="javascript:void(0);">{{dat.bcategory}}</a>
                            </div>
                            <div class="art-item-footer">
					<span class="art-item-left"><i class="icon icon-chevron-thin-left"></i>
            上一篇：  <router-link :to="'/content/' + dat.previousID">
                      {{ dat.previous }}
                    </router-link>
          </span>
                                <span class="art-item-right">下一篇：
                  <router-link :to="'/content/' + dat.nextID">
                      {{ dat.next }}
                    </router-link>
                  <i class="icon icon-chevron-thin-right"></i></span>
                            </div>
                        </section>
                    </article>


                </div>


                <aside class="l_side">
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

export default {
  components: { },
  data() {
    return {
      id: this.$route.params.id,
      dat: {},
      isShow: true
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$api.get("Blog/" + this.id, null, r => {
        this.dat = r.data;
        this.isShow = false;
      });
    }
  },
  watch: {
    $route(to) {
      this.dat = {};
      this.isShow = true;
      this.id = to.params.id;
      this.getData();
    }
  }
};
</script>
<style>
</style>
