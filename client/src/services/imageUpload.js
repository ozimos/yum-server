import axios from 'axios';

const imageUpload = (files) => {
  const formData = new FormData();
  formData.append('file', files[0]);
  formData.append('tags', 'meals');
  formData.append('upload_preset', 'u9zfzeap');
  formData.append('api_key', '411447556157938');
  formData.append('timestamp', (Date.now() / 1000) || 0);
  // const config = {
  //   onUploadProgress(progressEvent) {
  //     const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  //     this.setState({ uploadPercent: percentCompleted });
  //   }
  // };
  return axios.post('https://api.cloudinary.com/v1_1/tovieyeozim/image/upload', formData, {
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
  });
};
export default imageUpload;
