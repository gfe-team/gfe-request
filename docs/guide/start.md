# 快速上手



### 示例

#### main.ts

```bash
import { App } from 'vue';
import AxiosHttp from '@gfe/request';
import { message, Modal } from 'ant-design-vue';
import { BASE_API } from '@/utils/env';

app.use(AxiosHttp, {
    baseURL: '',
    requestOptions: {
        apiUrl: BASE_API
    },
    messageError: (msg: string) => {

        message.error(msg);
    },
    modalError: (msg: string) => {

        Modal.error({
            title: '错误提示',
            content: msg
        })
    },
});


```



#### 请求数据

```bash
const http = useAxiosHttp();

 http.get("./data.json", 
          {
              name:'test'
          }, 
          { 
              isTransformRequestResult: false 
          })
     .then(data=>{

         consle.log(data);
     });

```
