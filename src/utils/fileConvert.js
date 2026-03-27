import axios from 'axios'

/**
 * 网络图片地址 转 File 对象
 * @param {String} imageUrl 网络图片地址
 * @param {String} fileName 自定义文件名（可选）
 * @returns {Promise<File>} File对象
 */
export const urlToFile = async (imageUrl, fileName = 'image.jpg') => {
  try {
    // 1. axios 下载图片（responseType: 'blob' 必须加！）
    const res = await axios({
      method: 'get',
      url: imageUrl,
      responseType: 'blob', // 关键：以二进制流格式接收
      // 跨域图片可选配置
      headers: {
        Accept: 'image/jpeg,image/png,image/*'
      }
    })

    // 2. 从响应头获取真实图片类型（没有则用默认）
    const fileType = res.headers['content-type'] || 'image/jpeg'

    // 3. Blob 转 标准 File 对象
    const file = new File([res.data], fileName, {
      type: fileType
    })

    return file
  } catch (error) {
    console.error('图片转File失败：', error)
    throw error
  }
}
