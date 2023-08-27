<script setup lang="ts">
import { ref, onUnmounted } from "vue";
//校验规则
import { mobileRules, passwordRules } from "@/utils/rules";
import { Toast } from "vant";

//账号密码登录api
import { loginByPassword, sendMobileCode } from "@/api/user";
//导入用户store
import { useUserStore } from "@/stores";
//路由跳转
import { useRoute, useRouter } from "vue-router";

import { showSuccessToast, showFailToast, type FormInstance } from "vant";
//短信登录
import { loginByMobile } from "@/api/user";
// 表单数据
// 控制密码是否显示
const agree = ref(false);
const mobile = ref("13230000001");
const password = ref("abc12345");
const show = ref(false);
const store = useUserStore();
const router = useRouter();
const route = useRoute();
//切换短信验证
const isPass = ref(true);
// 表单提交
const login = async () => {
  if (!agree.value) return showFailToast("请勾选我已同意");
  // 验证完毕，进行登录
  const res = isPass.value
    ? await loginByPassword(mobile.value, password.value)
    : await loginByMobile(mobile.value, code.value);

  store.setUser(res);
  console.log("登录成功", res);
  // 如果有回跳地址就进行回跳，没有跳转到个人中心
  await router.push((route.query.returnUrl as string) || "/user");
  showSuccessToast("登录成功");
};

//验证码倒计时
const form = ref<FormInstance>();
const time = ref(0);
let timeId: number;
const send = async () => {
  // 已经倒计时time的值大于0，60s内不能重复发送验证码
  if (time.value > 0) return;
  // 验证不通过报错，阻止程序继续执行
  //发送短信验证码
  await form.value?.validate("mobile");
  await sendMobileCode(mobile.value, "login");
  showSuccessToast("发送成功");
  time.value = 60;
  // 倒计时
  timeId = window.setInterval(() => {
    time.value--;
    if (time.value <= 0) window.clearInterval(timeId);
  }, 1000);
};

onUnmounted(() => {
  window.clearInterval(timeId);
});
//
</script>

<template>
  <cp-nav-bar
    title="登录"
    right-text="注册"
    @click-right="$router.push('/register')"
  ></cp-nav-bar>
  <div class="login">
    <!-- 头部-->
    <div class="login-head">
      <h3>{{ isPass ? "密码登录" : "短信验证码登录" }}</h3>
      <a href="javascript:;" @click="isPass = !isPass">
        <span>{{ !isPass ? "密码登录" : "短信验证码登录" }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- == form 表单 == -->
    <van-form autocomplete="off" @submit="login">
      <!--        手机号-->
      <van-field
        v-model="mobile"
        :rules="mobileRules"
        name="mobile"
        placeholder="请输入手机号:13230000001"
        type="tel"
      ></van-field>
      <!--        密码-->
      <van-field
        v-if="isPass"
        v-model="password"
        :rules="passwordRules"
        :type="show ? 'text' : 'password'"
        placeholder="请输入密码:abc12345"
      >
        <template #button>
          <cp-icon
            @click="show = !show"
            :name="`login-eye-${show ? 'on' : 'off'}`"
          ></cp-icon>
        </template>
      </van-field>
      <!--        短信验证码-->
      <van-field v-else placeholder="短信验证码">
        <template #button>
          <span :class="{ active: time > 0 }" @click="send">
            {{ time > 0 ? `${time}s后再次发送` : "发送验证码" }}
          </span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit"
          >登 录</van-button
        >
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
  </div>
</template>

<style lang="scss" scoped>
.login {
  padding-top: 46px;
  .van-form {
    padding: 0 14px;
    .cp-cell {
      height: 52px;
      padding: 14px 16px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .van-checkbox {
        a {
          color: var(--cp-primary);
          padding: 0 5px;
        }
      }
    }
  }
  &-head {
    padding: 30px 30px 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;

    h3 {
      font-weight: normal;
      font-size: 24px;
    }

    a {
      font-size: 15px;
    }
  }
}
</style>
