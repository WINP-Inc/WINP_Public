'use client';
import React, { useEffect, useState } from 'react'
import { useModal } from '../../hooks/useModal';
import { usePost } from '../Post';
import { SuggestedGroupItemType } from '@/types/suggested-groups/suggestedGroupType';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SearchResultDataType } from '@/types/search/searchType';
import { postType } from '@/types/post/postType';

interface SearchContextType {
  searchValue: string;
  checks: { people: boolean, groups: boolean, posts: boolean };
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  instantSearchResults: SearchResultDataType[] | null;
  searchResults: SearchResultDataType[] | null;
  searchResultsLoading: boolean;
  searchResultsError: string | null;
  searchModalIsOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  handleSearchSubmit?: (e: any) => void;
  setSearchChecked: (type: string, checked: boolean) => void;
}

export const SearchContext = React.createContext<SearchContextType>({
  searchValue: '',
  checks: { people: true, groups: true, posts: true },
  setSearchValue: () => {},
  handleSearch: () => {},
  searchResults: [],
  instantSearchResults: [],
  searchResultsLoading: false,
  searchResultsError: null,
  searchModalIsOpen: false,
  openSearchModal: () => {},
  closeSearchModal: () => {},
  handleSearchSubmit: () => {},
  setSearchChecked: () => {},
});

export const useSearch = () => {
  return React.useContext(SearchContext);
}

interface Props {
  children: React.ReactNode;
}

const suggestedGroups: SuggestedGroupItemType[] = [
  {
    roomId: '1',
    title: 'Bitcoin',
    members: null,
    image: '/images/bitcoin.png',
    hashTags: [
      {
        textColor: '#F7931A',
        text: 'Bitcoin'
      }
    ],
  },
  {
    roomId: '2',
    title: 'Doggie',
    members: 2.5,
    image: '/images/doggie-coin.png',
    hashTags: [
      {
        textColor: '#F7931A',
        text: 'Doggie'
      }
    ],
  },
  {
    roomId: '3',
    title: 'NFT game crush',
    members: 12.5,
    image: '/images/nft-game.png',
    hashTags: [
      {
        textColor: '#F7931A',
        text: 'Game'
      },
      {
        textColor: '#DFDFDF',
        text: 'NFT'
      },
    ],
  },
  {
    roomId: '4',
    title: 'NFT Art Owenrs!',
    members: 127.5,
    image: '/images/nft-art.png',
    hashTags: [
      {
        textColor: '#F7931A',
        text: 'Art'
      },
      {
        textColor: '#DFDFDF',
        text: 'NFT'
      },
    ],
  },
];

const users = [
  {
    username: 'takeuchi',
    image: '/images/nft-default-image.png',
  },
  {
    username: 'aaa',
    image: '/images/nft-default-image.png',
  },
  {
    username: 'bbb',
    image: '/images/nft-default-image.png',
  },
]

export const SearchProvider: React.FC<Props> = ({ children }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [instantSearchResults, setInstantSearchResults] = useState<SearchResultDataType[] | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResultDataType[] | null>(null);

  const [searchResultsLoading, setSearchResultsLoading] = useState<boolean>(false);
  const [searchResultsError, setSearchResultsError] = useState<string | null>(null);
  const { modalIsOpen: searchModalIsOpen, openModal: openSearchModal, closeModal: closeSearchModal } = useModal();
  const [checks, setChecks] = useState({ people: true, groups: true, posts: true });

  const { posts } = usePost();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    searchValue && instantSearchResults && instantSearchResults.length > 0 ? openSearchModal() : closeSearchModal();
  }, [instantSearchResults, searchValue])

  useEffect(() => {
    const resultVal = searchParams.get('result');

    if (resultVal) {
      const results = performSearch(resultVal);
      setSearchResults(results);
    }
  }, [searchParams, checks, posts, suggestedGroups])

  useEffect(() => {
    if (searchValue.length > 0) {
      const results = performSearch(searchValue);
      setInstantSearchResults(results);
    }
  }, [searchValue]);

  const performSearch = (value: string): SearchResultDataType[] | null => {
    setSearchResultsLoading(true);
    const searchResults: SearchResultDataType[] = [];
    if (checks.posts) {
      searchResults.push({ type: 'post', data: getFilteredPosts(value) });
    }
    if (checks.groups) {
      searchResults.push({ type: 'group', data: getFilteredGroups(value) });
    }
    if (checks.people) {
      searchResults.push({ type: 'user', data: getFilteredUsers(value) });
    }
    setSearchResultsLoading(false);
    return searchResults;
  }

  const getFilteredPosts = (value: string): postType[] => {
    console.log(posts, 'posts')
    return posts?.filter(post => post.title.toLowerCase().includes(value.toLowerCase())) || [];
  }

  const getFilteredGroups = (value: string): SuggestedGroupItemType[] => {
    return suggestedGroups.filter(group => group.title.toLowerCase().includes(value.toLowerCase()));
  }

  const getFilteredUsers = (value: string): any[] => {
    return users.filter(user => user.username.toLowerCase().includes(value.toLowerCase()));
  }

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set('result', searchValue);
    router.push(`/search?${params.toString()}`);
    setSearchValue('');
    closeSearchModal();
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  const setSearchChecked = (type: string, checked: boolean) => {
    setChecks(prev => ({ ...prev, [type]: checked }));
  };

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        checks,
        setSearchValue,
        handleSearch,
        instantSearchResults,
        searchResults,
        searchResultsLoading,
        searchResultsError,
        searchModalIsOpen,
        openSearchModal,
        closeSearchModal,
        handleSearchSubmit,
        setSearchChecked,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}