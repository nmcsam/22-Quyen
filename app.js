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
}

if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  });
}

// ===== Điều chỉnh cỡ chữ (lưu lại giữa các lần mở app) =====
let fontScale = parseFloat(localStorage.getItem('quyen22-fontscale')) || 1;

function applyFontScale(){
  document.documentElement.style.setProperty('--fontscale', fontScale.toFixed(2));
  document.getElementById('fontscale-pct').textContent = Math.round(fontScale*100) + '%';
  localStorage.setItem('quyen22-fontscale', fontScale.toFixed(2));
}

function adjustFontScale(delta){
  fontScale = Math.min(1.6, Math.max(0.8, fontScale + delta));
  applyFontScale();
}

applyFontScale();
