import { mediaType } from '@/types/post/postType';
import { ChangeEvent, useState, useCallback } from 'react';
import { useFileUpload } from '../context/FileUpload';

const useFileUploader = () => {
  const [mediaList, setMediaList] = useState<mediaType[]>([]);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);

  const addMedia = useCallback((newMedia: mediaType, newFile: File) => {
    setMediaList(prevMediaList => [...prevMediaList, newMedia]);
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const newFile = e.target.files[0];
    setUploadFiles([...uploadFiles, newFile]);
    const url = URL.createObjectURL(newFile);

    const newMedia: mediaType = {
      type: newFile.type.startsWith('image') ? 'image' : 'video',
      url,
      duration: undefined,
      size: newFile.size,
      width: 512, 
      height: 512,
      thumbnail: ''
    };

    addMedia(newMedia, newFile);
    e.target.value = '';
  };

  const removeMedia = (mediaUrl: string) => {
    setMediaList(prevMediaList => prevMediaList.filter(media => media.url !== mediaUrl));
  };

  return {
    mediaList,
    uploadFiles,
    setMediaList,
    setUploadFiles,
    removeMedia,
    handleFileChange
  }
}

export default useFileUploader;
