import forbidden from './resource/403.svg'
import notFound from './resource/404.svg'
import error from './resource/500.svg'

const config = {
  403: {
    img: forbidden,
    title: "403",
    desc: "抱歉，你无权访问该页面",
  },
  404: {
    img: notFound,
    title: "404",
    desc: "抱歉，你访问的页面不存在",
  },
  500: {
    img: error,
    title: "500",
    desc: "抱歉，服务器出错了",
  },
};

export default config;
