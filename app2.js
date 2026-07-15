// ===== Điều phối 3 phần chính của app =====
let currentSection = 'quyen22';
let tamsoMode = 'tam2so';

const CITTA_GROUP_COLOR = {vonhan:'gray', batthien:'coral', ducgioi_tinhhao:'teal', sacgioi:'blue', vosacgioi:'purple', sieuthe:'green'};
const CETASIKA_GROUP_COLOR = {bienhanh:'gray', toitha:'amber', batthien_bh:'coral', batthien_rieng:'pink', tinhhao_bh:'teal', tietche:'blue', voluong:'purple', tuequyen:'green'};
const CETASIKA_GROUP_LABEL = {bienhanh:'Biến hành (7)', toitha:'Tợ tha - Biệt cảnh (6)', batthien_bh:'Bất thiện Biến hành (4)', batthien_rieng:'Bất thiện Riêng biệt (10)', tinhhao_bh:'Tịnh hảo Biến hành (19)', tietche:'Tiết chế (3)', voluong:'Vô lượng (2)', tuequyen:'Tuệ quyền (1)'};
const CETASIKA_GROUP_ORDER = ['bienhanh','toitha','batthien_bh','batthien_rieng','tinhhao_bh','tietche','voluong','tuequyen'];

function renderSectionSwitch(){
  const sections = [['quyen22','22 Quyền'],['tamso','Tâm ↔ Tâm sở'],['dactinh','Đặc tính · Chức năng'],['canh','21 Cảnh'],['duyenkhoi','Duyên khởi'],['duyenhe','24 Duyên hệ']];
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
  if(s==='tamso'||s==='duyenkhoi'){
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
  } else if(s==='duyenkhoi'){
    document.getElementById('page-title').textContent = 'Duyên khởi — Paṭiccasamuppāda';
    document.getElementById('page-subtitle').textContent = 'Chạm vào một chi để xem chi pháp';
    grid.style.display='none';
    legend.style.display='none';
    document.getElementById('nav').innerHTML = '';
    renderDuyenKhoiPage();
  } else if(s==='duyenhe'){
    document.getElementById('page-title').textContent = '24 Duyên hệ — Paṭṭhāna';
    document.getElementById('page-subtitle').textContent = 'Chạm vào một duyên để xem định nghĩa và chi pháp';
    grid.style.display='none';
    legend.style.display='none';
    document.getElementById('nav').innerHTML = '';
    renderDuyenHePage();
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
    <p class="info-note" style="margin-bottom:8px">Vị trí đúng Bảng NÊU. Màu = phạm vi Thọ mà pháp ấy có thể đồng sinh (Khổ=đen, Lạc=vàng, Ưu=nâu, Hỷ=đỏ, Xả=xanh lá). Vòng nét đứt = có thể phát triển Thần thông. Chụm 2 ngón tay để phóng to. Chạm vào 1 ô để xem chi tiết.</p>
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

function buildCittaGroupList(list, badgeSuffix){
  const groupsPresent = [];
  for(const m of list){ if(!groupsPresent.includes(m.group)) groupsPresent.push(m.group); }
  let html = '';
  for(const g of groupsPresent){
    const sub = list.filter(m=>m.group===g);
    const color = CITTA_GROUP_COLOR[g]||'gray';
    html += `<div class="group-head" style="margin-top:10px">${sub[0].groupLabel} (${sub.length})${badgeSuffix||''}</div>`;
    html += sub.map(m=>
      `<div class="combo-item"><div class="combo-badge cat-${color}">●</div><div class="combo-text"><span class="cname">${m.name}</span></div></div>`
    ).join('');
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
      <div class="sec-label">Danh sách ${matching.length} tâm phối hợp${ani?' cố định (niyata)':''}</div>
      <div class="combo-list">${buildCittaGroupList(matching)}</div>
    </div>`;
  }
  if(aniCittas.length>0){
    listHtml += `<div class="sec" style="margin-top:14px">
      <div class="sec-label">${aniCittas.length} tâm có thể phối hợp — bất định (aniyata), chỉ khởi khi có dịp</div>
      <div class="combo-list">${buildCittaGroupList(aniCittas)}</div>
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

// ===== Trang "Duyên khởi" — bánh xe 12 chi Paṭiccasamuppāda =====
// Chi pháp theo bảng "Chi pháp pháp duyên khởi" (Đường Vào Thắng Pháp — TK Chánh Minh)

const DUYENKHOI_DATA = [
 {ten:'Vô minh', pali:'Avijjā',
  duyen:'Vô minh duyên Hành — Avijjāpaccayā saṅkhārā',
  chiphap:'Tâm sở <b>Si</b> hợp trong <b>12 tâm bất thiện</b>.'},
 {ten:'Hành', pali:'Saṅkhāra',
  duyen:'Hành duyên Thức — Saṅkhārapaccayā viññāṇaṃ',
  chiphap:'Tâm sở <b>Tư</b> hợp trong <b>12 tâm bất thiện</b> + <b>17 tâm thiện hiệp thế</b> (gom thành <b>29 Tư</b>).'},
 {ten:'Thức', pali:'Viññāṇa',
  duyen:'Thức duyên Danh sắc — Viññāṇapaccayā nāmarūpaṃ',
  chiphap:'<b>32 tâm quả hiệp thế</b>.'},
 {ten:'Danh sắc', pali:'Nāma-rūpa',
  duyen:'Danh sắc duyên Lục nhập — Nāmarūpapaccayā saḷāyatanaṃ',
  chiphap:'<b>Danh:</b> 35 tâm sở hợp trong 32 tâm quả hiệp thế.<br><b>Sắc:</b> sắc nghiệp tái tục, sắc nghiệp bình nhật, sắc tâm.'},
 {ten:'Lục nhập', pali:'Saḷāyatana',
  duyen:'Lục nhập duyên Xúc — Saḷāyatanapaccayā phasso',
  chiphap:'<b>6 nội xứ:</b> 5 sắc thần kinh + 32 tâm quả hiệp thế (ý xứ).'},
 {ten:'Xúc', pali:'Phassa',
  duyen:'Xúc duyên Thọ — Phassapaccayā vedanā',
  chiphap:'Tâm sở <b>Xúc</b> hợp trong <b>32 tâm quả hiệp thế</b>.'},
 {ten:'Thọ', pali:'Vedanā',
  duyen:'Thọ duyên Ái — Vedanāpaccayā taṇhā',
  chiphap:'Tâm sở <b>Thọ</b> hợp trong <b>32 tâm quả hiệp thế</b>.'},
 {ten:'Ái', pali:'Taṇhā',
  duyen:'Ái duyên Thủ — Taṇhāpaccayā upādānaṃ',
  chiphap:'Tâm sở <b>Tham</b> hợp trong <b>8 tâm tham</b> (<b>6 ái</b>).'},
 {ten:'Thủ', pali:'Upādāna',
  duyen:'Thủ duyên Hữu — Upādānapaccayā bhavo',
  chiphap:'Tâm sở <b>Tham</b> + tâm sở <b>Tà kiến</b> hợp trong <b>8 tâm tham</b> (<b>4 thủ</b>).'},
 {ten:'Hữu', pali:'Bhava',
  duyen:'Hữu duyên Sanh — Bhavapaccayā jāti',
  chiphap:'<b>Nghiệp hữu:</b> tâm sở Tư hợp trong 12 tâm bất thiện + 17 tâm thiện hiệp thế (gom thành 29 Tư).<br><b>Sanh hữu:</b> 32 tâm quả hiệp thế, 35 tâm sở hợp, 20 sắc nghiệp.'},
 {ten:'Sanh', pali:'Jāti',
  duyen:'Sanh duyên Già chết, sầu, bi, khổ, ưu, não — Jātipaccayā jarāmaraṇaṃ soka-parideva-dukkha-domanass-upāyāsā',
  chiphap:'<b>Danh sanh (nāmajāti):</b> sự sanh lên của 32 tâm quả hiệp thế, 35 tâm sở hợp.<br><b>Sắc sanh (rūpajāti):</b> sự hiện khởi của 20 sắc nghiệp.'},
 {ten:'Già chết', pali:'Jarā-maraṇa',
  duyen:'Vòng luân hồi tiếp nối: sầu, bi, khổ, ưu, não nuôi dưỡng Vô minh',
  chiphap:'<b>Già (jarā):</b> sự già của 32 tâm quả hiệp thế, 35 tâm sở hợp (sát-na trụ).<br><b>Chết (maraṇa):</b> sự diệt của 32 tâm quả hiệp thế, 35 tâm sở hợp (sát-na diệt).',
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
  const hit = click!==null ? `<path d="${dkArc(r,a1,a2,sweep)}" stroke="rgba(0,0,0,0)" stroke-width="34" fill="none"/>` : '';
  const inner = `<path id="${id}" d="${dkArc(r,a1,a2,sweep)}" fill="none"/>${hit}
    <text font-size="${size}" font-weight="${weight}" fill="${fill}"><textPath href="#${id}" startOffset="50%" text-anchor="middle">${txt}</textPath></text>`;
  return click!==null ? `<g class="dkc" onclick="${click}">${inner}</g>` : inner;
}
function dkNode(a,r,label,idx,w){
  const c=360, rad=a*Math.PI/180;
  const x=c+r*Math.cos(rad), y=c+r*Math.sin(rad);
  const rot = Math.sin(rad)>0 ? a-90 : a+90;
  return `<g class="dkc" transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot.toFixed(1)})" onclick="openDuyenKhoiSheet(${idx})">
    <rect x="${-w/2}" y="-19" width="${w}" height="38" rx="19" fill="#fffdf2" stroke="#d21" stroke-width="3" class="dk-shape"/>
    <rect x="${-w/2-4}" y="-23" width="${w+8}" height="46" rx="23" fill="none" stroke="#f0c419" stroke-width="2.5" opacity=".9"/>
    <text text-anchor="middle" dominant-baseline="central" font-size="19" font-weight="800" fill="#111">${label}</text>
  </g>`;
}

function renderDuyenKhoiPage(){
  dkPid = 0;
  const extra = document.getElementById('extra-content');
  const BROWN = '#96651f';
  // 4 mũi tên đỏ góc ngoài (chiều kim đồng hồ)
  let corner = '';
  for(const ac of [-45,45,135,-135]){
    corner += `<path d="${dkArc(348,ac-21,ac+21,1)}" stroke="#e01b1b" stroke-width="10" fill="none" marker-end="url(#dkarr)"/>`;
  }
  // 4 mũi tên nhỏ băng qua căm (vòng xoay bên trong)
  let cross = '';
  for(const ax of [0,90,180,-90]){
    cross += `<path d="${dkArc(152,ax-13,ax+13,1)}" stroke="#e01b1b" stroke-width="7" fill="none" marker-end="url(#dkarr)"/>`;
  }
  // Nhãn Tập đế / Khổ đế quanh tâm
  const de =
    dkArcText(107,-59,-31,1,'TẬP ĐẾ',{size:14,weight:800}) +
    dkArcText(107,-149,-121,1,'KHỔ ĐẾ',{size:14,weight:800}) +
    dkArcText(107,59,31,0,'KHỔ ĐẾ',{size:14,weight:800}) +
    dkArcText(107,149,121,0,'TẬP ĐẾ',{size:14,weight:800});

  // Chữ cung tròn theo 4 phần
  const arcs =
    // ---- Vành ngoài (chữ trắng/đỏ trên nền nâu) ----
    dkArcText(300,-84,-30,1,'3 PHIỀN NÃO LUÂN',{fill:'#fff',size:17,weight:800}) +
    dkArcText(300,-26,24,1,'2 NGHIỆP LUÂN',{fill:'#fff',size:17,weight:800}) +
    dkArcText(300,-156,-102,1,'8 QUẢ LUÂN',{fill:'#fff',size:17,weight:800}) +
    dkArcText(300,174,96,0,'THỌ DUYÊN ÁI LÀ CON ĐƯỜNG LUÂN HỒI',{fill:'#fff',size:13.5,weight:700}) +
    dkArcText(300,84,6,0,'THỌ DIỆT, ÁI DIỆT LÀ ĐƯỜNG THOÁT KHỎI LUÂN HỒI',{fill:'#fff',size:12.5,weight:700}) +
    // ---- Nhãn đỏ 4 phần (chạm xem tóm tắt phần) ----
    dkArcText(248,-82,-8,1,'5 NHÂN QUÁ KHỨ TƯƠNG TỤC',{fill:'#d21',size:16,weight:800,click:'openDKQuarterSheet(1)'}) +
    dkArcText(248,82,8,0,'5 QUẢ HIỆN TẠI TƯƠNG TỤC',{fill:'#d21',size:16,weight:800,click:'openDKQuarterSheet(2)'}) +
    dkArcText(248,172,98,0,'5 NHÂN HIỆN TẠI TƯƠNG TỤC',{fill:'#d21',size:16,weight:800,click:'openDKQuarterSheet(3)'}) +
    dkArcText(248,-172,-98,1,'5 QUẢ VỊ LAI TƯƠNG TỤC',{fill:'#d21',size:16,weight:800,click:'openDKQuarterSheet(4)'}) +
    // ---- Danh sách chi (đen) ----
    dkArcText(214,-80,-10,1,'Vô Minh, Hành, Ái, Thủ, Hữu',{size:15}) +
    dkArcText(214,170,100,0,'Ái, Thủ, Hữu, Vô Minh, Hành',{size:15}) +
    dkArcText(222,-170,-100,1,'Thức, Danh-Sắc, Lục Nhập, Xúc, Thọ',{size:13.5}) +
    // Phần 2: 5 chi bấm được từng chi
    dkArcText(214,84,69,0,'Thức',{size:16,weight:800,click:'openDuyenKhoiSheet(2)'}) +
    dkArcText(214,68,49,0,'Danh-Sắc',{size:16,weight:800,click:'openDuyenKhoiSheet(3)'}) +
    dkArcText(214,48,30,0,'Lục Nhập',{size:16,weight:800,click:'openDuyenKhoiSheet(4)'}) +
    dkArcText(214,29,19,0,'Xúc',{size:16,weight:800,click:'openDuyenKhoiSheet(5)'}) +
    dkArcText(214,18,6,0,'Thọ',{size:16,weight:800,click:'openDuyenKhoiSheet(6)'}) +
    // Phần 4: Sanh / Lão-Tử bấm được
    dkArcText(190,-172,-128,1,'SANH · SANH HỮU',{size:15.5,weight:800,click:'openDuyenKhoiSheet(10)'}) +
    dkArcText(190,-124,-96,1,'LÃO - TỬ',{size:15.5,weight:800,click:'openDuyenKhoiSheet(11)'}) +
    // ---- Thời & nhãn trong ----
    dkArcText(148,-72,-18,1,'Thời Quá Khứ',{size:14}) +
    dkArcText(126,-76,-14,1,'Nhân Quá Khứ Tương Tục',{size:11.5}) +
    dkArcText(148,72,18,0,'Thời Hiện Tại',{size:14}) +
    dkArcText(126,76,14,0,'Quả Hiện Tại Tương Tục',{size:11.5}) +
    dkArcText(148,162,108,0,'Thời Hiện Tại',{size:14}) +
    dkArcText(126,166,104,0,'Nhân Hiện Tại Tương Tục',{size:11.5}) +
    dkArcText(148,-162,-108,1,'Thời Vị Lai',{size:14}) +
    dkArcText(126,-166,-104,1,'Quả Vị Lai',{size:11.5});

  // Nút chi (khung viền đỏ + vàng như bản gốc)
  const nodes =
    dkNode(-62,180,'VÔ MINH',0,104) +
    dkNode(-27,180,'HÀNH',1,86) +
    dkNode(111,180,'ÁI',7,72) +
    dkNode(139,180,'THỦ',8,78) +
    dkNode(167,180,'NGHIỆP HỮU',9,128);

  extra.innerHTML = `
    <p class="info-note" style="margin-bottom:6px">Biểu đồ Thập Nhị Nhân Duyên (truyền thống Mogok). Chạm 1 lần để chọn (ô/chữ chuyển xanh), chạm lần 2 để xem chi pháp. Chạm nhãn đỏ để xem tóm tắt từng phần, chạm tâm để xem các yếu tố chính. Chụm 2 ngón tay để phóng to.</p>
    <svg viewBox="0 0 720 720" style="width:100%;height:auto;display:block" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="dkarr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.2" markerHeight="4.2" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#e01b1b"/>
        </marker>
      </defs>
      ${corner}
      <circle cx="360" cy="360" r="332" fill="${BROWN}"/>
      <circle cx="360" cy="360" r="272" fill="#fffdf5"/>
      <rect x="337" y="28" width="46" height="664" fill="${BROWN}"/>
      <rect x="28" y="337" width="664" height="46" fill="${BROWN}"/>
      <path d="M 360 14 L 360 118" stroke="#e01b1b" stroke-width="11" marker-end="url(#dkarr)"/>
      <path d="M 360 604 L 360 708" stroke="#e01b1b" stroke-width="11" marker-end="url(#dkarr)"/>
      ${cross}
      ${arcs}
      ${nodes}
      <g class="dkc" onclick="openDKCenterSheet()">
        <circle cx="360" cy="360" r="95" fill="${BROWN}" stroke="#7a5218" stroke-width="3" class="dk-shape"/>
        <text x="360" y="352" text-anchor="middle" font-size="30" font-weight="800" fill="#fff">VÔ MINH</text>
        <text x="360" y="388" text-anchor="middle" font-size="28" font-weight="800" fill="#fff">ÁI</text>
      </g>
      ${de}
      <text x="642" y="105" font-size="52" font-weight="800" fill="#e01b1b">1</text>
      <text x="642" y="650" font-size="52" font-weight="800" fill="#e01b1b">2</text>
      <text x="52" y="650" font-size="52" font-weight="800" fill="#e01b1b">3</text>
      <text x="52" y="105" font-size="52" font-weight="800" fill="#e01b1b">4</text>
    </svg>
    <p class="info-note" style="margin-top:6px">Nguồn: Biểu đồ Thập Nhị Nhân Duyên — tài liệu truyền thống Mogok; chi pháp theo Đường Vào Thắng Pháp (TK Chánh Minh).</p>
  `;
}

const DK_QUARTER = {
 1:{ten:'Phần 1 — Nhân Quá Khứ Tương Tục',de:'Tập Đế · Thời Quá Khứ',
    body:'<b>5 nhân quá khứ:</b> Vô Minh, Hành, Ái, Thủ, Nghiệp Hữu.<br><br>Trong đó: <b>3 Phiền Não Luân</b> (Vô Minh, Ái, Thủ) và <b>2 Nghiệp Luân</b> (Hành, Nghiệp Hữu).<br><br>5 nhân quá khứ làm duyên cho 5 quả hiện tại (mối nối Hành – Thức).'},
 2:{ten:'Phần 2 — Quả Hiện Tại Tương Tục',de:'Khổ Đế · Thời Hiện Tại',
    body:'<b>5 quả hiện tại:</b> Thức, Danh-Sắc, Lục Nhập, Xúc, Thọ — thuộc <b>8 Quả Luân</b>.<br><br>Mối nối quan trọng nhất nằm ở cuối phần này: <b>Thọ duyên Ái</b> — nếu Thọ diệt, Ái diệt thì đó là <b>con đường thoát ra khỏi vòng luân hồi</b> (ghi ở vành ngoài).'},
 3:{ten:'Phần 3 — Nhân Hiện Tại Tương Tục',de:'Tập Đế · Thời Hiện Tại',
    body:'<b>5 nhân hiện tại:</b> Ái, Thủ, Nghiệp Hữu, Vô Minh, Hành.<br><br><b>Thọ duyên Ái là con đường luân hồi</b>: từ quả hiện tại (Thọ) khởi lên Ái, Thủ, tạo Nghiệp Hữu mới — gieo nhân cho đời sau.<br><br>5 nhân hiện tại làm duyên cho 5 quả vị lai (mối nối Nghiệp Hữu – Sanh).'},
 4:{ten:'Phần 4 — Quả Vị Lai Tương Tục',de:'Khổ Đế · Thời Vị Lai',
    body:'<b>5 quả vị lai:</b> Thức, Danh-Sắc, Lục Nhập, Xúc, Thọ — hiện khởi qua <b>Sanh / Sanh Hữu</b> và <b>Lão - Tử</b>, thuộc <b>8 Quả Luân</b>.<br><br>Sanh duyên Lão Tử, kéo theo Sầu, Bi, Khổ, Ưu, Não — rồi Vô minh lại làm duyên cho vòng xoay tiếp tục.'}
};

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
  dn:'Mãnh lực trợ sinh, giúp đỡ bằng <b>nhân tương ưng</b> — pháp ủng hộ các pháp liên hệ như <b>gốc rễ</b> (mūla) làm cây vững vàng.',
  nang:'6 nhân: Tham, Sân, Si, Vô tham, Vô sân, Vô si (phân rộng thành 9 nhân: 3 bất thiện, 3 thiện, 3 vô ký).',
  so:'103 tâm hữu nhân + 52 tâm sở (trừ tâm sở Si trong 2 tâm Si) + sắc nghiệp tục sinh + sắc tâm (thời bình nhật).',
  phiso:'18 tâm vô nhân + 12 tâm sở hợp; tâm sở Si trong 2 tâm Si; sắc tâm vô nhân, sắc nghiệp bình nhật, sắc nghiệp Vô tưởng, sắc khí hậu, sắc vật thực.'},
 {ten:'Cảnh duyên', pali:'Ārammaṇapaccaya',
  dn:'Mãnh lực trợ sinh bằng cách <b>làm cảnh</b> (ārammaṇa) cho tâm nhận biết — "pháp trợ giúp bằng cách làm thành cảnh, gọi là cảnh duyên" (Thanh Tịnh Đạo).',
  nang:'Tất cả pháp khi bị tâm và tâm sở biết: 121 tâm + 52 tâm sở + 28 sắc pháp + Níp-bàn + chế định.',
  so:'Tâm + tâm sở khi biết cảnh.',
  phiso:'Sắc pháp + Níp-bàn + chế định (vì không biết cảnh).'},
 {ten:'Trưởng duyên', pali:'Adhipatipaccaya',
  dn:'Mãnh lực trợ sinh và ủng hộ bằng cách <b>lớn trội, dẫn đầu</b> — ví như Đức vua đối với quần thần.',
  subs:[
   {ten:'Cảnh trưởng duyên', pali:'Ārammaṇādhipatipaccaya',
    dn:'Trợ giúp tâm – tâm sở sinh lên vững mạnh bằng cách thành <b>cảnh rất tốt</b>, cảnh "dẫn dắt" tâm.',
    nang:'Níp-bàn + 18 sắc thành tựu (nipphannarūpa) thành cảnh tốt theo 3 thời + 116 tâm (trừ 2 tâm Sân, 2 tâm Si, tâm Thân thức thọ khổ) + 47 tâm sở (trừ 4 Sân phần + Hoài nghi).',
    so:'Tâm Siêu thế + 8 tâm Tham + 8 tâm Đại thiện + 4 tâm Đại hạnh hợp trí, cùng 45 tâm sở hợp.'},
   {ten:'Đồng sinh trưởng duyên', pali:'Sahajātādhipatipaccaya',
    dn:'Một trong <b>4 pháp trưởng</b> — Dục, Cần, Tâm, Thẩm (Trí) — làm chủ đạo trợ các pháp đồng sinh; mỗi thời điểm chỉ có một pháp làm trưởng.',
    nang:'Tâm sở Dục, tâm sở Cần, Tâm (trong 84 tâm đổng lực đa nhân), tâm sở Trí — pháp nào đang làm trưởng.',
    so:'52 tâm đổng lực nhị/tam nhân + 52 tâm sở hợp (hoặc 51, trừ pháp đang làm trưởng) + sắc tâm trưởng.'}
  ]},
 {ten:'Vô gián duyên', pali:'Anantarapaccaya',
  dn:'Mãnh lực trợ sinh bằng cách <b>không gián đoạn</b>: tâm và tâm sở vừa diệt đi, giúp tâm và tâm sở kế tiếp "có dịp" sinh lên, không hề có kẽ hở.',
  nang:'Tâm + tâm sở sinh trước vừa diệt (trừ tâm Tử của vị Thánh Alahán).',
  so:'Tâm + tâm sở sinh kế sau ngay đó.',
  phiso:'Sắc pháp + Níp-bàn + chế định.'},
 {ten:'Đẳng vô gián duyên', pali:'Samanantarapaccaya',
  dn:'Cách trợ giúp <b>như Vô gián duyên</b>, nhấn mạnh "khít khao hoàn toàn không kẽ hở" (sama = giống như). Đức Phật thuyết thêm để củng cố Vô gián duyên — <b>trùng chi pháp</b> với Vô gián duyên.',
  nang:'Tâm + tâm sở sinh trước (trừ tâm Tử của vị Thánh Alahán).',
  so:'Tâm + tâm sở sinh sau.',
  phiso:'Sắc pháp.'},
 {ten:'Đồng sinh duyên', pali:'Sahajātapaccaya',
  dn:'Trợ giúp bằng cách <b>cùng sinh lên</b> — ví như ngọn lửa với ánh sáng. Pháp hữu vi không bao giờ sinh riêng lẻ (danh ít nhất 8 pháp, sắc ít nhất đoàn bất ly 8 sắc).',
  nang:'Tất cả pháp hữu vi. (Thời tục sinh cõi ngũ uẩn: 15 tâm tục sinh + sắc tục sinh; cõi Vô sắc: 4 tâm quả Vô sắc; cõi Vô tưởng: đoàn sắc mạng quyền. Thời bình nhật: tâm + tâm sở + sắc pháp.)',
  so:'Tất cả pháp hữu vi (tương tự năng duyên).',
  phiso:'Níp-bàn + chế định.'},
 {ten:'Hổ tương duyên', pali:'Aññamaññapaccaya',
  dn:'Mãnh lực trợ giúp <b>qua lại</b>: năng trợ sở và sở cũng trợ năng — như ba cây chụm đầu nương nhau. Gồm: 4 danh uẩn trợ lẫn nhau; tứ đại trợ lẫn nhau; khi nhập thai, tâm Tục sinh ↔ sắc Ý vật.',
  nang:'Tâm + tâm sở + sắc Tứ đại + sắc Ý vật (tái tục).',
  so:'Tâm + tâm sở + sắc Tứ đại + sắc Ý vật (tái tục).',
  phiso:'Các sắc y sinh còn lại (nhất định); sắc Ý vật là phi sở duyên bất định (chỉ hổ tương vào thời tục sinh).'},
 {ten:'Y duyên', pali:'Nissayapaccaya',
  dn:'Mãnh lực trợ giúp bằng cách làm <b>chỗ nương nhờ</b> vững vàng cho pháp khác — ví như trái đất là nơi nương của người, vật, cây cối.',
  nang:'Tứ danh uẩn + 6 sắc vật (5 sắc thần kinh + sắc Ý vật).',
  so:'Tứ danh uẩn.',
  phiso:'Sắc pháp.',
  subs:[
   {ten:'Đồng sinh y duyên', pali:'Sahajātanissayapaccaya',
    dn:'Nương nhờ pháp cùng sinh — <b>trùng chi pháp với Đồng sinh duyên</b>.'},
   {ten:'Vật sinh tiền y duyên', pali:'Vatthupurejātanissayapaccaya',
    dn:'Sắc vật sinh trước làm chỗ nương cho tâm sinh sau.',
    nang:'6 sắc vật sinh trước (5 sắc thần kinh: nương cho ngũ song thức; sắc Ý vật: nương cho 111 tâm còn lại).',
    so:'Tâm nương vật, sinh sau.'},
   {ten:'Vật-cảnh sinh tiền y duyên', pali:'Vatthārammaṇapurejātanissayapaccaya',
    dn:'Sắc Ý vật cận tử vừa làm <b>chỗ nương</b> vừa làm <b>cảnh</b> cho tâm lộ cận tử.',
    nang:'Sắc Ý vật sinh vào sát-na sinh của tâm hữu phần thứ 16 kể từ tâm Tử lui lại, làm cảnh cho tâm.',
    so:'32 tâm khách trong lộ tử (tâm Hướng ý môn + 29 đổng lực dục giới + 2 tâm thông) + 44 tâm sở hợp (trừ Tật, Lận, Hối, Giới phần, Vô lượng phần).'}
  ]},
 {ten:'Cận y duyên', pali:'Upanissayapaccaya',
  dn:'Mãnh lực trợ giúp, ủng hộ bằng cách làm chỗ nương <b>rất vững chắc, có sức mạnh lớn</b>. Y duyên ví như đất cho cây nương; Cận y duyên ví như mưa thuận gió hòa giúp cây lớn mạnh.',
  subs:[
   {ten:'Cảnh cận y duyên', pali:'Ārammaṇūpanissayapaccaya',
    dn:'Trợ giúp bằng cách làm thành cảnh rất vững mạnh. <b>Chi pháp giống Cảnh trưởng duyên</b>; khác biệt: cảnh trưởng nói khía cạnh "quan trọng" (garu), cảnh cận y nói khía cạnh "sức mạnh" (bala) của cảnh.'},
   {ten:'Vô gián cận y duyên', pali:'Anantarūpanissayapaccaya',
    dn:'Trợ giúp bằng cách liên tiếp rất vững mạnh. <b>Chi pháp giống Vô gián duyên</b> nhưng mạnh mẽ hơn — như dòng nước chảy xiết so với dòng chảy thường.'},
   {ten:'Thường cận y duyên', pali:'Pakatūpanissayapaccaya',
    dn:'Trợ giúp vững mạnh theo cách <b>tự nhiên, thành thói quen</b> do thường làm, thường thực hiện.',
    nang:'Tâm + tâm sở + sắc pháp + chế định có sức mạnh, cả 3 thời (trừ chế định nghiệp xứ).',
    so:'Tâm + tâm sở sinh về sau.',
    phiso:'Sắc pháp.'}
  ]},
 {ten:'Sinh tiền duyên', pali:'Purejātapaccaya',
  dn:'Mãnh lực trợ giúp bằng cách <b>sinh ra trước</b> và <b>đang hiện hữu</b>, giúp pháp sinh sau vững mạnh.',
  subs:[
   {ten:'Vật sinh tiền duyên', pali:'Vatthupurejātapaccaya',
    dn:'Sắc vật sinh trước làm chỗ nương — <b>như Vật sinh tiền y duyên</b> (xem Y duyên), chỉ khác khía cạnh "có nương nhờ".'},
   {ten:'Vật-cảnh sinh tiền duyên', pali:'Vatthārammaṇapurejātapaccaya',
    dn:'Sắc Ý vật cận tử vừa là vật vừa là cảnh — <b>như Vật-cảnh sinh tiền y duyên</b> (xem Y duyên).'},
   {ten:'Cảnh sinh tiền duyên', pali:'Ārammaṇapurejātapaccaya',
    dn:'Sắc pháp sinh trước, đang hiện hữu, làm <b>cảnh</b> cho tâm sinh sau nhận lấy.',
    nang:'18 sắc thành tựu (nipphannarūpa) sinh trước, đang làm cảnh.',
    so:'Nhất định: ngũ song thức + Ý giới. Bất định: 41 tâm Dục giới còn lại + 2 tâm thông và 50 tâm sở hợp (trừ Vô lượng phần).',
    phiso:'Nhất định: sắc pháp + 27 tâm Đáo đại + 40 tâm Siêu thế. Bất định: 41 tâm Dục giới khi không bắt 18 sắc thành tựu làm cảnh.'}
  ]},
 {ten:'Sinh hậu duyên', pali:'Pacchājātapaccaya',
  dn:'Mãnh lực trợ giúp bằng cách <b>sinh ra sau</b> nhưng giúp pháp sinh trước được vững mạnh — như mưa đến sau giúp cây gieo trồng trước lớn mạnh. Là sự trợ giúp của <b>tâm</b> đối với <b>sắc pháp</b> sinh trước.',
  nang:'117 tâm sinh sau (kể từ tâm hữu phần thứ 1 trở đi, trừ 4 tâm quả Vô sắc) và tâm sở hợp.',
  so:'Sắc do 3 nhân sinh và 4 nhân sinh đang ở sát-na trụ (đồng sinh với tâm trước đó).',
  phiso:'121 tâm + sắc tâm + sắc nghiệp tục sinh + sắc vật thực + sắc khí hậu + sắc nghiệp bình nhật (sát-na sinh) + sắc ngoại + sắc nghiệp Vô tưởng.'},
 {ten:'Tập hành duyên', pali:'Āsevanapaccaya',
  dn:'Trợ giúp, ủng hộ bằng cách <b>lập đi lập lại</b> làm thuần thục, tạo năng lực — như tụng bài kinh nhiều lần càng thuộc lòng. Chỉ có nơi các sát-na <b>đổng lực</b> (javana).',
  nang:'47 tâm đổng lực hiệp thế, sát-na trước (trừ đổng lực cuối trong lộ trình tâm).',
  so:'67 tâm đổng lực sinh nối tiếp (trừ đổng lực thứ nhất trong lộ trình tâm).',
  phiso:'Đổng lực sát-na thứ 1, 2 tâm hướng môn, 52 tâm quả + sắc pháp.'},
 {ten:'Nghiệp duyên', pali:'Kammapaccaya',
  dn:'Trợ giúp bằng cách <b>tạo tác</b> — "Này chư tỳ khưu, Như Lai tuyên thuyết chính sự cố ý (cetanā) là nghiệp". Nghiệp chính là <b>tâm sở Tư</b>.',
  subs:[
   {ten:'Đồng sinh nghiệp duyên', pali:'Sahajātakammapaccaya',
    dn:'Tâm sở Tư hành khiển, điều phối các pháp <b>đồng sinh</b> — ví như kỹ sư trưởng vừa điều hành vừa thực hiện công trình.',
    nang:'Tâm sở Tư trong tất cả tâm.',
    so:'Tâm + 51 tâm sở hợp (trừ tâm sở Tư) + sắc tâm + sắc nghiệp tục sinh.'},
   {ten:'Vô gián nghiệp duyên', pali:'Anantarakammapaccaya',
    dn:'Tâm sở Tư trong <b>tâm Đạo</b> trợ liền cho tâm quả Siêu thế sinh kế tục <b>không gián đoạn</b> trong lộ đắc đạo.',
    nang:'Tâm sở Tư trong tâm Đạo.',
    so:'Tâm quả Siêu thế + 36 tâm sở hợp, sinh kế tục tâm Đạo trong lộ đắc đạo.'},
   {ten:'Dị thời nghiệp duyên', pali:'Nānakkhaṇikakammapaccaya',
    dn:'Tâm sở Tư trợ giúp các pháp <b>cách xa thời gian</b> — nghiệp và quả của nghiệp không cùng thời; như lời di chúc được con cháu thực hiện về sau. Đây là "nghiệp báo nhân quả" thông thường.',
    nang:'Tâm sở Tư hợp trong tâm thiện hay tâm bất thiện (quá khứ).',
    so:'Sắc nghiệp + tâm quả và tâm sở hợp (trừ tâm sở Tư), trong hiện tại.',
    phiso:'Tâm thiện, tâm bất thiện, tâm duy tác + sắc tâm, sắc ngoại, sắc vật thực, sắc khí hậu.'}
  ]},
 {ten:'Quả duyên', pali:'Vipākapaccaya',
  dn:'Mãnh lực trợ giúp bằng <b>kết quả của nghiệp</b> (dị thục) — pháp quả trợ giúp bằng cách "thành tựu sự yên lặng", không cần nỗ lực, ví như trái cây nuôi hạt mầm.',
  nang:'52 tâm quả + 38 tâm sở hợp.',
  so:'52 tâm quả + 38 tâm sở hợp (khi không là năng duyên) + sắc nghiệp tục sinh + sắc tâm quả (trừ 2 sắc biểu tri).',
  phiso:'Tâm thiện, tâm bất thiện, tâm duy tác + 52 tâm sở hợp + sắc nghiệp bình nhật, sắc nghiệp Vô tưởng, sắc ngoại, sắc khí hậu, sắc vật thực, sắc tâm của tâm phi quả.'},
 {ten:'Vật thực duyên', pali:'Āhārapaccaya',
  dn:'Mãnh lực trợ giúp, ủng hộ bằng cách <b>mang dưỡng tố (ojā) vào, nuôi dưỡng cho tồn tại vững mạnh</b>. Căn bản là Tứ thực: đoàn thực, xúc thực, tư niệm thực, thức thực.',
  subs:[
   {ten:'Sắc vật thực duyên', pali:'Rūpāhārapaccaya',
    dn:'Dưỡng tố trong thực phẩm nuôi dưỡng sắc pháp.',
    nang:'Tất cả sắc vật thực nội hay ngoại, đã ăn hay chưa ăn (dưỡng tố trong và ngoài cơ thể).',
    so:'Sắc do vật thực tạo và các sắc đồng nhóm với sắc vật thực.',
    phiso:'Tâm + tâm sở + sắc tâm + sắc ngoại + sắc nghiệp + sắc âm dương.'},
   {ten:'Danh vật thực duyên', pali:'Nāmāhārapaccaya',
    dn:'Ba danh thực "bám chặt lấy cảnh" trợ giúp các danh pháp đồng sinh thêm vững mạnh.',
    nang:'3 danh vật thực: Xúc thực (tâm sở Xúc), Thức thực (tâm), Tư niệm thực (tâm sở Tư).',
    so:'Tâm + tâm sở + sắc do tâm tạo + sắc nghiệp tục sinh.',
    phiso:'Các sắc pháp ngoài ra + pháp vật thực đang làm năng duyên.'}
  ]},
 {ten:'Quyền duyên', pali:'Indriyapaccaya',
  dn:'Mãnh lực trợ giúp, ủng hộ bằng cách <b>cai quản, kiểm soát, điều hành</b> trong lãnh vực riêng của mình. Năng duyên tổng quát là <b>20 quyền</b> (trừ Nữ quyền và Nam quyền, vì hai quyền này không có chức năng tạo ra – hỗ trợ – duy trì).',
  subs:[
   {ten:'Đồng sinh quyền duyên', pali:'Sahajātindriyapaccaya',
    dn:'Các <b>danh quyền</b> huấn luyện và kiểm soát các pháp đồng sinh cùng thực hiện chức năng như mình.',
    nang:'8 danh quyền: Tâm (ý quyền) + tâm sở Thọ (5 thọ quyền) + tâm sở Mạng quyền + Tín, Cần, Niệm, Nhất hành (định), Trí (5 quyền giác phần; Trí gồm cả Vị tri – Dĩ tri – Cụ tri quyền).',
    so:'Tâm + 52 tâm sở hợp + sắc tục sinh + sắc do tâm tạo.'},
   {ten:'Quyền sinh tiền duyên', pali:'Purejātindriyapaccaya',
    dn:'5 <b>sắc thần kinh</b> sinh trước, đủ mạnh (sát-na quyền), cai quản tâm nương trú thực hiện đúng chức năng thấy, nghe, ngửi, nếm, đụng.',
    nang:'5 sắc thần kinh ở sát-na thứ 26 (giai đoạn phát triển cao tột — "sát-na Quyền").',
    so:'Ngũ song thức + 7 tâm sở hợp.'},
   {ten:'Sắc mạng quyền duyên', pali:'Rūpajīvitindriyapaccaya',
    dn:'Sắc Mạng quyền <b>cai quản tuổi thọ</b>, duy trì các sắc nghiệp đồng bọn tồn tại tròn đủ tuổi thọ.',
    nang:'Tất cả sắc Mạng quyền.',
    so:'Các nhóm (bọn) sắc nghiệp sinh chung với sắc Mạng quyền (9 bọn sắc nghiệp).'}
  ]},
 {ten:'Thiền duyên', pali:'Jhānapaccaya',
  dn:'Mãnh lực trợ giúp bằng cách làm cảnh <b>"chói sáng"</b> (chăm chú vào đối tượng) hay <b>"thiêu đốt"</b> các pháp nghịch.',
  nang:'5 chi thiền theo thực tính — Tầm, Tứ, Hỷ, Thọ (chi lạc, ưu, xả), Nhất hành (chi định) — tức 7 chi thiền, có trong 103 tâm (trừ 18 tâm vô nhân).',
  so:'103 tâm + 52 tâm sở hợp (trừ chi thiền đang làm năng duyên) + sắc nghiệp tục sinh + sắc do tâm tạo.',
  phiso:'Ngũ song thức + 7 tâm sở hợp + sắc nghiệp bình nhật + sắc ngoại + sắc vật thực + sắc âm dương + sắc nghiệp Vô tưởng.'},
 {ten:'Đạo duyên', pali:'Maggapaccaya',
  dn:'Mãnh lực trợ giúp bằng cách <b>như con đường</b> — dẫn đến khổ cảnh, lạc cảnh hoặc Níp-bàn.',
  nang:'9 chi đạo trong những tâm hữu nhân: Trí (chánh kiến), Tầm (chánh/tà tư duy), 3 Giới phần (chánh ngữ, chánh nghiệp, chánh mạng), Cần (chánh/tà tinh tấn), Niệm (chánh niệm), Nhất hành (chánh/tà định), Tà kiến.',
  so:'Tâm hữu nhân + 52 tâm sở hợp + sắc tâm hữu nhân + sắc nghiệp tục sinh với tâm hữu nhân.',
  phiso:'18 tâm vô nhân + 12 tâm sở hợp + sắc ngoại, sắc âm dương, sắc vật thực, sắc nghiệp bình nhật, sắc nghiệp Vô tưởng, sắc tâm vô nhân, sắc nghiệp tục sinh với tâm vô nhân.'},
 {ten:'Tương ưng duyên', pali:'Sampayuttapaccaya',
  dn:'Mãnh lực trợ giúp theo cách <b>hòa hợp</b> — đồng sinh, đồng diệt, đồng biết một cảnh, đồng nương một vật — như nước hòa với sữa, không còn phân biệt được. Chỉ có giữa <b>danh với danh</b>.',
  nang:'Tất cả tâm và tâm sở đồng sinh với nhau.',
  so:'Tất cả tâm và tâm sở đồng sinh với nhau.',
  phiso:'Sắc pháp + Níp-bàn + chế định.'},
 {ten:'Bất tương ưng duyên', pali:'Vippayuttapaccaya',
  dn:'Mãnh lực trợ giúp bằng cách <b>không hòa hợp</b> — như nước lăn trên lá sen. Là mối liên hệ giữa <b>danh và sắc</b>: danh trợ sắc, hoặc sắc trợ danh.',
  subs:[
   {ten:'Đồng sinh bất tương ưng duyên', pali:'Sahajātavippayuttapaccaya',
    dn:'Danh trợ sắc cùng sinh lên nhưng không hòa hợp (tâm trợ sắc tâm; tâm tục sinh ↔ sắc nghiệp tục sinh cõi ngũ uẩn).',
    nang:'107 tâm (trừ ngũ song thức + 4 tâm quả Vô sắc) cùng tâm sở hợp; sắc Ý vật tái tục.',
    so:'Sắc do tâm tạo, sắc nghiệp tục sinh; tâm tái tục cõi ngũ uẩn.'},
   {ten:'Sinh hậu bất tương ưng duyên', pali:'Pacchājātavippayuttapaccaya',
    dn:'Danh sinh sau trợ sắc sinh trước — <b>chi pháp như Sinh hậu duyên</b>.'},
   {ten:'Vật sinh tiền bất tương ưng duyên', pali:'Vatthupurejātavippayuttapaccaya',
    dn:'Sắc vật sinh trước làm chỗ nương cho danh — <b>chi pháp như Vật sinh tiền (y) duyên</b>.'},
   {ten:'Vật-cảnh sinh tiền bất tương ưng duyên', pali:'Vatthārammaṇapurejātavippayuttapaccaya',
    dn:'Vật vừa là chỗ nương vừa là cảnh — <b>chi pháp như Vật-cảnh sinh tiền (y) duyên</b>.'}
  ]},
 {ten:'Hiện hữu duyên', pali:'Atthipaccaya',
  dn:'Mãnh lực trợ giúp theo phương cách <b>"đang tồn tại"</b> — năng duyên và sở duyên cùng hiện hữu (7 trường hợp: 4 danh uẩn với nhau; tứ đại với nhau; danh–sắc lúc nhập thai; tâm với sắc tâm; tứ đại với sắc y sinh; 5 sắc thần kinh với 5 thức; sắc Ý vật với Ý giới – Ý thức giới).',
  nang:'Tổng hợp năng duyên của 6 duyên thành phần bên dưới.',
  so:'Tổng hợp sở duyên của 6 duyên thành phần bên dưới.',
  subs:[
   {ten:'Đồng sinh hiện hữu duyên', pali:'Sahajātatthipaccaya', dn:'<b>Tức Đồng sinh duyên</b>.'},
   {ten:'Cảnh sinh tiền hiện hữu duyên', pali:'Ārammaṇapurejātatthipaccaya', dn:'<b>Tức Cảnh sinh tiền duyên</b>.'},
   {ten:'Vật sinh tiền hiện hữu duyên', pali:'Vatthupurejātatthipaccaya', dn:'<b>Tức Vật sinh tiền y duyên</b>.'},
   {ten:'Sinh hậu hiện hữu duyên', pali:'Pacchājātatthipaccaya', dn:'<b>Tức Sinh hậu duyên</b>.'},
   {ten:'Vật thực hiện hữu duyên', pali:'Āhāratthipaccaya', dn:'<b>Tức Sắc vật thực duyên</b>.'},
   {ten:'Quyền hiện hữu duyên', pali:'Indriyatthipaccaya', dn:'<b>Tức Sắc mạng quyền duyên</b>.'}
  ]},
 {ten:'Vô hữu duyên', pali:'Natthipaccaya',
  dn:'Mãnh lực trợ giúp bằng cách <b>"vắng mặt"</b>: pháp vô sắc vừa diệt theo diễn tiến của mình, nhường chỗ trợ cho pháp vô sắc mới sinh lên. Chính là Vô gián duyên / Đẳng vô gián duyên nhìn theo khía cạnh "vắng mặt" — <b>trùng chi pháp với Vô gián duyên</b>.',
  nang:'Tâm + tâm sở vừa diệt (trừ tâm Tử của vị Thánh Alahán).',
  so:'Tâm + tâm sở sinh kế sau.',
  phiso:'Sắc pháp.'},
 {ten:'Ly duyên', pali:'Vigatapaccaya',
  dn:'Mãnh lực trợ giúp bằng cách <b>"lìa nhau, diệt mất"</b> — cũng chính tâm và tâm sở trợ giúp bằng cách biến mất. <b>Chi pháp tương tự Vô hữu duyên</b>.',
  nang:'Tâm + tâm sở vừa diệt, lìa đi (trừ tâm Tử của vị Thánh Alahán).',
  so:'Tâm + tâm sở sinh kế sau.',
  phiso:'Sắc pháp.'},
 {ten:'Bất ly duyên', pali:'Avigatapaccaya',
  dn:'Mãnh lực trợ giúp bằng cách <b>"không xa lìa"</b> — pháp đang còn, không diệt mất, ủng hộ pháp khác. <b>Chi pháp tương tự Hiện hữu duyên</b>.',
  nang:'Như Hiện hữu duyên (tổng hợp 6 duyên thành phần).',
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
    circles += `<div class="circle circle-plain" onclick="openDuyenHeSheet(${i})">
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
