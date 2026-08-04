// Dữ liệu "Đạo Lộ Tu Tập" — Thất Tịnh · 16 Tuệ Minh Sát
// Theo sơ đồ "Nhóm Tám Thánh Đạo đưa đến sự dứt khổ - Nibbāna",
// Trung tâm Thiền Pa-Auk Tawya (biên tập bởi PA-AUK TAWYA Sayadaw, mùa thu 2011).
// Đối chiếu Visuddhimagga (Thanh Tịnh Đạo) và Abhidhammattha Saṅgaha chương IX.

const DAOLO = {
  dinh: {
    ten: "Nibbāna",
    vi: "Níp-bàn",
    body: `<p>Đỉnh tháp — mục tiêu tối hậu của toàn bộ đạo lộ. Níp-bàn là <b>pháp vô vi</b> (<i>asaṅkhata</i>),
    không do duyên tạo, không sanh không diệt, là sự <b>tịch diệt hoàn toàn của tham, sân, si</b>.</p>
    <p>Níp-bàn được chứng ngộ làm <b>đối tượng</b> của Đạo tuệ và Quả tuệ ở tầng thứ bảy — Tri kiến thanh tịnh.
    Không thể đến bằng suy luận hay tín ngưỡng, chỉ đến bằng chính con đường bảy tầng thanh tịnh này.</p>`
  },

  tang: [
  {
    id: 1, ten: "Giới thanh tịnh", pali: "Sīlavisuddhi",
    phu: "Nhóm bốn giới thanh tịnh (catupārisuddhi sīla)",
    mau: "gioi",
    body: `<p><b>Nền móng của cả ngôi tháp.</b> Không có giới thanh tịnh thì định không sanh; không có định thì
    tuệ không sanh. Vì vậy trong sơ đồ, Giới thanh tịnh là bệ đỡ rộng nhất, nâng toàn bộ các tầng trên.</p>
    <p>Người tu tập trước hết thọ trì <b>giới bổn</b> tương ứng với địa vị của mình, rồi tiếp tục hoàn thiện
    bốn phần giới thanh tịnh.</p>`,
    muc: [
      {ten:"Giới thu thúc Pātimokkha", pali:"Pātimokkha saṃvarasīla", ghi:"227 giới của bhikkhu",
       body:`<p>Thu thúc theo <b>giới bổn</b> đã được Đức Phật chế định. Tỳ-khưu giữ 227 học giới;
       tỳ-khưu-ni 311 học giới.</p>
       <p>Đây là loại giới <b>được thành tựu bằng đức tin</b> (<i>saddhāya sampādetabbaṃ</i>), vì phạm vi
       học giới do chính Đức Phật chế, vượt ngoài khả năng suy lường của đệ tử. Vị giữ giới này
       “thấy sự nguy hiểm trong những lỗi nhỏ nhặt”.</p>`},
      {ten:"Giới thu thúc các quyền", pali:"Indriyasaṃvarasīla", ghi:"",
       body:`<p>Thu thúc <b>sáu căn</b>: khi mắt thấy sắc, tai nghe tiếng, mũi ngửi hương, lưỡi nếm vị,
       thân xúc chạm, ý biết pháp — <b>không nắm giữ tướng chung, không nắm giữ tướng riêng</b>
       (<i>na nimittaggāhī hoti nānubyañjanaggāhī</i>).</p>
       <p>Loại giới này <b>được thành tựu bằng niệm</b> (<i>satiyā sampādetabbaṃ</i>). Đây là phần giới
       quan trọng nhất đối với hành giả đang tu thiền, vì tâm phóng dật phần lớn đi ra qua sáu cửa này.</p>`},
      {ten:"Giới nuôi mạng thanh tịnh", pali:"Ājīvapārisuddhisīla", ghi:"",
       body:`<p>Nuôi mạng bằng phương tiện <b>chân chánh</b>, không do tà mạng. Với người xuất gia,
       tà mạng gồm sáu học giới liên quan đến sinh kế và các cách tìm lợi lộc bất chánh như: giả vờ,
       nói dua nịnh, gợi ý, ép buộc, lấy lợi cầu lợi.</p>
       <p>Loại giới này <b>được thành tựu bằng tinh tấn</b> (<i>vīriyena sampādetabbaṃ</i>).</p>`},
      {ten:"Giới liên quan (bốn món vật dụng)", pali:"Paccayasannissitasīla", ghi:"",
       body:`<p>Thọ dụng bốn món vật dụng — <b>y phục, vật thực, sàng tọa, thuốc men</b> — sau khi
       <b>như lý giác sát</b> (<i>paṭisaṅkhā yoniso</i>) về mục đích chân chánh của chúng.</p>
       <p>Ví dụ với vật thực: “không phải để vui đùa, không phải để đam mê, không phải để trang sức,
       mà chỉ để thân này tồn tại, để dứt cảm thọ cũ và không cho cảm thọ mới sanh khởi, để nuôi dưỡng
       phạm hạnh.” Loại giới này <b>được thành tựu bằng trí tuệ</b> (<i>paññāya sampādetabbaṃ</i>).</p>`},
      {ten:"Giới của người tại gia và tu nữ", pali:"", ghi:"nền dưới cùng của tháp",
       body:`<p><b>Tu nữ Theravāda:</b> mười giới xuất gia (<i>dasa pabbajja sīla</i>).</p>
       <p><b>Cư sĩ:</b> năm giới (<i>pañca sīla</i>) — nền tảng tối thiểu; tám giới (<i>aṭṭha sīla</i>) —
       thường thọ trong ngày bát quan trai; chín giới (<i>nava sīla</i>) — tám giới thêm phần rải tâm từ;
       mười giới (<i>dasa sīla</i>).</p>
       <p>Hành giả tại gia muốn tiến sâu vào thiền tập thường thọ <b>tám giới</b> trong suốt khóa thiền,
       vì giới không ăn phi thời và không nằm ngồi chỗ cao sang giúp thân tâm nhẹ nhàng, dễ định.</p>`}
    ]
  },

  {
    id: 2, ten: "Tâm thanh tịnh", pali: "Cittavisuddhi",
    phu: "Tám thiền chứng (samāpatti) cùng với cận định (upacāra samādhi)",
    mau: "tam",
    body: `<p>Tầng thứ hai — <b>định</b>. Tâm thanh tịnh nghĩa là tâm đã <b>đoạn trừ năm triền cái</b>
    bằng sức mạnh của định, trở nên trong sáng, vững chắc và <b>có thể sử dụng được</b> để soi chiếu
    danh sắc ở các tầng trên.</p>
    <p>Có hai mức: <b>cận định</b> (<i>upacāra samādhi</i>) và <b>an chỉ định</b> (<i>appanā samādhi</i>,
    tức tám thiền chứng). Cả hai đều đủ tư cách làm Tâm thanh tịnh.</p>
    <p>Trong truyền thống Pa-Auk, hành giả thường bắt đầu bằng <b>Niệm hơi thở</b> hoặc <b>Thiền bốn giới</b>,
    rồi mở rộng sang các đề mục khác.</p>`,
    muc: [
      {ten:"Niệm hơi thở vào ra", pali:"Ānāpānasati", ghi:"Sơ, nhị, tam, tứ thiền (jhāna)",
       body:`<p>Đề mục căn bản và phổ biến nhất. Hành giả giữ niệm nơi <b>điểm xúc chạm</b> của hơi thở
       ở lỗ mũi hoặc môi trên, biết rõ hơi thở dài, hơi thở ngắn, toàn hơi thở, rồi làm cho hơi thở an tịnh.</p>
       <p>Khi định sâu, <b>nimitta</b> (quang tướng) xuất hiện: chuẩn bị tướng → học tướng (<i>uggahanimitta</i>)
       → <b>tợ tướng</b> (<i>paṭibhāganimitta</i>). Duy trì tợ tướng dẫn đến <b>an chỉ định</b>, chứng lần lượt
       sơ thiền → tứ thiền.</p>
       <p>Đây là con đường đưa lên trọn vẹn bốn thiền Sắc giới, làm nền cho mọi đề mục sau.</p>`},
      {ten:"Thiền bốn giới", pali:"Catudhātuvavatthāna", ghi:"chỉ đạt cận định",
       body:`<p>Phân biệt <b>bốn đại</b> trong thân qua <b>mười hai đặc tính</b>:
       địa giới — cứng, thô, nặng, mềm, mịn, nhẹ; thủy giới — chảy, kết dính;
       hỏa giới — nóng, lạnh; phong giới — nâng đỡ, đẩy.</p>
       <p>Do đối tượng là <b>pháp chân đế</b> có nhiều đặc tính khác nhau, đề mục này <b>chỉ đưa đến cận định</b>,
       không vào an chỉ. Nhưng chính nó lại là cửa ngõ trực tiếp sang tầng thứ ba: khi định mạnh,
       hành giả thấy thân tan thành khối <b>kalāpa</b> (bọn sắc), rồi phân tích từng kalāpa.</p>`},
      {ten:"Ba mươi hai phần của thân", pali:"Dvattiṃsākāra", ghi:"",
       body:`<p>Quán 32 thể trược: tóc, lông, móng, răng, da; thịt, gân, xương, tủy, thận;
       tim, gan, hoành cách mô, lá lách, phổi; ruột, màng ruột, thực phẩm mới, phân, óc;
       mật, đàm, mủ, máu, mồ hôi, mỡ đặc; nước mắt, mỡ lỏng, nước miếng, nước mũi, nước khớp, nước tiểu.</p>
       <p>Là bước chuẩn bị để chuyển sang <b>tác ý xương bất tịnh</b> và <b>kasiṇa trắng</b>.</p>`},
      {ten:"Tác ý xương bất tịnh", pali:"Paṭikūla manasikāra", ghi:"Sơ thiền hay cận định",
       body:`<p>Từ 32 phần thân, hành giả tách riêng phần <b>xương</b> làm đề mục, quán tính chất
       đáng nhờm gớm của nó. Đề mục bất tịnh có thể đưa đến <b>sơ thiền</b> (nếu lấy tướng bất tịnh
       làm đối tượng an chỉ) hoặc dừng ở cận định.</p>
       <p>Công dụng: <b>đối trị tham dục</b>, làm nền cho việc chuyển sang kasiṇa trắng.</p>`},
      {ten:"Kasiṇa trắng", pali:"Odāta kasiṇa", ghi:"Sơ, nhị, tam, tứ thiền",
       body:`<p>Từ bộ xương đã quán, hành giả chuyển tâm đến <b>màu trắng</b> của xương (thường lấy
       xương sọ) và mở rộng tướng trắng ấy ra khắp mười phương.</p>
       <p>Kasiṇa trắng đặc biệt quan trọng vì <b>làm cho tâm sáng chói</b>, và ánh sáng của nó
       là công cụ để soi thấy các <b>kalāpa</b> vi tế ở giai đoạn quán danh sắc. Đây là lý do
       truyền thống Pa-Auk nhấn mạnh đề mục này trước khi vào minh sát.</p>`},
      {ten:"Mười biến xứ", pali:"Dasa kasiṇa", ghi:"đầy đủ bốn thiền",
       body:`<p>(1) Địa <i>pathavī</i> · (2) Thủy <i>āpo</i> · (3) Hỏa <i>tejo</i> · (4) Phong <i>vāyo</i> ·
       (5) Xanh đen <i>nīla</i> · (6) Vàng <i>pīta</i> · (7) Đỏ <i>lohita</i> · (8) Trắng <i>odāta</i> ·
       (9) Ánh sáng <i>āloka</i> · (10) Hư không <i>ākāsa</i>.</p>
       <p>Mỗi kasiṇa có thể đưa lên trọn <b>bốn thiền Sắc giới</b>. Hành giả thuần thục cả mười kasiṇa
       sẽ có nền tảng để vào <b>bốn thiền Vô sắc</b> và các thắng trí.</p>`},
      {ten:"Tám sự chứng đắc", pali:"Aṭṭha samāpatti", ghi:"4 thiền Sắc + 4 thiền Vô sắc",
       body:`<p><b>Bốn thiền Sắc giới:</b> (1) Sơ thiền — tầm, tứ, hỷ, lạc, nhất tâm;
       (2) Nhị thiền — bỏ tầm tứ; (3) Tam thiền — bỏ hỷ; (4) Tứ thiền — xả và nhất tâm,
       niệm hoàn toàn thanh tịnh.</p>
       <p><b>Bốn thiền Vô sắc:</b> (5) Không vô biên xứ <i>ākāsānañcāyatana</i>;
       (6) Thức vô biên xứ <i>viññāṇañcāyatana</i>; (7) Vô sở hữu xứ <i>ākiñcaññāyatana</i>;
       (8) Phi tưởng phi phi tưởng xứ <i>nevasaññānāsaññāyatana</i>.</p>
       <p>Tám thiền chứng này là mức <b>an chỉ định</b> cao nhất của Tâm thanh tịnh. Tuy nhiên
       <b>không bắt buộc</b> phải chứng đủ mới lên tầng ba — cận định cũng đủ.</p>`},
      {ten:"Bốn thiền bảo hộ", pali:"Caturārakkha kammaṭṭhāna", ghi:"đề mục hộ trì hành giả",
       body:`<p>Bốn đề mục được gọi là “bảo hộ” vì che chở hành giả khỏi các chướng ngại trong khi tu tập:</p>
       <p><b>(1) Bốn Phạm trú</b> (<i>Brahma-vihāra</i>): từ <i>mettā</i>, bi <i>karuṇā</i>,
       tùy hỷ <i>muditā</i>, xả <i>upekkhā</i> — hộ trì khỏi sân hận và nguy hiểm từ phi nhân.<br>
       <b>(2) Tùy niệm ân đức Phật</b> (<i>Buddhānussati</i>) — hộ trì khỏi sợ hãi, tăng trưởng tín tâm.<br>
       <b>(3) Tùy niệm sự chết</b> (<i>Maraṇānussati</i>) — hộ trì khỏi phóng dật, thúc giục tinh tấn.<br>
       <b>(4) Tu tiến bất mỹ</b> (<i>Asubha-bhāvanā</i>) — hộ trì khỏi tham dục.</p>
       <p>Hành giả thường tu bốn đề mục này xen kẽ với đề mục chính, mỗi ngày một ít.</p>`}
    ]
  },

  {
    id: 3, ten: "Kiến thanh tịnh", pali: "Diṭṭhivisuddhi",
    phu: "(1) Chỉ định danh sắc tuệ — Nāmarūpaparicchedañāṇa",
    mau: "kien", tue: "Tuệ 1",
    datri: "Ý nghĩa đạt tri (Ñāta pariññā)",
    body: `<p>Tầng đầu tiên của <b>tuệ minh sát</b>. “Kiến thanh tịnh” là cái thấy đã được làm sạch khỏi
    <b>thân kiến</b> (<i>sakkāyadiṭṭhi</i>): hành giả thấy rõ rằng ngoài <b>danh và sắc</b> ra,
    <b>không có chúng sanh</b> (<i>satta</i>), không có sinh mạng (<i>jīva</i>), không có linh hồn,
    không có tự ngã (<i>atta</i>), không có đàn ông, không có đàn bà, không có chư Thiên, không có Phạm thiên.</p>
    <p>Đây là nơi bắt đầu của <b>Ý nghĩa đạt tri</b> (<i>ñāta pariññā</i>) — sự biết rõ đối tượng đúng như nó là.</p>`,
    muc: [
      {ten:"Thấy biết rõ sắc", pali:"Rūpa pariggaha", ghi:"qua thiền bốn giới",
       body:`<p>Nhờ ánh sáng của định, hành giả thấy thân mình tan rã thành vô số <b>kalāpa</b> (bọn sắc)
       — những nhóm sắc cực nhỏ. Rồi phân tích từng kalāpa để thấy các <b>sắc chân đế</b> bên trong.</p>
       <p>Cần <b>thấy biết rõ nhiều loại bọn (kalāpa) khác nhau</b> ở mỗi trong sáu môn / 42 thân phần,
       và <b>thấy biết rõ nhiều loại sắc siêu lý khác nhau</b> của mỗi loại kalāpa — có kalāpa 8 sắc,
       9 sắc, 10 sắc tùy theo nguồn sanh (nghiệp, tâm, thời tiết, vật thực).</p>`},
      {ten:"Thấy biết rõ danh", pali:"Arūpa pariggaha", ghi:"phi sắc",
       body:`<p>Sau khi thấy rõ sắc, hành giả quay sang <b>danh pháp</b>: thấy biết rõ mỗi
       <b>sở hữu tâm</b> (<i>cetasika</i>) và <b>tâm</b> (<i>citta</i>) ở <b>mỗi sát-na tâm</b>
       của nhiều loại <b>lộ trình tâm</b> (<i>citta-vīthi</i>) khác nhau — ngũ môn, ý môn,
       và ở các cõi Dục giới, Sắc giới, Vô sắc giới.</p>
       <p>Ví dụ: một lộ nhãn môn gồm ngũ môn hướng tâm, nhãn thức, tiếp thâu, thẩm tấn, đoán định,
       bảy đổng lực, hai na cảnh — mỗi sát-na có số sở hữu tâm riêng phải được thấy rõ.</p>`},
      {ten:"Thấy biết rõ danh sắc", pali:"Rūpārūpa pariggaha", ghi:"sắc và phi sắc cùng lúc",
       body:`<p>Ghép hai phần trên lại: quán <b>danh và sắc đồng thời</b>, thấy rõ mối tương quan
       giữa chúng — sắc làm chỗ nương cho danh, danh nương sắc mà sanh.</p>`},
      {ten:"Xác định danh sắc", pali:"Nāmarūpa vavatthāna", ghi:"kết luận của tầng ba",
       body:`<p>Xác quyết rằng <b>ngoài danh sắc ra không có gì khác</b>. Đây chính là nội dung của
       <b>Chỉ định danh sắc tuệ</b> (tuệ thứ nhất), cũng gọi là <b>Nāmarūpa vavatthāna ñāṇa</b>.</p>
       <p>Từ đây thân kiến bị lung lay tận gốc — dù chưa đoạn trừ hoàn toàn (phải đợi Nhập Lưu đạo),
       nhưng cái thấy đã được thanh tịnh.</p>`}
    ]
  },

  {
    id: 4, ten: "Đoạn nghi thanh tịnh", pali: "Kaṅkhāvitaraṇavisuddhi",
    phu: "(2) Hiển duyên danh sắc tuệ — Nāmarūpapaccayapariggahañāṇa",
    mau: "nghi", tue: "Tuệ 2",
    datri: "Ý nghĩa đạt tri (Ñāta pariññā)",
    body: `<p>Sau khi thấy danh sắc, hành giả tìm <b>nhân duyên</b> của chúng. Khi thấy rõ danh sắc
    hiện tại do nhân duyên quá khứ mà sanh, và sẽ làm duyên cho danh sắc vị lai — thì
    <b>mười sáu mối nghi</b> về ba thời (“Ta đã có trong quá khứ chăng? Ta sẽ có trong vị lai chăng?…”)
    <b>được vượt qua</b>.</p>
    <p>Đây là tầng đưa đến địa vị <b>Tiểu Tu-đà-hoàn</b> (<i>cūḷasotāpanna</i>) — người có chỗ đứng
    vững chắc trong Giáo pháp, chắc chắn không đọa ác đạo trong kiếp kế.</p>`,
    muc: [
      {ten:"Pháp liên quan tương sinh — phương pháp thứ năm", pali:"Paṭiccasamuppāda", ghi:"quán trước",
       body:`<p>Phương pháp thứ năm (theo <i>Paṭisambhidāmagga</i>) truy tìm nhân duyên
       <b>từ hiện tại lùi về quá khứ</b>: hành giả soi lại các nghiệp đã tạo trong kiếp này,
       rồi lùi về kiếp trước, thấy rõ <b>vô minh, ái, thủ, hành, nghiệp</b> nào đã tạo nên
       năm uẩn tái tục của kiếp hiện tại.</p>
       <p>Truyền thống Pa-Auk dạy phương pháp này <b>trước</b>, vì nó cụ thể và dễ thấy hơn.</p>`},
      {ten:"Pháp liên quan tương sinh — phương pháp thứ nhất", pali:"Paṭiccasamuppāda", ghi:"quán sau",
       body:`<p>Phương pháp thứ nhất là <b>chuỗi mười hai chi</b> theo chiều thuận:
       vô minh → hành → thức → danh sắc → sáu xứ → xúc → thọ → ái → thủ → hữu → sanh → lão tử.</p>
       <p>Hành giả quán từng mắt xích một trong ba thời, thấy rõ <b>không có người tạo, không có người nhận</b>,
       chỉ có tiến trình nhân quả vận hành.</p>`},
      {ten:"Thấy biết rõ bốn phương diện của mỗi pháp", pali:"", ghi:"lakkhaṇa · rasa · paccupaṭṭhāna · padaṭṭhāna",
       body:`<p>Với mỗi pháp chân đế, hành giả thấy rõ:</p>
       <p><b>Trạng thái</b> (<i>lakkhaṇa</i>) — đặc tính riêng;<br>
       <b>Phận sự</b> (<i>rasa</i>) — chức năng hoặc thành quả;<br>
       <b>Thành tựu</b> (<i>paccupaṭṭhāna</i>) — cách nó hiện ra với trí;<br>
       <b>Nhân cận</b> (<i>padaṭṭhāna</i>) — nguyên nhân gần nhất.</p>
       <p>Áp dụng cho <b>mỗi nhân</b> và <b>quả</b> của những kiếp sống quá khứ, hiện tại và vị lai;
       và cho <b>mỗi loại sắc</b> (<i>rūpa</i>) cũng như <b>mỗi loại danh pháp</b> (<i>nāma dhamma</i>).</p>`}
    ]
  },

  {
    id: 5, ten: "Đạo phi đạo tri kiến thanh tịnh", pali: "Maggāmaggañāṇadassanavisuddhi",
    phu: "(3) Phổ thông tuệ · (4a) Tiến thoái tuệ (nhược)",
    mau: "daophi", tue: "Tuệ 3–4a",
    datri: "Tam tướng đạt tri (Tīraṇa pariññā)",
    body: `<p>Tầng phân biệt <b>đâu là đạo, đâu không phải đạo</b>. Ở giai đoạn này thường xuất hiện
    <b>mười tùy phiền não của tuệ quán</b> (<i>vipassanupakkilesa</i>): ánh sáng, trí, hỷ, khinh an,
    lạc, thắng giải, tinh tấn, niệm, xả, và <b>sự ưa thích</b> chúng.</p>
    <p>Hành giả dễ lầm tưởng đã chứng đạo quả. Khi nhận ra “đây <b>không phải</b> là đạo, cái tuệ
    thấy sanh diệt mới là đạo” — thì tầng thanh tịnh này hoàn tất.</p>
    <p>Từ đây bắt đầu <b>Tam tướng đạt tri</b> (<i>tīraṇa pariññā</i>) — sự thẩm sát bằng ba tướng
    vô thường, khổ, vô ngã.</p>`,
    muc: [
      {ten:"Phổ thông tuệ", pali:"Sammasanañāṇa", ghi:"tuệ 3",
       body:`<p>Quán <b>từng nhóm</b> (<i>kalāpa-sammasana</i>): gom tất cả sắc pháp và danh pháp
       — quá khứ, hiện tại, vị lai; trong, ngoài; thô, tế; hạ liệt, cao thượng; xa, gần —
       rồi thẩm sát chung bằng <b>ba tướng</b>.</p>
       <p><b>Vô thường</b> vì có rồi không; <b>khổ</b> vì bị bức bách bởi sanh diệt;
       <b>vô ngã</b> vì không chịu sự sai khiến của ai.</p>`},
      {ten:"Tiến thoái tuệ (nhược)", pali:"Taruṇa udayabbayañāṇa", ghi:"tuệ 4a — sanh diệt còn non",
       body:`<p>Thấy rõ <b>sự sanh và sự diệt</b> của danh sắc ngay trong từng sát-na hiện tại,
       không còn qua suy luận nhóm như tuệ trước.</p>
       <p>Giai đoạn “non” (<i>taruṇa</i>) này là nơi <b>mười tùy phiền não</b> xuất hiện.
       Chính vì thế nó được xếp vào tầng “Đạo phi đạo”: hành giả phải vượt qua sự dính mắc vào
       ánh sáng và hỷ lạc thì tuệ mới chín muồi thành <b>tiến thoái cường tuệ</b> ở tầng sáu.</p>`}
    ]
  },

  {
    id: 6, ten: "Hành tri kiến thanh tịnh", pali: "Paṭipadāñāṇadassanavisuddhi",
    phu: "Từ tiến thoái cường tuệ (4b) đến thuận lưu tuệ (12)",
    mau: "hanh", tue: "Tuệ 4b–12",
    datri: "Đoạn trừ đạt tri (Pahāna pariññā)",
    body: `<p>Tầng dài nhất của đạo lộ — chín tuệ liên tiếp, đưa hành giả từ chỗ thấy sanh diệt rõ ràng
    đến chỗ tâm hoàn toàn xả ly đối với mọi hành.</p>
    <p>Đây là địa hạt của <b>Đoạn trừ đạt tri</b> (<i>pahāna pariññā</i>) — tuệ không chỉ biết và thẩm sát
    mà bắt đầu <b>buông bỏ</b>.</p>`,
    muc: [
      {ten:"Tiến thoái tuệ (cường)", pali:"Balava udayabbayañāṇa", ghi:"tuệ 4b",
       body:`<p>Sau khi vượt qua mười tùy phiền não, tuệ thấy sanh diệt trở nên <b>mạnh mẽ và trong sáng</b>.
       Hành giả thấy sự sanh và diệt của danh sắc một cách sắc bén, liên tục, không còn bị ánh sáng
       hay hỷ lạc làm phân tâm.</p>
       <p>Đây là <b>khởi điểm thực sự</b> của chuỗi tuệ minh sát chín muồi.</p>`},
      {ten:"Diệt một tuệ", pali:"Bhaṅgañāṇa", ghi:"tuệ 5",
       body:`<p>Tâm không còn chú ý đến sự sanh, chỉ còn thấy <b>sự hoại diệt</b>. Mọi thứ hiện ra
       như đang tan biến không ngừng — cả đối tượng được quán lẫn <b>cái tâm đang quán</b> cũng diệt.</p>
       <p>Đây là bước ngoặt: từ đây các tuệ mang màu sắc “nhàm chán” dần dần sanh khởi.</p>`},
      {ten:"Hoa hoạn tuệ (kinh úy)", pali:"Bhayañāṇa", ghi:"tuệ 6",
       body:`<p>Thấy các hành trong <b>ba cõi, bốn sanh, năm thú, bảy thức trú, chín hữu tình cư</b>
       đều <b>đáng kinh sợ</b> — như người thấy đống than hồng, như thấy rắn độc trong nhà.</p>
       <p>Không phải là nỗi sợ hãi của phàm tâm, mà là <b>trí</b> thấy rõ tính chất bất an của mọi hành.</p>`},
      {ten:"Tội quá tuệ", pali:"Ādīnavañāṇa", ghi:"tuệ 7",
       body:`<p>Thấy rõ <b>sự nguy hại, tai họa</b> trong mọi hữu. Không nơi nào trong ba cõi
       là chỗ nương tựa, chỗ ẩn náu — như khu rừng đang cháy, như thành phố sắp đổ.</p>`},
      {ten:"Phiền yếm tuệ", pali:"Nibbidāñāṇa", ghi:"tuệ 8",
       body:`<p><b>Nhàm chán</b> đối với tất cả các hành. Không phải là chán ghét hay sân hận,
       mà là sự <b>không còn ưa thích</b> phát sinh tự nhiên từ trí tuệ — như con thiên nga
       giữa vũng bùn không thấy vui.</p>`},
      {ten:"Dục thoát tuệ", pali:"Muñcitukamyatāñāṇa", ghi:"tuệ 9",
       body:`<p>Khởi lên <b>ý muốn thoát ra</b> khỏi mọi hành — như cá mắc lưới muốn thoát,
       như ếch bị rắn ngậm muốn nhảy ra, như người bị trói muốn được cởi trói.</p>`},
      {ten:"Quyết ly tuệ", pali:"Paṭisaṅkhāñāṇa", ghi:"tuệ 10",
       body:`<p>Muốn thoát nên <b>quán xét lại</b> các hành một lần nữa bằng ba tướng, lần này
       sắc bén và triệt để hơn — như người muốn bắt cá phải xem kỹ, như người muốn thoát ngục
       phải tìm kỹ đường ra.</p>`},
      {ten:"Hành xả tuệ", pali:"Saṅkhārupekkhāñāṇa", ghi:"tuệ 11 — đỉnh của minh sát hiệp thế",
       body:`<p>Tâm trở nên <b>hoàn toàn quân bình</b> đối với các hành: không sợ hãi, không ưa thích,
       không mong cầu thoát ly nữa — như người đã ly dị vợ, thấy nàng đi với người khác mà lòng dửng dưng.</p>
       <p>Đây là <b>tuệ cao nhất của minh sát hiệp thế</b>. Từ đây tâm tự động hướng về Níp-bàn
       không cần dụng công. Cũng chính tuệ này quyết định hành giả sẽ chứng đạo bằng cửa nào:
       <b>vô tướng, vô nguyện, hay không tánh</b>.</p>`},
      {ten:"Thuận lưu tuệ", pali:"Anulomañāṇa", ghi:"tuệ 12",
       body:`<p>Tuệ <b>thuận theo</b> — vừa thuận với tám tuệ minh sát đi trước, vừa thuận với
       ba mươi bảy pháp trợ đạo đi sau. Sanh khởi trong <b>lộ trình tâm đắc đạo</b>,
       ngay trước Chuyển tộc tuệ.</p>
       <p>Đây là sát-na tâm cuối cùng còn lấy <b>hành</b> làm đối tượng.</p>`}
    ]
  },

  {
    id: 7, ten: "Tri kiến thanh tịnh", pali: "Ñāṇadassanavisuddhi",
    phu: "(13) Chuyển tộc · (14) Đạo · (15) Quả · (16) Phản khán",
    mau: "trikien", tue: "Tuệ 13–16",
    body: `<p>Tầng cao nhất — nơi <b>Đạo và Quả</b> sanh khởi, lấy <b>Níp-bàn</b> làm đối tượng.</p>
    <p>Trọn bộ diễn ra trong <b>một lộ trình tâm</b> duy nhất: chuẩn bị → cận hành → thuận thứ →
    <b>chuyển tộc</b> → <b>Đạo tâm</b> (chỉ một sát-na) → <b>Quả tâm</b> (hai hoặc ba sát-na) → hữu phần.
    Sau đó là các lộ <b>phản khán</b>.</p>
    <p>Chu trình này lặp lại bốn lần cho bốn tầng Thánh: Nhập Lưu, Nhất Lai, Bất Lai, A-la-hán.</p>`,
    muc: [
      {ten:"Chuyển tộc tuệ", pali:"Gotrabhūñāṇa", ghi:"tuệ 13 — không thuộc Tri kiến thanh tịnh",
       body:`<p>Sát-na tâm <b>chuyển từ dòng phàm sang dòng Thánh</b>: lần đầu tiên lấy Níp-bàn làm đối tượng,
       nhưng <b>chưa đoạn trừ</b> được phiền não nào.</p>
       <p><b>Lưu ý quan trọng</b> (dấu * trong sơ đồ): Chuyển tộc tuệ <b>không được xem là</b>
       Tịnh mãn tuệ hay Tịnh kiến tuệ — nghĩa là nó <b>không thuộc</b> Hành tri kiến thanh tịnh
       (vì đã lấy Níp-bàn làm cảnh), cũng <b>không thuộc</b> Tri kiến thanh tịnh (vì chưa đoạn phiền não).
       Nó đứng ở ranh giới giữa hai tầng — như người đặt một chân qua ngưỡng cửa.</p>`},
      {ten:"Đạo tuệ", pali:"Magganāṇa", ghi:"tuệ 14",
       body:`<p><b>Chỉ sanh một sát-na duy nhất</b> cho mỗi tầng Thánh, nhưng đó là sát-na
       <b>đoạn trừ phiền não vĩnh viễn</b>, không bao giờ trở lại.</p>
       <p><b>Nhập Lưu đạo</b> — đoạn thân kiến, hoài nghi, giới cấm thủ.<br>
       <b>Nhất Lai đạo</b> — làm suy yếu tham dục và sân.<br>
       <b>Bất Lai đạo</b> — đoạn hẳn tham dục và sân.<br>
       <b>A-la-hán đạo</b> — đoạn sắc ái, vô sắc ái, mạn, phóng dật, vô minh.</p>
       <p>Đạo tâm đồng thời thực hiện <b>bốn phận sự</b>: liễu tri Khổ, đoạn trừ Tập,
       chứng ngộ Diệt, tu tập Đạo.</p>`},
      {ten:"Quả tuệ", pali:"Phalañāṇa", ghi:"tuệ 15",
       body:`<p>Sanh khởi <b>ngay lập tức</b> sau Đạo tâm, không có khoảng cách — đây chính là ý nghĩa
       của ân đức <b>Akāliko</b> của Pháp bảo.</p>
       <p>Thường có <b>hai hoặc ba sát-na</b> (ba nếu tuệ nhạy bén, hai nếu chậm hơn).
       Quả tâm cũng lấy Níp-bàn làm đối tượng, là <b>sự an tịnh</b> do Đạo đem lại.</p>
       <p>Về sau bậc Thánh có thể nhập <b>Quả định</b> (<i>phalasamāpatti</i>) để an trú trong Níp-bàn
       lâu tùy ý.</p>`},
      {ten:"Phản khán tuệ", pali:"Paccavekkhaṇañāṇa", ghi:"tuệ 16",
       body:`<p>Sau khi xuất khỏi lộ đắc đạo, bậc Thánh <b>quán xét lại năm điều</b>:
       (1) Đạo, (2) Quả, (3) Níp-bàn đã chứng, (4) phiền não đã đoạn, (5) phiền não còn lại.</p>
       <p>Ba bậc Thánh đầu quán đủ năm điều; bậc <b>A-la-hán chỉ quán bốn</b>,
       vì không còn phiền não nào sót lại.</p>
       <p>Chính nhờ tuệ này mà bậc Thánh <b>tự biết chắc</b> mình đã chứng — không cần ai xác nhận.
       Đây cũng là ân đức <b>Paccattaṁ veditabbo viññūhi</b> của Pháp bảo.</p>`}
    ]
  }
  ],

  // Cột giữa của sơ đồ
  cotgiua: [
    {ten:"Tu tiến quán, minh sát", pali:"Vipassanā bhāvanā", pham:"tuệ 3 → 12",
     body:`<p>Toàn bộ phần <b>minh sát hiệp thế</b> — từ Phổ thông tuệ (3) đến Thuận lưu tuệ (12),
     trải qua ba tầng thanh tịnh: Đạo phi đạo, và Hành tri kiến.</p>
     <p>Đối tượng luôn là <b>danh sắc và nhân duyên của chúng</b>, được soi bằng ba tướng
     vô thường, khổ, vô ngã.</p>`},
    {ten:"Tuệ bốn Đạo và Quả", pali:"Magga-Phala", pham:"tuệ 14–15",
     body:`<p>Phần <b>siêu thế</b> của đạo lộ. Bốn Đạo và bốn Quả, mỗi cặp lấy Níp-bàn làm đối tượng.</p>
     <p>Đây là đỉnh tháp, ngay dưới Níp-bàn.</p>`}
  ],

  // Ba đạt tri
  datri: [
    {ten:"Ý nghĩa đạt tri", pali:"Ñāta pariññā", tang:"Tầng 3–4",
     body:`<p><b>Biết rõ đối tượng đúng như nó là</b>: danh sắc và nhân duyên của danh sắc.
     Tương ứng với Chỉ định danh sắc tuệ (1) và Hiển duyên danh sắc tuệ (2).</p>`},
    {ten:"Tam tướng đạt tri", pali:"Tīraṇa pariññā", tang:"Tầng 5",
     body:`<p><b>Thẩm sát bằng ba tướng</b> vô thường, khổ, vô ngã.
     Tương ứng với Phổ thông tuệ (3) và Tiến thoái tuệ nhược (4a).</p>`},
    {ten:"Đoạn trừ đạt tri", pali:"Pahāna pariññā", tang:"Tầng 6",
     body:`<p><b>Buông bỏ</b> — tuệ không chỉ biết và thẩm sát mà bắt đầu đoạn trừ.
     Từ Tiến thoái tuệ cường (4b) đến Thuận lưu tuệ (12).</p>`}
  ],

  nguon: `Theo sơ đồ <i>"Nhóm Tám Thánh Đạo đưa đến sự dứt khổ — Nibbāna"</i>,
  Trung tâm Thiền Pa-Auk Tawya (biên tập bởi Pa-Auk Tawya Sayadaw, mùa thu 2011);
  đối chiếu <i>Visuddhimagga</i> và <i>Abhidhammattha Saṅgaha</i> chương IX.`
};
