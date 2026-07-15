// ===== Điều phối 3 phần chính của app =====
let currentSection = 'quyen22';
let tamsoMode = 'tam2so';

const CITTA_GROUP_COLOR = {vonhan:'gray', batthien:'coral', ducgioi_tinhhao:'teal', sacgioi:'blue', vosacgioi:'purple', sieuthe:'green'};
const CETASIKA_GROUP_COLOR = {bienhanh:'gray', toitha:'amber', batthien_bh:'coral', batthien_rieng:'pink', tinhhao_bh:'teal', tietche:'blue', voluong:'purple', tuequyen:'green'};
const CETASIKA_GROUP_LABEL = {bienhanh:'Biến hành (7)', toitha:'Tợ tha - Biệt cảnh (6)', batthien_bh:'Bất thiện Biến hành (4)', batthien_rieng:'Bất thiện Riêng biệt (10)', tinhhao_bh:'Tịnh hảo Biến hành (19)', tietche:'Tiết chế (3)', voluong:'Vô lượng (2)', tuequyen:'Tuệ quyền (1)'};
const CETASIKA_GROUP_ORDER = ['bienhanh','toitha','batthien_bh','batthien_rieng','tinhhao_bh','tietche','voluong','tuequyen'];

function renderSectionSwitch(){
  const sections = [['quyen22','22 Quyền'],['tamso','Tâm ↔ Tâm sở'],['phap','4 Pháp Thực Tính']];
  document.getElementById('section-switch').innerHTML = sections.map(([k,label])=>
    `<button class="${k===currentSection?'active':''}" onclick="switchSection('${k}')">${label}</button>`
  ).join('');
}

function switchSection(s){
  currentSection = s;
  renderSectionSwitch();
  closeSheet();
  const grid = document.getElementById('grid');
  const legend = document.getElementById('legend');
  const extra = document.getElementById('extra-content');
  if(s==='quyen22'){
    document.getElementById('page-title').textContent = '22 Quyền — Bāvīsatindriya';
    document.getElementById('page-subtitle').textContent = 'Chạm vào một quyền để xem chi tiết';
    extra.innerHTML = '';
    grid.style.display='grid';
    legend.style.display='flex';
    renderQuyenNav();
    renderQuyenGrid();
  } else if(s==='tamso'){
    document.getElementById('page-title').textContent = 'Tâm ↔ Tâm sở';
    document.getElementById('page-subtitle').textContent = 'Chạm vào một vòng tròn để xem phối hợp';
    grid.style.display='none';
    legend.style.display='none';
    renderTamSoNav();
    renderTamSoGrid();
  } else if(s==='phap'){
    document.getElementById('page-title').textContent = '4 Pháp Thực Tính (Paramattha)';
    document.getElementById('page-subtitle').textContent = 'Nền tảng phân loại mọi thực tại';
    grid.style.display='none';
    legend.style.display='none';
    document.getElementById('nav').innerHTML = '';
    renderPhapPage();
  }
  document.getElementById('main').scrollTop = 0;
}

function renderTamSoNav(){
  const nav = document.getElementById('nav');
  nav.innerHTML = `
    <button class="${tamsoMode==='tam2so'?'active':''}" onclick="switchTamSoMode('tam2so')"><span class="ico">◉</span>Tâm → Tâm sở</button>
    <button class="${tamsoMode==='so2tam'?'active':''}" onclick="switchTamSoMode('so2tam')"><span class="ico">◎</span>Tâm sở → Tâm</button>
  `;
}

function switchTamSoMode(m){
  tamsoMode = m;
  renderTamSoNav();
  renderTamSoGrid();
  document.getElementById('main').scrollTop = 0;
}

function renderTamSoGrid(){
  const extra = document.getElementById('extra-content');
  extra.innerHTML = tamsoMode==='tam2so' ? renderCittaGridHTML() : renderCetasikaGridHTML();
}

function renderCittaGridHTML(){
  const groups = [];
  for(const c of CITTA_DATA){ if(!groups.includes(c.group)) groups.push(c.group); }
  let html = `<p class="info-note" style="margin-bottom:12px">121 tâm, chia theo 6 nhóm lớn. Chạm vào một tâm để xem các tâm sở phối hợp cùng.</p>`;
  for(const g of groups){
    const items = CITTA_DATA.filter(c=>c.group===g);
    html += `<div class="group-head">${items[0].groupLabel} (${items.length})</div>`;
    html += `<div class="circle-grid">`;
    html += items.map(c=>{
      const color = CITTA_GROUP_COLOR[g]||'gray';
      return `<div class="circle cat-${color}" onclick="openCittaSheet(${c.id})"><div class="cn">${c.name}</div></div>`;
    }).join('');
    html += `</div>`;
  }
  return html;
}

function renderCetasikaGridHTML(){
  let html = `<p class="info-note" style="margin-bottom:12px">52 tâm sở, chia theo 8 nhóm chuẩn. Chạm vào một tâm sở để xem các tâm phối hợp cùng.</p>`;
  for(const g of CETASIKA_GROUP_ORDER){
    const items = CETASIKA_DATA.filter(c=>c.nhom===g);
    if(!items.length) continue;
    html += `<div class="group-head">${CETASIKA_GROUP_LABEL[g]}</div>`;
    html += `<div class="circle-grid">`;
    html += items.map(c=>{
      const color = CETASIKA_GROUP_COLOR[g]||'gray';
      return `<div class="circle cat-${color}" onclick="openCetasikaSheet('${c.id}')"><div class="cn">${c.ten}</div><div class="cp">${c.pali}</div></div>`;
    }).join('');
    html += `</div>`;
  }
  return html;
}

function openCittaSheet(id){
  const c = CITTA_DATA.find(x=>x.id===id);
  const items = c.ceta.map(cid=>{
    const ces = CETASIKA_DATA.find(x=>x.id===cid);
    if(!ces) return '';
    const ccolor = CETASIKA_GROUP_COLOR[ces.nhom]||'gray';
    return `<div class="combo-item"><div class="combo-badge cat-${ccolor}">${ces.ten[0]}</div><div class="combo-text"><span class="cname">${ces.ten}</span> <span class="cpali">(${ces.pali})</span></div></div>`;
  }).join('');
  const html = `
    <div class="sheet-head"><h2>${c.name}</h2></div>
    <p class="sheet-pali">${c.groupLabel} · Cảm thọ: ${c.vedanaLabel}</p>
    <div class="sec">
      <div class="sec-label">Tổng số tâm sở phối hợp</div>
      <div class="sec-body"><b>${c.ceta.length} tâm sở</b> đồng sinh trong sát-na này.</div>
    </div>
    ${c.note ? `<div class="info-note"><b>Trường hợp đặc biệt:</b> ${c.note}</div>` : ''}
    <div class="sec" style="margin-top:14px">
      <div class="sec-label">Danh sách Tâm sở phối hợp</div>
      <div class="combo-list">${items}</div>
    </div>
  `;
  document.getElementById('sheet-content').innerHTML = html;
  document.getElementById('sheet').classList.add('show');
  document.getElementById('sheet-backdrop').classList.add('show');
}

function openCetasikaSheet(id){
  const ces = CETASIKA_DATA.find(x=>x.id===id);
  const matching = CITTA_DATA.filter(c=>c.ceta.includes(id));
  const groupsPresent = [];
  for(const m of matching){ if(!groupsPresent.includes(m.group)) groupsPresent.push(m.group); }
  let listHtml = '';
  for(const g of groupsPresent){
    const sub = matching.filter(m=>m.group===g);
    const color = CITTA_GROUP_COLOR[g]||'gray';
    listHtml += `<div class="group-head" style="margin-top:10px">${sub[0].groupLabel} (${sub.length})</div>`;
    listHtml += sub.map(m=>
      `<div class="combo-item"><div class="combo-badge cat-${color}">●</div><div class="combo-text"><span class="cname">${m.name}</span></div></div>`
    ).join('');
  }
  const html = `
    <div class="sheet-head"><h2>${ces.ten}</h2></div>
    <p class="sheet-pali">${ces.pali}</p>
    <div class="sec">
      <div class="sec-label">Giải thích / Vì sao phối hợp được, trường hợp đặc biệt</div>
      <div class="sec-body">${ces.giaithich}</div>
    </div>
    ${ces.quyluat ? `<div class="info-note"><b>Công thức tính số tâm (${ces.socount||matching.length} tâm):</b> ${ces.quyluat}</div>` : ''}
    <div class="sec" style="margin-top:14px">
      <div class="sec-label">Phối hợp với ${matching.length} tâm</div>
      <div class="combo-list">${listHtml}</div>
    </div>
  `;
  document.getElementById('sheet-content').innerHTML = html;
  document.getElementById('sheet').classList.add('show');
  document.getElementById('sheet-backdrop').classList.add('show');
}

function renderPhapPage(){
  const extra = document.getElementById('extra-content');
  extra.innerHTML = `
    <div class="article">
      <p>Toàn bộ thực tại theo Vi Diệu Pháp được quy về <b>4 Pháp Thực Tính (Paramattha Dhamma)</b> — những gì có thật theo nghĩa chân đế, khác với khái niệm chế định (paññatti) như "người", "cái bàn"...</p>

      <div class="box4 cat-purple"><h3 style="margin-top:0">1. Tâm (Citta)</h3><p>Sự nhận biết đối tượng cảnh — có 89 hoặc 121 tâm tùy cách phân loại (mở rộng theo 5 tầng thiền). Trong 22 Quyền, Tâm chính là <b>Ý quyền (Manindriya)</b> — quyền duy nhất có chi pháp là Tâm. Đây cũng là đối tượng của mục "Tâm → Tâm sở" bạn vừa khám phá.</p></div>

      <div class="box4 cat-amber"><h3 style="margin-top:0">2. Tâm sở (Cetasika)</h3><p>52 pháp đồng sinh, đồng diệt, đồng cảnh, đồng căn cứ với Tâm — như Thọ, Tưởng, Tư, Tín, Tham, Sân... Phần lớn trong 14 Danh quyền có chi pháp là Tâm sở — ví dụ Tín quyền = Sở hữu tín, Tuệ quyền = Sở hữu trí tuệ.</p></div>

      <div class="box4 cat-teal"><h3 style="margin-top:0">3. Sắc pháp (Rūpa)</h3><p>28 loại sắc — vật chất do nghiệp, tâm, thời tiết (utu), vật thực (āhāra) tạo ra. Trong 22 Quyền, 7 Sắc quyền (Nhãn, Nhĩ, Tỷ, Thiệt, Thân, Nữ, Nam) và phần Sắc mạng quyền của Mạng quyền đều thuộc nhóm này.</p></div>

      <div class="box4 cat-gray"><h3 style="margin-top:0">4. Níp-bàn (Nibbāna)</h3><p>Thực tại duy nhất không do duyên sinh (vô vi, asaṅkhata) — không sinh, không diệt, không đồng sinh với bất kỳ pháp nào khác. Là đối tượng của Tâm và Tâm sở Siêu thế (Đạo, Quả), nhưng tự nó không phải là Tâm hay Tâm sở. <b>Không quyền nào trong 22 Quyền mang chi pháp là Níp-bàn</b> — vì Níp-bàn không phải một "năng lực cai quản" (indriya) mà là mục tiêu được 3 quyền Siêu thế (Tri vị tri, Tri dĩ tri, Tri cụ tri) hướng đến.</p></div>

      <h3>Vì sao Tâm và Tâm sở luôn phối hợp với nhau?</h3>
      <p>Tâm và Tâm sở là 2 trong 4 Pháp Thực Tính, và theo định nghĩa, Tâm sở (Cetasika) <b>bắt buộc</b> phải hội đủ 4 đặc tính đồng sinh (ekuppāda), đồng diệt (ekanirodha), đồng cảnh (ekārammaṇa), đồng căn cứ (ekavatthuka) với Tâm mà nó phối hợp — đây chính là lý do gốc rễ giải thích mọi trường hợp phối hợp bạn đã xem ở mục "Tâm ↔ Tâm sở". Sắc pháp và Níp-bàn thì không bị ràng buộc theo cách này: Sắc pháp có thể tồn tại độc lập không cần Tâm (như ở cõi Vô tưởng), còn Níp-bàn hoàn toàn không đồng sinh với gì cả — chỉ được làm đối tượng để Tâm nhận biết.</p>

      <div class="info-note">Mẹo nhớ: Tâm + Tâm sở luôn đi cùng nhau như bóng với hình trong một sát-na — Sắc pháp có thể có mặt độc lập — Níp-bàn thì đứng ngoài mọi sự sinh diệt, chỉ được biết đến chứ không tham gia phối hợp.</div>
    </div>
  `;
}

renderSectionSwitch();
switchSection('quyen22');
