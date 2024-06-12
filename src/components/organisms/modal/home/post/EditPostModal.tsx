import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';
import PostMedias from '@/components/molecules/posts/post-content/PostMedias';
import { BasePrimaryButton, BaseSecondaryButton } from '@/components/atoms/button/Buttons';
import { commentType, mediaType, postType } from '@/types/post/postType';
import { usePost } from '../../../../../../context/Post';
import BaseModal from '@/components/atoms/modal/BaseModal';
import Image from 'next/image';
import BasePostContent from '@/components/organisms/home/posts/BasePostContent';
import BasePostInput from '@/components/molecules/posts/modal/BasePostInput';
import { useFileUpload } from '../../../../../../context/FileUpload';
import { useAuth } from '../../../../../../context/Auth';
import useFileUploader from '../../../../../../hooks/useFileUploader';

const PostInputForm = styled.form`
  margin-top: 30px;
`

const PostContentWrapper = styled.div`
  width: 100%;
  background: #302A43;
  border-radius: 16px;
  padding: 12px;
  min-height: 244px;
  height: auto;
  position: relative;

  ${media.lessThan('medium')`
    margin-top: 0;
    min-height: 158px;
  `}
`

const MediaWrapper = styled.div`
  width: 100%;
  margin-bottom: 70px;

  img {
    object-fit: cover;
  }

  ${media.lessThan('medium')`
    height: auto;
    margin-bottom: 36px;
  `}
`;

const InputArea = styled.div`
  margin-bottom: 12px;
`

const InputText = styled.textarea`
  width: 100%;
  font-size: 12px;
  font-weight: 400;
  line-height: normal;
  padding: 12px;
  color: #fff;
  background-color: transparent;
  border: none;
  resize: none;
  height: auto;
  outline: none;

  ${media.lessThan('medium')`
    padding: 4px;
  `}
`

const MediaButtons = styled.div`
  border-top: solid 1px rgb(149, 144, 164, .1);
  padding-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 20px;
  width: calc(100% - 22px);

  input[type='file'] {
    display: none;

    &::after {
      content: '';
      width: 100%;
    }
  }

  ${media.lessThan('medium')`
    width: 100%;
    position: absolute;
    bottom: 20px;
    right: 20px;
  `}
`

const MediaButtonsLeft = styled.label`
  display: flex;
  align-items: center;
  gap: 13px;

  img {
    position: static !important;
    width: 20px !important;
    height: 20px !important;
  }

  span {
    color: #848E9C;
    display: inline-block;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  ${media.lessThan('medium')`
    display: none;
  `}
`

const AddMoreButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  background: transparent;
  border-radius: 4px;
  border: 1px dashed #848E9C;
  padding: 6px 22px;
  cursor: pointer;
  gap: 8px;
`

const MediaButtonsRight = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  label {
    display: block;
    cursor: pointer;
  }

  img {
    width: 32px !important;
    height: 32px !important;
    position: static !important;
  }

  ${media.lessThan('medium')`
    margin-left: auto;

    img {
      width: 20px !important;
      height: 20px !important;
      position: static !important;
    }
  `}
`;

// const PostContentFooter = styled.div`
//   margin-top: 23px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 15px;
//   width: 100%;

//   button {
//     margin-left: auto;
//   }

//   ${media.lessThan('medium')`
//     margin-top: 8px;
//     margin-bottom: 16px;

//     button {
//       width: 72px;
//     }
//   `}
// `

const PostInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const modalContentStyle = (): React.CSSProperties => {
  if (window.visualViewport?.width && window.visualViewport.width <= 768) {
    return {
      background: "#261F32",
      borderRadius: "16px",
      width: "90%",
      minHeight: '253px',
      inset: "50% 50%",
      transform: "translate(-50%, -50%)",
      position: "absolute",
      padding: "0 12px",
      border: 'none',
      overflow: 'auto',
    }
  }

  return {
    background: "#261F32",
    borderRadius: "16px",
    width: "740px",
    height: 'auto',
    maxHeight: 'calc(100vh - 100px)',
    inset: "50% 50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
    padding: "20px 36px",
    border: 'none',
    overflow: 'auto'
  }
}

interface EditPostModalProps {
  isOpen: boolean;
  closeModal: () => void;
  post: postType | commentType;
}

const EditPostModal: FC<EditPostModalProps> = ({ isOpen, closeModal, post }) => {
  const [title, setTitle] = useState<string>('');
  const { setMediaList, removeMedia, mediaList, handleFileChange, uploadFiles } = useFileUploader();
  const { uploadFile } = useFileUpload();
  const { editPost } = usePost();
  const { user } = useAuth();

  useEffect(() => {
    if (post.user._id !== user.id) return;
    if ('title' in post) {
      setTitle(post.title);
      if (post.media) {
        setMediaList(post.media);
      }
    } else {
      setTitle(post.content);
    }

  }, [isOpen, post, setMediaList, user.id])

  const handleEditPost = async (e: any) => {
    e.preventDefault();
    const hashTags = title.startsWith('#') ? title.split(' ') : [];
    const media = await uploadFile(uploadFiles)
    editPost(post._id, title, hashTags, media);
    closeModal();
  }

  return (
    <BaseModal
      isOpen={isOpen}
      closeModal={closeModal}
      css={modalContentStyle()}
      title='Post to community'
      isCloseButton={true}
    >
      <PostInputForm>
        <PostInputWrapper>
          <BasePostInput
            title={title}
            handleChangeText={(e) => setTitle(e.target.value)}
            mediaList={mediaList}
            removeMedia={removeMedia}
            handleFileChange={handleFileChange}
          />
          <EditPostFooter cancelAction={closeModal} postAction={handleEditPost} />
        </PostInputWrapper>
      </PostInputForm>
    </BaseModal>
  )
}

export default EditPostModal


const EditPostFooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`

interface EditPostFooterProps {
  cancelAction: (e?: any) => void;
  postAction: (e?: any) => void;
}

const EditPostFooter: FC<EditPostFooterProps> = ({ cancelAction, postAction }) => {
  return (
    <EditPostFooterWrapper>
      <BaseSecondaryButton width={118} py={12} onClick={cancelAction}>Cancel</BaseSecondaryButton>
      <BasePrimaryButton width={118} py={12} onClick={postAction}>Post</BasePrimaryButton>
    </EditPostFooterWrapper>
  )
}
