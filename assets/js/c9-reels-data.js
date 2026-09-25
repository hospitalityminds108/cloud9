/* =========================================================================
   CLOUD 9 — Reels content, one list per category.

   Every reel is a PLACEHOLDER until a video is supplied.
   To publish a reel, add the vertical (9:16) MP4 path to `src`, e.g.
     src: 'assets/reels/wedding-haldi.mp4'
   Keep files small (≈ 3–8 MB, 1080×1920, H.264). The poster is shown until
   the guest presses play; the video is only downloaded at that moment.
   ========================================================================= */
window.C9_REELS = {
  'wedding-reels': [
    { tag: 'Haldi', title: 'Marigold mornings by the pool', poster: 'assets/img/wedding-kar-9363-800.webp', src: '' },
    { tag: 'Mehndi', title: 'An afternoon of henna & song', poster: 'assets/img/assets-wedding-mehndi-23-800.webp', pos: '50% 45%', src: '' },
    { tag: 'Ceremony', title: 'Rituals, hand in hand', poster: 'assets/img/assets-wedding-couple-22-800.webp', pos: '55% 40%', src: '' },
    { tag: 'The couple', title: 'A quiet moment in the garden', poster: 'assets/img/assets-wedding-couple-15-800.webp', pos: '55% 45%', src: '' },
    { tag: 'Sangeet', title: 'When the lawn lights up', poster: 'assets/img/wedding-kar-9932-800.webp', src: '' }
  ],
  'facilities-reels': [
    { tag: 'Pool', title: 'Rain dance evenings', poster: 'assets/img/all-images-swimming-pool-swimmin-pool-rain-dance-800.webp', src: '' },
    { tag: 'Trekking', title: 'Forest trails at first light', poster: 'assets/img/forest-trek-800.webp', src: '' },
    { tag: 'Cycling', title: 'Riding the ghat roads', poster: 'assets/img/cycling-800.webp', src: '' },
    { tag: 'Bonfire', title: 'After dark on the hill', poster: 'assets/img/all-images-born-fire-2-800.webp', src: '' },
    { tag: 'Games', title: 'Rainy-day game zone', poster: 'assets/img/all-images-game-zone-1-800.webp', src: '' }
  ],
  'dining-reels': [
    { tag: 'Rooftop', title: 'Sunset on the rooftop', poster: 'assets/img/all-images-restaurant-roof-top-3-800.webp', src: '' },
    { tag: 'Kitchen', title: 'Plated in the hills', poster: 'assets/img/all-images-restaurant-food-6-800.webp', src: '' },
    { tag: 'Mocktails', title: 'Poolside pours', poster: 'assets/img/all-images-restaurant-mocktail-3-800.webp', src: '' },
    { tag: 'Candlelight', title: 'A table for two', poster: 'assets/img/all-images-restaurant-candle-light-dinne-r1-800.webp', src: '' }
  ],
  'corporate-reels': [
    { tag: 'Conference', title: 'The hall, set for the day', poster: 'assets/img/all-images-conference-800.webp', src: '' },
    { tag: 'Offsite', title: 'Team time on the lawn', poster: 'assets/img/all-images-ground-pics-800.webp', src: '' },
    { tag: 'Evenings', title: 'Bonfire debriefs', poster: 'assets/img/all-images-born-fire-1-800.webp', src: '' },
    { tag: 'Dining', title: 'Working lunches, slow dinners', poster: 'assets/img/all-images-restaurant-resturant-2-800.webp', src: '' }
  ],
  'celebration-reels': [
    { tag: 'Anniversary', title: 'Candlelight above the valley', poster: 'assets/img/assets-image-candle-light-800.webp', src: '' },
    { tag: 'Sangeet', title: 'A night to dance', poster: 'assets/img/wedding-kar-1634-800.webp', src: '' },
    { tag: 'Birthday', title: 'Bonfire birthdays', poster: 'assets/img/all-images-born-fire-2-800.webp', src: '' },
    { tag: 'Reunion', title: 'Family under string lights', poster: 'assets/img/wedding-kar-9927-800.webp', src: '' }
  ],
  'yoga-reels': [
    { tag: 'Sunrise', title: 'First light on the ridge', poster: 'assets/img/all-images-view-from-hill-top-dc-800.webp', src: '' },
    { tag: 'Stillness', title: 'The Buddha garden', poster: 'assets/img/all-images-gautam-buddha-images-800.webp', src: '' },
    { tag: 'Restore', title: 'An hour at the spa', poster: 'assets/img/all-images-spa-3-800.webp', src: '' },
    { tag: 'Slow evenings', title: 'Tea at the sunset point', poster: 'assets/img/all-images-coffee-sunset-point-800.webp', src: '' }
  ],
  'spiritual-reels': [
    { tag: 'Temple', title: 'Morning aarti at the mandir', poster: 'assets/img/all-images-mandir-800.webp', src: '' },
    { tag: 'Garden', title: 'Quiet by the Buddha', poster: 'assets/img/all-images-gautam-buddha-image-800.webp', src: '' },
    { tag: 'Karla', title: 'The rock-cut caves nearby', poster: 'assets/img/assets-image-karla-caves-800.webp', src: '' },
    { tag: 'Dusk', title: 'Lamps over the valley', poster: 'assets/img/all-images-view-from-cloud9-800.webp', src: '' }
  ]
};
