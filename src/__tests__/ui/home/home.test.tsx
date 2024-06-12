import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { PostProvider, usePost } from "../../../../context/Post";
import React, { FC } from "react";
import axiosInterceptor from "../../../../hooks/axiosInterceptor";
import Home from "@/components/pages/home/Home";

describe('process for users to make a submission', () => {
  global.URL.createObjectURL = jest.fn(() => 'http://some-fake-url.png');

  const testFileAttachment = (inputEl: HTMLInputElement, fileName: string) => {
    const blob = new Blob([""], { type: "image/png" });
    const testFile = new File([blob], fileName, { type: 'image/png' });
    fireEvent.change(inputEl, { target: { files: testFile } });
  }

  beforeEach( async () => {
    render(<Home />)
    const postButton = screen.getByRole('button', { name: /post/i });
    await userEvent.click(postButton);
  });

  describe('tests on modal functions', () => {
    test('should once the post button is pressed, the post modal will appear.', () => {
      const postInput = screen.getByPlaceholderText(/type something../i);
      expect(postInput).toBeInTheDocument();
    });

    test('Pressing the Close button closes the modal.', async () => {
      const postInput = screen.getByPlaceholderText(/type something../i);
      expect(postInput).toBeInTheDocument();
      const title = screen.getByText('Post to community');
      expect(title).toBeInTheDocument()
      const divEl = title.closest('div')
      expect(divEl).toBeInTheDocument()
      const buttonEl = divEl?.querySelector('button') as HTMLElement
      expect(buttonEl).toBeInTheDocument()
      await userEvent.click(buttonEl);
      expect(postInput).not.toBeInTheDocument()
    });
  });

  describe('Testing on minor components of the submission function', () => {
    test('should enter text in textbox', async () => {
      const inputEl: HTMLInputElement = screen.getByPlaceholderText(/type something../i);

      await userEvent.type(inputEl, "Hello!");
      expect(inputEl.value).toBe('Hello!');
    });

    test('should enter image in imageBox', async () => {
      const imageEl = screen.getByAltText('upload-image');
      const labelEl = imageEl.closest('label') as HTMLLabelElement;
      const inputEl = labelEl.querySelector('input') as HTMLInputElement;
      expect(inputEl).toBeInTheDocument();

      testFileAttachment(inputEl, 'test.png')
      const attachmentFileElements = await screen.findAllByAltText('attachment-file');
      const uploadImage = attachmentFileElements.pop();
      const deleteButtonEl = uploadImage?.nextElementSibling
      expect(deleteButtonEl).toBeInTheDocument()
    });

    test('should delete button is pressed, the target image is deleted.', async () => {
      const imageEl = screen.getByAltText('upload-image');
      const labelEl = imageEl.closest('label') as HTMLLabelElement;
      const inputEl = labelEl.querySelector('input') as HTMLInputElement;

      testFileAttachment(inputEl, 'test.png')
      const attachmentFileElements = await screen.findAllByAltText('attachment-file');
      const uploadImage = attachmentFileElements.pop();
      const deleteButtonEl = uploadImage?.nextElementSibling as HTMLButtonElement
      await userEvent.click(deleteButtonEl);
      expect(uploadImage).not.toBeInTheDocument()
    });
  });

  describe('Testing of hooks in the posting function', () => {
    test('Posts will be listed.', async () => {
      const fetchPosts = await axiosInterceptor.get(`${process.env.NEXT_PUBLIC_API_URL}posts`)
      type wrapperType = {
        children: React.ReactNode
      }
      const wrapper: FC<wrapperType> = ({ children }) => <PostProvider>{children}</PostProvider>
      const { result } = renderHook(() => usePost(), { wrapper });

      await act(() => {
        result.current.getPosts();
      })
      
      expect(result.current.posts).toEqual(fetchPosts.data)
    });
  });

  describe('Rough system testing of posts functions', () => {
    test('Load the screen to get the list of posts.', async () => {
      
    });

    test('Press the submit button to post.', () => {
      
    });
  });
});