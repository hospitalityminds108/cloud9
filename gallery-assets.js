(function () {
    'use strict';

    // Archive photos (duplicates removed); each served as enhanced responsive WebP.
    var archiveImages = [
        { p: 'Room 101/DSC05933-HDR.webp', b: 'assets/img/room-101-dsc05933-hdr', w: [800, 1600, 2400] },
        { p: 'Room 101/DSC05936-HDR.webp', b: 'assets/img/room-101-dsc05936-hdr', w: [800, 1600, 2400] },
        { p: 'Room 101/DSC05939-HDR.webp', b: 'assets/img/room-101-dsc05939-hdr', w: [800, 1600, 2400] },
        { p: 'Room 101/DSC05942-HDR.webp', b: 'assets/img/room-101-dsc05942-hdr', w: [800, 1600, 2400] },
        { p: 'Room 101/DSC05945-HDR.webp', b: 'assets/img/room-101-dsc05945-hdr', w: [800, 1600, 2400] },
        { p: 'Room 101/DSC05948-HDR.webp', b: 'assets/img/room-101-dsc05948-hdr', w: [800, 1600, 2400] },
        { p: 'Room 101/DSC05951-HDR.webp', b: 'assets/img/room-101-dsc05951-hdr', w: [800, 1600, 2400] },
        { p: 'Room 101/DSC05954-HDR.webp', b: 'assets/img/room-101-dsc05954-hdr', w: [800, 1600, 2400] },
        { p: 'Room 101/DSC05957-HDR.webp', b: 'assets/img/room-101-dsc05957-hdr', w: [800, 1600, 2400] },
        { p: 'Room 101/DSC05960-HDR.webp', b: 'assets/img/room-101-dsc05960-hdr', w: [800, 1600, 2400] },
        { p: 'Room 101/DSC05963-HDR.webp', b: 'assets/img/room-101-dsc05963-hdr', w: [800, 1600, 2400] },
        { p: 'Room 101/DSC05969-HDR.webp', b: 'assets/img/room-101-dsc05969-hdr', w: [800, 1600, 2400] },
        { p: 'Room 101/DSC05975-HDR.webp', b: 'assets/img/room-101-dsc05975-hdr', w: [800, 1600, 2400] },
        { p: 'Room 101/DSC05978-HDR.webp', b: 'assets/img/room-101-dsc05978-hdr', w: [800, 1600, 2400] },
        { p: 'Room 101/DSC05981-HDR.webp', b: 'assets/img/room-101-dsc05981-hdr', w: [800, 1600, 2400] },
        { p: 'Room 101/DSC06102-HDR.webp', b: 'assets/img/room-101-dsc06102-hdr', w: [800, 1600, 2400] },
        { p: 'Room 101/DSC06108-HDR.webp', b: 'assets/img/room-101-dsc06108-hdr', w: [800, 1600, 2400] },
        { p: 'Room 101/DSC06111-HDR.webp', b: 'assets/img/room-101-dsc06111-hdr', w: [800, 1600, 2400] },
        { p: 'Room 101/DSC06114-HDR.webp', b: 'assets/img/room-101-dsc06114-hdr', w: [800, 1600, 2400] },
        { p: 'Room 101/DSC06117-HDR.webp', b: 'assets/img/room-101-dsc06117-hdr', w: [800, 1600, 2400] },
        { p: 'Room 101/DSC06120-HDR.webp', b: 'assets/img/room-101-dsc06120-hdr', w: [800, 1600, 2400] },
        { p: 'Room 101/DSC06123-HDR.webp', b: 'assets/img/room-101-dsc06123-hdr', w: [800, 1600, 2400] },
        { p: 'Room 101/DSC06126-HDR.webp', b: 'assets/img/room-101-dsc06126-hdr', w: [800, 1600, 2400] },
        { p: 'Room 101/DSC06129-HDR (1).webp', b: 'assets/img/room-101-dsc06129-hdr-1', w: [800, 1600, 2400] },
        { p: 'Room 102/ba9bb584-c764-421c-a454-28996b5e2ced.webp', b: 'assets/img/room-102-ba9bb584-c764-421c-a454-28996b5e2ced', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC05867-HDR.webp', b: 'assets/img/room-102-dsc05867-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC05870-HDR.webp', b: 'assets/img/room-102-dsc05870-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC05873-HDR.webp', b: 'assets/img/room-102-dsc05873-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC05876-HDR.webp', b: 'assets/img/room-102-dsc05876-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC05879-HDR.webp', b: 'assets/img/room-102-dsc05879-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC05882-HDR.webp', b: 'assets/img/room-102-dsc05882-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC05885-HDR.webp', b: 'assets/img/room-102-dsc05885-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC05894-HDR.webp', b: 'assets/img/room-102-dsc05894-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC05897-HDR.webp', b: 'assets/img/room-102-dsc05897-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC05900-HDR.webp', b: 'assets/img/room-102-dsc05900-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC05903-HDR.webp', b: 'assets/img/room-102-dsc05903-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC05906-HDR.webp', b: 'assets/img/room-102-dsc05906-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC05909-HDR.webp', b: 'assets/img/room-102-dsc05909-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC05912-HDR.webp', b: 'assets/img/room-102-dsc05912-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC05915-HDR.webp', b: 'assets/img/room-102-dsc05915-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC05918-HDR.webp', b: 'assets/img/room-102-dsc05918-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC05921-HDR.webp', b: 'assets/img/room-102-dsc05921-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC06078-HDR.webp', b: 'assets/img/room-102-dsc06078-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC06081-HDR.webp', b: 'assets/img/room-102-dsc06081-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC06084-HDR.webp', b: 'assets/img/room-102-dsc06084-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC06087-HDR.webp', b: 'assets/img/room-102-dsc06087-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC06090-HDR.webp', b: 'assets/img/room-102-dsc06090-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC06096-HDR.webp', b: 'assets/img/room-102-dsc06096-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC06099-HDR.webp', b: 'assets/img/room-102-dsc06099-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC06132-HDR.webp', b: 'assets/img/room-102-dsc06132-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC06135-HDR.webp', b: 'assets/img/room-102-dsc06135-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC06138-HDR.webp', b: 'assets/img/room-102-dsc06138-hdr', w: [800, 1600, 2400] },
        { p: 'Room 102/DSC06141-HDR.webp', b: 'assets/img/room-102-dsc06141-hdr', w: [800, 1600, 2400] },
        { p: 'Room 108/DSC05985-HDR.webp', b: 'assets/img/room-108-dsc05985-hdr', w: [800, 1600, 2400] },
        { p: 'Room 108/DSC05988-HDR.webp', b: 'assets/img/room-108-dsc05991-hdr', w: [800, 1600, 2400] },
        { p: 'Room 108/DSC05994-HDR.webp', b: 'assets/img/room-108-dsc05994-hdr', w: [800, 1600, 2400] },
        { p: 'Room 108/DSC06000-HDR.webp', b: 'assets/img/room-108-dsc06000-hdr', w: [800, 1600, 2400] },
        { p: 'Room 108/DSC06003-HDR.webp', b: 'assets/img/room-108-dsc06003-hdr', w: [800, 1600, 2400] },
        { p: 'Room 108/DSC06006-HDR.webp', b: 'assets/img/room-108-dsc06006-hdr', w: [800, 1600, 2400] },
        { p: 'Room 108/DSC06009-HDR.webp', b: 'assets/img/room-108-dsc06009-hdr', w: [800, 1600, 2400] },
        { p: 'Room 108/DSC06012-HDR.webp', b: 'assets/img/room-108-dsc06012-hdr', w: [800, 1600, 2400] },
        { p: 'Room 108/DSC06015-HDR (1).webp', b: 'assets/img/room-108-dsc06015-hdr-1', w: [800, 1600, 2400] },
        { p: 'Room 108/DSC06018-HDR.webp', b: 'assets/img/room-108-dsc06018-hdr', w: [800, 1600, 2400] },
        { p: 'Room 108/DSC06021-HDR.webp', b: 'assets/img/room-108-dsc06021-hdr', w: [800, 1600, 2400] },
        { p: 'Room 108/DSC06024-HDR.webp', b: 'assets/img/room-108-dsc06024-hdr', w: [800, 1600, 2400] },
        { p: 'Room 108/DSC06060-HDR.webp', b: 'assets/img/room-108-dsc06060-hdr', w: [800, 1600, 2400] },
        { p: 'Room 108/DSC06063-HDR.webp', b: 'assets/img/room-108-dsc06063-hdr', w: [800, 1600, 2400] },
        { p: 'Room 108/DSC06153-HDR.webp', b: 'assets/img/room-108-dsc06153-hdr', w: [800, 1600, 2400] },
        { p: 'Room 108/DSC06159-HDR.webp', b: 'assets/img/room-108-dsc06159-hdr', w: [800, 1600, 2400] },
        { p: 'Room 108/DSC06162-HDR.webp', b: 'assets/img/room-108-dsc06162-hdr', w: [800, 1600, 2400] },
        { p: 'Room 108/DSC06165-HDR.webp', b: 'assets/img/room-108-dsc06165-hdr', w: [800, 1600, 2400] },
        { p: 'Room 108/DSC06168-HDR.webp', b: 'assets/img/room-108-dsc06168-hdr', w: [800, 1600, 2400] },
        { p: 'Room 108/DSC06171-HDR.webp', b: 'assets/img/room-108-dsc06171-hdr', w: [800, 1600, 2400] },
        { p: 'Room 108/DSC06174-HDR.webp', b: 'assets/img/room-108-dsc06174-hdr', w: [800, 1600, 2400] },
        { p: 'Room 108/DSC06234-HDR.webp', b: 'assets/img/room-108-dsc06234-hdr', w: [800, 1600, 2400] },
        { p: 'Room 108/DSC06240-HDR.webp', b: 'assets/img/room-108-dsc06240-hdr', w: [800, 1600, 2400] },
        { p: 'Room 108/DSC06243-HDR.webp', b: 'assets/img/room-108-dsc06243-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06036-HDR.webp', b: 'assets/img/room-109-dsc06036-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06039-HDR.webp', b: 'assets/img/room-109-dsc06039-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06042-HDR.webp', b: 'assets/img/room-109-dsc06042-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06045-HDR.webp', b: 'assets/img/room-109-dsc06045-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06048-HDR.webp', b: 'assets/img/room-109-dsc06048-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06051-HDR.webp', b: 'assets/img/room-109-dsc06051-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06054-HDR.webp', b: 'assets/img/room-109-dsc06054-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06057-HDR.webp', b: 'assets/img/room-109-dsc06057-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06177-HDR.webp', b: 'assets/img/room-109-dsc06177-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06180-HDR.webp', b: 'assets/img/room-109-dsc06180-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06183-HDR.webp', b: 'assets/img/room-109-dsc06183-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06186-HDR.webp', b: 'assets/img/room-109-dsc06186-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06189-HDR.webp', b: 'assets/img/room-109-dsc06189-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06192-HDR.webp', b: 'assets/img/room-109-dsc06192-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06195-HDR.webp', b: 'assets/img/room-109-dsc06195-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06198-HDR.webp', b: 'assets/img/room-109-dsc06198-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06207-HDR.webp', b: 'assets/img/room-109-dsc06207-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06210-HDR.webp', b: 'assets/img/room-109-dsc06210-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06213-HDR.webp', b: 'assets/img/room-109-dsc06213-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06216-HDR.webp', b: 'assets/img/room-109-dsc06216-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06219-HDR.webp', b: 'assets/img/room-109-dsc06219-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06222-HDR.webp', b: 'assets/img/room-109-dsc06222-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06225-HDR.webp', b: 'assets/img/room-109-dsc06225-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06246-HDR.webp', b: 'assets/img/room-109-dsc06246-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06249-HDR.webp', b: 'assets/img/room-109-dsc06249-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06252-HDR.webp', b: 'assets/img/room-109-dsc06252-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06255-HDR.webp', b: 'assets/img/room-109-dsc06255-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06261-HDR.webp', b: 'assets/img/room-109-dsc06261-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06264-HDR.webp', b: 'assets/img/room-109-dsc06264-hdr', w: [800, 1600, 2400] },
        { p: 'Room 109/DSC06267-HDR.webp', b: 'assets/img/room-109-dsc06267-hdr', w: [800, 1600, 2400] }
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

    function card(entry, index) {
        var path = entry.p;
        var top = entry.w[entry.w.length - 1] >= 1600 ? 1600 : entry.w[entry.w.length - 1];
        var srcset = entry.w.map(function (w) { return entry.b + '-' + w + '.webp ' + w + 'w'; }).join(', ');
        var category = classify(path);
        var item = document.createElement('div');
        item.className = 'gallery-item archive-gallery-item ' + (index % 11 === 0 ? 'g-big' : index % 7 === 0 ? 'g-tall' : '');
        item.setAttribute('data-cat', category);
        item.setAttribute('data-index', String(index));
        item.innerHTML = '<div class="gallery-item-inner"><div class="gallery-item-media"><img src="' + entry.b + '-' + top + '.webp" srcset="' + srcset + '" sizes="(max-width: 720px) 100vw, 50vw" alt="' + title(path) + ' at Cloud 9 Hills Resort" loading="lazy" /></div><div class="gallery-item-shade"></div><div class="gallery-item-glow"></div><span class="gallery-item-tag">' + category + '</span><button class="gallery-item-expand" aria-label="View full image"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5"/></svg></button><div class="gallery-item-caption"><h3>' + title(path) + '</h3><p>Cloud 9 Hills Resort archive</p></div></div></div>';
        return item;
    }

    var grid = document.getElementById('galleryGrid');
    if (!grid) return;
    grid.innerHTML = '';
    archiveImages.forEach(function (entry, index) { grid.appendChild(card(entry, index)); });
    var count = document.getElementById('galleryVisibleCount');
    if (count) count.textContent = String(archiveImages.length);
    var counter = document.querySelector('.gallery-hero-count [data-counter]');
    if (counter) counter.setAttribute('data-counter', String(archiveImages.length));
})();
