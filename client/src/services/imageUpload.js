import axios from 'axios';

const imageUpload = (files, callback) => {
  const formData = new FormData();
  formData.append('file', files[0]);
  formData.append('tags', 'meals');
  formData.append('upload_preset', 'u9zfzeap');
  formData.append('api_key', '411447556157938');
  formData.append('timestamp', (Date.now() / 1000) || 0);
  const config = {
    onUploadProgress(ProgressEvent) {
      let percentCompleted = 0;
      const totalLength = ProgressEvent.lengthComputable ? ProgressEvent.total : ProgressEvent.target.getResponseHeader('content-length') || ProgressEvent.target.getResponseHeader('x-decompressed-content-length');
      if (totalLength !== null) {
        percentCompleted = Math.round((ProgressEvent.loaded * 100) / totalLength);
      }
      callback(percentCompleted);
    }
  };
  return axios.post('https://api.cloudinary.com/v1_1/tovieyeozim/image/upload', formData, {
    headers: { 'X-Requested-With': 'XMLHttpRequest' }, ...config
  });
};
export default imageUpload;
