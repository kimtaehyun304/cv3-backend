export type Proudct = {
  rank: number;
  title: string;
  category: string;
  date: Date;
  viewCount?: number | null;
  viewRating?: number | null;
  salesCount: number | null;
  revenue: number | null;
  itemCount: number;
};

export type BroadcastCategory = '라방' | '홈쇼핑';
