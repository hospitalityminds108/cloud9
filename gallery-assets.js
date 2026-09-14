(function () {
    'use strict';

    var archiveRoot = 'Cloud 9 Compress Images/';
    var archiveImages = [
        'Room 101/DSC05933-HDR.webp',
        'Room 101/DSC05936-HDR.webp',
        'Room 101/DSC05939-HDR.webp',
        'Room 101/DSC05942-HDR.webp',
        'Room 101/DSC05945-HDR.webp',
        'Room 101/DSC05948-HDR.webp',
        'Room 101/DSC05951-HDR.webp',
        'Room 101/DSC05954-HDR.webp',
        'Room 101/DSC05957-HDR.webp',
        'Room 101/DSC05960-HDR.webp',
        'Room 101/DSC05963-HDR.webp',
        'Room 101/DSC05969-HDR.webp',
        'Room 101/DSC05975-HDR.webp',
        'Room 101/DSC05978-HDR.webp',
        'Room 101/DSC05981-HDR.webp',
        'Room 101/DSC06102-HDR.webp',
        'Room 101/DSC06108-HDR.webp',
        'Room 101/DSC06111-HDR.webp',
        'Room 101/DSC06114-HDR.webp',
        'Room 101/DSC06117-HDR.webp',
        'Room 101/DSC06120-HDR.webp',
        'Room 101/DSC06123-HDR.webp',
        'Room 101/DSC06126-HDR.webp',
        'Room 101/DSC06129-HDR (1).webp',
        'Room 101/DSC06129-HDR.webp',
        'Room 102/ba9bb584-c764-421c-a454-28996b5e2ced.webp',
        'Room 102/DSC05867-HDR.webp',
        'Room 102/DSC05870-HDR.webp',
        'Room 102/DSC05873-HDR.webp',
        'Room 102/DSC05876-HDR.webp',
        'Room 102/DSC05879-HDR.webp',
        'Room 102/DSC05882-HDR.webp',
        'Room 102/DSC05885-HDR.webp',
        'Room 102/DSC05894-HDR.webp',
        'Room 102/DSC05897-HDR.webp',
        'Room 102/DSC05900-HDR.webp',
        'Room 102/DSC05903-HDR.webp',
        'Room 102/DSC05906-HDR.webp',
        'Room 102/DSC05909-HDR.webp',
        'Room 102/DSC05912-HDR.webp',
        'Room 102/DSC05915-HDR.webp',
        'Room 102/DSC05918-HDR.webp',
        'Room 102/DSC05921-HDR.webp',
        'Room 102/DSC06078-HDR.webp',
        'Room 102/DSC06081-HDR.webp',
        'Room 102/DSC06084-HDR.webp',
        'Room 102/DSC06087-HDR.webp',
        'Room 102/DSC06090-HDR.webp',
        'Room 102/DSC06096-HDR.webp',
        'Room 102/DSC06099-HDR.webp',
        'Room 102/DSC06132-HDR.webp',
        'Room 102/DSC06135-HDR.webp',
        'Room 102/DSC06138-HDR.webp',
        'Room 102/DSC06141-HDR.webp',
        'Room 108/DSC05985-HDR.webp',
        'Room 108/DSC05988-HDR.webp',
        'Room 108/DSC05991-HDR.webp',
        'Room 108/DSC05994-HDR.webp',
        'Room 108/DSC06000-HDR.webp',
        'Room 108/DSC06003-HDR.webp',
        'Room 108/DSC06006-HDR.webp',
        'Room 108/DSC06009-HDR.webp',
        'Room 108/DSC06012-HDR.webp',
        'Room 108/DSC06015-HDR (1).webp',
        'Room 108/DSC06015-HDR.webp',
        'Room 108/DSC06018-HDR.webp',
        'Room 108/DSC06021-HDR.webp',
        'Room 108/DSC06024-HDR.webp',
        'Room 108/DSC06060-HDR.webp',
        'Room 108/DSC06063-HDR.webp',
        'Room 108/DSC06153-HDR.webp',
        'Room 108/DSC06159-HDR.webp',
        'Room 108/DSC06162-HDR.webp',
        'Room 108/DSC06165-HDR.webp',
        'Room 108/DSC06168-HDR.webp',
        'Room 108/DSC06171-HDR.webp',
        'Room 108/DSC06174-HDR.webp',
        'Room 108/DSC06234-HDR.webp',
        'Room 108/DSC06240-HDR.webp',
        'Room 108/DSC06243-HDR.webp',
        'Room 109/DSC06036-HDR.webp',
        'Room 109/DSC06039-HDR.webp',
        'Room 109/DSC06042-HDR.webp',
        'Room 109/DSC06045-HDR.webp',
        'Room 109/DSC06048-HDR.webp',
        'Room 109/DSC06051-HDR.webp',
        'Room 109/DSC06054-HDR.webp',
        'Room 109/DSC06057-HDR.webp',
        'Room 109/DSC06177-HDR.webp',
        'Room 109/DSC06180-HDR.webp',
        'Room 109/DSC06183-HDR.webp',
        'Room 109/DSC06186-HDR.webp',
        'Room 109/DSC06189-HDR.webp',
        'Room 109/DSC06192-HDR.webp',
        'Room 109/DSC06195-HDR.webp',
        'Room 109/DSC06198-HDR.webp',
        'Room 109/DSC06207-HDR.webp',
        'Room 109/DSC06210-HDR.webp',
        'Room 109/DSC06213-HDR.webp',
        'Room 109/DSC06216-HDR.webp',
        'Room 109/DSC06219-HDR.webp',
        'Room 109/DSC06222-HDR.webp',
        'Room 109/DSC06225-HDR.webp',
        'Room 109/DSC06246-HDR.webp',
        'Room 109/DSC06249-HDR.webp',
        'Room 109/DSC06252-HDR.webp',
        'Room 109/DSC06255-HDR.webp',
        'Room 109/DSC06261-HDR.webp',
        'Room 109/DSC06264-HDR.webp',
        'Room 109/DSC06267-HDR.webp'
    ];

    function classify(path) {
        var name = path.toLowerCase();
        if (/^room (101|102|108|109)\//.test(name)) return 'stay';
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
