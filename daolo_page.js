// ===== Trang "Đạo Lộ Tu Tập" — tháp Thất Tịnh =====

function renderDaoLoPage(){
  const extra = document.getElementById('extra-content');
  const T = DAOLO.tang;

  // Tháp: xây từ trên xuống (tầng 7 hẹp nhất ở trên)
  let thap = '<div class="dl-thap">';

  // đỉnh: Nibbāna
  thap += `<button class="dl-nibbana" onclick="openDaoLoSheet('dinh')">
      <span class="dl-nib-halo"></span>
      <span class="dl-nib-core">Nibbāna</span>
    </button>
    <div class="dl-spire"></div>`;

  // các tầng, từ 7 xuống 1
  const widths = {7:52, 6:62, 5:70, 4:78, 3:85, 2:93, 1:100};
  for(let i=6;i>=0;i--){
    const t = T[i];
    thap += `<button class="dl-tier dl-${t.mau}" style="width:${widths[t.id]}%" onclick="openDaoLoSheet(${t.id})">
        <span class="dl-tier-no">${t.id}</span>
        <span class="dl-tier-txt">
          <span class="dl-tier-ten">${t.ten}</span>
          <span class="dl-tier-pali">${t.pali}</span>
        </span>
        ${t.tue?`<span class="dl-tier-tue">${t.tue}</span>`:''}
      </button>`;
  }
  thap += '<div class="dl-be"></div></div>';

  // dải "ba đạt tri" + cột giữa
  const datri = DAOLO.datri.map((d,i)=>
    `<button class="dl-chip" onclick="openDaoLoAux('datri',${i})">
      <b>${d.ten}</b><span>${d.pali}</span></button>`).join('');
  const cot = DAOLO.cotgiua.map((d,i)=>
    `<button class="dl-chip dl-chip-t" onclick="openDaoLoAux('cotgiua',${i})">
      <b>${d.ten}</b><span>${d.pali} · ${d.pham}</span></button>`).join('');

  extra.innerHTML = `
    <div class="dl-head">
      <div class="dl-head-t">Nhóm Tám Thánh Đạo đưa đến sự dứt khổ</div>
      <div class="dl-head-s">Thất Tịnh &middot; 16 Tuệ Minh Sát &middot; Nibbāna</div>
    </div>
    ${thap}
    <p class="info-note" style="margin:10px 0 4px">Chạm vào <b>từng tầng tháp</b> để xem các bước tu tập trong tầng đó.</p>
    <div class="group-head">Hai phần tu tiến</div>
    <div class="dl-chips">${cot}</div>
    <div class="group-head">Ba đạt tri (pariññā)</div>
    <div class="dl-chips">${datri}</div>
    <p class="info-note" style="margin-top:12px">${DAOLO.nguon}</p>
  `;
}

function openDaoLoSheet(id){
  if(id === 'dinh'){
    const d = DAOLO.dinh;
    showAttrSheet(`
      <div class="sheet-head"><h2>${d.ten}</h2></div>
      <p class="sheet-pali">${d.vi}</p>
      <div class="sec"><div class="sec-body dl-body">${d.body}</div></div>`);
    document.getElementById('sheet-content').scrollTop = 0;
    return;
  }
  const t = DAOLO.tang.find(x=>x.id===id);
  const items = t.muc.map((m,i)=>`
    <button class="dl-step" onclick="openDaoLoStep(${id},${i})">
      <span class="dl-step-n">${i+1}</span>
      <span class="dl-step-b">
        <span class="dl-step-ten">${m.ten}</span>
        ${m.pali?`<span class="dl-step-pali">${m.pali}</span>`:''}
        ${m.ghi?`<span class="dl-step-ghi">${m.ghi}</span>`:''}
      </span>
      <span class="dl-step-go">›</span>
    </button>`).join('');

  const prev = id>1 ? `<button class="qbtn" onclick="openDaoLoSheet(${id-1})">‹ ${DAOLO.tang[id-2].ten}</button>` : '';
  const next = id<7 ? `<button class="qbtn" onclick="openDaoLoSheet(${id+1})">${DAOLO.tang[id].ten} ›</button>` : '';

  showAttrSheet(`
    <div class="sheet-head"><span class="num">(${t.id})</span><h2>${t.ten}</h2></div>
    <p class="sheet-pali">${t.pali}</p>
    <div class="dl-badge dl-${t.mau}-b">${t.phu}</div>
    <div class="sec"><div class="sec-body dl-body">${t.body}</div></div>
    ${t.datri?`<div class="dl-datri">→ ${t.datri}</div>`:''}
    <div class="sec" style="margin-top:12px"><div class="sec-label">Các bước tu tập trong tầng này</div>
      <div class="dl-steps">${items}</div></div>
    <div class="ad-nav">${prev}${next}</div>
  `);
  document.getElementById('sheet-content').scrollTop = 0;
}

function openDaoLoStep(tangId, i){
  const t = DAOLO.tang.find(x=>x.id===tangId);
  const m = t.muc[i];
  const prev = i>0 ? `<button class="qbtn" onclick="openDaoLoStep(${tangId},${i-1})">‹ trước</button>` : '';
  const next = i<t.muc.length-1 ? `<button class="qbtn" onclick="openDaoLoStep(${tangId},${i+1})">tiếp ›</button>` : '';
  showAttrSheet(`
    <button class="dl-back" onclick="openDaoLoSheet(${tangId})">‹ ${t.ten}</button>
    <div class="sheet-head"><h2>${m.ten}</h2></div>
    ${m.pali?`<p class="sheet-pali">${m.pali}${m.ghi?' · '+m.ghi:''}</p>`:(m.ghi?`<p class="sheet-pali">${m.ghi}</p>`:'')}
    <div class="sec"><div class="sec-body dl-body">${m.body}</div></div>
    <div class="ad-nav">${prev}${next}</div>
  `);
  document.getElementById('sheet-content').scrollTop = 0;
}

function openDaoLoAux(kind, i){
  const d = DAOLO[kind][i];
  showAttrSheet(`
    <div class="sheet-head"><h2>${d.ten}</h2></div>
    <p class="sheet-pali">${d.pali}${d.tang?' · '+d.tang:''}${d.pham?' · '+d.pham:''}</p>
    <div class="sec"><div class="sec-body dl-body">${d.body}</div></div>`);
  document.getElementById('sheet-content').scrollTop = 0;
}
