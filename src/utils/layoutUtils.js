import assets from '@/assets';

export const layoutOptions = [
  {
    id: 1,
    title: 'Layout A',
    tagline: 'Size 6 x 4 Strip',
    imageUrl: assets.layout1,
    posts: '(4 Pose)',
    layoutWidth: 707,
    layoutHeight: 2000,
    photoPositions: [
      { x: 46, y: 161, width: 740, height: 361, radius: 200 },
      { x: 46, y: 538, width: 740, height: 361, radius: 200 },
      { x: 46, y: 914, width: 740, height: 361, radius: 200 },
      { x: 46, y: 1290, width: 740, height: 361, radius: 200 },
    ],
  },
  {
    id: 2,
    title: 'Layout B',
    tagline: 'Size 6 x 3 Strip',
    imageUrl: assets.layout2,
    posts: '(3 Pose)',
    layoutWidth: 707,
    layoutHeight: 2000,
    photoPositions: [
      { x: 79, y: 385, width: 549, height: 309, radius: 0 },
      { x: 79, y: 865, width: 549, height: 309, radius: 0 },
      { x: 79, y: 1343, width: 549, height: 309, radius: 0 },
    ],
  },
  {
    id: 3,
    title: 'Layout C',
    tagline: 'Size 6 x 4 Strip',
    imageUrl: assets.layout3,
    posts: '(4 Pose)',
    layoutWidth: 707,
    layoutHeight: 2000,
    photoPositions: [
      { x: 64, y: 102, width: 572, height: 361, radius: 0 },
      { x: 64, y: 514, width: 572, height: 361, radius: 0 },
      { x: 63, y: 926, width: 572, height: 361, radius: 0 },
      { x: 64, y: 1339, width: 572, height: 361, radius: 0 },
    ],
  },
  {
    id: 4,
    title: 'Layout D',
    tagline: 'Size 6 x 3 Strip',
    imageUrl: assets.layout4,
    posts: '(3 Pose)',
    layoutWidth: 707,
    layoutHeight: 2000,
    photoPositions: [
      { x: 72, y: 101, width: 565, height: 402, radius: 27 },
      { x: 72, y: 625, width: 565, height: 402, radius: 27 },
      { x: 72, y: 1187, width: 565, height: 402, radius: 27 },
    ],
  },
];