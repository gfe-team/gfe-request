import { createApp } from 'vue'
import App from './App.vue'
import AxiosHttp from '~/index';

const app = createApp(App);

// 引入AxiosHttp
app.use(AxiosHttp,{
    messageError:(msg:string,status:number)=>{

        if(status == 404){

            console.log('404了')
        }
        console.log(`--------${msg}--------`)
    },
    modalError:(msg:string)=>{

        alert(`--------${msg}--------`)
    },
});

app.mount('#app')
