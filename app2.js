// ===== Điều phối 3 phần chính của app =====
let currentSection = 'quyen22';
let tamsoMode = 'tam2so';

const CITTA_GROUP_COLOR = {vonhan:'gray', batthien:'coral', ducgioi_tinhhao:'teal', sacgioi:'blue', vosacgioi:'purple', sieuthe:'green'};
const CETASIKA_GROUP_COLOR = {bienhanh:'gray', toitha:'amber', batthien_bh:'coral', batthien_rieng:'pink', tinhhao_bh:'teal', tietche:'blue', voluong:'purple', tuequyen:'green'};
const CETASIKA_GROUP_LABEL = {bienhanh:'Biến hành (7)', toitha:'Tợ tha - Biệt cảnh (6)', batthien_bh:'Bất thiện Biến hành (4)', batthien_rieng:'Bất thiện Riêng biệt (10)', tinhhao_bh:'Tịnh hảo Biến hành (19)', tietche:'Tiết chế (3)', voluong:'Vô lượng (2)', tuequyen:'Tuệ quyền (1)'};
const CETASIKA_GROUP_ORDER = ['bienhanh','toitha','batthien_bh','batthien_rieng','tinhhao_bh','tietche','voluong','tuequyen'];

function renderSectionSwitch(){
  const sections = [['quyen22','22 Quyền'],['tamso','Tâm ↔ Tâm sở'],['dactinh','Đặc tính · Chức năng'],['canh','21 Cảnh']];
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
  const vp = document.getElementById('viewport-meta');
  if(s==='tamso'){
    vp.setAttribute('content','width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes');
  } else {
    vp.setAttribute('content','width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
  }
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
    document.getElementById('page-subtitle').textContent = 'Chạm vào một ô để xem số lượng phối hợp';
    grid.style.display='none';
    legend.style.display='none';
    document.getElementById('nav').innerHTML = '';
    renderTamSoPage();
  } else if(s==='dactinh'){
    document.getElementById('page-title').textContent = 'Đặc tính · Chức năng · Thể hiện · Nhân gần';
    document.getElementById('page-subtitle').textContent = 'Chạm vào một pháp để xem 4 đặc tính (theo Aṭṭhasālinī)';
    grid.style.display='none';
    legend.style.display='none';
    document.getElementById('nav').innerHTML = '';
    renderDacTinhPage();
  } else if(s==='canh'){
    document.getElementById('page-title').textContent = '21 Cảnh (Ārammaṇa)';
    document.getElementById('page-subtitle').textContent = 'Chạm vào một cảnh để xem những tâm biết cảnh ấy';
    grid.style.display='none';
    legend.style.display='none';
    document.getElementById('nav').innerHTML = '';
    renderCanhPage();
  }
  document.getElementById('main').scrollTop = 0;
}

const VEDANA_COLOR = {kho:'#232323', lac:'#eec22b', uu:'#7a3030', hy:'#d13b3b', xa:'#2f7d46'};
const VEDANA_ORDER = ['kho','lac','uu','hy','xa'];

// Trường hợp đặc biệt: các tâm sở bất định (chỉ khởi tùy hoàn cảnh) không nằm cố định
// trong danh sách ceta của tâm, nên tính riêng phạm vi Thọ dựa trên tâm mà chúng có thể khởi cùng.
const VEDANA_OVERRIDE = {
  man: ['hy','xa'], tat: ['uu'], lan: ['uu'], hoi: ['uu'], bi: ['hy','xa'], tuyhy: ['hy','xa']
};

function vedanaSetOf(cetaId){
  if(VEDANA_OVERRIDE[cetaId]) return VEDANA_OVERRIDE[cetaId];
  const set = new Set();
  for(const cit of CITTA_DATA){ if(cit.ceta.includes(cetaId)) set.add(cit.vedana); }
  return VEDANA_ORDER.filter(v=>set.has(v));
}

function dotBackgroundStyle(colors){
  if(colors.length<=1){
    return `background:${VEDANA_COLOR[colors[0]]||'#999'}`;
  }
  if(colors.length===2){
    return `background:linear-gradient(180deg, ${VEDANA_COLOR[colors[0]]} 50%, ${VEDANA_COLOR[colors[1]]} 50%)`;
  }
  const n = colors.length;
  const stops = colors.map((c,i)=> `${VEDANA_COLOR[c]} ${Math.round(i/n*100)}% ${Math.round((i+1)/n*100)}%`).join(', ');
  return `background:conic-gradient(${stops})`;
}

function renderTamSoPage(){
  const extra = document.getElementById('extra-content');

  // center:true => hàng này được canh giữa dưới bề ngang 8 cột (theo đúng bản NÊU)
  // groupGap:true => có khoảng cách lớn hơn phía trên (bắt đầu nhóm tâm mới)
  const cittaChunks = [
    {count:8, cols:8},                                          // Tham
    {count:2, cols:2, center:true},                             // Sân
    {count:2, cols:2, center:true},                             // Si
    {count:7, cols:7, groupGap:true},                           // Vô nhân: Quả Bất Thiện
    {count:8, cols:8},                                          // Vô nhân: Quả Thiện
    {count:3, cols:3, center:true},                             // Vô nhân: Duy Tác
    {count:8, cols:8, groupGap:true},                           // Dục giới tịnh hảo: Thiện
    {count:8, cols:8},                                          // Dục giới tịnh hảo: Quả
    {count:8, cols:8},                                          // Dục giới tịnh hảo: Duy Tác
    {count:5, cols:5, thanthong:true, groupGap:true},           // Sắc giới: Thiện (+Thần thông)
    {count:5, cols:5},                                          // Sắc giới: Quả
    {count:5, cols:5, thanthong:true},                          // Sắc giới: Duy Tác (+Thần thông)
    {count:4, cols:4, groupGap:true},                           // Vô Sắc giới: Thiện
    {count:4, cols:4},                                          // Vô Sắc giới: Quả
    {count:4, cols:4},                                          // Vô Sắc giới: Duy Tác
    {count:20, cols:5, groupGap:true},                          // Siêu thế: Đạo
    {count:20, cols:5},                                         // Siêu thế: Quả
  ];
  const cetaChunks = [
    {count:7, cols:7}, {count:6, cols:6},
    {count:4, cols:4, groupGap:true}, {count:3, cols:3}, {count:4, cols:4}, {count:2, cols:2}, {count:1, cols:1},
    {count:7, cols:7, groupGap:true}, {count:12, cols:6},
    {count:3, cols:3, groupGap:true}, {count:2, cols:2}, {count:1, cols:1},
  ];

  let ci = 0;
  let cittaHtml = '';
  for(const chunk of cittaChunks){
    const items = CITTA_DATA.slice(ci, ci+chunk.count);
    ci += chunk.count;
    const dashedDot = chunk.thanthong ? `<div class="pdot-sm pdot-dashed" onclick="openThanThongSheet()"></div>` : '';
    const cls = 'pblock' + (chunk.groupGap?' pblock-gap':'') + (chunk.center?' pblock-center':'');
    cittaHtml += `<div class="${cls}">
      <div class="prow" style="grid-template-columns:repeat(${chunk.cols + (chunk.thanthong?1:0)},20px)">
        ${items.map(c=>`<div class="pdot-sm" style="background:${VEDANA_COLOR[c.vedana]}" onclick="openCittaSheet(${c.id})"></div>`).join('')}${dashedDot}
      </div>
    </div>`;
  }

  let ei = 0;
  let cetaHtml = '';
  for(const chunk of cetaChunks){
    const items = CETASIKA_DATA.slice(ei, ei+chunk.count);
    ei += chunk.count;
    const cls = 'pblock' + (chunk.groupGap?' pblock-gap':'');
    cetaHtml += `<div class="${cls}">
      <div class="prow" style="grid-template-columns:repeat(${chunk.cols},20px)">
        ${items.map(c=>`<div class="pdot-sm" style="${dotBackgroundStyle(vedanaSetOf(c.id))}" onclick="openCetasikaSheet('${c.id}')"></div>`).join('')}
      </div>
    </div>`;
  }

  // ---- Sắc pháp (28) — 4 Đại hiển đặc biệt + 24 sắc còn lại ----
  const rupaSpecialColor = {pathavi:'#a9784f', apo:'#3f9fd6', tejo:'#d4501e', vayo:'#6fa9c4'};
  const dai4 = RUPA_DATA.slice(0,4);
  const rupaRest = RUPA_DATA.slice(4);
  let rupaHtml = `<div class="pblock"><div class="prow" style="grid-template-columns:repeat(4,20px)">
    ${dai4.map(r=>`<div class="pdot-sm" style="background:${rupaSpecialColor[r.id]}" onclick="openDacTinhRupa('${r.id}')"></div>`).join('')}
  </div></div>`;
  const rupaRowSizes = [5,4,2,4,2,3,4];
  let ri = 0;
  for(const sz of rupaRowSizes){
    const items = rupaRest.slice(ri, ri+sz);
    ri += sz;
    rupaHtml += `<div class="pblock"><div class="prow" style="grid-template-columns:repeat(${sz},20px)">
      ${items.map(r=>`<div class="pdot-sm" style="background:#8b5fbf" onclick="openDacTinhRupa('${r.id}')"></div>`).join('')}
    </div></div>`;
  }

  // ---- 13 Pháp chế định: 6 Danh (dưới cột TÂM) + 7 Nghĩa (dưới cột TÂM SỞ) ----
  const namaColors = ['#4b3f8f','#5fa8d3','split-pb','split-bp','split-pb','split-bp'];
  const namaP = PANNATTI_DATA.filter(p=>p.nhom==='nama');
  const atthaP = PANNATTI_DATA.filter(p=>p.nhom==='attha');
  function pannattiDotStyle(colorKey){
    if(colorKey==='split-pb') return 'background:linear-gradient(180deg, #4b3f8f 50%, #5fa8d3 50%)';
    if(colorKey==='split-bp') return 'background:linear-gradient(180deg, #5fa8d3 50%, #4b3f8f 50%)';
    return `background:${colorKey}`;
  }
  const namaHtml = `<div class="pblock pblock-gap"><div class="prow" style="grid-template-columns:repeat(6,20px)">
    ${namaP.map((p,i)=>`<div class="pdot-sm" style="${pannattiDotStyle(namaColors[i])}" onclick="openPannattiSheet('${p.id}')"></div>`).join('')}
  </div></div>`;
  const atthaHtml = `<div class="pblock pblock-gap"><div class="prow" style="grid-template-columns:repeat(7,20px)">
    ${atthaP.map(p=>`<div class="pdot-sm" style="background:#4b3f8f" onclick="openPannattiSheet('${p.id}')"></div>`).join('')}
  </div></div>`;

  extra.innerHTML = `
    <p class="info-note" style="margin-bottom:8px">Vị trí đúng Bảng NÊU. Màu = phạm vi Thọ mà pháp ấy có thể đồng sinh (Khổ=đen, Lạc=vàng, Ưu=nâu, Hỷ=đỏ, Xả=xanh lá). Vòng nét đứt = có thể phát triển Thần thông. Chụm 2 ngón tay để phóng to. Chạm vào 1 ô để xem chi tiết.</p>
    <div class="poster-cols">
      <div class="poster-col">
        <div class="poster-col-title">TÂM (121)</div>
        ${cittaHtml}
        <div class="poster-col-title" style="margin-top:14px">DANH CHẾ ĐỊNH (6)</div>
        ${namaHtml}
      </div>
      <div class="poster-col">
        <div class="poster-col-title">TÂM SỞ (52)</div>
        ${cetaHtml}
        <div class="poster-col-title" style="margin-top:14px">SẮC PHÁP (28) &amp; NÍP-BÀN</div>
        <div style="display:flex;gap:10px;align-items:center">
          <div style="flex:1">${rupaHtml}</div>
          <div class="pdot-ring-big" style="width:60px;height:60px;flex:none" onclick="openNibbanaSheet()"></div>
        </div>
        <div class="poster-col-title" style="margin-top:14px">NGHĨA CHẾ ĐỊNH (7)</div>
        ${atthaHtml}
      </div>
    </div>
  `;
}

function openThanThongSheet(){
  const html = `
    <div class="sheet-head"><h2>Thần thông</h2></div>
    <p class="sheet-pali">Abhiññā</p>
    <div class="sec"><div class="sec-label">Giải thích</div><div class="sec-body">Năng lực thần thông (như thiên nhãn, thiên nhĩ, tha tâm thông...) chỉ có thể phát triển từ nền tảng Tâm <b>Thiện Sắc giới</b> và Tâm <b>Duy Tác Sắc giới</b> (của bậc đã ly dục nhiễm, đắc các tầng thiền) — không phát triển được từ Tâm Quả Sắc giới, vì Tâm Quả chỉ là kết quả thọ hưởng, không có khả năng chủ động vận dụng thần lực.</div></div>
  `;
  document.getElementById('sheet-content').innerHTML = html;
  document.getElementById('sheet').classList.add('show');
  document.getElementById('sheet-backdrop').classList.add('show');
}

function openNibbanaSheet(){
  const n = NIBBANA_DATA;
  const html = `
    <div class="sheet-head"><h2>${n.ten}</h2></div>
    <p class="sheet-pali">${n.pali}</p>
    <div class="sec"><div class="sec-label">Giải thích</div><div class="sec-body">${n.mota}</div></div>
  `;
  document.getElementById('sheet-content').innerHTML = html;
  document.getElementById('sheet').classList.add('show');
  document.getElementById('sheet-backdrop').classList.add('show');
}

function openPannattiSheet(id){
  const p = PANNATTI_DATA.find(x=>x.id===id);
  const html = `
    <div class="sheet-head"><h2>${p.ten}</h2></div>
    <p class="sheet-pali">${p.pali} · ${p.nhom==='nama'?'Danh chế định':'Nghĩa chế định'}</p>
    <div class="sec"><div class="sec-label">Giải thích</div><div class="sec-body">${p.mota}</div></div>
  `;
  document.getElementById('sheet-content').innerHTML = html;
  document.getElementById('sheet').classList.add('show');
  document.getElementById('sheet-backdrop').classList.add('show');
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
    <div class="big-count"><span class="big-num">${c.ceta.length}</span><span class="big-unit">tâm sở phối hợp</span></div>
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
    <div class="big-count"><span class="big-num">${matching.length}</span><span class="big-unit">tâm phối hợp</span></div>
    <div class="sec">
      <div class="sec-label">Giải thích / Vì sao phối hợp được, trường hợp đặc biệt</div>
      <div class="sec-body">${ces.giaithich}</div>
    </div>
    ${ces.quyluat ? `<div class="info-note"><b>Công thức tính số tâm:</b> ${ces.quyluat}</div>` : ''}
    <div class="sec" style="margin-top:14px">
      <div class="sec-label">Danh sách ${matching.length} tâm phối hợp</div>
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

function plainCircleHTML(id, label, pali, opener){
  return `<div class="circle circle-plain" onclick="${opener}('${id}')"><div class="cn">${label}</div>${pali?`<div class="cp">${pali}</div>`:''}</div>`;
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
    return plainCircleHTML(id, c.ten, c.pali, 'openDacTinhCetasika');
  });
  const totthaCircles = totthaIds.map(id=>{
    const c = CETASIKA_DATA.find(x=>x.id===id);
    return plainCircleHTML(id, c.ten, c.pali, 'openDacTinhCetasika');
  });
  const tinhhaoCircles = tinhhaoIds.map(id=>{
    const c = CETASIKA_DATA.find(x=>x.id===id);
    return plainCircleHTML(id, c.ten, c.pali, 'openDacTinhCetasika');
  });
  const rupaCircles = RUPA_DATA.map(r=> plainCircleHTML(r.id, r.ten, r.pali, 'openDacTinhRupa'));
  const vaitroCircles = VAITRO_TAM_DATA.map(v=> plainCircleHTML(v.id, v.ten, v.pali, 'openDacTinhVaitro'));
  const thoCircles = THO_CHITIET_DATA.map(t=> plainCircleHTML(t.id, t.ten, t.pali, 'openDacTinhTho'));

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

// ===== Phần "21 Cảnh" (Ārammaṇa) =====

function renderCanhPage(){
  const extra = document.getElementById('extra-content');
  const circles = CANH_DATA.map((c,i)=> plainCircleHTML(c.id, `${i+1}. ${c.ten}`, c.pali, 'openCanhSheet'));
  extra.innerHTML = `
    <p class="info-note" style="margin-bottom:12px">21 cách phân loại đối tượng (cảnh) mà Tâm có thể biết. Một số mục (7, 21) là cách gọi gộp chung các cảnh khác, không phải cảnh độc lập riêng biệt. Chạm vào từng cảnh để xem những tâm nào biết được nó, và những tâm nào biết cảnh ấy một cách "cố định" (không biết cảnh nào khác ngoài cảnh này).</p>
    <div class="circle-grid">${circles.join('')}</div>
    <p class="info-note" style="margin-top:14px">Nguồn: tổng hợp theo bài giảng Thắng Pháp Abhidhamma — chuaphapluan.com (Bài 69).</p>
  `;
}

function openCanhSheet(id){
  const c = CANH_DATA.find(x=>x.id===id);
  const html = `
    <div class="sheet-head"><h2>${c.ten}</h2></div>
    <p class="sheet-pali">${c.pali}</p>
    ${c.biet ? `<div class="sec"><div class="sec-label">Tâm biết cảnh này</div><div class="sec-body">${c.biet}</div></div>` : ''}
    ${c.codinh ? `<div class="sec"><div class="sec-label">Tâm biết cảnh này cố định</div><div class="sec-body">${c.codinh}</div></div>` : ''}
    ${c.ghichu ? `<div class="info-note"><b>Ghi chú:</b> ${c.ghichu}</div>` : ''}
  `;
  document.getElementById('sheet-content').innerHTML = html;
  document.getElementById('sheet').classList.add('show');
  document.getElementById('sheet-backdrop').classList.add('show');
}
