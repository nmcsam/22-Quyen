// ===== Phần "22 Quyền" (module gốc) =====
let currentView = 'sacdanh';
const viewOrder = ['sacdanh','coi','chiphap','duyen'];
const viewIcons = {sacdanh:'◐', coi:'◈', chiphap:'✳', duyen:'⇄'};

function renderQuyenNav(){
  const nav = document.getElementById('nav');
  nav.innerHTML = viewOrder.map(k=>
    `<button class="${k===currentView?'active':''}" onclick="switchQuyenView('${k}')">
      <span class="ico">${viewIcons[k]}</span>${VIEWS[k].title}
    </button>`
  ).join('');
}

function switchQuyenView(k){
  currentView = k;
  renderQuyenNav();
  renderQuyenGrid();
  document.getElementById('main').scrollTop = 0;
}

function renderQuyenGrid(){
  const v = VIEWS[currentView];
  const grid = document.getElementById('grid');
  grid.style.display = 'grid';
  grid.innerHTML = QUYEN_DATA.map(d=>{
    const cat = v.colors[v.key(d)] || 'gray';
    return `<div class="card cat-${cat}" onclick="openQuyenSheet(${d.id})">
      <div class="n">${d.id}</div>
      <div class="v">${d.ten}</div>
      <div class="p">${d.pali.split(' ')[0]}</div>
    </div>`;
  }).join('');
  const legend = document.getElementById('legend');
  legend.style.display = 'flex';
  legend.innerHTML = v.legend.map(([c,,label])=>
    `<div class="legend-item"><span class="dot cat-${c}"></span>${label}</div>`
  ).join('');
  document.getElementById('extra-content').innerHTML = '';
}

function openQuyenSheet(id){
  const d = QUYEN_DATA.find(x=>x.id===id);
  const html = `
    <div class="sheet-head"><span class="num">${d.id}</span><h2>${d.ten}</h2></div>
    <p class="sheet-pali">${d.pali}</p>

    <div class="sec">
      <div class="sec-label">Cai quản (phận sự)</div>
      <div class="sec-body">${d.canquan}</div>
    </div>

    <div class="sec">
      <div class="sec-label">Chi pháp</div>
      <div class="sec-body">${d.chiphap}</div>
    </div>

    <div class="sec">
      <div class="sec-label">Thuộc về 4 Thực tính pháp</div>
      <div class="pill-row">${d.paramattha.map(p=>`<span class="pill cat-${p==='tam'?'purple':p==='sohuu'?'amber':'teal'}">${PARAMATTHA_LABELS[p]}</span>`).join('')}</div>
      <div class="sec-body" style="margin-top:6px">${d.paramattha_detail}</div>
    </div>

    <div class="sec">
      <div class="sec-label">Nhóm Sắc / Danh</div>
      <div class="pill-row"><span class="pill cat-${d.sacdanh==='sac'?'purple':d.sacdanh==='danh'?'teal':'coral'}">${d.sacdanh_label}</span></div>
    </div>

    <div class="sec">
      <div class="sec-label">Địa vực (Cõi)</div>
      <div class="pill-row"><span class="pill cat-${d.coi==='duc'?'coral':d.coi==='bacoi'?'amber':d.coi==='sieuthe'?'purple':'teal'}">${d.coi_label}</span></div>
      <div class="sec-body" style="margin-top:6px">${d.coi_detail}</div>
    </div>

    <div class="sec">
      <div class="sec-label">Quy nạp Chi pháp Chân đế</div>
      <div class="pill-row"><span class="pill cat-gray">${d.chiphapchande_label}</span></div>
      <div class="sec-body" style="margin-top:6px">${d.chiphapchande_cung}</div>
    </div>

    <div class="sec">
      <div class="sec-label">Vai trò trong Quyền Duyên (Paṭṭhāna)</div>
      <div class="pill-row"><span class="pill cat-${d.duyen?'teal':'gray'}">${d.duyen?'Có làm năng duyên':'Không làm năng duyên'}</span></div>
      ${d.duyen_loai ? `<div class="sec-body" style="margin-top:6px"><b>${d.duyen_loai}</b></div>` : ''}
      <div class="sec-body" style="margin-top:4px">${d.duyen_detail}</div>
    </div>
  `;
  document.getElementById('sheet-content').innerHTML = html;
  document.getElementById('sheet').classList.add('show');
  document.getElementById('sheet-backdrop').classList.add('show');
}

function closeSheet(){
  document.getElementById('sheet').classList.remove('show');
  document.getElementById('sheet-backdrop').classList.remove('show');
  document.querySelectorAll('.pdot-selected').forEach(x=>x.classList.remove('pdot-selected'));
  if(typeof clearTamsoLit==='function') clearTamsoLit();
}

// Chạm 2 bước: chạm LẦN 1 vào ô tròn → ô phóng to + viền xanh (xác nhận đã chọn đúng ô);
// chạm LẦN 2 vào đúng ô đó → mới mở trang chi tiết. Chạm sang ô khác → chuyển chọn sang ô đó.
// (Dùng capture-phase để chặn onclick mở trang ở lần chạm đầu tiên.)
document.addEventListener('click', function(e){
  const dot = e.target.closest('.pdot-sm,.pdot-ring-big,.circle,.dkc');
  if(!dot) return;
  if(dot.classList.contains('pdot-selected')) return; // lần 2: cho onclick chạy, mở chi tiết
  e.stopPropagation();
  e.preventDefault();
  document.querySelectorAll('.pdot-selected').forEach(x=>x.classList.remove('pdot-selected'));
  clearTamsoLit();
  dot.classList.add('pdot-selected');
  if(dot.dataset.k) tamsoHighlight(dot.dataset.k); // trang Tâm↔Tâm sở: sáng các ô phối hợp
}, true);

// ===== (Trang Tâm ↔ Tâm sở) Chạm lần 1: làm sáng các ô phối hợp =====
function clearTamsoLit(){
  document.querySelectorAll('.pdot-lit,.pdot-lit-ani').forEach(x=>x.classList.remove('pdot-lit','pdot-lit-ani'));
}
function tamsoHighlight(key){
  const [kind, rawId] = [key.slice(0,2), key.slice(3)];
  const lit = (k, cls)=>{ const el=document.querySelector(`[data-k="${k}"]`); if(el) el.classList.add(cls); };
  if(kind==='ci'){
    const c = CITTA_DATA.find(x=>x.id===parseInt(rawId,10));
    if(!c) return;
    c.ceta.forEach(cid=>lit('ce-'+cid,'pdot-lit'));
    // tâm sở bất định có thể khởi với tâm này
    if(typeof ANIYATA_INFO!=='undefined'){
      for(const [cid,info] of Object.entries(ANIYATA_INFO)){
        if(info.cittas.includes(c.id)) lit('ce-'+cid,'pdot-lit-ani');
      }
    }
  } else if(kind==='ce'){
    CITTA_DATA.forEach(c=>{ if(c.ceta.includes(rawId)) lit('ci-'+c.id,'pdot-lit'); });
    if(typeof ANIYATA_INFO!=='undefined' && ANIYATA_INFO[rawId]){
      ANIYATA_INFO[rawId].cittas.forEach(cid=>lit('ci-'+cid,'pdot-lit-ani'));
    }
  }
}

if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  });
}

// ===== Điều chỉnh cỡ chữ RIÊNG CHO TỪNG TRANG (lưu lại giữa các lần mở app) =====
let fontScales = {};
try{ fontScales = JSON.parse(localStorage.getItem('quyen22-fontscales')) || {}; }catch(e){ fontScales = {}; }

function applyFontScale(){
  const sc = fontScales[currentSection] || 1;
  document.documentElement.style.setProperty('--fontscale', sc.toFixed(2));
  document.getElementById('fontscale-pct').textContent = Math.round(sc*100) + '%';
  localStorage.setItem('quyen22-fontscales', JSON.stringify(fontScales));
}

function adjustFontScale(delta){
  const sc = fontScales[currentSection] || 1;
  fontScales[currentSection] = Math.min(1.6, Math.max(0.8, sc + delta));
  applyFontScale();
}

window.addEventListener('load', applyFontScale);
