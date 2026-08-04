// ===== Trang "Đạo Lộ Tu Tập" — tháp Thất Tịnh (dựng lại theo sơ đồ Pa-Auk Tawya) =====

let dlZoom = 1;

// ánh xạ vùng chạm trên tháp → nội dung
const DL_MAP = {
  nibbana:['dinh'], maggaphala:['cot',1], vipassana:['cot',0],
  pahana:['dt',2], tirana:['dt',1], nata:['dt',0],
  t1:['t',1], t2:['t',2], t3:['t',3], t4:['t',4], t5:['t',5], t6:['t',6], t7:['t',7],
  g1:['t',3], g2:['t',4],
  g3:['m',5,0], g4a:['m',5,1],
  g4b:['m',6,0], g5:['m',6,1], g6:['m',6,2], g7:['m',6,3], g8:['m',6,4],
  g9:['m',6,5], g10:['m',6,6], g11:['m',6,7], g12:['m',6,8],
  g13:['m',7,0], g14:['m',7,1], g15:['m',7,2], g16:['m',7,3],
  c_sac:['m',3,0], n_sac:['m',3,0], c_danh:['m',3,1], n_danh:['m',3,1],
  c_danhsac:['m',3,2], c_xacdinh:['m',3,3], n_xacdinh:['m',3,3],
  c_pts:['m',4,0], c_trangthai:['m',4,2], n_trangthai:['m',4,2],
  c_anapana:['m',2,0], c_dhatu:['m',2,1], c_32:['m',2,2], c_xuong:['m',2,3],
  c_kastrang:['m',2,4], c_kasina:['m',2,5], c_chungdac:['m',2,6],
  c_baoho:['m',2,7], n_baoho:['m',2,7],
  s_patimokkha:['m',1,0], s_indriya:['m',1,1], s_ajiva:['m',1,2],
  s_paccaya:['m',1,3], s_cusi:['m',1,4]
};

function renderDaoLoPage(){
  const extra = document.getElementById('extra-content');
  extra.innerHTML = `
    <div class="dl-bar">
      <button class="dl-zb" onclick="dlSetZoom(-1)">−</button>
      <span class="dl-zl" id="dl-zl">100%</span>
      <button class="dl-zb" onclick="dlSetZoom(1)">+</button>
      <button class="dl-zb dl-zr" onclick="dlSetZoom(0)">⤢ vừa khung</button>
    </div>
    <div class="dl-scroll" id="dl-scroll"><div class="dl-inner" id="dl-inner">${THAP_SVG}</div></div>
    <p class="info-note">Chạm vào <b>bất kỳ ô nào trong tháp</b> — tầng thanh tịnh, tuệ, đề mục thiền, phần giới,
    hay ghi chú bên phải — để xem chi tiết bước tu tập đó. Dùng <b>+ / −</b> để phóng to, kéo ngang để xem hết bề rộng.</p>
    <div class="group-head">Đi theo thứ tự</div>
    <div class="dl-chips">
      <button class="dl-chip dl-chip-t" onclick="openDL('t1')"><b>1. Giới thanh tịnh</b><span>Sīlavisuddhi</span></button>
      <button class="dl-chip dl-chip-t" onclick="openDL('t2')"><b>2. Tâm thanh tịnh</b><span>Cittavisuddhi</span></button>
      <button class="dl-chip" onclick="openDL('t3')"><b>3. Kiến thanh tịnh</b><span>Diṭṭhivisuddhi</span></button>
      <button class="dl-chip" onclick="openDL('t4')"><b>4. Đoạn nghi thanh tịnh</b><span>Kaṅkhāvitaraṇa-</span></button>
      <button class="dl-chip" onclick="openDL('t5')"><b>5. Đạo phi đạo tri kiến</b><span>Maggāmaggañāṇa-</span></button>
      <button class="dl-chip" onclick="openDL('t6')"><b>6. Hành tri kiến</b><span>Paṭipadāñāṇa-</span></button>
      <button class="dl-chip" onclick="openDL('t7')"><b>7. Tri kiến thanh tịnh</b><span>Ñāṇadassana-</span></button>
      <button class="dl-chip" onclick="openDL('nibbana')"><b>Nibbāna</b><span>mục tiêu tối hậu</span></button>
    </div>
    <p class="info-note" style="margin-top:12px">${DAOLO.nguon}</p>`;

  const inner = document.getElementById('dl-inner');
  inner.querySelectorAll('.hit').forEach(r=>{
    r.addEventListener('click', ()=> openDL(r.getAttribute('data-k')));
  });
  dlFit();
}

function dlFit(){
  const sc = document.getElementById('dl-scroll');
  if(!sc) return;
  dlZoom = 1; dlApply();
}
function dlSetZoom(d){
  if(d===0){ dlFit(); return; }
  dlZoom = Math.min(4, Math.max(1, dlZoom + d*0.4));
  dlApply();
}
function dlApply(){
  const inner = document.getElementById('dl-inner');
  const lab = document.getElementById('dl-zl');
  if(!inner) return;
  inner.style.width = (dlZoom*100) + '%';
  if(lab) lab.textContent = Math.round(dlZoom*100) + '%';
}

function openDL(key){
  const m = DL_MAP[key];
  if(!m) return;
  if(m[0]==='dinh'){
    const d = DAOLO.dinh;
    showAttrSheet(`<div class="sheet-head"><h2>${d.ten}</h2></div>
      <p class="sheet-pali">${d.vi}</p>
      <div class="sec"><div class="sec-body dl-body">${d.body}</div></div>`);
  } else if(m[0]==='cot' || m[0]==='dt'){
    const d = (m[0]==='cot'?DAOLO.cotgiua:DAOLO.datri)[m[1]];
    showAttrSheet(`<div class="sheet-head"><h2>${d.ten}</h2></div>
      <p class="sheet-pali">${d.pali}${d.tang?' · '+d.tang:''}${d.pham?' · '+d.pham:''}</p>
      <div class="sec"><div class="sec-body dl-body">${d.body}</div></div>`);
  } else if(m[0]==='t'){
    openDaoLoSheet(m[1]);
    return;
  } else {
    openDaoLoStep(m[1], m[2]);
    return;
  }
  document.getElementById('sheet-content').scrollTop = 0;
}

function openDaoLoSheet(id){
  const t = DAOLO.tang.find(x=>x.id===id);
  const items = t.muc.map((m,i)=>`
    <button class="dl-step" onclick="openDaoLoStep(${id},${i})">
      <span class="dl-step-n">${i+1}</span>
      <span class="dl-step-b">
        <span class="dl-step-ten">${m.ten}</span>
        ${m.pali?`<span class="dl-step-pali">${m.pali}</span>`:''}
        ${m.ghi?`<span class="dl-step-ghi">${m.ghi}</span>`:''}
      </span><span class="dl-step-go">›</span>
    </button>`).join('');
  const prev = id>1 ? `<button class="qbtn" onclick="openDaoLoSheet(${id-1})">‹ ${DAOLO.tang[id-2].ten}</button>` : '';
  const next = id<7 ? `<button class="qbtn" onclick="openDaoLoSheet(${id+1})">${DAOLO.tang[id].ten} ›</button>` : '';
  showAttrSheet(`
    <div class="sheet-head"><span class="num">(${t.id})</span><h2>${t.ten}</h2></div>
    <p class="sheet-pali">${t.pali}</p>
    <div class="dl-badge dl-${t.mau}-b">${t.phu}</div>
    <div class="sec"><div class="sec-body dl-body">${t.body}</div></div>
    ${t.datri?`<div class="dl-datri">→ ${t.datri}</div>`:''}
    <div class="sec" style="margin-top:12px"><div class="sec-label">Các bước tu tập trong tầng này</div>
      <div class="dl-steps">${items}</div></div>
    <div class="ad-nav">${prev}${next}</div>`);
  document.getElementById('sheet-content').scrollTop = 0;
}

function openDaoLoStep(tangId, i){
  const t = DAOLO.tang.find(x=>x.id===tangId);
  const m = t.muc[i];
  const prev = i>0 ? `<button class="qbtn" onclick="openDaoLoStep(${tangId},${i-1})">‹ trước</button>` : '';
  const next = i<t.muc.length-1 ? `<button class="qbtn" onclick="openDaoLoStep(${tangId},${i+1})">tiếp ›</button>` : '';
  showAttrSheet(`
    <button class="dl-back" onclick="openDaoLoSheet(${tangId})">‹ ${t.ten}</button>
    <div class="sheet-head"><h2>${m.ten}</h2></div>
    ${m.pali?`<p class="sheet-pali">${m.pali}${m.ghi?' · '+m.ghi:''}</p>`:(m.ghi?`<p class="sheet-pali">${m.ghi}</p>`:'')}
    <div class="sec"><div class="sec-body dl-body">${m.body}</div></div>
    <div class="ad-nav">${prev}${next}</div>`);
  document.getElementById('sheet-content').scrollTop = 0;
}
