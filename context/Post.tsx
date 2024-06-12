'use client';
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import axiosInterceptor from "../hooks/axiosInterceptor";
import { useAuth } from "./Auth";
import { categoryType, mediaType, postType } from "@/types/post/postType";
import { useFileUpload } from "./FileUpload";
import { ArticleOptions } from "@/types/post/nfts/NFTTransactionType";
import { CoinStampTransactionType } from "@/types/post/coin/coinStamp";
import { AirdropOptionsType } from "@/types/post/airdrop/airdropType";

export interface postContextType {
    posts: postType[] | null;
    ownPosts: postType[] | null;
    selectedCategory: categoryType;
    setSelectedCategory: (category: categoryType) => void;
    getPosts: () => void;
    loading: boolean;
    error: string | null;
    hasMorePosts: boolean;
    setError: (error: string | null) => void;
    createPost: (title: string, media: object[], tags: string[], category: string, coinStampOptions: CoinStampTransactionType | null, articleOptions: ArticleOptions | null, airdropOptions: AirdropOptionsType | null) => void;
    deletePost: (postId: string) => void;
    editPost: (postId: string, title: string, tags: string[], media: object[]) => void;
    likePost: (postId: string) => void;
    unlikePost: (postId: string) => void;
    commentPost: (postId: string, content: string) => void;
    deleteComment: (postId: string, commentId: string) => void;
    saveOrUnsavePost: (postId: string) => void;
    getTransactions: ({ address, chain }: { address: string, chain: string }) => any | null;
    cleanupPost: () => void;
}


const postContextDefaultValues: postContextType = {
    posts: [],
    ownPosts: [],
    selectedCategory: 'all',
    setSelectedCategory: () => { },
    getPosts: () => { },
    loading: false,
    error: null,
    hasMorePosts: true,
    setError: () => { },
    createPost: () => { },
    deletePost: () => { },
    editPost: () => { },
    likePost: () => { },
    unlikePost: () => { },
    commentPost: () => { },
    deleteComment: () => { },
    saveOrUnsavePost: () => { },
    getTransactions: () => { },
    cleanupPost: () => { },
};

const PostContext = createContext<postContextType>(postContextDefaultValues);

export function usePost() {
    return useContext(PostContext);
}

interface Props {
    children: ReactNode;
}

export function PostProvider({ children }: Props) {
    const [posts, setPosts] = useState<postType[] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<categoryType>('all');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [ownPosts, setOwnPosts] = useState<postType[] | null>(null);
    const { isAuthenticated, setUser } = useAuth();
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [hasMorePosts, setHasMorePosts] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            getPosts()
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            getOwnPosts();
        }
    }
        , [isAuthenticated]);

    const cleanupPost = () => {
        setPosts(null);
        setCurrentPage(0);
        setHasMorePosts(true);
        setSelectedCategory('all');
    }

    const getPosts = async () => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.get(`${process.env.NEXT_PUBLIC_API_URL}posts?page=${currentPage}`);
            if (response.data) {
                if (currentPage === 0) {
                    setPosts(response.data.result);
                } else {
                    setPosts((prevPosts: any) => [...prevPosts, ...response.data.result]);
                }
                setCurrentPage((prevState) => prevState + 1);
                setHasMorePosts(response.data.result.length > 0);
            }
            setLoading(false);
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    }

    const getOwnPosts = async () => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.get(`${process.env.NEXT_PUBLIC_API_URL}posts/own`);
            if (response.data) {
                setOwnPosts(response.data.result);
            }
            setLoading(false);
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    }

    const createPost = async (
        title: string,
        media: object[],
        tags: string[],
        category: string,
        coinStampOptions: CoinStampTransactionType | null,
        articleOptions: ArticleOptions | null,
        airdropOptions: AirdropOptionsType | null,
    ) => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.post(`${process.env.NEXT_PUBLIC_API_URL}posts/new`,
                {
                    title,
                    media,
                    tags,
                    category,
                    coinStampOptions,
                    articleOptions,
                    airdropOptions,
                });
            if (response.data) {
                setPosts([response.data.result, ...posts as any]);
                setOwnPosts([response.data.result, ...ownPosts as any]);
            }
            setLoading(false);
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    }


    const deletePost = async (postId: string) => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.delete(`${process.env.NEXT_PUBLIC_API_URL}posts/${postId}`);
            if (response.data) {
                setPosts((prevState: any) => {
                    if (prevState) {
                        return prevState.filter((post: any) => post._id !== postId);
                    }
                    return null;
                });
                setOwnPosts((prevState: any) => {
                    if (prevState) {
                        return prevState.filter((post: any) => post._id !== postId);
                    }
                    return null;
                });
            }
            setLoading(false);
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    }

    const editPost = async (postId: string, title: string, tags: string[], media: object[]) => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.put(`${process.env.NEXT_PUBLIC_API_URL}posts/${postId}`, { title, tags, media });
            if (response.data) {
                setPosts((prevState: any) => {
                    if (prevState) {
                        return prevState.map((post: any) => {
                            if (post._id === postId) {
                                return {
                                    ...post,
                                    title,
                                    tags,
                                    media,
                                };
                            }
                            return post;
                        });
                    }
                    return null;
                });
                setOwnPosts((prevState: any) => {
                    if (prevState) {
                        return prevState.map((post: any) => {
                            if (post._id === postId) {
                                return {
                                    ...post,
                                    title,
                                    tags,
                                    media,
                                };
                            }
                            return post;
                        });
                    }
                    return null;
                });
            }
            setLoading(false);
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    }

    const likePost = async (postId: string) => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.put(`${process.env.NEXT_PUBLIC_API_URL}posts/${postId}/like`)
            if (response.status === 200) {
                setPosts((prevState: any) => {
                    if (prevState) {
                        return prevState.map((post: any) => {
                            if (post._id === postId) {
                                return {
                                    ...post,
                                    likesCount: post.likesCount + 1,
                                    likes: [...post.likes, response.data.userId],
                                };
                            }
                            return post;
                        });
                    }
                    console.log('no prev')
                    return null;
                });
            }
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    };

    const unlikePost = async (postId: string) => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.put(`${process.env.NEXT_PUBLIC_API_URL}posts/${postId}/unlike`)
            if (response.status === 200) {
                setPosts((prevState: any) => {
                    if (prevState) {
                        return prevState.map((post: any) => {
                            if (post._id === postId) {
                                return {
                                    ...post,
                                    likesCount: post.likesCount - 1,
                                    likes: post.likes.filter((like: any) => like !== response.data.userId),
                                };
                            }
                            return post;
                        });
                    }
                    return null;
                });
            }
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    };

    const commentPost = async (postId: string, content: string) => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.put(`${process.env.NEXT_PUBLIC_API_URL}posts/${postId}/comment`, { content })
            if (response.status === 200) {
                setPosts((prevState: any) => {
                    if (prevState) {
                        return prevState.map((post: any) => {
                            if (post._id === postId) {
                                console.log(post.comments, response.data);
                                return {
                                    ...post,
                                    commentsCount: post.commentsCount + 1,
                                    comments: [response.data.comment, ...post.comments],
                                };
                            }
                            return post;
                        });
                    }
                    return null;
                });
            }
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    };

    const deleteComment = async (postId: string, commentId: string) => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.delete(`${process.env.NEXT_PUBLIC_API_URL}posts/${postId}/comment`, { data: { commentId } })
            if (response.status === 200) {
                setPosts((prevState: any) => {
                    if (prevState) {
                        return prevState.map((post: any) => {
                            if (post.id === postId) {
                                return {
                                    ...post,
                                    commentsCount: post.commentsCount - 1,
                                    comments: post.comments.filter((comment: any) => comment.id !== commentId),
                                };
                            }
                            return post;
                        });
                    }
                    return null;
                });
            }
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    };

    const saveOrUnsavePost = async (postId: string) => {
        try {
            setLoading(true);
            const response = await axiosInterceptor.put(`${process.env.NEXT_PUBLIC_API_URL}posts/${postId}/save`)
            if (response.status === 200) {
                if (response.data.message === "Successfull saved") {
                    setUser((prevState: any) => {
                        if (prevState) {
                            return {
                                ...prevState,
                                savedPosts: [...prevState.savedPosts, response.data.post],
                            };
                        }
                        return null;
                    });
                    setPosts((prevState: any) => {
                        if (prevState) {
                            return prevState.map((post: any) => {
                                if (post._id === postId) {
                                    return {
                                        ...post,
                                        savedCount: post.savedCount + 1,
                                        savedBy: [...post.savedBy, response.data.userId],
                                    };
                                }
                                return post;
                            });
                        }
                        return null;
                    });
                } else if (response.data.message === "Successfull unsaved") {
                    setUser((prevState: any) => {
                        if (prevState) {
                            return {
                                ...prevState,
                                savedPosts: prevState.savedPosts.filter((post: any) => post._id !== response.data.post._id),
                            };
                        }
                        return null;
                    });
                    setPosts((prevState: any) => {
                        if (prevState) {
                            return prevState.map((post: any) => {
                                if (post._id === postId) {
                                    return {
                                        ...post,
                                        savedCount: post.savedCount - 1,
                                        savedBy: post.savedBy.filter((save: any) => save !== response.data.userId),
                                    };
                                }
                                return post;
                            });
                        }
                        return null;
                    });
                }
            }
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    };

    const getTransactions = useCallback(async ({ address, chain }: { address: string, chain: string }) => {
        try {
            setLoading(true);
            console.log(address, chain);
            const response = await axiosInterceptor.get(`${process.env.NEXT_PUBLIC_API_URL}posts/get-all-transactions?address=${address}&chain=${chain}`);
            if (response.data) {
                return response.data;
            }
            setLoading(false);
        } catch (error: any) {
            console.log(error.response.data);
            if (error.response) {
                setError(error.response.data.message);
            }
        }

    }, []);
    return (
        <PostContext.Provider
            value={{
                posts,
                ownPosts,
                selectedCategory,
                setSelectedCategory,
                getPosts,
                loading,
                error,
                hasMorePosts,
                setError,
                createPost,
                deletePost,
                editPost,
                likePost,
                unlikePost,
                commentPost,
                deleteComment,
                saveOrUnsavePost,
                getTransactions,
                cleanupPost,
            }}>
            {children}
        </PostContext.Provider>
    );
};