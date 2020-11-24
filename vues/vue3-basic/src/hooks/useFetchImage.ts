import { reactive, toRefs } from 'vue';
import axios from 'axios';

export default (url: string) => {
  const ret = reactive({
    loading: false,
    success: false,
    src: '',
    error: null
  });
  axios
    .get(url)
    .then(res => {
      ret.loading = false;
      ret.success = true;
      ret.src = res.data.message;
    })
    .catch(e => {
      ret.error = e;
      ret.loading = false;
    });
  return { ...toRefs(ret) };
};
