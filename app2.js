// ===== Điều phối 3 phần chính của app =====
let currentSection = 'quyen22';
let tamsoMode = 'tam2so';

const CITTA_GROUP_COLOR = {vonhan:'gray', batthien:'coral', ducgioi_tinhhao:'teal', sacgioi:'blue', vosacgioi:'purple', sieuthe:'green'};
const CETASIKA_GROUP_COLOR = {bienhanh:'gray', toitha:'amber', batthien_bh:'coral', batthien_rieng:'pink', tinhhao_bh:'teal', tietche:'blue', voluong:'purple', tuequyen:'green'};
const CETASIKA_GROUP_LABEL = {bienhanh:'Biến hành (7)', toitha:'Tợ tha - Biệt cảnh (6)', batthien_bh:'Bất thiện Biến hành (4)', batthien_rieng:'Bất thiện Riêng biệt (10)', tinhhao_bh:'Tịnh hảo Biến hành (19)', tietche:'Tiết chế (3)', voluong:'Vô lượng (2)', tuequyen:'Tuệ quyền (1)'};
const CETASIKA_GROUP_ORDER = ['bienhanh','toitha','batthien_bh','batthien_rieng','tinhhao_bh','tietche','voluong','tuequyen'];

function renderSectionSwitch(){
  const sections = [['quyen22','22 Quyền'],['tamso','Tâm ↔ Tâm sở'],['dactinh','80 Pháp thực tính'],['canh','21 Cảnh'],['duyenkhoi','Duyên khởi'],['duyenhe','24 Duyên hệ'],['xugioi','12 Xứ · 18 Giới']];
  document.getElementById('section-switch').innerHTML = sections.map(([k,label])=>
    `<button class="${k===currentSection?'active':''}" onclick="switchSection('${k}')">${label}</button>`
  ).join('');
}

const PAGE_ACTIONS = {
  quyen22: `<button class="qbtn" onclick="openQuyenDanhSac()">Danh · Sắc quyền</button>
    <button class="qbtn" onclick="openQuyenCoi()">Địa vức (Cõi)</button>
    <button class="qbtn" onclick="openQuyenChiPhap16()">16 chi pháp chân đế</button>
    <button class="qbtn" onclick="openQuyenDuyenTQ()">Quyền duyên</button>`,
  xugioi: `<button class="qbtn" onclick="openXGDoiChieu()">Đối chiếu Xứ ↔ Giới</button>
    <button class="qbtn" onclick="openXGTomTat()">Tóm tắt số pháp</button>`
};

function switchSection(s){
  currentSection = s;
  if(typeof applyFontScale==='function') applyFontScale();
  const pa = document.getElementById('page-actions');
  if(pa) pa.innerHTML = PAGE_ACTIONS[s] || '';
  renderSectionSwitch();
  closeSheet();
  const grid = document.getElementById('grid');
  const legend = document.getElementById('legend');
  const extra = document.getElementById('extra-content');
  const vp = document.getElementById('viewport-meta');
  if(s==='tamso'||s==='duyenkhoi'){
    vp.setAttribute('content','width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes');
  } else {
    vp.setAttribute('content','width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
  }
  if(s==='quyen22'){
    document.getElementById('page-subtitle').textContent = '22 Quyền (Bāvīsatindriya) · chạm vào một quyền để xem chi tiết';
    document.getElementById('nav').innerHTML = '';
    currentView = 'sacdanh';
    renderQuyenGrid();
  } else if(s==='tamso'){
    document.getElementById('page-subtitle').textContent = 'Tâm ↔ Tâm sở · chạm vào một ô để xem phối hợp';
    grid.style.display='none';
    legend.style.display='none';
    document.getElementById('nav').innerHTML = '';
    renderTamSoPage();
  } else if(s==='dactinh'){
    document.getElementById('page-subtitle').textContent = '80 Pháp thực tính (Sabhāvadhamma) · chạm để xem 4 khía cạnh';
    grid.style.display='none';
    legend.style.display='none';
    document.getElementById('nav').innerHTML = '';
    renderDacTinhPage();
  } else if(s==='canh'){
    document.getElementById('page-subtitle').textContent = '21 Cảnh (Ārammaṇa) · chạm để xem những tâm biết cảnh';
    grid.style.display='none';
    legend.style.display='none';
    document.getElementById('nav').innerHTML = '';
    renderCanhPage();
  } else if(s==='duyenkhoi'){
    document.getElementById('page-subtitle').textContent = 'Duyên khởi (Paṭiccasamuppāda) · chạm vào một chi để xem chi pháp';
    grid.style.display='none';
    legend.style.display='none';
    document.getElementById('nav').innerHTML = '';
    renderDuyenKhoiPage();
  } else if(s==='duyenhe'){
    document.getElementById('page-subtitle').textContent = '24 Duyên hệ (Paṭṭhāna) · chạm để xem định nghĩa và chi pháp';
    grid.style.display='none';
    legend.style.display='none';
    document.getElementById('nav').innerHTML = '';
    renderDuyenHePage();
  } else if(s==='xugioi'){
    document.getElementById('page-subtitle').textContent = '12 Xứ (Āyatana) · 18 Giới (Dhātu) — chạm để xem chi pháp';
    grid.style.display='none';
    legend.style.display='none';
    document.getElementById('nav').innerHTML = '';
    renderXuGioiPage();
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
    {count:4, cols:4, groupGap:true, indent:110},              // Vô Sắc giới: Thiện (thụt vào — cột 6→9)
    {count:4, cols:4, indent:110},                              // Vô Sắc giới: Quả
    {count:4, cols:4, indent:110},                              // Vô Sắc giới: Duy Tác
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
  const REFW = 8*20 + 7*2; // 174px = bề ngang chuẩn 8 cột, dùng làm khung quy chiếu để canh giữa
  for(const chunk of cittaChunks){
    const items = CITTA_DATA.slice(ci, ci+chunk.count);
    ci += chunk.count;
    const dashedDot = chunk.thanthong ? `<div class="pdot-sm pdot-dashed" onclick="openThanThongSheet()"></div>` : '';
    const cols2 = chunk.cols + (chunk.thanthong?1:0);
    const rowW = cols2*20 + (cols2-1)*2;
    let rowStyle = `width:${rowW}px`;
    if(chunk.center) rowStyle += ';margin:0 auto';
    else if(chunk.indent) rowStyle += `;margin-left:${chunk.indent}px`;
    cittaHtml += `<div class="pblock${chunk.groupGap?' pblock-gap':''}" style="width:${REFW}px">
      <div class="prow" style="grid-template-columns:repeat(${cols2},20px);${rowStyle}">
        ${items.map(c=>`<div class="pdot-sm" data-k="ci-${c.id}" style="background:${VEDANA_COLOR[c.vedana]}" onclick="openCittaSheet(${c.id})"></div>`).join('')}${dashedDot}
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
        ${items.map(c=>`<div class="pdot-sm" data-k="ce-${c.id}" style="${dotBackgroundStyle(vedanaSetOf(c.id))}" onclick="openCetasikaSheet('${c.id}')"></div>`).join('')}
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

  // ---- 13 Pháp chế định: 6 Danh + 7 Nghĩa, gộp thành MỘT hàng duy nhất ----
  const namaColors = ['#4b3f8f','#5fa8d3','split-pb','split-bp','split-pb','split-bp'];
  const namaP = PANNATTI_DATA.filter(p=>p.nhom==='nama');
  const atthaP = PANNATTI_DATA.filter(p=>p.nhom==='attha');
  function pannattiDotStyle(colorKey){
    if(colorKey==='split-pb') return 'background:linear-gradient(180deg, #4b3f8f 50%, #5fa8d3 50%)';
    if(colorKey==='split-bp') return 'background:linear-gradient(180deg, #5fa8d3 50%, #4b3f8f 50%)';
    return `background:${colorKey}`;
  }
  const pannattiHtml = `<div class="pblock" style="display:flex;justify-content:space-between;width:100%">
    <div class="prow" style="grid-template-columns:repeat(7,20px)">
      ${atthaP.map(p=>`<div class="pdot-sm" style="background:#4b3f8f" onclick="openPannattiSheet('${p.id}')"></div>`).join('')}
    </div>
    <div class="prow" style="grid-template-columns:repeat(6,20px)">
      ${namaP.map((p,i)=>`<div class="pdot-sm" style="${pannattiDotStyle(namaColors[i])}" onclick="openPannattiSheet('${p.id}')"></div>`).join('')}
    </div>
  </div>`;

  extra.innerHTML = `
    <div class="poster-cols">
      <div class="poster-col">
        <div class="poster-col-title">TÂM (121)</div>
        ${cittaHtml}
      </div>
      <div class="poster-col">
        <div class="poster-col-title">TÂM SỞ (52)</div>
        ${cetaHtml}
        <div class="poster-col-title" style="margin-top:14px">SẮC PHÁP (28) &amp; NÍP-BÀN</div>
        <div style="display:flex;gap:10px;align-items:flex-end">
          <div style="flex:1">${rupaHtml}</div>
          <div class="pdot-ring-big" style="margin-right:66px" onclick="openNibbanaSheet()"></div>
        </div>
      </div>
    </div>
    <div class="poster-col-title" style="margin-top:14px">PHÁP CHẾ ĐỊNH (13) — 7 Nghĩa (trái) · 6 Danh (phải)</div>
    ${pannattiHtml}
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
  // Công thức theo nhóm: "36 = 13 Tợ tha + 23 Tịnh hảo"
  const byGroup = {};
  const groupOrder = [];
  c.ceta.forEach(cid=>{
    const ces = CETASIKA_DATA.find(x=>x.id===cid);
    if(!ces) return;
    if(!byGroup[ces.nhom]){ byGroup[ces.nhom]=[]; groupOrder.push(ces.nhom); }
    byGroup[ces.nhom].push(ces);
  });
  const NHOM_LABEL = {bienhanh:'Biến hành', toitha:'Biệt cảnh', batthien_bh:'Bất thiện biến hành', batthien_rieng:'Bất thiện', tinhhao_bh:'Tịnh hảo biến hành', tietche:'Tiết chế', voluong:'Vô lượng phần', tuequyen:'Trí tuệ'};
  const groupFormula = groupOrder.map(g=>`${byGroup[g].length} ${NHOM_LABEL[g]||g}`).join(' + ');
  // Công thức đầy đủ: "36 tâm sở = (An tịnh tâm + An tịnh thân + Cần + ...)" — xếp theo vần
  // theo đúng thứ tự Bảng Nêu (thứ tự trong CETASIKA_DATA)
  const names = CETASIKA_DATA.filter(x=>c.ceta.includes(x.id)).map(x=>x.ten.replace(/ \(sở hữu\)/,''));
  const html = `
    <div class="sheet-head"><h2>${c.name}</h2></div>
    <p class="sheet-pali">${c.groupLabel} · Cảm thọ: ${c.vedanaLabel}</p>
    <div class="big-count"><span class="big-num">${c.ceta.length}</span><span class="big-unit">tâm sở phối hợp</span></div>
    ${c.note ? `<div class="info-note"><b>Trường hợp đặc biệt:</b> ${c.note}</div>` : ''}
    <div class="sec" style="margin-top:14px">
      <div class="sec-label">Tâm sở phối hợp</div>
      <div class="sec-body"><b>${c.ceta.length}</b> = ${groupFormula}</div>
      <div class="sec-body" style="margin-top:8px"><b>${c.ceta.length}</b> = (${names.join(' + ')})</div>
    </div>
  `;
  document.getElementById('sheet-content').innerHTML = html;
  document.getElementById('sheet').classList.add('show');
  document.getElementById('sheet-backdrop').classList.add('show');
}

// Tâm sở BẤT ĐỊNH (aniyatayogī): không nằm cố định trong danh sách tâm sở của tâm nào,
// nhưng CÓ THỂ khởi cùng một số tâm nhất định khi có dịp. Danh sách "tâm có thể phối hợp"
// được khai báo riêng ở đây (dữ liệu ceta của tâm chỉ chứa các tâm sở nhất định — niyata).
const APPAMANNA_CITTAS = [31,32,33,34,35,36,37,38, 47,48,49,50,51,52,53,54, 55,56,57,58, 60,61,62,63, 65,66,67,68];
const ANIYATA_INFO = {
  man:   {cittas:[3,4,7,8],  note:'Mạn là tâm sở <b>bất định</b> (aniyatayogī): chỉ có thể khởi cùng 4 tâm Tham <b>ly tà kiến</b>, và cũng chỉ khởi khi có dịp so sánh hơn–kém–bằng, không phải lúc nào cũng có mặt.'},
  tat:   {cittas:[9,10],     note:'Tật là tâm sở <b>bất định</b> (aniyatayogī): chỉ có thể khởi cùng 2 tâm Sân (khi ganh tỵ, tâm luôn kèm thọ Ưu và sự chống đối). Khởi <b>riêng lẻ</b> — trong một sát-na không đồng sinh cùng Lận hay Hối, vì mỗi pháp bắt một loại cảnh khác nhau.'},
  lan:   {cittas:[9,10],     note:'Lận là tâm sở <b>bất định</b> (aniyatayogī): chỉ có thể khởi cùng 2 tâm Sân. Khởi <b>riêng lẻ</b> — không đồng sinh cùng Tật hay Hối trong cùng một sát-na.'},
  hoi:   {cittas:[9,10],     note:'Hối là tâm sở <b>bất định</b> (aniyatayogī): chỉ có thể khởi cùng 2 tâm Sân. Khởi <b>riêng lẻ</b> — không đồng sinh cùng Tật hay Lận trong cùng một sát-na.'},
  bi:    {cittas:APPAMANNA_CITTAS, note:'Bi là tâm sở <b>bất định</b>: chỉ khởi khi lấy chúng sinh đang khổ làm cảnh — trong 16 tâm Đại thiện + Đại duy tác và 12 tâm Sắc giới từ Sơ thiền đến Tứ thiền (không có ở Ngũ thiền vì tầng này thuần Xả vi tế). Không đồng sinh cùng Tùy hỷ trong cùng sát-na.'},
  tuyhy: {cittas:APPAMANNA_CITTAS, note:'Tùy hỷ là tâm sở <b>bất định</b>: chỉ khởi khi lấy chúng sinh đang hạnh phúc/thành công làm cảnh — trong 16 tâm Đại thiện + Đại duy tác và 12 tâm Sắc giới từ Sơ thiền đến Tứ thiền. Không đồng sinh cùng Bi trong cùng sát-na.'},
  chanhngu:    {cittas:[31,32,33,34,35,36,37,38], note:'Ngoài 40 tâm Siêu thế (phối hợp <b>cố định</b>, cả 3 Tiết chế cùng khởi một lượt), Chánh ngữ còn khởi <b>bất định, riêng lẻ</b> trong 8 tâm Đại thiện — khi có dịp thực sự tránh xa ác ngữ.'},
  chanhnghiep: {cittas:[31,32,33,34,35,36,37,38], note:'Ngoài 40 tâm Siêu thế (phối hợp <b>cố định</b>), Chánh nghiệp còn khởi <b>bất định, riêng lẻ</b> trong 8 tâm Đại thiện — khi có dịp thực sự tránh xa thân ác hạnh.'},
  chanhmang:   {cittas:[31,32,33,34,35,36,37,38], note:'Ngoài 40 tâm Siêu thế (phối hợp <b>cố định</b>), Chánh mạng còn khởi <b>bất định, riêng lẻ</b> trong 8 tâm Đại thiện — khi có dịp thực sự tránh xa nuôi mạng sai trái.'}
};

function buildCittaGroupList(list){
  // Kiểu công thức: "91 tâm = 24 Dục giới tịnh hảo + 15 Sắc giới + 12 Vô sắc giới + 40 Siêu thế"
  const groupsPresent = [];
  for(const m of list){ if(!groupsPresent.includes(m.group)) groupsPresent.push(m.group); }
  const parts = [];
  const partials = [];
  for(const g of groupsPresent){
    const sub = list.filter(m=>m.group===g);
    const total = CITTA_DATA.filter(m=>m.group===g).length;
    parts.push(`${sub.length} ${sub[0].groupLabel}`);
    if(sub.length < total){
      partials.push(`<b>${sub.length} ${sub[0].groupLabel}</b> (trong ${total}): ${sub.map(m=>m.name).join('; ')}`);
    }
  }
  let html = `<div class="sec-body"><b>${list.length}</b> = ${parts.join(' + ')}</div>`;
  if(partials.length){
    html += `<div class="sec-body" style="margin-top:8px;font-size:calc(15px * var(--fontscale))">${partials.join('<br><br>')}</div>`;
  }
  return html;
}

function openCetasikaSheet(id){
  const ces = CETASIKA_DATA.find(x=>x.id===id);
  const matching = CITTA_DATA.filter(c=>c.ceta.includes(id));
  const ani = ANIYATA_INFO[id];
  const aniCittas = ani ? ani.cittas.map(cid=>CITTA_DATA.find(c=>c.id===cid)).filter(Boolean) : [];

  let bigNum, bigUnit;
  if(ani && matching.length>0){ bigNum = `${matching.length} + ${aniCittas.length}`; bigUnit = 'tâm cố định + tâm bất định'; }
  else if(ani){ bigNum = aniCittas.length; bigUnit = 'tâm có thể phối hợp (bất định)'; }
  else { bigNum = matching.length; bigUnit = 'tâm phối hợp'; }

  let listHtml = '';
  if(matching.length>0){
    listHtml += `<div class="sec" style="margin-top:14px">
      <div class="sec-label">${matching.length} tâm phối hợp${ani?' cố định (niyata)':''}</div>
      ${buildCittaGroupList(matching)}
    </div>`;
  }
  if(aniCittas.length>0){
    listHtml += `<div class="sec" style="margin-top:14px">
      <div class="sec-label">${aniCittas.length} tâm có thể phối hợp — bất định (aniyata), chỉ khởi khi có dịp</div>
      ${buildCittaGroupList(aniCittas)}
    </div>`;
  }

  const html = `
    <div class="sheet-head"><h2>${ces.ten}</h2></div>
    <p class="sheet-pali">${ces.pali}</p>
    <div class="big-count"><span class="big-num">${bigNum}</span><span class="big-unit">${bigUnit}</span></div>
    <div class="sec">
      <div class="sec-label">Giải thích / Vì sao phối hợp được, trường hợp đặc biệt</div>
      <div class="sec-body">${ces.giaithich}</div>
    </div>
    ${ani ? `<div class="info-note">${ani.note}</div>` : ''}
    ${ces.quyluat ? `<div class="info-note"><b>Công thức tính số tâm:</b> ${ces.quyluat}</div>` : ''}
    ${listHtml}
  `;
  document.getElementById('sheet-content').innerHTML = html;
  document.getElementById('sheet').classList.add('show');
  document.getElementById('sheet-backdrop').classList.add('show');
}

renderSectionSwitch();
switchSection('quyen22');

// ===== Phần "Đặc tính · Chức năng · Thể hiện · Nhân gần" (Aṭṭhasālinī) =====

function plainCircleHTML(id, label, pali, opener, cls){
  return `<div class="circle ${cls||'circle-plain'}" onclick="${opener}('${id}')"><div class="cn">${label}</div>${pali?`<div class="cp">${pali}</div>`:''}</div>`;
}

function renderDacTinhGroup(title, items){
  let html = `<div class="group-head">${title}</div><div class="circle-grid">`;
  html += items.join('');
  html += `</div>`;
  return html;
}

// Níp-bàn (pháp thực tính thứ 80) — theo Vi Diệu Pháp Sơ Cấp (Sư Giác Giới)
const NIPBAN_DT = {
  dt:'Vắng lặng', dtp:'santilakkhaṇaṃ',
  cn:'Bất tử, không chuyển động', cnp:'accutarasaṃ, acalarasaṃ',
  th:'Không có hiện tướng', thp:'animittapaccupaṭṭhānaṃ',
  ng:'Không có nhân cần thiết — Níp-bàn không bị tạo tác nên không có nhân sanh; Níp-bàn chỉ làm cảnh, làm năng duyên cho tâm.', ngp:''
};

// 6 cặp tâm sở Tịnh hảo "thân – tâm" (kể chung 1 pháp thực tính mỗi cặp)
const DT_PAIRS = [
  {id1:'antinhthan', id2:'antinhtam', ten:'Tịnh thân · Tịnh tâm', pali:'Kāyapassaddhi · Cittapassaddhi'},
  {id1:'khinhthan', id2:'khinhtam', ten:'Khinh thân · Khinh tâm', pali:'Kāyalahutā · Cittalahutā'},
  {id1:'nhuthan', id2:'nhutam', ten:'Nhu thân · Nhu tâm', pali:'Kāyamudutā · Cittamudutā'},
  {id1:'thichthan', id2:'thichtam', ten:'Thích thân · Thích tâm', pali:'Kāyakammaññatā · Cittakammaññatā'},
  {id1:'thuanthan', id2:'thuantam', ten:'Thuần thân · Thuần tâm', pali:'Kāyapāguññatā · Cittapāguññatā'},
  {id1:'chanhthan', id2:'chanhtam', ten:'Chánh thân · Chánh tâm', pali:'Kāyujukatā · Cittujukatā'}
];

function renderDacTinhPage(){
  const extra = document.getElementById('extra-content');
  let n = 0;
  const num = ()=>{ n++; return n; };
  const circ = (id, ten, pali, opener, cls)=> plainCircleHTML(id, `${num()}. ${ten}`, pali, opener, cls);

  // 1. Tâm
  const tamCircle = circ('vt_vinnana', 'Tâm', 'Citta', 'openDacTinhVaitro', 'circle-vt');

  // 2–18: 17 Tợ tha (Thọ tách thành 5)
  const toithaHtml = [
    circ('xuc','Xúc','Phassa','openDacTinhCetasika','circle-tt'),
    circ('tho_kho','Thọ khổ','Dukkha','openDacTinhTho','circle-tt'),
    circ('tho_lac','Thọ lạc','Sukha','openDacTinhTho','circle-tt'),
    circ('tho_hy','Thọ hỷ','Somanassa','openDacTinhTho','circle-tt'),
    circ('tho_uu','Thọ ưu','Domanassa','openDacTinhTho','circle-tt'),
    circ('tho_xa','Thọ xả','Upekkhā','openDacTinhTho','circle-tt'),
    ...['tuong','tu','nhattam','mangquyen','tacy','tam','tu2','thangiai','can','hy','duc'].map(id=>{
      const c = CETASIKA_DATA.find(x=>x.id===id);
      return circ(id, c.ten, c.pali, 'openDacTinhCetasika', 'circle-tt');
    })
  ].join('');

  // 19–32: 14 Bất thiện
  const batthienIds = ["si","votam","voquy","phongdat","tham","takien","man","san","tat","lan","hoi","hontram","thuymien","hoainghi"];
  const batthienHtml = batthienIds.map(id=>{
    const c = CETASIKA_DATA.find(x=>x.id===id);
    return circ(id, c.ten, c.pali, 'openDacTinhCetasika', 'circle-bt');
  }).join('');

  // 33–51: 19 Tịnh hảo (6 cặp thân–tâm kể chung)
  const th1 = ["tin","niem","hiri","ottapa","votham","vosan","hanhxa"].map(id=>{
    const c = CETASIKA_DATA.find(x=>x.id===id);
    return circ(id, c.ten, c.pali, 'openDacTinhCetasika', 'circle-th');
  }).join('');
  const thPairs = DT_PAIRS.map((p,i)=> circ('pair'+i, p.ten, p.pali.split(' · ')[0].replace('Kāya','K./C.'), 'openDacTinhPairByIdx', 'circle-th')).join('');
  const th2 = ["chanhngu","chanhnghiep","chanhmang","bi","tuyhy","tue"].map(id=>{
    const c = CETASIKA_DATA.find(x=>x.id===id);
    return circ(id, c.ten, c.pali, 'openDacTinhCetasika', 'circle-th');
  }).join('');

  // 52–79: 28 Sắc pháp
  const rupaHtml = RUPA_DATA.map(r=> circ(r.id, r.ten, r.pali, 'openDacTinhRupa', 'circle-sac')).join('');

  // 80. Níp-bàn
  const nbCircle = circ('nipban', 'Níp-bàn', 'Nibbāna', 'openDacTinhNipban', 'circle-tho');

  extra.innerHTML = `
    <p class="info-note" style="margin-bottom:12px"><b>Pháp thực tính (Sabhāvadhamma)</b> là pháp có bản thể thật: mỗi pháp có <b>Trạng thái / Đặc tính (Lakkhaṇā)</b> riêng, <b>Phận sự / Chức năng (Rasā)</b> riêng, có <b>Sự hiện bày / Thể hiện (Paccupaṭṭhānā)</b> và <b>Nhân cần thiết / Nhân gần (Padaṭṭhānā)</b>.<br>
    Pháp thực tính có <b>80 pháp</b> = 1 Tâm + 50 tâm sở + 28 sắc pháp + 1 Níp-bàn. (Tâm 121 thứ kể là 1; tâm sở 52 thứ kể 50 pháp vì Thọ tách thành 5 loại còn 6 cặp "thân – tâm" mỗi cặp kể chung 1 pháp.)</p>
    ${renderDacTinhGroup('1. Tâm (Citta)', [tamCircle])}
    ${renderDacTinhGroup('2–18 · Tâm sở Tợ tha (17)', [toithaHtml])}
    ${renderDacTinhGroup('19–32 · Tâm sở Bất thiện (14)', [batthienHtml])}
    ${renderDacTinhGroup('33–51 · Tâm sở Tịnh hảo (19)', [th1+thPairs+th2])}
    ${renderDacTinhGroup('52–79 · Sắc pháp (28)', [rupaHtml])}
    ${renderDacTinhGroup('80. Níp-bàn (Nibbāna)', [nbCircle])}
    ${renderDacTinhGroup('Phụ lục · 14 vai trò của Tâm theo phận sự', [VAITRO_TAM_DATA.filter(v=>v.id!=='vt_vinnana').map(v=> plainCircleHTML(v.id, v.ten, v.pali, 'openDacTinhVaitro', 'circle-vt')).join('')])}
    <p class="info-note">Nguồn: Vi Diệu Pháp Sơ Cấp (mục "Tám mươi pháp thực tính") — Sư Giác Giới; chi tiết 4 khía cạnh đối chiếu Chú giải Bộ Pháp Tụ (Aṭṭhasālinī).</p>
  `;
}

function openDacTinhPairByIdx(key){
  const i = parseInt(String(key).replace('pair',''),10);
  const p = DT_PAIRS[i];
  const a = DACTINH_DATA[p.id1], b = DACTINH_DATA[p.id2];
  const ca = CETASIKA_DATA.find(x=>x.id===p.id1), cb = CETASIKA_DATA.find(x=>x.id===p.id2);
  showAttrSheet(`
    <div class="sheet-head"><h2>${p.ten}</h2></div>
    <p class="sheet-pali">${p.pali} — một pháp thực tính, hai mặt: nhóm tâm sở ("thân") và tâm</p>
    <div class="group-head">${ca.ten} (${ca.pali})</div>
    ${attrBlocksOnly(a)}
    <div class="group-head" style="margin-top:14px">${cb.ten} (${cb.pali})</div>
    ${attrBlocksOnly(b)}
  `);
}

function openDacTinhNipban(){
  showAttrSheet(attrSheetHTML('Níp-bàn', 'Nibbāna — pháp thực tính thứ 80, pháp vô vi', NIPBAN_DT));
}

function attrBlocksOnly(item){
  return `
    <div class="attr-block attr-dt"><div class="attr-label">Đặc tính (Lakkhaṇā)</div><div class="sec-body">${item.dt}</div><div class="attr-pali">${item.dtp||''}</div></div>
    <div class="attr-block attr-cn"><div class="attr-label">Chức năng (Rasā)</div><div class="sec-body">${item.cn}</div><div class="attr-pali">${item.cnp||''}</div></div>
    <div class="attr-block attr-th"><div class="attr-label">Thể hiện (Paccupaṭṭhānā)</div><div class="sec-body">${item.th}</div><div class="attr-pali">${item.thp||''}</div></div>
    <div class="attr-block attr-ng"><div class="attr-label">Nhân gần (Padaṭṭhānā)</div><div class="sec-body">${item.ng}</div><div class="attr-pali">${item.ngp||''}</div></div>
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
  const circles = CANH_DATA.map((c,i)=> plainCircleHTML(c.id, `${i+1}. ${c.ten}`, c.pali, 'openCanhSheet', 'circle-canh'));
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

// ===== Trang "Duyên khởi" — bánh xe 12 chi Paṭiccasamuppāda =====
// Chi pháp theo bảng "Chi pháp pháp duyên khởi" (Đường Vào Thắng Pháp — TK Chánh Minh)

const DUYENKHOI_DATA = [
 {ten:'Vô minh', pali:'Avijjā',
  duyen:'Vô minh duyên Hành — Avijjāpaccayā saṅkhārā',
  chiphap:'Tâm sở <b>Si</b> hợp trong <b>12 tâm bất thiện</b>.',
  mogok:'Trạng thái không sáng suốt, bị si mê che lấp, không thấy rõ thực tánh của các pháp: bất tri trong <b>Tam tướng</b> (vô thường xem là trường tồn, khổ xem là hạnh phúc, vô ngã xem là "tôi, của tôi") và bất tri trong <b>Tứ Diệu Đế</b>. Vô minh có mặt do đời sống thất niệm — chính vì Vô minh nên làm duyên cho Hành có mặt.'},
 {ten:'Hành', pali:'Saṅkhāra',
  duyen:'Hành duyên Thức — Saṅkhārapaccayā viññāṇaṃ',
  chiphap:'Tâm sở <b>Tư</b> hợp trong <b>12 tâm bất thiện</b> + <b>17 tâm thiện hiệp thế</b> (gom thành <b>29 Tư</b>).',
  mogok:'Sự chủ ý tạo tác nghiệp thiện, bất thiện, bất động, dẫn đến tái sanh trong ba giới bốn loài. Có 3 kiểu: <b>Phúc hành</b> (Puññābhisaṅkhāra — làm thiện, sanh cõi người, trời Dục giới, Sắc giới), <b>Phi phúc hành</b> (Apuññābhisaṅkhāra — làm bất thiện, sanh 4 đường ác đạo), <b>Bất động hành</b> (Āneñjābhisaṅkhāra — tu thiền Vô sắc, sanh cõi Vô sắc, thọ tối đa 84.000 đại kiếp).'},
 {ten:'Thức', pali:'Viññāṇa',
  duyen:'Thức duyên Danh sắc — Viññāṇapaccayā nāmarūpaṃ',
  chiphap:'<b>32 tâm quả hiệp thế</b>.',
  mogok:'Thức tái sanh do chủ ý: mỗi chủ ý tạo tác thiện – bất thiện là sự quyết định tái sanh trong các cõi. Thức quy tụ năng lực ở chặng tư tưởng cuối cùng (cận tử) để quyết định tái sanh vào cảnh giới tương ứng. Thức (danh) luôn nương tựa sắc pháp, không thể đi riêng lẻ.'},
 {ten:'Danh sắc', pali:'Nāma-rūpa',
  duyen:'Danh sắc duyên Lục nhập — Nāmarūpapaccayā saḷāyatanaṃ',
  chiphap:'<b>Danh:</b> 35 tâm sở hợp trong 32 tâm quả hiệp thế.<br><b>Sắc:</b> sắc nghiệp tái tục, sắc nghiệp bình nhật, sắc tâm.',
  mogok:'Thức tái sanh thì tiếp tục có một Danh-Sắc mới để duy trì. Chết không phải là hết — chết là sự bắt đầu cho một hình hài mới, đời sống mới. Có 4 kiểu tái sanh: <b>Thai sanh, Noãn sanh, Hoá sanh, Thấp sanh</b>.'},
 {ten:'Lục nhập', pali:'Saḷāyatana',
  duyen:'Lục nhập duyên Xúc — Saḷāyatanapaccayā phasso',
  chiphap:'<b>6 nội xứ:</b> 5 sắc thần kinh + 32 tâm quả hiệp thế (ý xứ).',
  mogok:'Khi có Danh-Sắc thì hình thành 6 căn (6 nội xứ). <b>6 căn</b>: mắt, tai, mũi, lưỡi, thân, ý; <b>6 trần</b>: sắc, thanh, khí, vị, xúc, pháp; <b>6 thức</b>: nhãn, nhĩ, tỷ, thiệt, thân, ý. Khi 6 căn tiếp xúc 6 trần lập tức làm duyên cho 6 Xúc phát sanh.'},
 {ten:'Xúc', pali:'Phassa',
  duyen:'Xúc duyên Thọ — Phassapaccayā vedanā',
  chiphap:'Tâm sở <b>Xúc</b> hợp trong <b>32 tâm quả hiệp thế</b>.',
  mogok:'Sự giao tiếp, va chạm của 6 căn và 6 trần: 6 nội xứ tiếp xúc 6 ngoại xứ sinh ra 6 Xúc (nhãn xúc, nhĩ xúc, tỷ xúc, thiệt xúc, thân xúc, ý xúc). Do có 6 Xúc mà làm duyên cho 6 Thọ phát sanh.'},
 {ten:'Thọ', pali:'Vedanā',
  duyen:'Thọ duyên Ái — Vedanāpaccayā taṇhā',
  chiphap:'Tâm sở <b>Thọ</b> hợp trong <b>32 tâm quả hiệp thế</b>.',
  mogok:'Cảm giác tích cực, tiêu cực, trung tính của Thân – Tâm trước 6 trần cảnh: 3 loại (khổ, lạc, xả) hay 5 loại (khổ, lạc, hỷ, ưu, xả); theo môn có 6 thọ (nhãn thọ... ý thọ). Theo Mogok: <b>6 cảm thọ ngoại khách</b> (thọ xả nơi nhãn – nhĩ – tỷ – thiệt thức, thọ lạc và khổ nơi thân thức), <b>3 cảm thọ nội khách</b> (hỷ, ưu, xả sanh nơi tâm), <b>3 cảm thọ chủ</b> (hỷ, ưu, xả đi cùng hơi thở vô – ra). Do 6 Thọ dẫn đến 6 Ái.'},
 {ten:'Ái', pali:'Taṇhā',
  duyen:'Ái duyên Thủ — Taṇhāpaccayā upādānaṃ',
  chiphap:'Tâm sở <b>Tham</b> hợp trong <b>8 tâm tham</b> (<b>6 ái</b>).',
  mogok:'Sự thích thú, đam mê trên 6 trần cảnh — thèm khát không bao giờ thấy đủ. 6 ái: sắc ái... pháp ái. Có 3 loại: <b>Dục ái</b> (Kāmataṇhā — tham đắm trong 6 trần), <b>Hữu ái</b> (Bhavataṇhā — tham đắm hợp Thường kiến: tin cái tôi vĩnh cửu, đấng bề trên tối thượng, sự cứu cánh ngược lý nhân quả), <b>Phi hữu ái</b> (Vibhavataṇhā — tham đắm hợp Đoạn kiến: vô nhân kiến, vô hành kiến, vô hữu kiến). "Thọ duyên Ái" chính là mắt xích then chốt của vòng luân hồi.'},
 {ten:'Thủ', pali:'Upādāna',
  duyen:'Thủ duyên Hữu — Upādānapaccayā bhavo',
  chiphap:'Tâm sở <b>Tham</b> + tâm sở <b>Tà kiến</b> hợp trong <b>8 tâm tham</b> (<b>4 thủ</b>).',
  mogok:'Nắm giữ, chấp chặt vào đối tượng, gắn liền với tà kiến. <b>4 loại Thủ</b>: Dục thủ (Kāmupādāna — bám víu 5 trần cảnh), Kiến thủ (Diṭṭhupādāna — chấp chặt quan điểm sai lầm), Giới cấm thủ (Sīlabbatupādāna — chấp pháp hành sai lạc ngược Đạo Đế, mê tín lễ lạy cúng kiếng cầu xin), Ngã chấp thủ (Attavādupādāna — chấp "cái tôi" thường còn; thật ra chỉ có sự buồn, sự khổ chứ không có "tôi buồn, tôi khổ"). Chính 4 Thủ làm duyên cho Hữu có mặt.'},
 {ten:'Hữu', pali:'Bhava',
  duyen:'Hữu duyên Sanh — Bhavapaccayā jāti',
  chiphap:'<b>Nghiệp hữu:</b> tâm sở Tư hợp trong 12 tâm bất thiện + 17 tâm thiện hiệp thế (gom thành 29 Tư).<br><b>Sanh hữu:</b> 32 tâm quả hiệp thế, 35 tâm sở hợp, 20 sắc nghiệp.',
  mogok:'Tiến trình tạo tác và tái sanh. <b>2 loại</b>: <b>Nghiệp hữu</b> (Kammabhava — nhân: tiến trình tạo nghiệp thiện, bất thiện, bất động) và <b>Sanh hữu</b> (Upapattibhava — quả: Danh-Sắc của kiếp sống mới). Sanh hữu gồm 3 cảnh giới tái sanh: Dục hữu, Sắc hữu, Vô sắc hữu.'},
 {ten:'Sanh', pali:'Jāti',
  duyen:'Sanh duyên Già chết, sầu, bi, khổ, ưu, não — Jātipaccayā jarāmaraṇaṃ soka-parideva-dukkha-domanass-upāyāsā',
  chiphap:'<b>Danh sanh (nāmajāti):</b> sự sanh lên của 32 tâm quả hiệp thế, 35 tâm sở hợp.<br><b>Sắc sanh (rūpajāti):</b> sự hiện khởi của 20 sắc nghiệp.',
  mogok:'Tiến trình tái sanh kế tiếp trong tương lai do nghiệp tạo tác trong quá khứ — nghiệp làm duyên cho Thức tái sanh qua một cảnh giới khác (Tục Sanh). Khi tái sanh qua cảnh giới khác thì Sanh làm duyên cho Lão, Tử.'},
 {ten:'Già chết', pali:'Jarā-maraṇa',
  duyen:'Vòng luân hồi tiếp nối: sầu, bi, khổ, ưu, não nuôi dưỡng Vô minh',
  chiphap:'<b>Già (jarā):</b> sự già của 32 tâm quả hiệp thế, 35 tâm sở hợp (sát-na trụ).<br><b>Chết (maraṇa):</b> sự diệt của 32 tâm quả hiệp thế, 35 tâm sở hợp (sát-na diệt).',
  mogok:'Có Sanh thì có già, chết — quả đương nhiên của Sanh. Từ Sanh đến Lão Tử thường kéo theo: <b>Sầu, Bi, Khổ, Ưu, Não</b>. Thập Nhị Nhân Duyên là chuỗi mắt xích dính liền bởi 12 khoen liên tục, tạo nên vòng tròn luân hồi tái sanh; muốn thấu hiểu, chấm dứt sinh tử và thoát khỏi vòng tròn trôi lăn này chỉ có thiền <b>Tứ Niệm Xứ</b>, tu tập Chánh Niệm và Trí Tuệ.',
  extra:[
   ['Sầu','Soka','Ưu thọ đồng sanh trong 2 tâm sân (sanh lên từ 5 sự suy vong).'],
   ['Bi','Parideva','Tâm bấn loạn, than vãn — âm thanh do tâm sinh (cittajavippallāsasadda).'],
   ['Khổ','Dukkha','Khổ thân đồng sanh với tâm Thân thức thọ khổ.'],
   ['Ưu','Domanassa','Tâm sở Thọ đồng sanh với 2 tâm sân (tâm sở khổ thọ).'],
   ['Não','Upāyāsa','Tâm sở Sân đồng sanh với 2 tâm sân.']
  ]}
];

function dkArc(r,a1,a2,sweep){
  const c=360, rad=d=>d*Math.PI/180;
  const x1=c+r*Math.cos(rad(a1)), y1=c+r*Math.sin(rad(a1));
  const x2=c+r*Math.cos(rad(a2)), y2=c+r*Math.sin(rad(a2));
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 ${sweep} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}
let dkPid = 0;
function dkArcText(r,a1,a2,sweep,txt,{fill='#111',size=15,weight=600,click=null}={}){
  const id = 'dkp'+(dkPid++);
  const hit = click!==null ? `<path d="${dkArc(r,a1,a2,sweep)}" stroke="rgba(0,0,0,0)" stroke-width="46" fill="none"/>` : '';
  const inner = `<path id="${id}" d="${dkArc(r,a1,a2,sweep)}" fill="none"/>${hit}
    <text font-size="${size}" font-weight="${weight}" fill="${fill}"><textPath href="#${id}" startOffset="50%" text-anchor="middle">${txt}</textPath></text>`;
  return click!==null ? `<g class="dkc" onclick="${click}">${inner}</g>` : inner;
}
function dkNode(a,r,label,idx,w){
  const c=360, rad=a*Math.PI/180;
  const x=c+r*Math.cos(rad), y=c+r*Math.sin(rad);
  const rot = Math.sin(rad)>0 ? a-90 : a+90;
  return `<g class="dkc" transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot.toFixed(1)})" onclick="openDuyenKhoiSheet(${idx})">
    <rect x="${-w/2}" y="-22" width="${w}" height="44" rx="22" fill="#fffdf2" stroke="#d21" stroke-width="3" class="dk-shape"/>
    <rect x="${-w/2-4}" y="-26" width="${w+8}" height="52" rx="26" fill="none" stroke="#f0c419" stroke-width="2.5" opacity=".9"/>
    <text text-anchor="middle" dominant-baseline="central" font-size="21" font-weight="800" fill="#111">${label}</text>
  </g>`;
}

function renderDuyenKhoiPage(){
  dkPid = 0;
  const extra = document.getElementById('extra-content');
  // 4 phần theo truyền thống Mogok: màu nền từng chi
  const PHAN = [
    {chis:[0,1],       fill:'#fbe3dc', stroke:'#b34a32', ink:'#6d2413', label:'Nhân quá khứ'},
    {chis:[2,3,4,5,6], fill:'#e2f2da', stroke:'#4c7a3a', ink:'#274617', label:'Quả hiện tại'},
    {chis:[7,8,9],     fill:'#fdecca', stroke:'#b07a1f', ink:'#5f3e08', label:'Nhân hiện tại'},
    {chis:[10,11],     fill:'#e5dcf5', stroke:'#6b4fa0', ink:'#392564', label:'Quả vị lai'}
  ];
  const phanOf = i => PHAN.find(p=>p.chis.includes(i));
  // Tên hiển thị (tối đa 2 dòng)
  const NAMES = [['Vô minh'],['Hành'],['Thức'],['Danh','sắc'],['Lục','nhập'],['Xúc'],['Thọ'],['Ái'],['Thủ'],['Hữu'],['Sanh'],['Già','chết']];

  const C=360, R=268, NR=58;
  let nodes='', arrows='';
  for(let i=0;i<12;i++){
    const a=(-90+i*30)*Math.PI/180;
    const x=C+R*Math.cos(a), y=C+R*Math.sin(a);
    const p=phanOf(i);
    const lines=NAMES[i];
    const texts = lines.length===1
      ? `<text x="0" y="8" text-anchor="middle" font-size="23" font-weight="800" fill="${p.ink}">${lines[0]}</text>`
      : `<text x="0" y="0" text-anchor="middle" font-size="22" font-weight="800" fill="${p.ink}">${lines[0]}</text>
         <text x="0" y="24" text-anchor="middle" font-size="22" font-weight="800" fill="${p.ink}">${lines[1]}</text>`;
    nodes += `<g class="dkc" transform="translate(${x.toFixed(1)},${y.toFixed(1)})" onclick="openDuyenKhoiSheet(${i})">
      <circle r="${NR}" fill="${p.fill}" stroke="${p.stroke}" stroke-width="3.5" class="dk-shape"/>
      <text x="0" y="-30" text-anchor="middle" font-size="16" font-weight="700" fill="${p.stroke}">${i+1}</text>
      ${texts}
    </g>`;
    // mũi tên nối chi i -> i+1 (cung ngắn giữa 2 nút)
    const a1=-90+i*30+13.5, a2=-90+i*30+17.5;
    arrows += `<path d="${dkArc(R,a1,a2,1)}" stroke="#c8471f" stroke-width="7" fill="none" marker-end="url(#dkarr)"/>`;
  }

  extra.innerHTML = `
    <p class="info-note" style="margin-bottom:6px">Vòng Thập Nhị Nhân Duyên — chạm 1 lần để chọn, chạm lần 2 để xem chi pháp và giảng giải. Chạm <b>tâm vòng tròn</b> để xem các yếu tố chính (2 gốc rễ, 2 đế, 3 mối nối, 3 luân, 20 yếu tố...).</p>
    <svg viewBox="0 0 720 720" style="width:100%;height:auto;display:block" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="dkarr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#c8471f"/>
        </marker>
      </defs>
      <circle cx="${C}" cy="${C}" r="${R}" fill="none" stroke="#d8c9b2" stroke-width="2.5" stroke-dasharray="3 7"/>
      ${arrows}
      ${nodes}
      <g class="dkc" onclick="openDKCenterSheet()">
        <circle cx="${C}" cy="${C}" r="118" fill="#96651f" stroke="#7a5218" stroke-width="3" class="dk-shape"/>
        <text x="${C}" y="${C-30}" text-anchor="middle" font-size="26" font-weight="800" fill="#fff">VÔ MINH · ÁI</text>
        <text x="${C}" y="${C+2}" text-anchor="middle" font-size="15.5" fill="#f5e4c3">hai gốc rễ của luân hồi</text>
        <text x="${C}" y="${C+34}" text-anchor="middle" font-size="15.5" fill="#f5e4c3">Paṭicca-samuppāda</text>
        <text x="${C}" y="${C+62}" text-anchor="middle" font-size="13.5" fill="#e8d1a5">(chạm để xem các yếu tố chính)</text>
      </g>
    </svg>
    <div class="qbtn-row" style="justify-content:center">
      <button class="qbtn" style="border-color:#b34a32;color:#8a2f18" onclick="openDKQuarterSheet(1)">P1 · 5 nhân quá khứ</button>
      <button class="qbtn" style="border-color:#4c7a3a;color:#33591f" onclick="openDKQuarterSheet(2)">P2 · 5 quả hiện tại</button>
      <button class="qbtn" style="border-color:#b07a1f;color:#7c550e" onclick="openDKQuarterSheet(3)">P3 · 5 nhân hiện tại</button>
      <button class="qbtn" style="border-color:#6b4fa0;color:#4b3380" onclick="openDKQuarterSheet(4)">P4 · 5 quả vị lai</button>
    </div>
    <p class="info-note" style="margin-top:4px"><b>Màu 4 phần:</b> <span style="color:#b34a32">■</span> Nhân quá khứ (Vô minh, Hành) · <span style="color:#4c7a3a">■</span> Quả hiện tại (Thức → Thọ) · <span style="color:#b07a1f">■</span> Nhân hiện tại (Ái, Thủ, Hữu) · <span style="color:#6b4fa0">■</span> Quả vị lai (Sanh, Già chết).<br>Chi pháp theo Đường Vào Thắng Pháp (TK Chánh Minh); giảng giải theo tài liệu truyền thống Mogok.</p>
  `;
}

function openDKQuarterSheet(q){
  const d = DK_QUARTER[q];
  document.getElementById('sheet-content').innerHTML = `
    <div class="sheet-head"><h2>${d.ten}</h2></div>
    <p class="sheet-pali">${d.de}</p>
    <div class="sec"><div class="sec-label">Nội dung</div><div class="sec-body">${d.body}</div></div>
  `;
  document.getElementById('sheet').classList.add('show');
  document.getElementById('sheet-backdrop').classList.add('show');
}

function openDKCenterSheet(){
  document.getElementById('sheet-content').innerHTML = `
    <div class="sheet-head"><h2>Vô Minh – Ái: hai gốc rễ</h2></div>
    <p class="sheet-pali">Avijjā · Taṇhā — Các yếu tố chính trong lược đồ</p>
    <div class="sec"><div class="sec-label">1 · Hai gốc rễ</div><div class="sec-body"><b>Vô Minh</b> (Avijjā) — gốc rễ của quá khứ, và <b>Tham Ái</b> (Taṇhā) — gốc rễ của hiện tại.</div></div>
    <div class="sec"><div class="sec-label">2 · Hai đế</div><div class="sec-body"><b>Tập Đế</b> (Samudaya Saccā): phần 1 và 3 (nhân). <b>Khổ Đế</b> (Dukkha Saccā): phần 2 và 4 (quả).</div></div>
    <div class="sec"><div class="sec-label">3 · Bốn phần</div><div class="sec-body">Nhân Quá Khứ → Quả Hiện Tại; Nhân Hiện Tại → Quả Tương Lai.</div></div>
    <div class="sec"><div class="sec-label">4 · Ba mối nối</div><div class="sec-body">Hành – Thức · Thọ – Ái · Nghiệp Hữu – Sanh.</div></div>
    <div class="sec"><div class="sec-label">5 · Ba luân</div><div class="sec-body"><b>Phiền Não Luân</b> (Kilesavaṭṭa): Vô Minh, Lục Ái, Tứ Thủ.<br><b>Nghiệp Luân</b> (Kammavaṭṭa): Nghiệp Hữu và Hành.<br><b>Quả Luân</b> (Vipākavaṭṭa) — 8: Sanh Hữu, Thức, Danh-Sắc, Lục Nhập, Lục Xúc, Lục Thọ, Sanh, Già Chết.</div></div>
    <div class="sec"><div class="sec-label">6 · Ba thời</div><div class="sec-body">Quá Khứ · Hiện Tại · Tương Lai.</div></div>
    <div class="sec"><div class="sec-label">7 · Hai mươi yếu tố</div><div class="sec-body"><b>5 nhân quá khứ:</b> Vô Minh, Hành, Ái, Thủ, Nghiệp Hữu.<br><b>5 quả hiện tại:</b> Thức, Danh-Sắc, Lục Nhập, Xúc, Thọ.<br><b>5 nhân hiện tại:</b> Ái, Thủ, Nghiệp Hữu, Vô Minh, Hành.<br><b>5 quả tương lai:</b> Thức, Danh-Sắc, Lục Nhập, Xúc, Thọ.</div></div>
  `;
  document.getElementById('sheet').classList.add('show');
  document.getElementById('sheet-backdrop').classList.add('show');
}

function openDuyenKhoiSheet(i){
  const d = DUYENKHOI_DATA[i];
  let extraHtml = '';
  if(d.extra){
    extraHtml = `<div class="sec" style="margin-top:14px"><div class="sec-label">Sanh duyên sầu · bi · khổ · ưu · não</div><div class="sec-body">` +
      d.extra.map(([t,p,c])=>`<div style="margin-bottom:7px"><b>${t}</b> <i>(${p})</i>: ${c}</div>`).join('') +
      `</div></div>`;
  }
  const html = `
    <div class="sheet-head"><h2>${i+1}. ${d.ten}</h2></div>
    <p class="sheet-pali">${d.pali}</p>
    <div class="sec"><div class="sec-label">Chi pháp</div><div class="sec-body">${d.chiphap}</div></div>
    ${d.mogok ? `<div class="sec" style="margin-top:12px"><div class="sec-label">Giảng giải (truyền thống Mogok)</div><div class="sec-body">${d.mogok}</div></div>` : ''}
    <div class="info-note" style="margin-top:10px"><b>Duyên:</b> ${d.duyen}</div>
    ${extraHtml}
  `;
  document.getElementById('sheet-content').innerHTML = html;
  document.getElementById('sheet').classList.add('show');
  document.getElementById('sheet-backdrop').classList.add('show');
}

// ===== Trang "24 Duyên hệ" (Paṭṭhāna) =====
// Định nghĩa tóm tắt + chi pháp năng duyên / sở duyên (kèm phi sở duyên)
// theo "Khái lược Duyên Hệ" — Tỳ khưu Chánh Minh.

const DUYENHE_DATA = [
 {ten:'Nhân duyên', pali:'Hetupaccaya',
  dn:'Trợ sinh, giúp đỡ bằng <b>nhân tương ưng</b> — ủng hộ các pháp như <b>gốc rễ</b> làm cây vững vàng.',
  nang:'6 nhân: Tham, Sân, Si, Vô tham, Vô sân, Vô si (phân rộng: 9 nhân — 3 bất thiện, 3 thiện, 3 vô ký).',
  so:'103 tâm hữu nhân + 52 tâm sở (trừ Si trong 2 tâm Si) + sắc nghiệp tục sinh + sắc tâm hữu nhân.',
  phiso:'18 tâm vô nhân + 12 tâm sở hợp; Si trong 2 tâm Si; sắc tâm vô nhân, sắc nghiệp bình nhật, sắc nghiệp Vô tưởng, sắc khí hậu, sắc vật thực.'},
 {ten:'Cảnh duyên', pali:'Ārammaṇapaccaya',
  dn:'Trợ sinh bằng cách <b>làm cảnh</b> cho tâm nhận biết — pháp nào bị tâm biết, pháp ấy là cảnh.',
  nang:'Tất cả pháp khi bị tâm biết: 121 tâm + 52 tâm sở + 28 sắc pháp + Níp-bàn + chế định.',
  so:'Tâm + tâm sở khi biết cảnh.',
  phiso:'Sắc pháp + Níp-bàn + chế định (không biết cảnh).'},
 {ten:'Trưởng duyên', pali:'Adhipatipaccaya',
  dn:'Trợ sinh và ủng hộ bằng cách <b>lớn trội, dẫn đầu</b> — ví như Đức vua với quần thần.',
  subs:[
   {ten:'Cảnh trưởng duyên', pali:'Ārammaṇādhipatipaccaya',
    dn:'Cảnh rất tốt "dẫn dắt" tâm, tâm bị cảnh ràng buộc.',
    nang:'Níp-bàn + 18 sắc thành tựu thành cảnh tốt + 116 tâm (trừ 2 Sân, 2 Si, Thân thức thọ khổ) + 47 tâm sở (trừ 4 Sân phần + Hoài nghi).',
    so:'40 tâm Siêu thế + 8 tâm Tham + 8 Đại thiện + 4 Đại hạnh hợp trí + 45 tâm sở hợp.'},
   {ten:'Đồng sinh trưởng duyên', pali:'Sahajātādhipatipaccaya',
    dn:'Một trong 4 pháp trưởng (Dục, Cần, Tâm, Thẩm/Trí) làm chủ đạo — mỗi thời điểm chỉ một pháp làm trưởng.',
    nang:'Tâm sở Dục / tâm sở Cần / Tâm (84 đổng lực đa nhân) / tâm sở Trí — pháp đang làm trưởng.',
    so:'52 tâm đổng lực nhị–tam nhân + 52 tâm sở (trừ pháp đang làm trưởng) + sắc tâm trưởng.'}
  ]},
 {ten:'Vô gián duyên', pali:'Anantarapaccaya',
  dn:'Tâm + tâm sở vừa diệt trợ cho tâm + tâm sở kế tiếp sinh lên, <b>không có kẽ hở</b>.',
  nang:'Tâm + tâm sở sinh trước vừa diệt (trừ tâm Tử của vị Alahán).',
  so:'Tâm + tâm sở sinh kế sau.',
  phiso:'Sắc pháp + Níp-bàn + chế định.'},
 {ten:'Đẳng vô gián duyên', pali:'Samanantarapaccaya',
  dn:'Như Vô gián duyên, nhấn mạnh sự <b>khít khao hoàn toàn</b> — <b>trùng chi pháp với Vô gián duyên</b>.',
  nang:'Tâm + tâm sở sinh trước (trừ tâm Tử vị Alahán).',
  so:'Tâm + tâm sở sinh sau.',
  phiso:'Sắc pháp.'},
 {ten:'Đồng sinh duyên', pali:'Sahajātapaccaya',
  dn:'Trợ giúp bằng cách <b>cùng sinh lên</b> — như ngọn lửa với ánh sáng. 4 cách: danh trợ danh, danh trợ sắc, sắc trợ sắc, sắc trợ danh.',
  nang:'Tất cả pháp hữu vi (tục sinh: 15 tâm tục sinh + sắc tục sinh; 4 quả Vô sắc; đoàn sắc mạng quyền cõi Vô tưởng. Bình nhật: tâm + tâm sở + sắc pháp).',
  so:'Tất cả pháp hữu vi (như năng).',
  phiso:'Níp-bàn + chế định.'},
 {ten:'Hổ tương duyên', pali:'Aññamaññapaccaya',
  dn:'Trợ giúp <b>qua lại</b>: năng trợ sở, sở trợ lại năng — như ba cây chụm đầu nương nhau.',
  nang:'Tâm + tâm sở + sắc Tứ đại + sắc Ý vật (tái tục).',
  so:'Như năng duyên.',
  phiso:'Sắc y sinh (nhất định); sắc Ý vật thời bình nhật (bất định).'},
 {ten:'Y duyên', pali:'Nissayapaccaya',
  dn:'Trợ giúp bằng cách làm <b>chỗ nương nhờ</b> vững vàng — như đất cho cây nương.',
  nang:'Tứ danh uẩn + 6 sắc vật.',
  so:'Tứ danh uẩn.',
  phiso:'Sắc pháp.',
  subs:[
   {ten:'Đồng sinh y duyên', pali:'Sahajātanissayapaccaya', dn:'Nương pháp cùng sinh — <b>trùng Đồng sinh duyên</b>.'},
   {ten:'Vật sinh tiền y duyên', pali:'Vatthupurejātanissayapaccaya',
    dn:'Sắc vật sinh trước làm chỗ nương cho tâm sinh sau.',
    nang:'6 sắc vật sinh trước, đang hiện hữu.',
    so:'Tâm nương vật sinh sau (117 tâm, trừ 4 quả Vô sắc).'},
   {ten:'Vật-cảnh sinh tiền y duyên', pali:'Vatthārammaṇapurejātanissayapaccaya',
    dn:'Trong lộ cận tử: sắc Ý vật vừa là chỗ nương vừa là cảnh.',
    nang:'Sắc Ý vật sinh ở sát-na sinh của hữu phần thứ 16 kể từ tâm Tử lui lại.',
    so:'32 tâm khách lộ tử (Hướng ý môn + 29 đổng lực dục giới + 2 tâm thông) + 44 tâm sở.'}
  ]},
 {ten:'Cận y duyên', pali:'Upanissayapaccaya',
  dn:'Làm chỗ nương <b>rất vững chắc, có sức mạnh lớn</b> — Y duyên như đất, Cận y như mưa thuận gió hòa giúp cây lớn mạnh.',
  subs:[
   {ten:'Cảnh cận y duyên', pali:'Ārammaṇūpanissayapaccaya', dn:'Cảnh rất vững mạnh — <b>chi pháp giống Cảnh trưởng duyên</b> (trưởng: khía cạnh quan trọng; cận y: khía cạnh sức mạnh).'},
   {ten:'Vô gián cận y duyên', pali:'Anantarūpanissayapaccaya', dn:'Liên tiếp rất vững mạnh — <b>chi pháp giống Vô gián duyên</b>, như dòng nước chảy xiết.'},
   {ten:'Thường cận y duyên', pali:'Pakatūpanissayapaccaya',
    dn:'Trợ giúp vững mạnh theo <b>thói quen tự nhiên</b> do thường làm — duyên có phạm vi rộng nhất.',
    nang:'Tâm + tâm sở + sắc pháp + chế định có sức mạnh, cả 3 thời (trừ chế định nghiệp xứ).',
    so:'Tâm + tâm sở sinh sau.',
    phiso:'Sắc pháp.'}
  ]},
 {ten:'Sinh tiền duyên', pali:'Purejātapaccaya',
  dn:'Trợ giúp bằng cách <b>sinh ra trước và đang hiện hữu</b> (sát-na trụ).',
  subs:[
   {ten:'Vật sinh tiền duyên', pali:'Vatthupurejātapaccaya', dn:'<b>Như Vật sinh tiền y duyên</b> (xem Y duyên).'},
   {ten:'Vật-cảnh sinh tiền duyên', pali:'Vatthārammaṇapurejātapaccaya', dn:'<b>Như Vật-cảnh sinh tiền y duyên</b> (xem Y duyên).'},
   {ten:'Cảnh sinh tiền duyên', pali:'Ārammaṇapurejātapaccaya',
    dn:'Sắc sinh trước, đang hiện hữu, làm <b>cảnh</b> cho tâm sinh sau.',
    nang:'18 sắc thành tựu sinh trước, đang làm cảnh hiện tại.',
    so:'Nhất định: ngũ song thức + Ý giới. Bất định: 41 tâm Dục giới + 2 tâm thông + 50 tâm sở (trừ Vô lượng phần).',
    phiso:'Nhất định: sắc pháp + 27 tâm Đáo đại + 40 Siêu thế. Bất định: 41 tâm Dục giới khi không bắt 18 sắc làm cảnh.'}
  ]},
 {ten:'Sinh hậu duyên', pali:'Pacchājātapaccaya',
  dn:'Tâm <b>sinh sau</b> trợ cho sắc sinh trước được vững mạnh — như mưa đến sau giúp cây gieo trước.',
  nang:'117 tâm sinh sau (từ hữu phần thứ 1; trừ 4 quả Vô sắc) + tâm sở hợp.',
  so:'Sắc do 3–4 nhân sinh đang ở sát-na trụ, đồng sinh với tâm trước.',
  phiso:'121 tâm + tâm sở; sắc ở sát-na sinh; sắc tâm + sắc nghiệp tục sinh; sắc ngoại, sắc nghiệp Vô tưởng.'},
 {ten:'Tập hành duyên', pali:'Āsevanapaccaya',
  dn:'Trợ giúp bằng cách <b>lập đi lập lại</b> làm thuần thục — chỉ nơi các sát-na <b>đổng lực</b> thiện, bất thiện, duy tác.',
  nang:'47 đổng lực hiệp thế sát-na trước (trừ đổng lực cuối của lộ).',
  so:'67 đổng lực sinh nối tiếp — 47 hiệp thế + 20 tâm Đạo (trừ đổng lực thứ nhất).',
  phiso:'Đổng lực thứ 1; 2 tâm hướng môn; 52 tâm quả; sắc pháp.'},
 {ten:'Nghiệp duyên', pali:'Kammapaccaya',
  dn:'Trợ giúp bằng cách <b>tạo tác</b> — nghiệp chính là <b>tâm sở Tư</b> (cetanā).',
  subs:[
   {ten:'Đồng sinh nghiệp duyên', pali:'Sahajātakammapaccaya',
    dn:'Tâm sở Tư điều phối các pháp đồng sinh.',
    nang:'Tâm sở Tư trong tất cả tâm.',
    so:'Tâm + 51 tâm sở (trừ Tư) + sắc tâm + sắc nghiệp tục sinh.'},
   {ten:'Vô gián nghiệp duyên', pali:'Anantarakammapaccaya',
    dn:'Tư trong tâm Đạo trợ liền cho quả Siêu thế, không gián đoạn.',
    nang:'Tâm sở Tư trong 20 tâm Đạo.',
    so:'20 tâm quả Siêu thế + 36 tâm sở, sinh kế tục tâm Đạo.'},
   {ten:'Dị thời nghiệp duyên', pali:'Nānakkhaṇikakammapaccaya',
    dn:'Tư đã diệt trợ quả <b>khác thời</b> — "nghiệp báo nhân quả" thông thường.',
    nang:'Tâm sở Tư trong tâm thiện, bất thiện (quá khứ).',
    so:'Sắc nghiệp + tâm quả và tâm sở hợp (trừ Tư).',
    phiso:'Tâm thiện, bất thiện, duy tác + sắc tâm, sắc ngoại, sắc vật thực, sắc khí hậu.'}
  ]},
 {ten:'Quả duyên', pali:'Vipākapaccaya',
  dn:'Pháp <b>quả của nghiệp</b> trợ giúp bằng sự "thành tựu yên lặng", không cần nỗ lực.',
  nang:'52 tâm quả + 38 tâm sở hợp.',
  so:'52 tâm quả + 38 tâm sở (khi không làm năng) + sắc nghiệp tục sinh + sắc tâm quả (trừ 2 sắc biểu tri).',
  phiso:'Tâm thiện, bất thiện, duy tác + tâm sở; sắc nghiệp bình nhật, sắc nghiệp Vô tưởng, sắc ngoại, sắc khí hậu, sắc vật thực.'},
 {ten:'Vật thực duyên', pali:'Āhārapaccaya',
  dn:'Trợ giúp bằng cách <b>mang dưỡng tố vào, nuôi dưỡng cho tồn tại vững mạnh</b> (Tứ thực).',
  subs:[
   {ten:'Sắc vật thực duyên', pali:'Rūpāhārapaccaya',
    dn:'Dưỡng tố (ojā) nuôi dưỡng sắc pháp.',
    nang:'Sắc vật thực nội và ngoại.',
    so:'Sắc do vật thực tạo + các sắc đồng nhóm.'},
   {ten:'Danh vật thực duyên', pali:'Nāmāhārapaccaya',
    dn:'3 danh thực trợ các danh pháp đồng sinh.',
    nang:'Xúc thực (tâm sở Xúc), Thức thực (tâm), Tư niệm thực (tâm sở Tư).',
    so:'Tâm + tâm sở + sắc tâm + sắc nghiệp tục sinh.'}
  ]},
 {ten:'Quyền duyên', pali:'Indriyapaccaya',
  dn:'Trợ giúp bằng cách <b>cai quản, điều hành</b> trong lãnh vực riêng — năng duyên là 20 quyền (trừ Nữ, Nam quyền).',
  subs:[
   {ten:'Đồng sinh quyền duyên', pali:'Sahajātindriyapaccaya',
    dn:'8 danh quyền kiểm soát pháp đồng sinh.',
    nang:'Tâm (ý quyền) + Thọ + Mạng quyền danh + Tín, Cần, Niệm, Nhất hành, Trí.',
    so:'Tâm + 52 tâm sở + sắc tục sinh + sắc tâm.'},
   {ten:'Quyền sinh tiền duyên', pali:'Purejātindriyapaccaya',
    dn:'5 sắc thần kinh sinh trước cai quản tâm nương.',
    nang:'5 sắc thần kinh ở sát-na thứ 26 (trung thọ).',
    so:'Ngũ song thức + 7 tâm sở hợp.'},
   {ten:'Sắc mạng quyền duyên', pali:'Rūpajīvitindriyapaccaya',
    dn:'Sắc Mạng quyền duy trì tuổi thọ sắc nghiệp đồng bọn.',
    nang:'Tất cả sắc Mạng quyền.',
    so:'Các bọn sắc nghiệp sinh chung (9 bọn).'}
  ]},
 {ten:'Thiền duyên', pali:'Jhānapaccaya',
  dn:'Trợ giúp bằng cách <b>chăm chú vào đối tượng</b> hay <b>thiêu đốt pháp nghịch</b> (7 chi thiền, thực tính 5 pháp).',
  nang:'Tầm, Tứ, Hỷ, Thọ, Nhất hành trong 103 tâm (trừ 18 tâm vô nhân).',
  so:'103 tâm + 52 tâm sở (trừ chi thiền đang làm năng) + sắc nghiệp tục sinh + sắc tâm.',
  phiso:'Ngũ song thức + 7 tâm sở + sắc nghiệp bình nhật + sắc ngoại + sắc vật thực + sắc âm dương + sắc nghiệp Vô tưởng.'},
 {ten:'Đạo duyên', pali:'Maggapaccaya',
  dn:'Trợ giúp <b>như con đường</b> — tà đạo dẫn khổ cảnh, chánh đạo dẫn lạc cảnh và Níp-bàn (9 chi pháp thực tính).',
  nang:'Trí, Tầm, Chánh ngữ, Chánh nghiệp, Chánh mạng, Cần, Niệm, Nhất hành, Tà kiến — trong tâm hữu nhân.',
  so:'103 tâm hữu nhân + 52 tâm sở + sắc tâm hữu nhân + sắc nghiệp tục sinh với tâm hữu nhân.',
  phiso:'18 tâm vô nhân + 12 tâm sở + sắc ngoại, sắc âm dương, sắc vật thực, sắc nghiệp bình nhật, sắc nghiệp Vô tưởng, sắc tâm vô nhân.'},
 {ten:'Tương ưng duyên', pali:'Sampayuttapaccaya',
  dn:'Trợ giúp theo cách <b>hòa hợp</b> (đồng sinh, đồng diệt, đồng cảnh, đồng vật) — chỉ danh với danh, như nước hòa sữa.',
  nang:'Tất cả tâm và tâm sở đồng sinh.',
  so:'Như năng duyên.',
  phiso:'Sắc pháp + Níp-bàn + chế định.'},
 {ten:'Bất tương ưng duyên', pali:'Vippayuttapaccaya',
  dn:'Trợ giúp bằng cách <b>không hòa hợp</b> — giữa danh và sắc, như nước trên lá sen.',
  subs:[
   {ten:'Đồng sinh bất tương ưng duyên', pali:'Sahajātavippayuttapaccaya',
    dn:'Danh trợ sắc cùng sinh (và Ý vật tái tục trợ tâm tái tục).',
    nang:'107 tâm (trừ ngũ song thức + 4 quả Vô sắc) + tâm sở; sắc Ý vật tái tục.',
    so:'Sắc tâm, sắc nghiệp tục sinh; tâm tái tục cõi ngũ uẩn.'},
   {ten:'Sinh hậu bất tương ưng duyên', pali:'Pacchājātavippayuttapaccaya', dn:'<b>Như Sinh hậu duyên</b>.'},
   {ten:'Vật sinh tiền bất tương ưng duyên', pali:'Vatthupurejātavippayuttapaccaya', dn:'<b>Như Vật sinh tiền (y) duyên</b>.'},
   {ten:'Vật-cảnh sinh tiền bất tương ưng duyên', pali:'Vatthārammaṇapurejātavippayuttapaccaya', dn:'<b>Như Vật-cảnh sinh tiền (y) duyên</b>.'}
  ]},
 {ten:'Hiện hữu duyên', pali:'Atthipaccaya',
  dn:'Trợ giúp theo phương cách <b>"đang tồn tại"</b> — năng và sở cùng hiện hữu (7 trường hợp).',
  nang:'Tổng hợp năng duyên của 6 duyên thành phần.',
  so:'Tổng hợp sở duyên của 6 duyên thành phần.',
  subs:[
   {ten:'Đồng sinh hiện hữu duyên', pali:'Sahajātatthipaccaya', dn:'<b>Tức Đồng sinh duyên</b>.'},
   {ten:'Cảnh sinh tiền hiện hữu duyên', pali:'Ārammaṇapurejātatthipaccaya', dn:'<b>Tức Cảnh sinh tiền duyên</b>.'},
   {ten:'Vật sinh tiền hiện hữu duyên', pali:'Vatthupurejātatthipaccaya', dn:'<b>Tức Vật sinh tiền y duyên</b>.'},
   {ten:'Sinh hậu hiện hữu duyên', pali:'Pacchājātatthipaccaya', dn:'<b>Tức Sinh hậu duyên</b>.'},
   {ten:'Vật thực hiện hữu duyên', pali:'Āhāratthipaccaya', dn:'<b>Tức Sắc vật thực duyên</b>.'},
   {ten:'Quyền hiện hữu duyên', pali:'Indriyatthipaccaya', dn:'<b>Tức Sắc mạng quyền duyên</b>.'}
  ]},
 {ten:'Vô hữu duyên', pali:'Natthipaccaya',
  dn:'Trợ giúp bằng cách <b>"vắng mặt"</b>: pháp vô sắc vừa diệt nhường chỗ cho pháp mới sinh — <b>trùng chi pháp Vô gián duyên</b>.',
  nang:'Tâm + tâm sở vừa diệt (trừ tâm Tử vị Alahán).',
  so:'Tâm + tâm sở sinh kế sau.',
  phiso:'Sắc pháp.'},
 {ten:'Ly duyên', pali:'Vigatapaccaya',
  dn:'Trợ giúp bằng cách <b>"lìa nhau, diệt mất"</b> — <b>chi pháp tương tự Vô hữu duyên</b>.',
  nang:'Tâm + tâm sở vừa diệt, lìa đi (trừ tâm Tử vị Alahán).',
  so:'Tâm + tâm sở sinh kế sau.',
  phiso:'Sắc pháp.'},
 {ten:'Bất ly duyên', pali:'Avigatapaccaya',
  dn:'Trợ giúp bằng cách <b>"không xa lìa"</b> — pháp đang còn, không diệt mất — <b>chi pháp tương tự Hiện hữu duyên</b>.',
  nang:'Như Hiện hữu duyên.',
  so:'Như Hiện hữu duyên.'}
];

function dhChiphapRows(d){
  let h = '';
  if(d.nang) h += `<div style="margin-bottom:6px"><b>Năng duyên:</b> ${d.nang}</div>`;
  if(d.so) h += `<div style="margin-bottom:6px"><b>Sở duyên:</b> ${d.so}</div>`;
  if(d.phiso) h += `<div style="margin-bottom:6px"><b>Phi sở duyên:</b> ${d.phiso}</div>`;
  return h;
}

function renderDuyenHePage(){
  const extra = document.getElementById('extra-content');
  let circles = '';
  DUYENHE_DATA.forEach((d,i)=>{
    circles += `<div class="circle circle-dh" onclick="openDuyenHeSheet(${i})">
      <div class="cp" style="font-weight:800">${i+1}</div>
      <div class="cn">${d.ten.replace(' duyên','')}</div>
      <div class="cp">${d.pali.replace('paccaya','').replace('paccayo','')}</div>
    </div>`;
  });
  extra.innerHTML = `
    <p class="info-note" style="margin-bottom:8px">24 duyên trong bộ Paṭṭhāna. Chạm 1 lần để chọn, chạm lần 2 để xem <b>định nghĩa tóm tắt</b> và <b>chi pháp năng duyên – sở duyên</b> (kèm phi sở duyên). Duyên nào phân rộng sẽ có chi pháp của từng duyên phụ.</p>
    <div class="circle-grid">${circles}</div>
    <p class="info-note" style="margin-top:10px"><b>5 đôi đặc trưng:</b> Vô gián – Đẳng vô gián (nghĩa lý đồng nhau) · Y – Cận y (âm thanh đồng nhau) · Sinh tiền – Sinh hậu (nghịch thời) · Tương ưng – Bất tương ưng (nghịch cách) · Nhân – Quả (nhân quả).<br>Nguồn: "Khái lược Duyên Hệ" — Tỳ khưu Chánh Minh.</p>
  `;
}

function openDuyenHeSheet(i){
  const d = DUYENHE_DATA[i];
  let html = `
    <div class="sheet-head"><h2>${i+1}. ${d.ten}</h2></div>
    <p class="sheet-pali">${d.pali}</p>
    <div class="sec"><div class="sec-label">Định nghĩa</div><div class="sec-body">${d.dn}</div></div>
  `;
  if(d.nang || d.so || d.phiso){
    html += `<div class="sec" style="margin-top:12px"><div class="sec-label">Chi pháp</div><div class="sec-body">${dhChiphapRows(d)}</div></div>`;
  }
  if(d.subs){
    html += `<div class="sec" style="margin-top:12px"><div class="sec-label">Phân rộng thành ${d.subs.length} duyên</div></div>`;
    for(const s of d.subs){
      html += `<div class="group-head" style="margin-top:10px">${s.ten} <i style="font-weight:400">(${s.pali})</i></div>
        <div class="sec-body" style="margin-top:4px">${s.dn}</div>`;
      if(s.nang || s.so || s.phiso){
        html += `<div class="sec-body" style="margin-top:6px">${dhChiphapRows(s)}</div>`;
      }
    }
  }
  document.getElementById('sheet-content').innerHTML = html;
  document.getElementById('sheet').classList.add('show');
  document.getElementById('sheet-backdrop').classList.add('show');
}

// ===== (Trang 22 Quyền) 4 bảng tổng quát =====
function qList(arr){ return arr.map(d=>`${d.id}. ${d.ten} <i style="color:var(--ink-soft)">(${d.pali.split(' ')[0]})</i>`).join('<br>'); }

function openQuyenDanhSac(){
  const sac = QUYEN_DATA.filter(d=>d.sacdanh==='sac');
  const danh = QUYEN_DATA.filter(d=>d.sacdanh==='danh');
  const dacbiet = QUYEN_DATA.filter(d=>d.sacdanh!=='sac' && d.sacdanh!=='danh');
  showAttrSheet(`
    <div class="sheet-head"><h2>Danh quyền · Sắc quyền</h2></div>
    <p class="sheet-pali">Phân 22 quyền theo Danh – Sắc</p>
    <div class="sec"><div class="sec-label">Sắc quyền (${sac.length})</div><div class="sec-body">${qList(sac)}</div></div>
    <div class="sec" style="margin-top:12px"><div class="sec-label">Danh quyền (${danh.length})</div><div class="sec-body">${qList(danh)}</div></div>
    ${dacbiet.length?`<div class="sec" style="margin-top:12px"><div class="sec-label">Đặc biệt: cả Sắc lẫn Danh (${dacbiet.length})</div><div class="sec-body">${qList(dacbiet)} — Mạng quyền có 2 chi pháp: sắc mạng quyền và danh mạng quyền (tâm sở Mạng quyền).</div></div>`:''}
  `);
}

function openQuyenCoi(){
  const groups = {};
  QUYEN_DATA.forEach(d=>{ (groups[d.coi_label]=groups[d.coi_label]||[]).push(d); });
  let html = `<div class="sheet-head"><h2>Địa vức (Cõi)</h2></div><p class="sheet-pali">Phạm vi có mặt và hoạt động của 22 quyền</p>`;
  for(const [label, arr] of Object.entries(groups)){
    html += `<div class="sec" style="margin-top:12px"><div class="sec-label">${label} (${arr.length})</div><div class="sec-body">${qList(arr)}</div></div>`;
  }
  showAttrSheet(html);
}

function openQuyenChiPhap16(){
  showAttrSheet(`
    <div class="sheet-head"><h2>16 chi pháp chân đế</h2></div>
    <p class="sheet-pali">22 quyền quy nạp về 16 pháp chân đế</p>
    <div class="sec"><div class="sec-body">
      <b>1–5.</b> 5 sắc thần kinh (pasāda-rūpa) — chi pháp của Nhãn, Nhĩ, Tỷ, Thiệt, Thân quyền.<br><br>
      <b>6.</b> Sắc nữ tính (itthibhāva-rūpa) — chi pháp của Nữ quyền.<br><br>
      <b>7.</b> Sắc nam tính (purisabhāva-rūpa) — chi pháp của Nam quyền.<br><br>
      <b>8–9.</b> Sắc mạng quyền (jīvitindriya-rūpa) và tâm sở Mạng quyền (danh) — 2 chi pháp của Mạng quyền.<br><br>
      <b>10.</b> Tâm (citta, cả 121 thứ tâm) — chi pháp của Ý quyền.<br><br>
      <b>11.</b> Tâm sở Thọ (vedanā) — chi pháp của 5 quyền: Lạc, Khổ, Hỷ, Ưu, Xả quyền.<br><br>
      <b>12.</b> Tâm sở Tín — chi pháp của Tín quyền.<br><br>
      <b>13.</b> Tâm sở Cần — chi pháp của Tấn quyền.<br><br>
      <b>14.</b> Tâm sở Niệm — chi pháp của Niệm quyền.<br><br>
      <b>15.</b> Tâm sở Nhất hành (ekaggatā) — chi pháp của Định quyền.<br><br>
      <b>16.</b> Tâm sở Trí tuệ (paññā) — chi pháp của 4 quyền: Tuệ quyền, Tri vị tri quyền, Tri dĩ tri quyền, Tri cụ tri quyền.
    </div></div>
    <p class="info-note">22 quyền nhưng chi pháp chân đế chỉ có 16: vì 5 thọ quyền cùng là tâm sở Thọ, 4 quyền tuệ cùng là tâm sở Trí, và Mạng quyền gồm 2 chi pháp sắc + danh.</p>
  `);
}

function openQuyenDuyenTQ(){
  const groups = {};
  QUYEN_DATA.forEach(d=>{ const k = d.duyen_loai || 'Không làm năng Quyền duyên (Nữ quyền, Nam quyền)'; (groups[k]=groups[k]||[]).push(d); });
  let html = `<div class="sheet-head"><h2>Quyền duyên</h2></div><p class="sheet-pali">Indriyapaccaya — vai trò năng duyên của 22 quyền</p>`;
  for(const [label, arr] of Object.entries(groups)){
    html += `<div class="sec" style="margin-top:12px"><div class="sec-label">${label} (${arr.length})</div><div class="sec-body">${qList(arr)}</div></div>`;
  }
  html += `<p class="info-note">Nữ quyền và Nam quyền không làm năng duyên trong Quyền duyên vì không có 3 chức năng: tạo ra – hỗ trợ – duy trì (ví như khuôn bánh không sinh ra, không nuôi bánh).</p>`;
  showAttrSheet(html);
}

// ===== Trang "12 Xứ · 18 Giới" (Āyatana – Dhātu) =====
// Nguồn: tài liệu "12 Xứ & 18 Giới" (Abhidhammattha Saṅgaha — Āyatana-saṅgaha, Dhātu-saṅgaha)

const XU_DATA = [
 {ten:'Nhãn xứ', pali:'Cakkhāyatana', nhom:'noi', chiphap:'Nhãn tịnh sắc (cakkhu-pasāda) — sắc thần kinh nhãn.'},
 {ten:'Nhĩ xứ', pali:'Sotāyatana', nhom:'noi', chiphap:'Nhĩ tịnh sắc (sota-pasāda) — sắc thần kinh nhĩ.'},
 {ten:'Tỷ xứ', pali:'Ghānāyatana', nhom:'noi', chiphap:'Tỷ tịnh sắc (ghāna-pasāda) — sắc thần kinh tỷ.'},
 {ten:'Thiệt xứ', pali:'Jivhāyatana', nhom:'noi', chiphap:'Thiệt tịnh sắc (jivhā-pasāda) — sắc thần kinh thiệt.'},
 {ten:'Thân xứ', pali:'Kāyāyatana', nhom:'noi', chiphap:'Thân tịnh sắc (kāya-pasāda) — sắc thần kinh thân.'},
 {ten:'Ý xứ', pali:'Manāyatana', nhom:'noi', chiphap:'Toàn bộ <b>89 (hay 121) tâm</b>. Trong 18 Giới, Ý xứ được tách thành 7 giới về thức: 5 đôi thức giới + Ý giới + Ý thức giới.'},
 {ten:'Sắc xứ', pali:'Rūpāyatana', nhom:'ngoai', chiphap:'Sắc cảnh — hình sắc, màu sắc (đối tượng của nhãn thức).'},
 {ten:'Thinh xứ', pali:'Saddāyatana', nhom:'ngoai', chiphap:'Thinh cảnh — âm thanh (đối tượng của nhĩ thức).'},
 {ten:'Khí xứ', pali:'Gandhāyatana', nhom:'ngoai', chiphap:'Khí cảnh — mùi (đối tượng của tỷ thức).'},
 {ten:'Vị xứ', pali:'Rasāyatana', nhom:'ngoai', chiphap:'Vị cảnh — mùi vị (đối tượng của thiệt thức).'},
 {ten:'Xúc xứ', pali:'Phoṭṭhabbāyatana', nhom:'ngoai', chiphap:'3 pháp: <b>địa đại, hỏa đại, phong đại</b> (đất – lửa – gió), đối tượng của thân thức. (Thủy đại thuộc sắc tế, không xúc chạm được.)'},
 {ten:'Pháp xứ', pali:'Dhammāyatana', nhom:'ngoai', chiphap:'<b>69 pháp</b>: 52 tâm sở + 16 sắc tế (sukhuma-rūpa) + Níp-bàn — đồng phạm vi với Pháp giới.'}
];

const GIOI_DATA = [
 {ten:'Nhãn giới', pali:'Cakkhu-dhātu', nhom:'can', chiphap:'1 pháp: nhãn tịnh sắc (cakkhu-pasāda).'},
 {ten:'Sắc giới', pali:'Rūpa-dhātu', nhom:'canh', chiphap:'1 pháp: sắc cảnh (hình sắc, màu sắc).'},
 {ten:'Nhãn thức giới', pali:'Cakkhu-viññāṇa-dhātu', nhom:'thuc', chiphap:'2 tâm: Nhãn thức quả thiện + Nhãn thức quả bất thiện.'},
 {ten:'Nhĩ giới', pali:'Sota-dhātu', nhom:'can', chiphap:'1 pháp: nhĩ tịnh sắc (sota-pasāda).'},
 {ten:'Thinh giới', pali:'Sadda-dhātu', nhom:'canh', chiphap:'1 pháp: thinh cảnh (âm thanh).'},
 {ten:'Nhĩ thức giới', pali:'Sota-viññāṇa-dhātu', nhom:'thuc', chiphap:'2 tâm: Nhĩ thức quả thiện + Nhĩ thức quả bất thiện.'},
 {ten:'Tỷ giới', pali:'Ghāna-dhātu', nhom:'can', chiphap:'1 pháp: tỷ tịnh sắc (ghāna-pasāda).'},
 {ten:'Khí giới', pali:'Gandha-dhātu', nhom:'canh', chiphap:'1 pháp: khí cảnh (mùi).'},
 {ten:'Tỷ thức giới', pali:'Ghāna-viññāṇa-dhātu', nhom:'thuc', chiphap:'2 tâm: Tỷ thức quả thiện + Tỷ thức quả bất thiện.'},
 {ten:'Thiệt giới', pali:'Jivhā-dhātu', nhom:'can', chiphap:'1 pháp: thiệt tịnh sắc (jivhā-pasāda).'},
 {ten:'Vị giới', pali:'Rasa-dhātu', nhom:'canh', chiphap:'1 pháp: vị cảnh (mùi vị).'},
 {ten:'Thiệt thức giới', pali:'Jivhā-viññāṇa-dhātu', nhom:'thuc', chiphap:'2 tâm: Thiệt thức quả thiện + Thiệt thức quả bất thiện.'},
 {ten:'Thân giới', pali:'Kāya-dhātu', nhom:'can', chiphap:'1 pháp: thân tịnh sắc (kāya-pasāda).'},
 {ten:'Xúc giới', pali:'Phoṭṭhabba-dhātu', nhom:'canh', chiphap:'3 pháp: địa đại, hỏa đại, phong đại (đất – lửa – gió).'},
 {ten:'Thân thức giới', pali:'Kāya-viññāṇa-dhātu', nhom:'thuc', chiphap:'2 tâm: Thân thức quả thiện (thọ lạc) + Thân thức quả bất thiện (thọ khổ).'},
 {ten:'Ý giới', pali:'Mano-dhātu', nhom:'thuc', chiphap:'<b>3 tâm</b> tiếp nhận cảnh nơi ngũ môn: tâm Hướng ngũ môn (pañcadvārāvajjana) + 2 tâm Tiếp thâu (sampaṭicchana quả thiện và quả bất thiện).'},
 {ten:'Pháp giới', pali:'Dhamma-dhātu', nhom:'canh', chiphap:'<b>69 pháp</b>: 52 tâm sở + 16 sắc tế (sukhuma-rūpa) + Níp-bàn. Không gồm 12 sắc thô (đã có ở các giới căn – cảnh) và không gồm tâm (đã thuộc 7 giới về thức).'},
 {ten:'Ý thức giới', pali:'Mano-viññāṇa-dhātu', nhom:'thuc', chiphap:'<b>76 tâm</b>: tất cả tâm còn lại = 89 tâm − 10 tâm ngũ song thức (giới 3, 6, 9, 12, 15) − 3 tâm Ý giới (giới 16).'}
];

function renderXuGioiPage(){
  const extra = document.getElementById('extra-content');
  const XGC = {noi:'circle-sac', ngoai:'circle-canh', can:'circle-sac', canh:'circle-canh', thuc:'circle-vt'};
  const xu = (arr, from) => arr.map((d,i)=>{
    const idx = from + i;
    return `<div class="circle ${XGC[d.nhom]}" onclick="openXuSheet(${XU_DATA.indexOf(d)})">
      <div class="cp" style="font-weight:800">${idx}</div><div class="cn">${d.ten}</div><div class="cp">${d.pali.replace('āyatana','')}</div></div>`;
  }).join('');
  const gioi = GIOI_DATA.map((d,i)=>`<div class="circle ${XGC[d.nhom]}" onclick="openGioiSheet(${i})">
      <div class="cp" style="font-weight:800">${i+1}</div><div class="cn">${d.ten}</div><div class="cp">${d.pali.replace('-dhātu','')}</div></div>`).join('');

  extra.innerHTML = `
    <p class="info-note" style="margin-bottom:10px"><b>Xứ (āyatana)</b> và <b>Giới (dhātu)</b> là hai cách phân loại các pháp chân đế (tâm, tâm sở, sắc pháp) nhìn dưới góc độ "cửa ngõ tiếp xúc" và "yếu tố cấu thành kinh nghiệm". 12 Xứ nhóm theo 6 cặp căn – cảnh (nội xứ – ngoại xứ); 18 Giới tách rõ thêm phần <b>thức</b>: phân biệt riêng các loại tâm sinh khởi nơi mỗi căn.</p>
    <div class="group-head">12 Xứ · 6 Nội xứ (ajjhattikāyatana)</div>
    <div class="circle-grid">${xu(XU_DATA.filter(d=>d.nhom==='noi'), 1)}</div>
    <div class="group-head">12 Xứ · 6 Ngoại xứ (bāhirāyatana)</div>
    <div class="circle-grid">${xu(XU_DATA.filter(d=>d.nhom==='ngoai'), 7)}</div>
    <div class="group-head">18 Giới (Dhātu)</div>
    <p class="info-note" style="margin:4px 0 8px">Cấu trúc: 5 nhóm <b>Căn – Cảnh – Thức</b> (giới 1–15, mỗi căn 3 giới) + <b>Ý giới</b> (16) + <b>Pháp giới</b> (17) + <b>Ý thức giới</b> (18). Màu: <span style="color:#3f7cb8">■</span> căn (tịnh sắc) · <span style="color:#2f8d7c">■</span> cảnh · <span style="color:#8258b8">■</span> thức (tâm).</p>
    <div class="circle-grid">${gioi}</div>
    <p class="info-note" style="margin-top:10px">Nguồn: Abhidhammattha Saṅgaha — chương Āyatana-saṅgaha, Dhātu-saṅgaha (tài liệu "12 Xứ & 18 Giới").</p>
  `;
}

function openXuSheet(i){
  const d = XU_DATA[i];
  const nhomLabel = d.nhom==='noi' ? 'Nội xứ (ajjhattikāyatana) — căn bên trong' : 'Ngoại xứ (bāhirāyatana) — cảnh bên ngoài';
  let doichieu = '';
  if(d.ten==='Ý xứ') doichieu = 'Trong 18 Giới, Ý xứ bao quát cả <b>7 giới thuộc về tâm</b>: 5 đôi thức giới (3, 6, 9, 12, 15) + Ý giới (16) + Ý thức giới (18) — tức toàn bộ 89 tâm.';
  else if(d.ten==='Pháp xứ') doichieu = 'Đồng nhất phạm vi với <b>Pháp giới</b> (giới 17): 52 tâm sở + 16 sắc tế + Níp-bàn.';
  else doichieu = 'Tương ứng trực tiếp với giới cùng tên trong 18 Giới (chỉ gồm căn và cảnh, KHÔNG bao gồm thức).';
  showAttrSheet(`
    <div class="sheet-head"><span class="num">${i+1}</span><h2>${d.ten}</h2></div>
    <p class="sheet-pali">${d.pali} · ${nhomLabel}</p>
    <div class="sec"><div class="sec-label">Chi pháp</div><div class="sec-body">${d.chiphap}</div></div>
    <div class="sec" style="margin-top:12px"><div class="sec-label">Đối chiếu với 18 Giới</div><div class="sec-body">${doichieu}</div></div>
  `);
}

function openGioiSheet(i){
  const d = GIOI_DATA[i];
  const NL = {can:'Giới thuộc căn (tịnh sắc)', canh:'Giới thuộc cảnh', thuc:'Giới thuộc thức (tâm)'};
  showAttrSheet(`
    <div class="sheet-head"><span class="num">${i+1}</span><h2>${d.ten}</h2></div>
    <p class="sheet-pali">${d.pali} · ${NL[d.nhom]}</p>
    <div class="sec"><div class="sec-label">Chi pháp / Số pháp</div><div class="sec-body">${d.chiphap}</div></div>
  `);
}

function openXGDoiChieu(){
  showAttrSheet(`
    <div class="sheet-head"><h2>Đối chiếu 12 Xứ ↔ 18 Giới</h2></div>
    <p class="sheet-pali">Āyatana ↔ Dhātu</p>
    <div class="sec"><div class="sec-label">10 xứ căn – cảnh</div><div class="sec-body">Nhãn, Nhĩ, Tỷ, Thiệt, Thân xứ và Sắc, Thinh, Khí, Vị, Xúc xứ tương ứng <b>trực tiếp</b> với 10 giới cùng tên (giới 1, 2, 4, 5, 7, 8, 10, 11, 13, 14) — chỉ gồm căn và cảnh, KHÔNG bao gồm thức.</div></div>
    <div class="sec" style="margin-top:12px"><div class="sec-label">Ý xứ (1 xứ → 7 giới)</div><div class="sec-body">Bao quát cả 7 giới thuộc về tâm: 5 đôi thức giới (3, 6, 9, 12, 15) + Ý giới (16) + Ý thức giới (18) — tức toàn bộ 89 tâm.</div></div>
    <div class="sec" style="margin-top:12px"><div class="sec-label">Pháp xứ (1 xứ = 1 giới)</div><div class="sec-body">Đồng nhất phạm vi với Pháp giới (17): 52 tâm sở + 16 sắc tế + Níp-bàn (69 pháp).</div></div>
    <p class="info-note">Như vậy 12 Xứ mở rộng thành 18 Giới bằng cách tách Ý xứ thành 7 giới về thức: 12 − 1 + 7 = 18.</p>
  `);
}

function openXGTomTat(){
  showAttrSheet(`
    <div class="sheet-head"><h2>Tóm tắt số pháp</h2></div>
    <p class="sheet-pali">Bảng tổng số pháp của hai hệ thống</p>
    <div class="sec"><div class="sec-label">18 Giới → tổng số pháp</div><div class="sec-body">10 sắc thô làm căn + cảnh (giới 1–2, 4–5, 7–8, 10–11, 13) + 3 pháp Xúc giới (giới 14: đất – lửa – gió) + <b>89 tâm</b> (10 ngũ song thức + 3 Ý giới + 76 Ý thức giới) + 52 tâm sở + 16 sắc tế + Níp-bàn (Pháp giới).</div></div>
    <div class="sec" style="margin-top:12px"><div class="sec-label">12 Xứ → tổng số pháp</div><div class="sec-body">10 xứ sắc thô (nội xứ 1–5 + ngoại xứ 7–11, trong đó Xúc xứ gồm 3 pháp) + <b>89 tâm</b> (Ý xứ) + 52 tâm sở + 16 sắc tế + Níp-bàn (Pháp xứ).</div></div>
    <p class="info-note">Cả hai hệ thống đều bao quát toàn bộ thực tại: 28 sắc pháp (12 sắc thô + 16 sắc tế) + 89 tâm + 52 tâm sở + Níp-bàn — chỉ khác cách nhóm.</p>
  `);
}
