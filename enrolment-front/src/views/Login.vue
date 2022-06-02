<template>
  <div>
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>수강신청 로그인</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      name="login"
                      label="Login"
                      type="text"
                      v-model="user_id"
                    ></v-text-field>
                    <v-text-field
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      v-model="user_pw"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" class="ml-5" @click="memberJoin"
                    >회원가입</v-btn
                  >
                  <v-btn color="primary" @click="submitLogin">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
// import login from "../components/logintemplate.vue";

export default {
  name: "Login",
  data() {
    return {
      user_id: "test",
      user_pw: "1234",
    };
  },
  components: {
    // login,
  },

  methods: {
    memberJoin: function () {
      location.href = "http://211.204.56.20:8000/Sugang/Memberjoin.jsp";
    },
    submitLogin: function () {
      var that = this;
      axios
        // .get("http://211.204.56.20:8000/Sugang/SubjectListLoc")
        .get("http://211.204.56.20:8000/Sugang/Login", {
          params: {
            user_id: this.user_id,
            user_pw: this.user_pw,
          },
        })
        .then(function (response) {
          console.log(response);
          if (response.data == "Success!") {
            alert("로그인 성공!");
            that.$store.dispatch("callId", { newId: that.user_id });
            that.$router.push("/test");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
