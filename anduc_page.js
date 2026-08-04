// ===== Trang "Ân Đức Tam Bảo" =====
let anducTab = 'phat';

function switchAnDucTab(k){
  anducTab = k;
  try{ localStorage.setItem('quyen22-anduc-tab', k); }catch(e){}
  renderAnDucPage();
  document.getElementById('main').scrollTop = 0;
}

function renderAnDucPage(){
  try{ anducTab = localStorage.getItem('quyen22-anduc-tab') || anducTab; }catch(e){}
  if(!ANDUC_DATA[anducTab]) anducTab = 'phat';
  const extra = document.getElementById('extra-content');
  const TABS = [['phat','Ân Đức Phật','🪷'],['phap','Ân Đức Pháp','📜'],['tang','Ân Đức Tăng','🧘']];
  const G = ANDUC_DATA[anducTab];

  const tabbar = `<div class="ad-tabs">` + TABS.map(([k,label,ico])=>
      `<button class="ad-tab ${k===anducTab?'on':''}" onclick="switchAnDucTab('${k}')"><span>${ico}</span>${label}</button>`
    ).join('') + `</div>`;

  const list = G.items.map((d,i)=>`
    <div class="ad-item">
      <div class="ad-no">${d.n}</div>
      <div class="ad-body">
        <div class="ad-name">${d.paliUp}</div>
        <div class="ad-vi">${d.vi}</div>
        <div class="ad-short">${d.short}</div>
      </div>
      <button class="ad-more" onclick="openAnDucSheet('${anducTab}',${i})">chi tiết ›</button>
    </div>`).join('');

  extra.innerHTML = `
    ${tabbar}
    <div class="ad-kinh"><div class="ad-kinh-lbl">Câu tụng niệm</div>${G.kinh}</div>
    <div class="group-head">${G.title} · ${G.pali}</div>
    <div class="ad-list">${list}</div>
    ${G.note ? `<div class="group-head">Ghi chú thêm</div><div class="ad-note ad-detail">${G.note}</div>` : ''}
    <p class="info-note" style="margin-top:12px">Chạm <b>chi tiết ›</b> ở mỗi ân đức để xem phần giải thích đầy đủ. ${G.nguon||''}</p>
  `;
}

function openAnDucSheet(group, i){
  const G = ANDUC_DATA[group];
  const d = G.items[i];
  const prev = i>0 ? `<button class="qbtn" onclick="openAnDucSheet('${group}',${i-1})">‹ ${G.items[i-1].paliUp}</button>` : '';
  const next = i<G.items.length-1 ? `<button class="qbtn" onclick="openAnDucSheet('${group}',${i+1})">${G.items[i+1].paliUp} ›</button>` : '';
  showAttrSheet(`
    <div class="sheet-head"><span class="num">(${d.n})</span><h2>${d.paliUp}</h2></div>
    <p class="sheet-pali">${d.pali} · ${d.vi}</p>
    <div class="sec"><div class="sec-label">Nội dung</div><div class="sec-body ad-sheet-short">${d.short}</div></div>
    <div class="sec" style="margin-top:12px"><div class="sec-label">Giải thích chi tiết</div><div class="sec-body ad-detail">${d.detail}</div></div>
    <div class="ad-nav">${prev}${next}</div>
  `);
  document.getElementById('sheet-content').scrollTop = 0;
}
