<template>
  <div>
    <div>
      <p>{{ getId }} 님 어서오세요</p>
    </div>
    <v-btn color="primary" class="mr-5" @click="logout">로그아웃</v-btn>
    <v-btn color="primary" class="mr-5" @click="fetchData">조회</v-btn>
    <v-btn color="primary" @click="gotoMySub">MySubject</v-btn>
    <!-- <div v-html="htmldata"></div> -->
    <v-data-table
      v-if="showflag == 1"
      :headers="tableHeaders"
      :items="objdata"
      :items-per-page="-1"
      class="elevation-1"
      item-key="lec_id"
      show-select
      single-select
      hide-default-footer
      v-model="resultdata"
    ></v-data-table>
    <div class="mb-5"></div>
    <v-btn v-if="showflag == 1" color="success" @click="submitData"
      >Submit</v-btn
    >
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
        { text: "강좌코드", value: "lec_id" },
        { text: "과목명", value: "lec_name" },
        { text: "학년", value: "grade" },
        { text: "학점", value: "credit" },
        { text: "정원", value: "personnelCnt" },
        { text: "신청인원", value: "applicant" },
        { text: "강의요일", value: "lec_day" },
        { text: "강의시간", value: "lec_time" },
      ],
      showflag: false,
      resultdata: [],
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
    gotoMySub: function () {
      this.$router.push("/mysubject");
    },
    fetchData: function () {
      var that = this;
      axios
        .get("http://211.204.56.20:8000/Sugang/SubjectListLoc")
        .then(function (response) {
          //   console.log(response.data.find("lec_id"));

          that.htmldata = response.data;

          //   var s = '<div id="myDiv"></div>';
          var htmlObject = document.createElement("div");
          htmlObject.innerHTML = that.htmldata;

          var lec_id = htmlObject.getElementsByClassName("lec_id");
          var lec_name = htmlObject.getElementsByClassName("lec_name");
          var grade = htmlObject.getElementsByClassName("grade");
          var credit = htmlObject.getElementsByClassName("credit");
          var personnelCnt = htmlObject.getElementsByClassName("personnelCnt");
          var applicant = htmlObject.getElementsByClassName("applicant");
          var lec_day = htmlObject.getElementsByClassName("lec_day");
          var lec_time = htmlObject.getElementsByClassName("lec_time");

          for (var i = 0; i < lec_name.length; i++) {
            that.objdata[i] = {};
            that.objdata[i].lec_id = lec_id[i].innerHTML;
            that.objdata[i].lec_name = lec_name[i].innerHTML;
            that.objdata[i].grade = grade[i].innerHTML;
            that.objdata[i].credit = credit[i].innerHTML;
            that.objdata[i].personnelCnt = personnelCnt[i].innerHTML;
            that.objdata[i].applicant = applicant[i].innerHTML;
            that.objdata[i].lec_day = lec_day[i].innerHTML;
            that.objdata[i].lec_time = lec_time[i].innerHTML;
          }
          that.showflag = true;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    submitData: function () {
      // st_id, chk
      console.log(this.resultdata[0].lec_name);
      var thislecId = this.resultdata[0].lec_id;
      var thisId = this.$store.getters.getId;
      axios
        .get("http://211.204.56.20:8000/Sugang/SaveLec", {
          params: {
            chk: thislecId,
            st_id: thisId,
          },
        })
        .then(function (response) {
          console.log(response);
          if (response.status == 200) alert("수강신청이 완료되었습니다.");
          //   var result = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
