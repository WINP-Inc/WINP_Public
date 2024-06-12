import { useCallback, useEffect } from "react";
import { usePost } from "../../context/Post"
import { useAuth } from "../../context/Auth";
import { postType } from "@/types/post/postType";

export const useFilteredPost = () => {
  const { posts, ownPosts, selectedCategory } = usePost();
  const { user } = useAuth();

  const getFilteredPosts = useCallback((): postType[] | null => {
    if (!posts || !selectedCategory) {
      return null;
    } else if (selectedCategory === "all") {
      return posts;
    } else if (selectedCategory === "my-posts") {
      return ownPosts;
    } else if (selectedCategory === "my-saved-posts") {
      return user.savedPosts;
    }

    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  return {
    getFilteredPosts,
  }
}