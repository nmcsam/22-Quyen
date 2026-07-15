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
    document.getElementById('page-subtitle').textContent = '22 Quyền (Bāvīsatindriya) · chạm vào một quyền để xem chi tiết';
    extra.innerHTML = '';
    grid.style.display='grid';
    legend.style.display='flex';
    renderQuyenNav();
    renderQuyenGrid();
  } else if(s==='tamso'){
    document.getElementById('page-subtitle').textContent = 'Tâm ↔ Tâm sở · chạm vào một ô để xem phối hợp';
    grid.style.display='none';
    legend.style.display='none';
    document.getElementById('nav').innerHTML = '';
    renderTamSoPage();
  } else if(s==='dactinh'){
    document.getElementById('page-subtitle').textContent = 'Đặc tính · Chức năng · Thể hiện · Nhân gần (theo Aṭṭhasālinī)';
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

function plainCircleHTML(id, label, pali, opener, cls){
  return `<div class="circle ${cls||'circle-plain'}" onclick="${opener}('${id}')"><div class="cn">${label}</div>${pali?`<div class="cp">${pali}</div>`:''}</div>`;
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
    return plainCircleHTML(id, c.ten, c.pali, 'openDacTinhCetasika', 'circle-bt');
  });
  const totthaCircles = totthaIds.map(id=>{
    const c = CETASIKA_DATA.find(x=>x.id===id);
    return plainCircleHTML(id, c.ten, c.pali, 'openDacTinhCetasika', 'circle-tt');
  });
  const tinhhaoCircles = tinhhaoIds.map(id=>{
    const c = CETASIKA_DATA.find(x=>x.id===id);
    return plainCircleHTML(id, c.ten, c.pali, 'openDacTinhCetasika', 'circle-th');
  });
  const rupaCircles = RUPA_DATA.map(r=> plainCircleHTML(r.id, r.ten, r.pali, 'openDacTinhRupa', 'circle-sac'));
  const vaitroCircles = VAITRO_TAM_DATA.map(v=> plainCircleHTML(v.id, v.ten, v.pali, 'openDacTinhVaitro', 'circle-vt'));
  const thoCircles = THO_CHITIET_DATA.map(t=> plainCircleHTML(t.id, t.ten, t.pali, 'openDacTinhTho', 'circle-tho'));

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
  dn:'Mãnh lực trợ sinh, giúp đỡ bằng <b>nhân tương ưng</b> (sampayuttahetu). Pāli: <i>"Mūlaṭṭhena upakārako dhammo = hetupaccayo — Pháp ủng hộ như gốc rễ, gọi là nhân duyên"</i> (Paṭṭhāna Aṭṭhakathā).<br><br>Có 4 loại nhân: nhân-nhân (hetuhetu), duyên nhân, chí thượng nhân, phổ biến nhân; trong nhân duyên chỉ lấy <b>nhân-nhân</b>, tức 6 nhân làm cội rễ: 3 nhân bất thiện là cội rễ của đau khổ, 3 nhân thiện là cội rễ của hạnh phúc — ví như rễ cây giúp cây đứng vững, hút nhựa sống nuôi thân, cành, lá.<br><br>Sự trợ giúp của nhân đối với các pháp sở duyên diễn ra cả 3 thời: tục sinh, bình nhật và tử.',
  nang:'6 nhân: Tham, Sân, Si, Vô tham, Vô sân, Vô si. Phân rộng thành 9 nhân: 3 nhân bất thiện (tham, sân, si trong 12 tâm bất thiện), 3 nhân thiện (vô tham, vô sân, vô si trong các tâm thiện), 3 nhân vô ký (vô tham, vô sân, vô si trong tâm quả hữu nhân và tâm duy tác).',
  so:'103 tâm hữu nhân + 52 tâm sở hợp (trừ tâm sở Si trong 2 tâm Si — vì đang làm năng duyên) + sắc nghiệp tục sinh (hữu nhân) + sắc tâm (hữu nhân) thời bình nhật.',
  phiso:'18 tâm vô nhân + 12 tâm sở hợp; lấy trở lại tâm sở Si trong 2 tâm Si; sắc tâm vô nhân, sắc nghiệp bình nhật, sắc nghiệp Vô tưởng, sắc khí hậu (utujarūpa), sắc vật thực (āhārajarūpa).'},
 {ten:'Cảnh duyên', pali:'Ārammaṇapaccaya',
  dn:'Mãnh lực trợ sinh bằng cách <b>làm cảnh</b> cho tâm nhận biết. Pāli: <i>"Ārammaṇabhāvena upakārako dhammo = ārammaṇapaccayo — Pháp trợ giúp bằng cách làm thành cảnh, gọi là cảnh duyên"</i> (Thanh Tịnh Đạo).<br><br>Cảnh (ārammaṇa) là pháp bị tâm biết, nơi tâm và tâm sở "bám lấy, vui thích đi đến". Bất cứ pháp nào bị tâm biết, pháp ấy là cảnh — như âm thanh sóng biển: khi không ai nghe, nó là "pháp"; khi có người nghe, nó thành "cảnh thinh". Có 6 cảnh: sắc, thinh, khí (mùi), vị, xúc và cảnh pháp.<br><br>Cảnh duyên trợ giúp đủ 3 thời và ngoại thời (Níp-bàn, chế định).',
  nang:'Tất cả pháp khi bị tâm và tâm sở biết: 121 tâm + 52 tâm sở + 28 sắc pháp + Níp-bàn + chế định (sammuti). Níp-bàn và chế định là năng duyên thuần túy — chỉ trợ pháp khác, không sinh ra từ pháp nào.',
  so:'Tâm + tâm sở khi biết cảnh (tâm nào đang bắt cảnh nào thì cảnh ấy là năng duyên của tâm ấy).',
  phiso:'Sắc pháp + Níp-bàn + chế định — vì các pháp này không biết cảnh, không thể là sở duyên.'},
 {ten:'Trưởng duyên', pali:'Adhipatipaccaya',
  dn:'Mãnh lực trợ sinh và ủng hộ bằng cách <b>lớn trội, dẫn đầu</b>. Pāli: <i>"Jeṭṭhakaṭṭhena upakārako dhammo = adhipaccayo — Pháp nâng đỡ bằng cách dẫn đầu, gọi là trưởng duyên"</i>. Adhipati nghĩa đen là "chủ nhân cao nhất, người thống trị" — cách trợ giúp ví như Đức vua đối với quần thần.',
  subs:[
   {ten:'Cảnh trưởng duyên', pali:'Ārammaṇādhipatipaccaya',
    dn:'Trợ giúp tâm – tâm sở sinh lên vững mạnh bằng cách thành <b>cảnh rất tốt</b>: cảnh "dẫn dắt" tâm, tâm nằm trong quyền lực của cảnh, bị cảnh ràng buộc. Khác với cảnh duyên thường (ví như bạn giúp bạn), cảnh trưởng ví như vị lãnh chúa với thần dân.<br>Cảnh trưởng có hai mô thức: cảnh đa số đồng ý là tốt đẹp (vàng ngọc, tâm thiền, tâm Siêu thế, Níp-bàn...) và cảnh chỉ hấp dẫn riêng với người này mà không với người khác — như vị thịt người là cảnh trưởng của vua Porisāda (Bổn sanh Sutasoma) nhưng không là cảnh trưởng của ai khác.',
    nang:'Níp-bàn (cảnh trưởng nhất định của tâm Đạo – Quả Siêu thế) + 18 sắc thành tựu (nipphannarūpa) thành cảnh tốt theo 3 thời + 116 tâm (trừ 2 tâm Sân, 2 tâm Si, tâm Thân thức thọ khổ — vì cảnh của chúng không đáng hài lòng) + 47 tâm sở hợp (trừ 4 Sân phần + Hoài nghi).',
    so:'40 tâm Siêu thế + 8 tâm Tham + 8 tâm Đại thiện + 4 tâm Đại hạnh hợp trí, cùng 45 tâm sở hợp.',
    phiso:'81 tâm hiệp thế + 52 tâm sở khi không nương sinh từ cảnh trưởng + Níp-bàn + chế định + sắc pháp.'},
   {ten:'Đồng sinh trưởng duyên', pali:'Sahajātādhipatipaccaya',
    dn:'Một trong <b>4 pháp trưởng</b> làm chủ đạo trợ các pháp đồng sinh: <b>Dục trưởng</b> (tâm sở Dục — ước muốn vượt trội), <b>Cần trưởng</b> (tâm sở Cần — tinh tấn vượt trội), <b>Tâm trưởng</b> (tâm đổng lực vượt trội), <b>Thẩm trưởng</b> (tâm sở Trí — xem xét vượt trội, như khi quán tam tướng).<br>Trong một sát-na chỉ có <b>một</b> pháp làm trưởng — ví như một nước không thể có hai vua đồng cai trị; ví như bầy thú có một con mạnh nhất làm đầu đàn.',
    nang:'Tâm sở Dục, hoặc tâm sở Cần, hoặc Tâm (trong 84 tâm đổng lực đa nhân — có thể là tham, sân, thiện hay duy tác hữu nhân của vị Alahán), hoặc tâm sở Trí — pháp nào đang làm trưởng.',
    so:'52 tâm đổng lực nhị nhân/tam nhân + 52 tâm sở hợp (hoặc 51, trừ pháp đang làm trưởng) + sắc tâm trưởng.',
    phiso:'54 tâm Dục giới và tâm sở hợp khi không là sở duyên + 5 tâm quả thiền Sắc giới + 4 tâm quả thiền Vô sắc; sắc tâm phi trưởng + sắc nghiệp + sắc thời tiết + sắc vật thực.'}
  ]},
 {ten:'Vô gián duyên', pali:'Anantarapaccaya',
  dn:'Mãnh lực trợ sinh bằng cách <b>không gián đoạn</b> (na + antara = không có khoảng cách). Pāli: <i>"Anantarabhāvena upakārako dhammo = anantarapaccayo — Pháp nâng đỡ làm cho không có khoảng cách, là Vô gián duyên"</i>.<br><br>Tâm và tâm sở vừa diệt đi, giúp cho tâm và tâm sở kế tiếp "có dịp" sinh lên — ví như đoàn người xếp hàng mua vé: người này mua xong đi ra, người kế tiếp mới có cơ hội; sự tiếp nối không hề có kẽ hở.<br><br>Ví dụ trong lộ trình tâm: nhãn thức diệt trợ tâm Tiếp thâu sinh; Tiếp thâu diệt trợ tâm Quan sát sinh; Quan sát diệt trợ tâm Phân đoán sinh... cứ thế suốt dòng tâm thức.',
  nang:'Tâm + tâm sở sinh trước, vừa diệt (trừ tâm Tử của vị Thánh Alahán — vì sau đó không còn tâm nào sinh lên nữa).',
  so:'Tâm + tâm sở sinh kế sau ngay đó (kể cả tâm Tử của vị Alahán, vì nó cũng do tâm trước trợ sinh).',
  phiso:'Sắc pháp + Níp-bàn + chế định.'},
 {ten:'Đẳng vô gián duyên', pali:'Samanantarapaccaya',
  dn:'Cách trợ giúp <b>như Vô gián duyên</b> — sama (giống như, hoàn toàn) + anantara (không kẽ hở) = "hoàn toàn không kẽ hở, khít khao một cách tốt đẹp".<br><br>Theo Sớ giải Đại Xứ: khi thuyết Vô gián duyên, Đức Phật xét thấy có người chưa tỏ ngộ nên Ngài thuyết thêm Đẳng vô gián duyên — dù <b>trùng chi pháp</b> — để củng cố cho chặt chẽ. Ví như hai cách bắt tay: bắt tay bình thường (Vô gián duyên) và xiết chặt bàn tay (Đẳng vô gián duyên).',
  nang:'Tâm + tâm sở sinh trước, vừa diệt (trừ tâm Tử của vị Thánh Alahán).',
  so:'Tâm + tâm sở sinh kế sau.',
  phiso:'Sắc pháp.'},
 {ten:'Đồng sinh duyên', pali:'Sahajātapaccaya',
  dn:'Trợ giúp bằng cách <b>cùng sinh lên</b> (saha + jāta). Pāli: <i>"Uppajjamānova saha uppādabhāvena upakārako dhammo = sahajātapaccayo — Pháp nâng đỡ pháp khác cùng sinh lên với mình"</i> (Thanh Tịnh Đạo) — ví như ngọn lửa sinh lên thì ánh sáng và sức nóng cùng sinh lên.<br><br>Pháp hữu vi không bao giờ sinh riêng lẻ: danh pháp ít nhất 8 pháp cùng sinh (1 trong ngũ song thức + 7 tâm sở biến hành), sắc pháp ít nhất 8 sắc cùng sinh (đoàn bất ly: tứ đại + sắc, mùi, vị, vật thực).<br><br>Mô thức tổng quát 4 cách: <b>danh trợ danh</b> (uẩn trợ uẩn: 1 trợ 3, 2 trợ 2, 3 trợ 1; tâm sở trợ tâm sở như "xúc duyên thọ"), <b>danh trợ sắc</b> (danh uẩn trợ sắc tục sinh, tâm trợ sắc tâm), <b>sắc trợ sắc</b> (tứ đại trợ nhau và trợ sắc y sinh), <b>sắc trợ danh</b> (sắc Ý vật trợ tâm tục sinh).',
  nang:'Tất cả pháp hữu vi. Thời tục sinh — cõi ngũ uẩn: 15 tâm tục sinh (2 Quan sát thọ xả + 8 Đại quả + 5 quả thiền Sắc giới) + sắc tục sinh; cõi Vô sắc: 4 tâm quả Vô sắc; cõi Vô tưởng: đoàn sắc mạng quyền. Thời bình nhật: tất cả tâm + tâm sở + sắc pháp.',
  so:'Tất cả pháp hữu vi (tương tự năng duyên — năng và sở cùng có mặt).',
  phiso:'Níp-bàn + chế định (pháp vô vi, không sinh lên).'},
 {ten:'Hổ tương duyên', pali:'Aññamaññapaccaya',
  dn:'Mãnh lực trợ giúp <b>qua lại</b>: năng trợ sở và sở cũng trợ năng — ví như ba cây chụm đầu vào nhau, mỗi cây lệ thuộc hai cây kia, một cây ngã thì hai cây kia cũng ngã.<br><br>Ba trường hợp: 4 danh uẩn trợ lẫn nhau (tâm không thể thiếu tâm sở, tâm sở không thể thiếu tâm — như không có 7 báu thì không gọi là vua Chuyển luân); tứ đại trợ lẫn nhau; khi nhập thai (okkanti), tâm Tục sinh ↔ sắc Ý vật trợ lẫn nhau.<br><br>Phân biệt: <b>Hổ tương duyên vừa đồng sinh vừa tương trợ; Đồng sinh duyên chỉ là "cùng có mặt"</b>. Hổ tương duyên là Đồng sinh duyên, nhưng Đồng sinh duyên không hẳn là Hổ tương duyên (như tâm trợ sắc tâm: chỉ đồng sinh, sắc tâm không trợ lại tâm).',
  nang:'Tâm + tâm sở + sắc Tứ đại + sắc Ý vật (thời tái tục).',
  so:'Tâm + tâm sở + sắc Tứ đại + sắc Ý vật (thời tái tục).',
  phiso:'Các sắc y sinh (nhất định — như sắc thân biểu tri, ngữ biểu tri: do tâm sinh nhưng không trợ lại tâm); sắc Ý vật là phi sở duyên bất định (thời bình nhật không hổ tương, chỉ hổ tương vào thời tục sinh).'},
 {ten:'Y duyên', pali:'Nissayapaccaya',
  dn:'Mãnh lực trợ giúp bằng cách làm <b>chỗ nương nhờ</b> vững vàng. Pāli: <i>"Adhiṭṭhānākārena nissayākārena ca upakārako dhammo = nissayapaccayo — Pháp trợ giúp vững vàng và ủng hộ cho những pháp nương nhờ"</i> — ví như trái đất là nơi nương của người, loài vật, cây cối; như nhà cửa, tự viện là nơi nương trú.',
  nang:'Tứ danh uẩn + 6 sắc vật (5 sắc thần kinh + sắc Ý vật).',
  so:'Tứ danh uẩn.',
  phiso:'Sắc pháp.',
  subs:[
   {ten:'Đồng sinh y duyên', pali:'Sahajātanissayapaccaya',
    dn:'Nương nhờ pháp cùng sinh với mình — <b>trùng chi pháp với Đồng sinh duyên</b> (4 danh uẩn nương nhau; danh nương sắc Ý vật tái tục; tứ đại nương nhau...).'},
   {ten:'Vật sinh tiền y duyên', pali:'Vatthupurejātanissayapaccaya',
    dn:'Sắc vật <b>sinh trước ít nhất 1 sát-na tiểu</b>, đang hiện hữu, làm chỗ nương cho tâm sinh sau: thần kinh Nhãn cho 2 Nhãn thức, thần kinh Nhĩ cho 2 Nhĩ thức... và sắc Ý vật cho 111 tâm còn lại (trong đó Ý giới = 2 Tiếp thâu + Hướng ngũ môn chỉ biết 5 cảnh; 108 tâm còn lại là Ý thức giới).',
    nang:'6 sắc vật sinh trước, đang hiện hữu (thời bình nhật).',
    so:'Tâm nương vật, sinh sau (117 tâm — trừ 4 tâm quả Vô sắc).',
    phiso:'Sắc pháp + những tâm không nương vật: 72 tâm sinh ở cõi Vô sắc (8 Tham, 2 Si, Hướng ý môn, 8 Đại thiện, 8 Đại hạnh, 12 tâm thiền Vô sắc, 35 tâm Siêu thế trừ 5 Sơ đạo).'},
   {ten:'Vật-cảnh sinh tiền y duyên', pali:'Vatthārammaṇapurejātanissayapaccaya',
    dn:'Chỉ có trong <b>lộ cận tử</b>: sắc Ý vật sinh trước vừa làm <b>chỗ nương</b> vừa làm <b>cảnh</b> cho tâm lộ tử nắm lấy — như người sắp lâm chung nhận biết "sự sống qua nhịp tim" của chính mình.',
    nang:'Sắc Ý vật sinh vào sát-na sinh của tâm hữu phần thứ 16 kể từ tâm Tử lui lại (nhóm Ý vật sinh lần cuối, cùng diệt với tâm Tử).',
    so:'32 tâm khách trong lộ tử (tâm Hướng ý môn + 29 đổng lực dục giới + 2 tâm thông) + 44 tâm sở hợp (trừ Tật, Lận, Hối, 3 Giới phần, 2 Vô lượng phần).',
    phiso:'Nhất định: sắc pháp + ngũ song thức + Ý giới + tâm Siêu thế + tâm Đáo đại và tâm sở hợp. Bất định: 41 tâm Dục giới (trừ ngũ song thức + Ý giới) + 52 tâm sở khi không bắt Ý vật làm cảnh.'}
  ]},
 {ten:'Cận y duyên', pali:'Upanissayapaccaya',
  dn:'Mãnh lực trợ giúp, ủng hộ bằng cách làm chỗ nương <b>rất vững chắc, có sức mạnh lớn</b>. Pāli: <i>"Balavarato nissayoti = upanissayo — Nơi nương có sức mạnh lớn, gọi là cận y"</i>.<br><br>Y duyên ví như đất là nơi cây nương; Cận y duyên ví như mưa thuận gió hòa giúp cây tăng trưởng lớn mạnh. Như Phật ngôn "Attā hi attano nātho — Ta là nơi nương của chính ta": ta là "cận y" của chính ta.',
  subs:[
   {ten:'Cảnh cận y duyên', pali:'Ārammaṇūpanissayapaccaya',
    dn:'Trợ giúp bằng cách làm thành cảnh rất vững mạnh. <b>Chi pháp giống Cảnh trưởng duyên</b>. Khác biệt: cảnh trưởng nói khía cạnh <b>quan trọng</b> (garu) — như hành giả phản khán thiền chứng, bậc hữu học xem xét Đạo – Quả; cảnh cận y nói khía cạnh <b>sức mạnh</b> (bala) — như người từng bị cảnh gây kinh hoàng, nay gặp lại thì tâm kinh hoàng ngay; người từng hài lòng cảnh nào, gặp lại không cưỡng được.'},
   {ten:'Vô gián cận y duyên', pali:'Anantarūpanissayapaccaya',
    dn:'Trợ giúp bằng cách liên tiếp rất vững mạnh. <b>Chi pháp giống Vô gián duyên</b> nhưng mạnh mẽ hơn — ví như dòng nước chảy xiết so với dòng chảy thường. Đặc biệt chỉ cho các tâm trong <b>lộ đổng lực</b>: 7 sát-na đổng lực thỏa hai điều kiện — tâm sau giống tâm trước, và tâm trước có sức mạnh trợ tâm sau sinh lên.'},
   {ten:'Thường cận y duyên', pali:'Pakatūpanissayapaccaya',
    dn:'Trợ giúp vững mạnh theo cách <b>tự nhiên (pakati), thành thói quen</b> do thường làm, thường thực hiện — "ăn cắp quen tay, ngủ ngày quen mắt".<br>Theo Kinh tạng: giao du bạn lành/bạn xấu, trú xứ, thời tiết, vật thực, tín – giới – văn – thí – tuệ đã huân tập... đều tác động tâm lý về sau bằng thường cận y duyên. Đây là duyên có phạm vi rộng nhất trong 24 duyên.',
    nang:'Tâm + tâm sở + sắc pháp + chế định có sức mạnh, thuộc cả 3 thời (trừ chế định nghiệp xứ như đề mục kasiṇa — vì thuộc cảnh cận y).',
    so:'Tâm + tâm sở sinh về sau.',
    phiso:'Sắc pháp.'}
  ]},
 {ten:'Sinh tiền duyên', pali:'Purejātapaccaya',
  dn:'Mãnh lực trợ giúp bằng cách <b>sinh ra trước</b>. Pāli: <i>"Purejāto ca so paccayo cāti = purejātapaccayo — Xuất hiện trước để trợ giúp, gọi là Sinh tiền duyên"</i>.<br><br>Lưu ý: sinh tiền duyên chỉ cho cái sinh trước <b>đang hiện hữu</b> (sát-na trụ), không phải cái sinh trước đã diệt (khác Vô gián duyên).',
  subs:[
   {ten:'Vật sinh tiền duyên', pali:'Vatthupurejātapaccaya',
    dn:'Sắc vật sinh trước làm chỗ nương — <b>chi pháp như Vật sinh tiền y duyên</b> (xem Y duyên), chỉ khác khía cạnh nhấn mạnh "sinh trước" thay vì "nương nhờ".'},
   {ten:'Vật-cảnh sinh tiền duyên', pali:'Vatthārammaṇapurejātapaccaya',
    dn:'Sắc Ý vật cận tử vừa là vật vừa là cảnh — <b>chi pháp như Vật-cảnh sinh tiền y duyên</b> (xem Y duyên).'},
   {ten:'Cảnh sinh tiền duyên', pali:'Ārammaṇapurejātapaccaya',
    dn:'Sắc pháp sinh trước, <b>đang hiện hữu</b>, làm <b>cảnh</b> cho tâm sinh sau nhận lấy — ví như dây đàn và vật va chạm phải có trước, đang hiện hữu, thì âm thanh (tâm) mới sinh lên.<br>Trong 18 sắc thành tựu: 7 sắc rõ (4 sắc cảnh + đất, lửa, gió) làm cảnh cho ngũ song thức và Ý giới; 11 sắc còn lại (nước, 5 sắc thần kinh, 2 sắc tính, Ý vật, mạng quyền, vật thực) làm cảnh pháp cho Ý thức giới qua ý môn.',
    nang:'18 sắc thành tựu (nipphannarūpa) sinh trước, đang hiện hữu, làm cảnh hiện tại.',
    so:'Nhất định: ngũ song thức + Ý giới (3 tâm). Bất định: 41 tâm Dục giới còn lại + 2 tâm thông và 50 tâm sở hợp (trừ 2 Vô lượng phần).',
    phiso:'Nhất định: sắc pháp + 27 tâm Đáo đại + 40 tâm Siêu thế. Bất định: 41 tâm Dục giới khi không bắt 18 sắc thành tựu làm cảnh.'}
  ]},
 {ten:'Sinh hậu duyên', pali:'Pacchājātapaccaya',
  dn:'Mãnh lực trợ giúp bằng cách <b>sinh ra sau</b> nhưng giúp pháp sinh trước được vững mạnh. Pāli (Thanh Tịnh Đạo): <i>"Pháp vô sắc ủng hộ, trợ giúp cho pháp sắc sinh trước, gọi là sinh hậu duyên"</i> — ví như những trận mưa đến sau giúp cây, lúa gieo trồng trước được nảy mầm lớn mạnh.<br><br>Đây là sự trợ giúp của <b>tâm</b> đối với <b>sắc pháp</b> sinh trước: mỗi bọn sắc tồn tại 17 sát-na tâm, nên sau sát-na đồng sinh, 16 tâm sinh kế đó liên tục hậu thuẫn cho bọn sắc ấy được duy trì. Thân sắc uẩn này sống còn là nhờ dòng tâm thức sẽ sinh tiếp nối trợ duyên.',
  nang:'117 tâm sinh sau (kể từ tâm hữu phần thứ 1 trở đi; trừ 4 tâm quả Vô sắc) và tâm sở hợp. Nhất định: 2 Sân + ngũ song thức + Ý giới + 11 Na cảnh + Sinh tiếu + 15 tâm Sắc giới + 5 Sơ đạo (cõi ngũ uẩn). Bất định: 8 Tham + 2 Si + Hướng ý môn + 8 Đại thiện + 8 Đại hạnh + 8 đổng lực Vô sắc + 35 Siêu thế (trừ 5 Sơ đạo).',
  so:'Sắc do 3 nhân sinh và 4 nhân sinh (nghiệp, tâm, thời tiết, vật thực) đang ở sát-na trụ, đồng sinh với tâm trước đó.',
  phiso:'121 tâm + tâm sở; sắc đang ở sát-na sinh; sắc tâm + sắc nghiệp tục sinh (đồng sinh, không phải sinh trước); sắc ngoại, sắc nghiệp Vô tưởng.'},
 {ten:'Tập hành duyên', pali:'Āsevanapaccaya',
  dn:'Trợ giúp, ủng hộ bằng cách <b>lập đi lập lại</b> làm thuần thục, tạo năng lực (bala). Pāli: <i>"Āsevanaṃ ca taṃ paccayaṃ cāti = āsevanapaccayaṃ — Trợ giúp bằng cách chính nó được lập đi lập lại"</i> — như người tụng bài kinh nhiều lần, sự thuộc lòng càng thuần thục, bài kinh càng tăng uy lực.<br><br>Chỉ có nơi các sát-na <b>đổng lực</b> (javana) thiện, bất thiện và duy tác — đổng lực quả Siêu thế thuộc giống quả (vipākajāti) nên không kể. Trong lộ đổng lực: đổng lực thứ 1 chỉ làm năng; đổng lực chót chỉ làm sở; từ thứ 2 đến áp chót vừa là sở (của sát-na trước) vừa là năng (của sát-na sau). Có thể nói Tập hành duyên là một khía cạnh riêng của Vô gián duyên.',
  nang:'47 tâm đổng lực hiệp thế (12 bất thiện + Sinh tiếu + 8 Đại thiện + 8 Đại hạnh + 9 thiện Đáo đại + 9 duy tác Đáo đại), sát-na trước — trừ đổng lực cuối trong lộ.',
  so:'67 tâm đổng lực sinh nối tiếp (47 hiệp thế + 20 tâm Đạo) — trừ đổng lực thứ nhất trong lộ.',
  phiso:'Đổng lực sát-na thứ 1; 2 tâm hướng môn; 52 tâm quả; tâm quả Siêu thế trong lộ nhập thiền quả; sắc pháp.'},
 {ten:'Nghiệp duyên', pali:'Kammapaccaya',
  dn:'Trợ giúp bằng cách <b>tạo tác, hành khiển</b>. Phật ngôn: <i>"Cetanāhaṃ bhikkhave kammaṃ vadāmi — Này chư tỳ khưu, Như Lai tuyên thuyết chính sự cố ý (cetanā) là nghiệp"</i>. Nghiệp chính là <b>tâm sở Tư</b> — khi có bất kỳ việc làm nào của thân, khẩu, ý, đó chính là tác lực của tâm sở Tư.',
  subs:[
   {ten:'Đồng sinh nghiệp duyên', pali:'Sahajātakammapaccaya',
    dn:'Tâm sở Tư hành khiển, đôn đốc các pháp <b>đồng sinh</b> cùng tạo tác — ví như kỹ sư trưởng của công trình, vừa điều hành các cộng sự vừa thực hiện công trình.',
    nang:'Tâm sở Tư trong tất cả tâm (121 tâm).',
    so:'Tâm + 51 tâm sở hợp (trừ tâm sở Tư) + sắc tâm + sắc nghiệp tục sinh.',
    phiso:'Tâm sở Tư (đang làm năng duyên) + sắc nghiệp bình nhật + sắc vật thực + sắc khí hậu + sắc ngoại + sắc nghiệp Vô tưởng.'},
   {ten:'Vô gián nghiệp duyên', pali:'Anantarakammapaccaya',
    dn:'Tâm sở Tư trong <b>tâm Đạo</b> trợ liền cho tâm quả Siêu thế sinh kế tục <b>không gián đoạn</b> trong lộ đắc đạo. Đạo trợ Quả cũng là "nghiệp khác thời" nhưng vì quả sinh liền kề vô gián — không như nghiệp hiệp thế cho quả cách xa — nên các Ngài lập riêng thành một duyên.',
    nang:'Tâm sở Tư trong 20 tâm Đạo.',
    so:'20 tâm quả Siêu thế + 36 tâm sở hợp, sinh kế tục tâm Đạo trong lộ đắc đạo.',
    phiso:'Những tâm ngoài tâm quả Siêu thế sinh kế tiếp tâm Đạo + sắc pháp.'},
   {ten:'Dị thời nghiệp duyên', pali:'Nānakkhaṇikakammapaccaya',
    dn:'Tâm sở Tư trợ giúp các pháp <b>cách xa thời gian</b> — thời điểm Tư khởi lên là khác, thời điểm tâm quả khởi lên là khác; ví như lời di chúc của người quá cố được con cháu thực hiện về sau. Đây chính là "nghiệp báo nhân quả" thông thường.<br>Ba cách khác thời: quá khứ → hiện tại; hiện tại → vị lai; quá khứ → vị lai. Tâm sở Tư tuy đã diệt nhưng năng lực vẫn còn như chủng tử chờ đủ duyên trổ quả.',
    nang:'Tâm sở Tư hợp trong tâm thiện hay tâm bất thiện (thuộc quá khứ).',
    so:'Sắc nghiệp + tâm quả và tâm sở hợp (trừ tâm sở Tư), trong hiện tại.',
    phiso:'Tâm thiện, tâm bất thiện, tâm duy tác + sắc tâm, sắc ngoại, sắc vật thực, sắc khí hậu.'}
  ]},
 {ten:'Quả duyên', pali:'Vipākapaccaya',
  dn:'Mãnh lực trợ giúp bằng <b>kết quả của nghiệp</b>. Vipāka = vi (khác, sai biệt) + pāka (sự chín muồi) — sự chín muồi của thiện hay bất thiện. Thanh Tịnh Đạo: <i>"Pháp dị thục quả trợ giúp bằng cách thành tựu sự yên lặng (santa), diễn tiến sự yên lặng"</i> — quả sinh lên tự nhiên không cần nỗ lực, ví như trái cây nuôi hạt mầm.<br><br>Bốn uẩn quả vô sắc trợ lẫn nhau bằng quả duyên: trong một tâm quả, khi một uẩn làm năng thì ba uẩn kia làm sở (như tâm Nhãn thức + 7 tâm sở Biến hành — cả 8 pháp đều là kết quả của tâm sở Tư trước đó, trợ giúp lẫn nhau).',
  nang:'52 tâm quả (15 quả vô nhân + 8 Đại quả + 9 quả Đáo đại + 20 quả Siêu thế) + 38 tâm sở hợp.',
  so:'52 tâm quả + 38 tâm sở hợp (khi không làm năng duyên) + sắc nghiệp tục sinh + sắc tâm quả (trừ 2 sắc biểu tri).',
  phiso:'Tâm thiện, tâm bất thiện, tâm duy tác + 52 tâm sở hợp + sắc nghiệp bình nhật, sắc nghiệp Vô tưởng, sắc ngoại, sắc khí hậu, sắc vật thực, sắc tâm của các tâm phi quả.'},
 {ten:'Vật thực duyên', pali:'Āhārapaccaya',
  dn:'Mãnh lực trợ giúp, ủng hộ bằng cách <b>mang dưỡng tố (ojā) vào, nuôi dưỡng cho tồn tại vững mạnh</b>. Pāli: <i>"Āharantīti = āhārā — Mang lại, gọi là vật thực"</i>.<br><br>Căn bản là <b>Tứ thực</b>: <b>Đoàn thực</b> (thực phẩm — chi pháp là dưỡng tố ojā), <b>Xúc thực</b> (tâm sở Xúc — thức ăn cho thọ sinh khởi), <b>Tư niệm thực</b> (tâm sở Tư — thức ăn cho quả dị thục), <b>Thức thực</b> (tâm — thức ăn bổ trợ cho danh sắc). Ý nghĩa chủ yếu của vật thực là "làm cho tồn tại chắc chắn" — ví như bà mẹ sinh con và nuôi con, thì nuôi dưỡng là chủ yếu.',
  subs:[
   {ten:'Sắc vật thực duyên', pali:'Rūpāhārapaccaya',
    dn:'Dưỡng tố trong thực phẩm nuôi dưỡng sắc pháp. Sắc vật thực nội (dưỡng tố trong thân) không tạo sắc mới, chỉ nuôi dưỡng; chính dưỡng tố bên ngoài được cơ thể hấp thụ mới tạo ra sắc vật thực.',
    nang:'Tất cả sắc vật thực nội hay ngoại, đã ăn hay chưa ăn (dưỡng tố trong và ngoài cơ thể).',
    so:'Sắc do vật thực tạo và các sắc đồng nhóm với sắc vật thực (nuôi các bọn sắc do 4 nhân sinh).',
    phiso:'Tâm + tâm sở + sắc tâm + sắc ngoại + sắc nghiệp + sắc âm dương.'},
   {ten:'Danh vật thực duyên', pali:'Nāmāhārapaccaya',
    dn:'Ba danh thực "bám chặt lấy cảnh" trợ giúp các danh pháp đồng sinh thêm vững mạnh. Theo Kinh tạng, "thức ăn" còn được thuyết rộng: thức ăn của vô minh là 5 triền cái, thức ăn của minh giải thoát là 7 giác chi, thức ăn của 7 giác chi là 4 niệm xứ...',
    nang:'3 danh vật thực: Xúc thực (tâm sở Xúc), Thức thực (tâm — 121 tâm), Tư niệm thực (tâm sở Tư).',
    so:'Tâm + tâm sở + sắc do tâm tạo + sắc nghiệp tục sinh.',
    phiso:'Các sắc pháp ngoài ra + pháp vật thực đang làm năng duyên.'}
  ]},
 {ten:'Quyền duyên', pali:'Indriyapaccaya',
  dn:'Mãnh lực trợ giúp, ủng hộ bằng cách <b>cai quản, kiểm soát, điều hành</b> trong lãnh vực riêng của mình. Pāli: <i>"Indati parama issariyaṃ karotīti = indriyaṃ — Có uy quyền như vị chúa tể cao nhất, gọi là quyền"</i>.<br><br>Trong 22 quyền, năng duyên tổng quát là <b>20 quyền</b>, trừ Nữ quyền và Nam quyền — vì 2 sắc tính này không có 3 chức năng của năng duyên (tạo ra – hỗ trợ – duy trì); ví như khuôn bánh: bánh có hình dáng theo khuôn nhưng khuôn không sinh ra, không nuôi bánh.<br><br>So sánh: 5 sắc thần kinh là quyền vì mỗi thần kinh chỉ "chấp nhận và cai quản" đúng loại tâm tương ứng (như chủ nhà); sắc Ý vật tuy là chỗ nương nhưng dung chứa mọi loại tâm, không kiểm soát được tâm nào (như người cho mướn nhà) — nên không là quyền.',
  subs:[
   {ten:'Đồng sinh quyền duyên', pali:'Sahajātindriyapaccaya',
    dn:'Các <b>danh quyền</b> huấn luyện và kiểm soát các pháp đồng sinh cùng thực hiện chức năng như mình: tâm làm quyền thì kiểm soát các tâm sở cùng "biết cảnh"; Tín làm quyền thì các pháp đồng sinh cùng "hướng tin"; Cần — cùng "nỗ lực"; Niệm — cùng "ghi nhớ"; Định — cùng "an trú"; Trí — cùng "hiểu biết".',
    nang:'8 danh quyền: Tâm (ý quyền) + tâm sở Thọ (lạc, khổ, hỷ, ưu, xả quyền) + tâm sở Mạng quyền (danh) + Tín, Cần, Niệm, Nhất hành (định quyền), Trí (tuệ quyền — gồm cả Vị tri, Dĩ tri, Cụ tri quyền).',
    so:'Tâm + 52 tâm sở hợp + sắc tục sinh + sắc do tâm tạo.',
    phiso:'Sắc ngoại + sắc thời tiết + sắc vật thực + sắc nghiệp bình nhật + sắc nghiệp Vô tưởng.'},
   {ten:'Quyền sinh tiền duyên', pali:'Purejātindriyapaccaya',
    dn:'5 <b>sắc thần kinh</b> sinh trước, cai quản tâm nương trú thực hiện đúng chức năng thấy, nghe, ngửi, nếm, đụng — ví như người nương trú nhà nào phải theo quy định nhà ấy. Trong 49 sát-na trụ của sắc thần kinh, sát-na thứ 26 là giai đoạn phát triển cao tột ("sát-na Quyền") mới đủ năng lực điều hành sở duyên.',
    nang:'5 sắc thần kinh ở sát-na thứ 26 (tuổi trung thọ).',
    so:'Ngũ song thức + 7 tâm sở hợp.',
    phiso:'111 tâm còn lại + 52 tâm sở + tất cả sắc pháp.'},
   {ten:'Sắc mạng quyền duyên', pali:'Rūpajīvitindriyapaccaya',
    dn:'Sắc Mạng quyền <b>cai quản tuổi thọ</b>, duy trì các sắc nghiệp đồng bọn tồn tại tròn đủ tuổi thọ (51 sát-na tiểu).',
    nang:'Tất cả sắc Mạng quyền.',
    so:'Các bọn sắc nghiệp sinh chung với sắc Mạng quyền — 9 bọn: bọn Nhãn, Nhĩ, Tỷ, Thiệt, Thân, Nữ tính, Nam tính, Ý vật (mỗi bọn 9 sắc còn lại là sở) và bọn Mạng quyền (8 sắc bất ly là sở).',
    phiso:'Tâm + tâm sở + sắc tâm + sắc thời tiết + sắc vật thực + chính sắc Mạng quyền.'}
  ]},
 {ten:'Thiền duyên', pali:'Jhānapaccaya',
  dn:'Mãnh lực trợ giúp bằng cách <b>chăm chú vào đối tượng làm cảnh "chói sáng"</b> (ngữ căn jhe) hay <b>"thiêu đốt" các pháp nghịch</b> (ngữ căn jhā).<br><br>7 chi thiền và pháp bị thiêu đốt: <b>Tầm</b> ↔ hôn trầm – thụy miên; <b>Tứ</b> ↔ hoài nghi; <b>Hỷ</b> ↔ bất mãn, khó chịu; <b>Lạc</b> ↔ phóng dật; <b>Xả</b> ↔ hối tiếc; <b>Ưu</b> ↔ dính mắc; <b>Định</b> ↔ tham dục. Theo bản thể pháp, 7 chi thiền chỉ có 5 pháp thực tính (chi lạc, ưu, xả đều là tâm sở Thọ).',
  nang:'5 pháp thực tính của 7 chi thiền — Tầm, Tứ, Hỷ, Thọ, Nhất hành — có trong 103 tâm (trừ 18 tâm vô nhân).',
  so:'103 tâm + 52 tâm sở hợp (trừ chi thiền đang làm năng duyên) + sắc nghiệp tục sinh + sắc do tâm tạo.',
  phiso:'Ngũ song thức + 7 tâm sở hợp + sắc nghiệp bình nhật + sắc ngoại + sắc vật thực + sắc âm dương + sắc nghiệp Vô tưởng.'},
 {ten:'Đạo duyên', pali:'Maggapaccaya',
  dn:'Mãnh lực trợ giúp bằng cách <b>như con đường</b>, dẫn đến đích: tà đạo dẫn đến khổ cảnh, chánh đạo dẫn đến lạc cảnh và Níp-bàn. Pāli: <i>"Maggabhāvena upakārako dhammo = maggapaccayo — Pháp trợ giúp làm tăng trưởng con đường"</i>.<br><br>Chi đạo theo Kinh tạng có 16 (8 chánh + 8 tà); theo tạng Diệu pháp gom lại 12 chi (trừ tà ngữ, tà nghiệp, tà mạng, tà niệm — vì không có chi pháp thực tính riêng); theo Duyên hệ chỉ kể <b>9 chi pháp thực tính</b>.',
  nang:'9 chi đạo trong những tâm hữu nhân: Trí (chánh kiến), Tầm (chánh/tà tư duy), Chánh ngữ, Chánh nghiệp, Chánh mạng (3 Giới phần), Cần (chánh/tà tinh tấn), Niệm (chánh niệm), Nhất hành (chánh/tà định), Tà kiến.',
  so:'103 tâm hữu nhân + 52 tâm sở hợp + sắc tâm hữu nhân + sắc nghiệp tục sinh với tâm hữu nhân.',
  phiso:'18 tâm vô nhân + 12 tâm sở hợp + sắc ngoại, sắc âm dương, sắc vật thực, sắc nghiệp bình nhật, sắc nghiệp Vô tưởng, sắc tâm vô nhân, sắc nghiệp tục sinh với tâm vô nhân.'},
 {ten:'Tương ưng duyên', pali:'Sampayuttapaccaya',
  dn:'Mãnh lực trợ giúp theo cách <b>hòa hợp</b>, chỉ có giữa <b>danh với danh</b>. Thanh Tịnh Đạo: <i>"Các pháp vô sắc trợ giúp bằng cách làm tăng trưởng sự hòa hợp theo phương cách đồng sinh, đồng diệt, đồng biết một cảnh, đồng nương một vật"</i> — 4 nghĩa "đồng".<br><br>Hòa hợp nghĩa là "như một, không còn phân biệt được" — ví như nước hòa với sữa. Như tâm Nhãn thức kết hợp 7 tâm sở Biến hành: 8 pháp này khó nhận biết riêng lẻ, được gọi chung theo phận sự là "sự thấy".',
  nang:'Tất cả tâm và tâm sở đồng sinh với nhau (4 danh uẩn: 1 trợ 3, 3 trợ 1, 2 trợ 2).',
  so:'Tất cả tâm và tâm sở đồng sinh với nhau.',
  phiso:'Sắc pháp + Níp-bàn + chế định.'},
 {ten:'Bất tương ưng duyên', pali:'Vippayuttapaccaya',
  dn:'Mãnh lực trợ giúp bằng cách <b>không hòa hợp</b> — ví như nước lăn trên lá sen, hay vị ngọt – đắng không hòa lẫn. Là mối liên hệ giữa <b>danh và sắc</b>: danh trợ sắc, hoặc sắc trợ danh (không đồng nương một vật, không đồng cảnh).',
  subs:[
   {ten:'Đồng sinh bất tương ưng duyên', pali:'Sahajātavippayuttapaccaya',
    dn:'Danh trợ sắc cùng sinh lên nhưng không hòa hợp: tâm trợ sắc tâm; tâm sở Tư trong tâm Tục sinh trợ sắc nghiệp tục sinh; ngược lại sắc Ý vật tái tục trợ tâm tái tục cõi ngũ uẩn.',
    nang:'107 tâm (trừ ngũ song thức + 4 tâm quả Vô sắc) cùng tâm sở hợp; sắc Ý vật tái tục.',
    so:'Sắc do tâm tạo, sắc nghiệp tục sinh; tâm tái tục cõi ngũ uẩn cùng tâm sở hợp.',
    phiso:'121 tâm + tâm sở khi không là sở duyên; sắc ngoại, sắc vật thực, sắc âm dương, sắc nghiệp Vô tưởng, sắc nghiệp bình nhật.'},
   {ten:'Sinh hậu bất tương ưng duyên', pali:'Pacchājātavippayuttapaccaya',
    dn:'Danh sinh sau trợ sắc sinh trước — <b>chi pháp như Sinh hậu duyên</b>.'},
   {ten:'Vật sinh tiền bất tương ưng duyên', pali:'Vatthupurejātavippayuttapaccaya',
    dn:'Sắc vật sinh trước làm chỗ nương cho danh — <b>chi pháp như Vật sinh tiền (y) duyên</b>.'},
   {ten:'Vật-cảnh sinh tiền bất tương ưng duyên', pali:'Vatthārammaṇapurejātavippayuttapaccaya',
    dn:'Vật vừa là chỗ nương vừa là cảnh trong lộ cận tử — <b>chi pháp như Vật-cảnh sinh tiền (y) duyên</b>.'}
  ]},
 {ten:'Hiện hữu duyên', pali:'Atthipaccaya',
  dn:'Mãnh lực trợ giúp theo phương cách <b>"đang tồn tại"</b> — năng duyên đang hiện trú thì mới ủng hộ được sở duyên. Có 7 trường hợp năng – sở cùng hiện hữu: (1) 4 danh uẩn với nhau; (2) tứ đại với nhau; (3) danh – sắc lúc nhập thai cõi ngũ uẩn; (4) tâm + tâm sở với sắc tâm tạo; (5) tứ đại với sắc y sinh; (6) 5 sắc thần kinh với 5 thức; (7) sắc Ý vật với Ý giới – Ý thức giới.',
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
  dn:'Mãnh lực trợ giúp bằng cách <b>"vắng mặt"</b>: pháp vô sắc vừa diệt theo diễn tiến của mình, nhường chỗ trợ cho pháp vô sắc mới sinh lên (Thanh Tịnh Đạo). Chính là Vô gián duyên / Đẳng vô gián duyên nhìn theo khía cạnh "vắng mặt" — <b>trùng chi pháp với Vô gián duyên</b>.<br><br>Ý nghĩa sâu: Hiện hữu duyên và Vô hữu duyên chỉ ra sự liên hệ "có mặt – vắng mặt", qua đó Đức Phật bác bỏ hai cực đoan thường kiến – đoạn kiến: <i>"Này Kaccāna, tất cả đều có là một cực đoan; tất cả đều không có là cực đoan thứ hai"</i>. Pháp diệt rồi không phải đoạn diệt — vì còn trợ pháp khác sinh lên, chỉ là "vắng mặt".',
  nang:'Tâm + tâm sở vừa diệt (trừ tâm Tử của vị Thánh Alahán).',
  so:'Tâm + tâm sở sinh kế sau.',
  phiso:'Sắc pháp.'},
 {ten:'Ly duyên', pali:'Vigatapaccaya',
  dn:'Mãnh lực trợ giúp bằng cách <b>"lìa nhau, diệt mất"</b>. Thanh Tịnh Đạo: <i>"Cũng chính chúng (tâm và tâm sở vừa diệt) trợ giúp bằng cách biến mất, gọi là ly duyên"</i> — <b>chi pháp tương tự Vô hữu duyên</b> (nhấn mạnh khía cạnh "đã lìa khỏi").',
  nang:'Tâm + tâm sở vừa diệt, lìa đi (trừ tâm Tử của vị Thánh Alahán).',
  so:'Tâm + tâm sở sinh kế sau.',
  phiso:'Sắc pháp.'},
 {ten:'Bất ly duyên', pali:'Avigatapaccaya',
  dn:'Mãnh lực trợ giúp bằng cách <b>"không xa lìa"</b> — pháp đang còn, không diệt mất, ủng hộ pháp khác. Pāli: <i>"Avigatabhāvena upakārattā avigatapaccayo — Ủng hộ theo cách không lìa bỏ, là bất ly duyên"</i> (Thanh Tịnh Đạo) — <b>chi pháp tương tự Hiện hữu duyên</b> (nhấn mạnh khía cạnh "chưa lìa khỏi").<br><br>Đức Phật thuyết đôi Ly – Bất ly để nhấn mạnh thêm đôi Vô hữu – Hiện hữu, phá chấp "còn tự ngã – không còn tự ngã".',
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
