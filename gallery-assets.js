(function () {
    'use strict';

    var archiveRoot = 'Cloud 9 Compress Images/All Images/';
    var archiveImages = [
        '01 BHK - Living room.webp',
        '01 BHK Washroom.webp',
        '01 BHK- Outer image.webp',
        '01 BHK-Outer image.webp',
        '1 BHK Outer image.webp',
        '1 bhk- Bedroom.webp',
        '101 - Outside pics.webp',
        '101 washroom..webp',
        '121 - living room.webp',
        '121 - washroom.webp',
        '121- living room.webp',
        '122 - bedroom pics.webp',
        '122 - Cluster cott.webp',
        '125 - Cluster.webp',
        '125 Bedroom.webp',
        '125 cluster.webp',
        'Art Gallery 1.webp',
        'Art Galley 2.webp',
        'Born Fire 1.webp',
        'Born Fire 2.webp',
        'Candle light 1.webp',
        'Candle light 4.webp',
        'Candle light 5.webp',
        'Candle light 6.webp',
        'cANDLE LIGHT DINNE R1.webp',
        'Candle light dinne r2.webp',
        'Candlt light 3.webp',
        'Cluster - 126.webp',
        'Cluster cott - 2.webp',
        'Cluster cott - 3.webp',
        'Cluster cottage - 1.webp',
        'Coffee sunset point - 2.webp',
        'Coffee sunset point -1.webp',
        'Coffee Sunset Point.webp',
        'Conference - cluster.webp',
        'Conference - Round table.webp',
        'Conference cluster 2.webp',
        'Conference.webp',
        'Copy of 121- living room.webp',
        'Copy of 122 - bedroom pics.webp',
        'Copy of 122 - Cluster cott.webp',
        'Copy of 125 - Cluster.webp',
        'Copy of 125 Bedroom.webp',
        'Copy of 125 cluster.webp',
        'Copy of Cluster - 126.webp',
        'Copy of Cluster cott - 2.webp',
        'Copy of Cluster cott - 3.webp',
        'Copy of Cluster cottage - 1.webp',
        'Duplex  small bedroom.webp',
        'Duplex Bedroom 1.webp',
        'Duplex Bedroom 2.webp',
        'Duplex Bedroom 5.webp',
        'Duplex living room - 1.webp',
        'Duplex living room - 4.webp',
        'Duplex Living room 2.webp',
        'Duplex living room 3.webp',
        'Duplex living room 4.webp',
        'Duplex Living room.webp',
        'Duplex master bedrom 2.webp',
        'Duplex Master bedroom.webp',
        'Duplex small bedroom.webp',
        'Duplex washroom.webp',
        'f2af81fd-a4f0-4ba5-8687-c40254c6cd40.webp',
        'Family Deluce Cott - 129 - 2.webp',
        'Family deluxe  outer pics.webp',
        'Family deluxe - outer pic.webp',
        'Family deluxe cott - 129.webp',
        'Family deluxe cott - outer pics.webp',
        'fd505100-d1e7-42a8-9ad5-ac431bc6aa54.webp',
        'Food 1.webp',
        'Food 4.webp',
        'Food 5.webp',
        'Food 6.webp',
        'Food 7.webp',
        'Game Zone 1.webp',
        'Game Zone 2.webp',
        'Gautam Buddha image..webp',
        'Gautam Buddha images.webp',
        'Ground pics.webp',
        'Hill top deluxe cott - Pathway  - scrolling section (2).webp',
        'Hill top deluxe cott - Pathway  - scrolling section.webp',
        'Hill top deluxe cott - Pathway 2.webp',
        'Hill top deluxe cott - Pathway.webp',
        'Hill Top Deluxe Cott.webp',
        'Luxury suit living room.webp',
        'Luxury Suit.webp',
        'Luxury Suite 2.webp',
        'Mandir.webp',
        'Mocktail 1.webp',
        'Mocktail 2.webp',
        'Mocktail 3.webp',
        'Mocktail 5.webp',
        'Mocktail 6.webp',
        'Mocktail 7.webp',
        'Mocktails.webp',
        'Outside reception.webp',
        'SPA 3.webp',
        'SPA 4.webp',
        'View at night 1.webp',
        'View form deluxe cottage.webp',
        'View from 101 dc.webp',
        'View from cloud9 (4).webp',
        'View from cloud9 - 7.webp',
        'View from cloud9 2.webp',
        'View from cloud9.webp',
        'View from Deluxe Cott.webp',
        'View from Duplex 1.webp',
        'View from Duplex 2.webp',
        'View from Duplex 3.webp',
        'View from Duplex Cott.webp',
        'View from Hill top  DC.webp',
        'View from Hill top deluxe cott (2).webp',
        'View from Hill top deluxe cott.webp',
        '4 BHK/04 Bhk Bedroom 1.webp',
        '4 BHK/04 Bhk Bedroom 2.webp',
        '4 BHK/04 Bhk bedroom 5 (2).webp',
        '4 BHK/04 Bhk Bedroom 7.webp',
        '4 BHK/04 bhk bedroom.webp',
        '4 BHK/04 Bhk Living room 3.webp',
        '4 BHK/04 bhk Living room 5.webp',
        '4 BHK/04 bhk living room 6.webp',
        '4 BHK/04 Bhk living room.webp',
        '4 BHK/5c48c2af-c213-476c-9eed-9b6eb2548456.webp',
        'Deluxe Cottage/Deluxe Cott - 101 (2).webp',
        'Deluxe Cottage/Deluxe cott - 101 (3).webp',
        'Deluxe Cottage/Deluxe Cott - 101 (4).webp',
        'Deluxe Cottage/Deluxe cott - 103  104.webp',
        'Deluxe Cottage/Deluxe cott - 108.webp',
        'Deluxe Cottage/Deluxe cott - 109 -outside pics.webp',
        'Deluxe Cottage/Deluxe Cott - 111.webp',
        'Deluxe Cottage/Deluxe Cott - 112.webp',
        'Deluxe Cottage/Deluxe Cott - near tot 101.webp',
        'Deluxe Cottage/Deluxe cott - outer pics.webp',
        'Deluxe Cottage/Deluxe Cottage (2).webp',
        'Deluxe Cottage/Deluxe Cottage (3).webp',
        'Deluxe Cottage/Deluxe Cottage - pathway (3).webp',
        'Deluxe Cottage/Deluxe Cottage - pathway.webp',
        'Deluxe Cottage/Deluxe Cottage 108 - 2.webp',
        'Deluxe Cottage/deluxe cottage 111 - 112 - outside  image.webp',
        'Deluxe Cottage/Deluxe Cottage Path way.webp',
        'Deluxe Cottage/Deluxe Cottage pathway in scrolling section.webp',
        'Deluxe Cottage/Deluxe Cottage.webp',
        'Restaurant/Resturant 1.webp',
        'Restaurant/Resturant 2.webp',
        'Restaurant/Resturant 3.webp',
        'Restaurant/Resturant 4.webp',
        'Restaurant/Resturant 5.webp',
        'Restaurant/Roof Top - 1.webp',
        'Restaurant/Roof Top - 2.webp',
        'Restaurant/Roof Top - 3.webp',
        'Restaurant/SPA 2.webp',
        'Swimming Pool/SPA.webp',
        'Swimming Pool/Swimmin pool rain dance.webp',
        'Swimming Pool/Swimming pool - 1.webp',
        'Swimming Pool/swimming pool 2.webp',
        'Swimming Pool/Swimming pool 3.webp',
        'Swimming Pool/Swimming pool 4.webp',
        'Swimming Pool/Swimming pool 5.webp',
        'Swimming Pool/Swimming pool 6.webp',
        'Swimming Pool/Swimming Pool.webp'
    ];

    function classify(path) {
        var name = path.toLowerCase();
        if (name.indexOf('restaurant/') >= 0 || /food|mocktail/.test(name)) return 'dining';
        if (/conference|ground pics/.test(name)) return 'events';
        if (/candle|born fire|spa|game zone|art gallery|art galley|mandir|swimming pool/.test(name)) return 'experiences';
        if (/4 bhk|deluxe cottage|duplex|family deluxe|luxury suit|luxury suite|01 bhk|1 bhk|cluster|121|122|125|101/.test(name)) return 'stay';
        return 'nature';
    }

    function title(path) {
        var name = path.split('/').pop().replace(/\.webp$/i, '').replace(/[-_]+/g, ' ');
        return name.replace(/\s+/g, ' ').trim();
    }

    function card(path, index) {
        var category = classify(path);
        var item = document.createElement('div');
        item.className = 'gallery-item archive-gallery-item ' + (index % 11 === 0 ? 'g-big' : index % 7 === 0 ? 'g-tall' : '');
        item.setAttribute('data-cat', category);
        item.setAttribute('data-index', String(index));
        item.innerHTML = '<div class="gallery-item-inner"><div class="gallery-item-media"><img src="' + archiveRoot + path + '" alt="' + title(path) + ' at Cloud 9 Hills Resort" loading="lazy" /></div><div class="gallery-item-shade"></div><div class="gallery-item-glow"></div><span class="gallery-item-tag">' + category + '</span><button class="gallery-item-expand" aria-label="View full image"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5"/></svg></button><div class="gallery-item-caption"><h3>' + title(path) + '</h3><p>Cloud 9 Hills Resort archive</p></div></div></div>';
        return item;
    }

    var grid = document.getElementById('galleryGrid');
    if (!grid) return;
    grid.innerHTML = '';
    archiveImages.forEach(function (path, index) { grid.appendChild(card(path, index)); });
    var count = document.getElementById('galleryVisibleCount');
    if (count) count.textContent = String(archiveImages.length);
    var counter = document.querySelector('.gallery-hero-count [data-counter]');
    if (counter) counter.setAttribute('data-counter', String(archiveImages.length));
})();
