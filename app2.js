// ===== Điều phối 3 phần chính của app =====
let currentSection = 'quyen22';
let tamsoMode = 'tam2so';

const CITTA_GROUP_COLOR = {vonhan:'gray', batthien:'coral', ducgioi_tinhhao:'teal', sacgioi:'blue', vosacgioi:'purple', sieuthe:'green'};
const CETASIKA_GROUP_COLOR = {bienhanh:'gray', toitha:'amber', batthien_bh:'coral', batthien_rieng:'pink', tinhhao_bh:'teal', tietche:'blue', voluong:'purple', tuequyen:'green'};
const CETASIKA_GROUP_LABEL = {bienhanh:'Biến hành (7)', toitha:'Tợ tha - Biệt cảnh (6)', batthien_bh:'Bất thiện Biến hành (4)', batthien_rieng:'Bất thiện Riêng biệt (10)', tinhhao_bh:'Tịnh hảo Biến hành (19)', tietche:'Tiết chế (3)', voluong:'Vô lượng (2)', tuequyen:'Tuệ quyền (1)'};
const CETASIKA_GROUP_ORDER = ['bienhanh','toitha','batthien_bh','batthien_rieng','tinhhao_bh','tietche','voluong','tuequyen'];

function renderSectionSwitch(){
  const sections = [['quyen22','22 Quyền'],['tamso','Tâm ↔ Tâm sở'],['dactinh','Đặc tính · Chức năng']];
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

function attrSheetHTML(headTitle, headSub, item){
  return `
    <div class="sheet-head"><h2>${headTitle}</h2></div>
    <p class="sheet-pali">${headSub}</p>
    <div class="attr-block attr-dt"><div class="attr-label">Đặc tính (Lakkhaṇā)</div><div class="sec-body">${item.dt}</div><div class="attr-pali">${item.dtp||''}</div></div>
    <div class="attr-block attr-cn"><div class="attr-label">Chức năng (Rasā)</div><div class="sec-body">${item.cn}</div><div class="attr-pali">${item.cnp||''}</div></div>
    <div class="attr-block attr-th"><div class="attr-label">Thể hiện (Paccupaṭṭhānā)</div><div class="sec-body">${item.th}</div><div class="attr-pali">${item.thp||''}</div></div>
    <div class="attr-block attr-ng"><div class="attr-label">Nhân gần (Padaṭṭhānā)</div><div class="sec-body">${item.ng}</div><div class="attr-pali">${item.ngp||''}</div></div>
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
  showAttrSheet(attrSheetHTML(c.ten, c.pali, a));
}

function openDacTinhRupa(id){
  const r = RUPA_DATA.find(x=>x.id===id);
  const a = DACTINH_DATA[id];
  showAttrSheet(attrSheetHTML(r.ten, r.pali, a));
}

function openDacTinhVaitro(id){
  const v = VAITRO_TAM_DATA.find(x=>x.id===id);
  showAttrSheet(attrSheetHTML(v.ten, v.pali, v));
}

function openDacTinhTho(id){
  const t = THO_CHITIET_DATA.find(x=>x.id===id);
  showAttrSheet(attrSheetHTML(t.ten, t.pali, t));
}
