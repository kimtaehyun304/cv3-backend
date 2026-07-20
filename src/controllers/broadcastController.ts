import { Request, Response } from 'express';

import { getHomeShoppingCache, getLabangCache } from '@src/common/cache';

const BroadcastController = {
  getAll(this: void, req: Request, res: Response) {
    let { category } = req.query;

    if (!category) category = '라방';

    if (category !== '라방' && category !== '홈쇼핑') {
      return res
        .status(409)
        .json({ message: '라방, 홈쇼핑 카테고리만 가능합니다' });
    }

    if (category === '라방') return res.json(getLabangCache());

    if (category === '홈쇼핑') return res.json(getHomeShoppingCache());
  },
};

export default BroadcastController;
