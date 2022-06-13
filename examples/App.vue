<template>
  <div>axiosHttp示例</div>
  <br />
  <button @click="getDataJson">请求data.json</button>
  <br />
  <button @click="getDataJson2">请求data-2.json</button>
  <br />
  <button @click="getDataJson3">请求data-3.json</button>
  <br />
  <button @click="getApi">请求API</button>
  <br />
  <button @click="getHeader">获取Header</button>
   <br />
  <input type="file" @change="fileChange" />
</template>

<script lang="ts">
// @ts-ignore
import { defineComponent, onMounted } from "vue";
import { useAxiosHttp } from "~/index";
const devToken = `token value`;
export default defineComponent({
  setup() {
    const axiosHttp = useAxiosHttp();

    onMounted(() => {
      console.log(axiosHttp);
    });

    const getDataJson = () => {
      axiosHttp
        .get("/data.json", {}, { isTransformRequestResult: false })
        .then(console.log);
      axiosHttp
        .get("/data.json", {}, { isTransformRequestResult: false })
        .then(console.log);
      axiosHttp
        .get("/data.json", {}, { isTransformRequestResult: false })
        .then(console.log);
      axiosHttp
        .get("/data.json", {}, { isTransformRequestResult: false })
        .then(console.log);
    };

    const getDataJson2 = () => {
      axiosHttp.get("/data-2.json").then(console.log);
    };

    const getDataJson3 = () => {
      axiosHttp
        .get(
          "/data-3.json",
          {},
          {
            customTransformResult: res => {
              return {
                actionResult: res.result && "1",
                data: res.content,
                message: res.message
              };
            }
          }
        )
        .then(console.log);
    };

    const getApi = () => {
      axiosHttp.setToken(devToken);
      console.log(axiosHttp);
      axiosHttp
        .post(
          "/api/gettasklist",
          {
            company_name: "",
            currentPage: 1,
            pagesize: 10,
            status: 0
          },
          {
            // isTransformRequestResult:false,
            apiUrl: "https://xxxx.xxx.com",
            errorMessageMode: "modal"
          }
        )
        .then(console.log);
    };

    const fileChange = e => {
      const file = e.target.files[0];
      const defHttp = axiosHttp.getInstance();
      const params = new FormData();
      params.append("quantity", `1`);
      params.append("status", `2`);
      params.append("invoiceNum", file);
      params.append("files", "IN223H68AEF3246C");
      const token = ``;
      defHttp.setHeader({
        Authorization: `Bearer ${token}`
      });
      defHttp
        .request(
          {
            url: "/uploadImage",
            method: "POST",
            params,
            headers: {
              "Content-Type": "multipart/form-data;charset=UTF-8"
            }
          },
          {
            apiUrl: "https://xxx.youserver.com",
            isTransformRequestResult: false
          }
        )
        .then(console.log);
    };

    const getHeader = () => {
      const defHttp = axiosHttp.getInstance();
      const header = defHttp.getHeader();
      console.log(header);
      console.log(header['Authorization'])

      console.log(axiosHttp.getHeader())
    };

    return {
      getDataJson,
      getDataJson2,
      getDataJson3,
      getApi,
      fileChange,
      getHeader
    };
  }
});
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
button {
  margin-right: 8px;
  margin-bottom: 12px;
  color: #fff;
  border-color: #1890ff;
  background: #1890ff;
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  box-shadow: 0 2px #0000000b;
  line-height: 1.5715;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  box-shadow: 0 2px #00000004;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 2px;
  border-color: #d9d9d9;
}
button:hover {
  text-decoration: none;
  color: #fff;
  border-color: #40a9ff;
  background: #40a9ff;
}
</style>