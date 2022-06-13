# AxiosHttp 介绍

基于vue3的axios 封装,提供基本常用配置,支持请求拦截、响应数据处理等方法<br />
之前项目中使用到的axios的封装都是在各自的项目的,统一维护起来比较麻烦,因此将此库提取到nexus作为ajax library发布.<br />
通过安装@gfe/request使用.



#### CreateAxiosOptions API

<table>
  <thead>
    <tr>
      <th>属性</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>timeout</td>
      <td>接口请求超时时间</td>
      <td>Number</td>
      <td>1min</td>
    </tr>
    <tr>
      <td>baseURL</td>
      <td>基础接口地址</td>
      <td>String</td>
      <td>-</td>
    </tr>
    <tr>
      <td>prefixUrl</td>
      <td>接口通用的地址部分</td>
      <td>String</td>
      <td>-</td>
    </tr>
    <tr>
      <td>header</td>
      <td>请求头配置</td>
      <td>
        <!-- application/json;charset=UTF-8 <br />
        application/x-www-form-urlencoded;charset=UTF-8 <br />
        multipart/form-data;charset=UTF-8 <br />
        application/octet-stream -->
        Header
      </td>
      <td>application/json;charset=UTF-8</td>
    </tr>
    <tr>
      <td>transform</td>
      <td>响应数据处理方式</td>
      <td>Function</td>
      <td>data=>data</td>
    </tr>
    <tr>
      <td>requestOptions</td>
      <td>独立的接口请求中允许覆盖的参数</td>
      <td>RequestOptions</td>
      <td>-</td>
    </tr>
  </tbody>
</table>


#### RequestOptions API
<table>
  <thead>
    <tr>
      <th>属性</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>joinPrefix</td>
      <td>默认将prefix添加到url</td>
      <td>Boolean</td>
      <td>true</td>
    </tr>
    <tr>
      <td>isTransformRequestResult</td>
      <td>是否对返回数据进行处理</td>
      <td>Boolean</td>
      <td>true</td>
    </tr>
    <tr>
      <td>joinParamsToUrl</td>
      <td>post请求的时候添加参数到url</td>
      <td>Boolean</td>
      <td>false</td>
    </tr>
    <tr>
      <td>formatDate</td>
      <td>格式化提交参数时间</td>
      <td>Boolean</td>
      <td>true</td>
    </tr>
    <tr>
      <td>errorMessageMode</td>
      <td>消息提示类型</td>
      <td>'none' | 'modal'</td>
      <td>none</td>
    </tr>
    <tr>
      <td>apiUrl</td>
      <td>接口基础地址</td>
      <td>string</td>
      <td>-</td>
    </tr>
    <tr>
      <td>customTransformResult</td>
      <td>自定义响应数据处理方式</td>
      <td>Function</td>
      <td>(data) => data</td>
    </tr>
    <tr>
      <td>messageBox</td>
      <td>自定义常规消息提示</td>
      <td>Function</td>
      <td>(message:string,status:number) => void</td>
    </tr>
  </tbody>
</table>

