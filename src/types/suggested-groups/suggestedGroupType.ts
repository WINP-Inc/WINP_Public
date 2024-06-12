export interface HashTagItemType {
  textColor: string;
  text: string;
}

export interface SuggestedGroupItemType {
  roomId: string;
  title: string;
  image: string;
  members?: number | null;
  overPrice?: number | null;
  hashTags: HashTagItemType[] | null;
}