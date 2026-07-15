// ===== Điều phối 3 phần chính của app =====
let currentSection = 'quyen22';
let tamsoMode = 'tam2so';

const CITTA_GROUP_COLOR = {vonhan:'gray', batthien:'coral', ducgioi_tinhhao:'teal', sacgioi:'blue', vosacgioi:'purple', sieuthe:'green'};
const CETASIKA_GROUP_COLOR = {bienhanh:'gray', toitha:'amber', batthien_bh:'coral', batthien_rieng:'pink', tinhhao_bh:'teal', tietche:'blue', voluong:'purple', tuequyen:'green'};
const CETASIKA_GROUP_LABEL = {bienhanh:'Biến hành (7)', toitha:'Tợ tha - Biệt cảnh (6)', batthien_bh:'Bất thiện Biến hành (4)', batthien_rieng:'Bất thiện Riêng biệt (10)', tinhhao_bh:'Tịnh hảo Biến hành (19)', tietche:'Tiết chế (3)', voluong:'Vô lượng (2)', tuequyen:'Tuệ quyền (1)'};
const CETASIKA_GROUP_ORDER = ['bienhanh','toitha','batthien_bh','batthien_rieng','tinhhao_bh','tietche','voluong','tuequyen'];

function renderSectionSwitch(){
  const sections = [['quyen22','22 Quyền'],['tamso','Tâm ↔ Tâm sở'],['dactinh','Đặc tính · Chức năng'],['canh','21 Cảnh'],['duyenkhoi','Duyên khởi']];
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
