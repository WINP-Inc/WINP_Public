export interface AirdropOptionsType {
  airdropUrl: string;
  cost: {
    value?: number;
    isFree: boolean;
  }
  referralCode?: string;
  distributionQuantity: number;
  eventDate: string;
}