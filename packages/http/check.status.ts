const error = (msg: string, status: number) => {

	// 401 404等状态需要在宿主项目中自行处理
	console.log(msg);
};
export function checkStatus(status: number, msg: string, message: Function = error): void {
	switch (status) {
		case 400:
			// error(`${msg}`);
			message(`客户端请求的语法错误`, status);
			break;
		// 401: 未登录
		// 未登录则跳转登录页面，并携带当前页面的路径
		// 在登录成功后返回当前页面，这一步需要在登录页操作。
		case 401:
			message('当前用户没有权限!', status);
			// userStore.loginOut(true);
			// console.log('userStore.loginOut');
			break;
		case 403:
			message('用户得到授权，但是访问是被禁止的!', status);
			break;
		case 404:
			message('网络请求错误,未找到该资源!', status);
			break;
		case 405:
			message('网络请求错误,请求方法未允许!', status);
			break;
		case 408:
			message('网络请求超时!', status);
			break;
		case 500:
			message('服务器错误,请联系管理员!', status);
			break;
		case 501:
			message('网络未实现!', status);
			break;
		case 502:
			message('网络错误!', status);
			break;
		case 503:
			message('服务不可用，服务器暂时过载或维护!', status);
			break;
		case 504:
			message('网络超时!', status);
			break;
		case 505:
			message('http版本不支持该请求!', status);
			break;
		default:
	}
}
