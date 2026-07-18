import { S } from 'node_modules/vitest/dist/chunks/config.d.A1h_Y6Jt';

export type Broadcast = {
  rank: string;
  title: string;
  platform: string;
  category: string;
  date: string;
  time: string;
  viewCount?: string;
  viewRating?: string;
  salesCount: string;
  salesAmount: string;
  itemCount: string;
  href: string;
  categoryHref: string;
};

/*
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
*/

export type BroadcastCategory = '라방' | '홈쇼핑';
