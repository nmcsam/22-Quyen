// ===== Điều phối 3 phần chính của app =====
let currentSection = 'quyen22';
let tamsoMode = 'tam2so';

const CITTA_GROUP_COLOR = {vonhan:'gray', batthien:'coral', ducgioi_tinhhao:'teal', sacgioi:'blue', vosacgioi:'purple', sieuthe:'green'};
const CETASIKA_GROUP_COLOR = {bienhanh:'gray', toitha:'amber', batthien_bh:'coral', batthien_rieng:'pink', tinhhao_bh:'teal', tietche:'blue', voluong:'purple', tuequyen:'green'};
const CETASIKA_GROUP_LABEL = {bienhanh:'Biến hành (7)', toitha:'Tợ tha - Biệt cảnh (6)', batthien_bh:'Bất thiện Biến hành (4)', batthien_rieng:'Bất thiện Riêng biệt (10)', tinhhao_bh:'Tịnh hảo Biến hành (19)', tietche:'Tiết chế (3)', voluong:'Vô lượng (2)', tuequyen:'Tuệ quyền (1)'};
const CETASIKA_GROUP_ORDER = ['bienhanh','toitha','batthien_bh','batthien_rieng','tinhhao_bh','tietche','voluong','tuequyen'];

function renderSectionSwitch(){
  const sections = [['quyen22','22 Quyền'],['tamso','Tâm ↔ Tâm sở'],['phap','4 Pháp Thực Tính'],['dactinh','Đặc tính · Chức năng']];
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
  } else if(s==='dactinh'){
    document.getElementById('page-title').textContent = 'Đặc tính · Chức năng · Thể hiện · Nhân gần';
    document.getElementById('page-subtitle').textContent = 'Chạm vào một pháp để xem 4 đặc tính (theo Aṭṭhasālinī)';
    grid.style.display='none';
    legend.style.display='none';
    document.getElementById('nav').innerHTML = '';
    renderDacTinhPage();
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

const RUPA_GROUP_COLOR = {daihien:'coral', pasada:'purple', canhgioi:'blue', tinhchat:'pink', dacbiet:'amber', bieutri:'teal', vikara:'green', tuong:'gray'};
const RUPA_GROUP_LABEL = {daihien:'4 Đại hiển (Mahābhūta)', pasada:'5 Thần kinh (Pasāda)', canhgioi:'4 Cảnh giới (Gocara)', tinhchat:'2 Tính chất (Bhāva)', dacbiet:'3 Sắc đặc biệt (Ý vật / Mạng quyền / Vật thực)', bieutri:'2 Biểu tri (Viññatti)', vikara:'3 Sắc đổi (Vikāra)', tuong:'4 Sắc tướng (Lakkhaṇa)'};
const RUPA_GROUP_ORDER = ['daihien','pasada','canhgioi','tinhchat','dacbiet','bieutri','vikara','tuong'];

function renderRupaGridHTML(){
  let html = '';
  for(const g of RUPA_GROUP_ORDER){
    const items = RUPA_DATA.filter(r=>r.nhom===g);
    if(!items.length) continue;
    html += `<div class="group-head">${RUPA_GROUP_LABEL[g]}</div>`;
    html += `<div class="circle-grid">`;
    html += items.map(r=>{
      const color = RUPA_GROUP_COLOR[g]||'gray';
      return `<div class="circle cat-${color}" onclick="openRupaSheet('${r.id}')"><div class="cn">${r.ten}</div></div>`;
    }).join('');
    html += `</div>`;
  }
  return html;
}

function openRupaSheet(id){
  const r = RUPA_DATA.find(x=>x.id===id);
  const html = `
    <div class="sheet-head"><h2>${r.ten}</h2></div>
    <p class="sheet-pali">${r.pali} · ${RUPA_GROUP_LABEL[r.nhom]}</p>
    <div class="sec">
      <div class="sec-label">Giải thích</div>
      <div class="sec-body">${r.giaithich}</div>
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

      <div class="box4 cat-purple"><h3 style="margin-top:0">1. Tâm (Citta)</h3><p>Sự nhận biết đối tượng cảnh — có 89 hoặc 121 tâm tùy cách phân loại. Trong 22 Quyền, Tâm chính là <b>Ý quyền</b>. Xem chi tiết từng tâm ở mục "Tâm ↔ Tâm sở".</p></div>

      <div class="box4 cat-amber"><h3 style="margin-top:0">2. Tâm sở (Cetasika) — 52 pháp</h3><p>Pháp đồng sinh, đồng diệt, đồng cảnh, đồng căn cứ với Tâm — như Thọ, Tưởng, Tư, Tín, Tham, Sân...</p></div>

      <div class="box4 cat-teal"><h3 style="margin-top:0">3. Sắc pháp (Rūpa) — 28 pháp</h3><p>Vật chất do nghiệp, tâm, thời tiết (utu), vật thực (āhāra) tạo ra.</p></div>

      <div class="box4 cat-gray"><h3 style="margin-top:0">4. Níp-bàn (Nibbāna)</h3><p>Thực tại duy nhất không do duyên sinh — không sinh, không diệt, không đồng sinh với pháp nào khác. Không được liệt kê thành nhiều "loại" như 3 pháp trên vì bản chất Níp-bàn chỉ có một duy nhất.</p></div>

      <div class="info-note">Cộng riêng <b>Tâm sở (52) + Sắc pháp (28) = 80 pháp thực tính</b> — đây là các thành phần cụ thể, đa dạng cấu tạo nên danh-sắc của một chúng sinh (không tính Tâm vì bản chất Tâm chỉ là "biết cảnh", không chia nhỏ thêm; không tính Níp-bàn vì không phải pháp hữu vi cấu tạo nên chúng sinh).</div>

      <h3 style="margin-top:22px">52 Tâm sở (Cetasika)</h3>
      <p style="font-size:13px;color:var(--ink-soft);margin-top:-4px">Xem phối hợp với Tâm ở mục "Tâm ↔ Tâm sở → Tâm sở → Tâm". Danh sách đầy đủ:</p>
      ${renderCetasikaGridHTML()}

      <h3 style="margin-top:22px">28 Sắc pháp (Rūpa)</h3>
      <p style="font-size:13px;color:var(--ink-soft);margin-top:-4px">Chạm vào từng sắc pháp để xem giải thích:</p>
      ${renderRupaGridHTML()}
    </div>
  `;
}

renderSectionSwitch();
switchSection('quyen22');

// ===== Phần "Đặc tính · Chức năng · Thể hiện · Nhân gần" (Aṭṭhasālinī) =====

function plainCircleHTML(id, label, opener){
  return `<div class="circle circle-plain" onclick="${opener}('${id}')"><div class="cn">${label}</div></div>`;
}

function renderDacTinhGroup(title, items){
  let html = `<div class="group-head">${title} (${items.length})</div><div class="circle-grid">`;
  html += items.join('');
  html += `</div>`;
  return html;
}

function renderDacTinhPage(){
  const extra = document.getElementById('extra-content');

  const batthienIds = ["si","votam","voquy","phongdat","tham","takien","man","hontram","thuymien","san","tat","lan","hoi","hoainghi"];
  const totthaIds = ["xuc","tho","tuong","tu","nhattam","mangquyen","tacy","tam","tu2","thangiai","can","hy","duc"];
  const tinhhaoIds = ["tin","niem","hiri","ottapa","votham","vosan","hanhxa","antinhthan","antinhtam","khinhthan","khinhtam","nhuthan","nhutam","thichthan","thichtam","thuanthan","thuantam","chanhthan","chanhtam","chanhngu","chanhnghiep","chanhmang","bi","tuyhy","tue"];

  const batthienCircles = batthienIds.map(id=>{
    const c = CETASIKA_DATA.find(x=>x.id===id);
    return plainCircleHTML(id, c.ten, 'openDacTinhCetasika');
  });
  const totthaCircles = totthaIds.map(id=>{
    const c = CETASIKA_DATA.find(x=>x.id===id);
    return plainCircleHTML(id, c.ten, 'openDacTinhCetasika');
  });
  const tinhhaoCircles = tinhhaoIds.map(id=>{
    const c = CETASIKA_DATA.find(x=>x.id===id);
    return plainCircleHTML(id, c.ten, 'openDacTinhCetasika');
  });
  const rupaCircles = RUPA_DATA.map(r=> plainCircleHTML(r.id, r.ten, 'openDacTinhRupa'));
  const vaitroCircles = VAITRO_TAM_DATA.map(v=> plainCircleHTML(v.id, v.ten, 'openDacTinhVaitro'));
  const thoCircles = THO_CHITIET_DATA.map(t=> plainCircleHTML(t.id, t.ten, 'openDacTinhTho'));

  extra.innerHTML = `
    <p class="info-note" style="margin-bottom:12px">Dữ liệu trích từ Chú giải Bộ Pháp Tụ (Aṭṭhasālinī). Mỗi pháp có 4 đặc tính cố định: <b>Đặc tính (Lakkhaṇā)</b> — nét riêng để nhận diện; <b>Chức năng (Rasā)</b> — nhiệm vụ nó thực hiện; <b>Thể hiện (Paccupaṭṭhānā)</b> — cách nó hiện ra trước tâm hành giả; <b>Nhân gần (Padaṭṭhānā)</b> — điều kiện gần nhất làm nó sinh khởi.</p>

    ${renderDacTinhGroup('14 Tâm sở Bất thiện', batthienCircles)}
    ${renderDacTinhGroup('13 Tâm sở Tợ tha (Biến hành + Biệt cảnh)', totthaCircles)}
    ${renderDacTinhGroup('25 Tâm sở Tịnh hảo', tinhhaoCircles)}
    ${renderDacTinhGroup('28 Sắc pháp', rupaCircles)}
    ${renderDacTinhGroup('14 Vai trò của Tâm (theo phận sự trong lộ trình)', vaitroCircles)}
    ${renderDacTinhGroup('5 Thọ chi tiết (Lạc/Khổ/Hỷ/Ưu/Xả)', thoCircles)}
    <p class="info-note">Tri giác (Saññā/Tưởng) đã có ở nhóm "13 Tâm sở Tợ tha" phía trên — Chú giải mô tả giống hệt nhau ở cả hai nơi (Bảng Thọ-Tưởng và Bảng Tợ tha).</p>
  `;
}

function attrSheetHTML(headTitle, headSub, dt, cn, th, ng){
  return `
    <div class="sheet-head"><h2>${headTitle}</h2></div>
    <p class="sheet-pali">${headSub}</p>
    <div class="attr-block attr-dt"><div class="attr-label">Đặc tính (Lakkhaṇā)</div><div class="sec-body">${dt}</div></div>
    <div class="attr-block attr-cn"><div class="attr-label">Chức năng (Rasā)</div><div class="sec-body">${cn}</div></div>
    <div class="attr-block attr-th"><div class="attr-label">Thể hiện (Paccupaṭṭhānā)</div><div class="sec-body">${th}</div></div>
    <div class="attr-block attr-ng"><div class="attr-label">Nhân gần (Padaṭṭhānā)</div><div class="sec-body">${ng}</div></div>
  `;
}

function showAttrSheet(html){
  document.getElementById('sheet-content').innerHTML = html;
  document.getElementById('sheet').classList.add('show');
  document.getElementById('sheet-backdrop').classList.add('show');
}

function openDacTinhCetasika(id){
  const c = CETASIKA_DATA.find(x=>x.id===id);
  const a = DACTINH_DATA[id];
  showAttrSheet(attrSheetHTML(c.ten, c.pali, a.dt, a.cn, a.th, a.ng));
}

function openDacTinhRupa(id){
  const r = RUPA_DATA.find(x=>x.id===id);
  const a = DACTINH_DATA[id];
  showAttrSheet(attrSheetHTML(r.ten, r.pali, a.dt, a.cn, a.th, a.ng));
}

function openDacTinhVaitro(id){
  const v = VAITRO_TAM_DATA.find(x=>x.id===id);
  showAttrSheet(attrSheetHTML(v.ten, v.pali, v.dt, v.cn, v.th, v.ng));
}

function openDacTinhTho(id){
  const t = THO_CHITIET_DATA.find(x=>x.id===id);
  showAttrSheet(attrSheetHTML(t.ten, t.pali, t.dt, t.cn, t.th, t.ng));
}
