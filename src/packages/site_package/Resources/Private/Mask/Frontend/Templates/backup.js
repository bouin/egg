    (function () {
    const HIGHLIGHT = '#CBCEC8';

    document.querySelectorAll('.apartment-module').forEach(function (section) {
    const tableWrap = section.querySelector('.apartment-module__scroll');
    if (!tableWrap) return;

    /* ── Highlight ── */
    function getSvgShape(key) {
    return section.querySelector('svg [data-unit-key="' + CSS.escape(key) + '"]');
}
    function getTableRow(key) {
    return section.querySelector('tr[data-unit-key="' + CSS.escape(key) + '"]');
}
    function highlight(key, on) {
    var shape = getSvgShape(key);
    var row   = getTableRow(key);

    if (shape) {
    shape.querySelectorAll('polygon,path,rect').forEach(function (el) {
    el.style.fill = on ? HIGHLIGHT : '';
});
}

    if (row) {
    row.style.backgroundColor = on ? HIGHLIGHT : '';
}
}

    section.querySelectorAll('tr[data-unit-key]').forEach(function (row) {
    row.addEventListener('mouseenter', function () {
    highlight(row.dataset.unitKey, true);
});
    row.addEventListener('mouseleave', function () {
    highlight(row.dataset.unitKey, false);
});
});

    section.querySelectorAll('svg [data-unit-key]').forEach(function (g) {
    g.style.cursor = 'pointer';

    g.addEventListener('mouseenter', function () {
    highlight(g.dataset.unitKey, true);
});
    g.addEventListener('mouseleave', function () {
    highlight(g.dataset.unitKey, false);
});
});

    /* ── Scroll helpers ── */
    var sticky = section.querySelector('.apartment-module__sticky');

    function shouldHijack() {
    if (!sticky) return false;
    var rect = sticky.getBoundingClientRect();
    return rect.top <= 0 && rect.bottom > 100;
}

    function tableAtBottom() {
    return Math.ceil(tableWrap.scrollTop + tableWrap.clientHeight) >= tableWrap.scrollHeight - 1;
}

    function tableAtTop() {
    return tableWrap.scrollTop <= 2;
}

    /* ── Wheel na dokumencie ── */
    document.addEventListener('wheel', function (e) {
    if (!shouldHijack()) return;
    if (tableWrap.matches(':hover')) return;

    var down = e.deltaY > 0;

    if (down && !tableAtBottom()) {
    e.preventDefault();
    tableWrap.scrollBy({
    top: Math.min(e.deltaY, 80),
    behavior: 'auto'
});
    return;
}

    if (!down && !tableAtTop()) {
    e.preventDefault();
    tableWrap.scrollBy({
    top: Math.max(e.deltaY, -80),
    behavior: 'auto'
});
    return;
}

    // na końcu NIE blokujemy — strona scrolluje normalnie
}, { passive: false });

    /* ── Wheel na tableWrap ── */
    tableWrap.addEventListener('wheel', function (e) {
    if (!shouldHijack()) return;

    var down = e.deltaY > 0;

    if (down && !tableAtBottom()) {
    e.preventDefault();
    e.stopPropagation();
    tableWrap.scrollBy({
    top: Math.min(e.deltaY, 80),
    behavior: 'auto'
});
    return;
}

    if (!down && !tableAtTop()) {
    e.preventDefault();
    e.stopPropagation();
    tableWrap.scrollBy({
    top: Math.max(e.deltaY, -80),
    behavior: 'auto'
});
    return;
}

    // KLUCZOWE:
    // nie robimy nic → przeglądarka scrolluje stronę dalej
}, { passive: false });

    /* ── Touch ── */
    var lastTouchY = 0;

    document.addEventListener('touchstart', function (e) {
    lastTouchY = e.touches[0].clientY;
}, { passive: true });

    document.addEventListener('touchmove', function (e) {
    if (!shouldHijack()) return;

    var currentY = e.touches[0].clientY;
    var delta = lastTouchY - currentY;
    lastTouchY = currentY;

    var down = delta > 0;

    if (down && !tableAtBottom()) {
    e.preventDefault();
    tableWrap.scrollBy({
    top: Math.min(delta, 80),
    behavior: 'auto'
});
    return;
}

    if (!down && !tableAtTop()) {
    e.preventDefault();
    tableWrap.scrollBy({
    top: Math.max(delta, -80),
    behavior: 'auto'
});
    return;
}

    // na końcach pozwalamy stronie scrollować
}, { passive: false });

    /* ── Modal ── */
    section.querySelectorAll('.apartment-request-trigger').forEach(function (btn) {
    btn.addEventListener('click', function () {
    var modal = section.querySelector('.apartment-modal');
    if (!modal) return;

    modal.querySelector('.apartment-modal-hidden-number').value =
    btn.dataset.apartmentNumber || '';

    modal.querySelector('.apartment-modal-hidden-floor').value =
    btn.dataset.apartmentFloor || '';

    modal.querySelector('.apartment-modal-hidden-rooms').value =
    btn.dataset.apartmentRooms || '';

    modal.querySelector('.apartment-modal-title').textContent =
    'Wohnung ' + (btn.dataset.apartmentNumber || '');

    modal.classList.remove('hidden');
    modal.classList.add('flex');
});
});

    var closeBtn = section.querySelector('.apartment-modal-close');
    if (closeBtn) {
    closeBtn.addEventListener('click', function () {
    var modal = section.querySelector('.apartment-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
});
}
});
})();
