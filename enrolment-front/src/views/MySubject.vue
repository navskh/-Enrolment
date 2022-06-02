<template>
  <div>
    <div>
      <p>{{ getId }} 님 어서오세요</p>
    </div>
    <v-btn color="primary" class="mr-5" @click="logout">로그아웃</v-btn>
    <v-btn color="primary" @click="fetchData">조회</v-btn>
    <!-- <div v-html="htmldata"></div> -->
    <v-data-table
      v-if="showflag == 1"
      :headers="tableHeaders"
      :items="objdata"
      :items-per-page="-1"
      class="elevation-1"
      item-key="lec_it"
      show-select
      single-select
      hide-default-footer
      v-model="resultdata"
    ></v-data-table>
    <div class="mb-5"></div>
    <v-btn v-if="showflag == 1" color="red" @click="submitData">강좌삭제</v-btn>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      htmldata: "",
      objdata: [],
      tableHeaders: [
        //   강좌코드	과목명	학년	학점	정원	신청인원	강의 요일	강의 시간
        { text: "강좌코드", value: "lec_it" },
        { text: "강좌이름", value: "lec_name" },
        { text: "학번", value: "st_id" },
      ],
      showflag: false,
      resultdata: [],
      listdata: "",
    };
  },
  computed: {
    getMsg() {
      return this.$store.getters.getMsg;
    },
    getId() {
      return this.$store.getters.getId;
    },
  },
  methods: {
    logout: function () {
      this.$router.push("/");
    },
    fetchData: function () {
      var that = this;
      var thisId = this.$store.getters.getId;
      axios
        .get("http://211.204.56.20:8000/Sugang/GetList", {
          params: { st_id: thisId },
        })
        .then(function (response) {
          //   console.log(response.data.find("lec_id"));
          that.htmldata = response.data;

          //   var s = '<div id="myDiv"></div>';
          var htmlObject = document.createElement("div");
          htmlObject.innerHTML = that.htmldata;

          console.log(htmlObject);

          var lec_it = htmlObject.getElementsByClassName("lec_it");
          var lec_name = htmlObject.getElementsByClassName("lec_name");
          var st_id = htmlObject.getElementsByClassName("st_id");
          console.log(lec_it);
          for (var i = 0; i < lec_it.length; i++) {
            that.objdata[i] = {};
            that.objdata[i].lec_it = lec_it[i].innerHTML;
            that.objdata[i].lec_name = lec_name[i].innerHTML;
            that.objdata[i].st_id = st_id[i].innerHTML;
          }
          console.log(that.objdata);
          that.showflag = true;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    submitData: function () {
      // st_id, chk
      var that = this;
      console.log(this.resultdata[0].lec_it);
      var thislecId = this.resultdata[0].lec_it;
      var thisId = this.$store.getters.getId;
      console.log(thislecId, thisId);
      axios
        .get("http://211.204.56.20:8000/Sugang/DelLec", {
          params: {
            check: thislecId,
            st_id: thisId,
          },
        })
        .then(function (response) {
          console.log(response);
          that.listdata = response.data;
          that.$router.go();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
