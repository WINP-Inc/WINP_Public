import { postType } from "../post/postType";
import { SuggestedGroupItemType } from "../suggested-groups/suggestedGroupType";
import { UserType } from "../user/UserType";

export interface SearchResultDataType {
  type: string;
  data: postType[] | SuggestedGroupItemType[] | UserType[] | null;
}