import { useQuery } from '@apollo/client';

import { getOSSInfo, OSSInfoType } from '@/graphql/oss';

const useUploadOSS = <T>() => {
  // 获取签名信息
  const { data, refetch, loading } = useQuery<{ ossInfo: OSSInfoType }>(getOSSInfo);

  // 上传数据
  const uploadHandler = async (file: File & { uid: string }) => {
    if (!data) return {} as T;
    const formData = new FormData();
    const { ossInfo } = data;
    const key = `${ossInfo.dir}${file.uid}.png`;
    formData.append('key', key);
    formData.append('policy', ossInfo.policy);
    formData.append('OSSAccessKeyId', ossInfo.accessId);
    formData.append('success_action_status', '200');
    formData.append('signature', ossInfo.signature);
    // 修改名称和文件类型，不能使用js属性修改的方式，会出现异常！
    formData.append('file', new File([file], `${file.uid}.png`, { type: 'image/png' }));
    const res = await fetch(ossInfo.host, {
      method: 'post',
      body: formData,
    });
    const url = res.url + key;
    return { url } as T;
  };

  return {
    uploadHandler,
    loading,
    ossInfo: data?.ossInfo,
    reload: refetch,
  };
};

export default useUploadOSS;
