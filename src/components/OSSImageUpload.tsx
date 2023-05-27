import type { UploadFile, UploadProps } from 'antd';
import { message, Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { FC, useState } from 'react';
import useUploadOSS from '@/hooks/useUploadOSS';

interface OSSUploadProps {
  label?: string;
  imgCropAspect?: number;
  // 图片最大尺寸, 文件最大限制为5M
  maxFileSize?: number;
  value?: UploadFile[];
  onChange?: (files: UploadFile[]) => void;
}

const OSSImageUpload: FC<OSSUploadProps> = ({
  label = '上传图片',
  imgCropAspect = 1, // 1 / 1 简写
  maxFileSize = 5,
  value = [{ url: '' }] as UploadFile[],
  onChange = () => {},
}) => {
  // 获取签名信息
  // 上传oss的响应方法
  const { uploadHandler, ossInfo, reload } = useUploadOSS<{ url: string }>();

  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [previewTitle, setPreviewTitle] = useState<string>('');

  const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
    // 判断大小
    if (file.size > maxFileSize * 1024 * 1024) {
      message.error(`上传图片超过限制尺寸，当前最大允许的图片大小为 ${maxFileSize} M`);
      return false;
    }
    if (ossInfo) {
      // 认证过期了就重新申请一下
      const expire = Number(ossInfo.expire) * 1000;
      if (expire < Date.now()) {
        await reload();
      }
    }
    // 没有问题就把文件返回
    return file;
  };

  const handleUpload: UploadProps['customRequest'] = async ({ file }) => {
    const { url } = await uploadHandler(file as File & { uid: string });
    setPreviewImage(url);
    setPreviewTitle(url.substring(url.lastIndexOf('/') + 1));
    onChange?.([{ url } as UploadFile]);
  };

  const handlePreview: UploadProps['onPreview'] = async (file: UploadFile) => {
    setPreviewImage(file.url!);
    setPreviewTitle(file.url!.substring(file.url!.lastIndexOf('/') + 1));
    setPreviewOpen(true);
  };

  const handleRemove: UploadProps['onRemove'] = async (file: UploadFile) => {
    if (!file.url) return;
    setPreviewImage('');
    setPreviewTitle('');
    onChange?.([{ url: '' } as UploadFile]);
  };

  return (
    <>
      <ImgCrop rotationSlider aspect={imgCropAspect}>
        <Upload
          accept='image/*'
          listType='picture-card'
          fileList={value}
          beforeUpload={beforeUpload}
          customRequest={handleUpload}
          onPreview={handlePreview}
          onRemove={handleRemove}
        >
          {label}
        </Upload>
      </ImgCrop>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default OSSImageUpload;
