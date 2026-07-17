// ============================================================
// BỐN KHÍA CẠNH THỰC TÍNH (SABHĀVADHAMMA) CỦA CÁC PHÁP CHÂN ĐẾ
// Theo Milindapañhā, Visuddhimagga và Aṭṭhasālinī (tr. 531–551)
// Phần Thập Độ: Sīlakkhandhaṭīkā và Cariyapiṭaka-Aṭṭhakathā
// dt = Đặc tính (Lakkhaṇā), cn = Chức năng (Rasā),
// th = Sự thể hiện (Paccupaṭṭhānā), ng = Nhân gần (Padaṭṭhānā)
// ============================================================
const DACTINH_TL = [

{ten:"Tâm (Citta)", cls:"circle-vt", items:[
{ten:"Tâm", pali:"Citta", dt:"Sự nhận biết đối tượng", dtp:"Ārammaṇavijānana", cn:"Dẫn đầu tâm pháp, làm điểm tựa cho tâm sở", cnp:"Pubbaṅgama", th:"Sự nối kết với tâm sở, với cảnh sở tri", thp:"Sandahana", ng:"Sự có mặt của Danh Sắc", ngp:"Nāmarūpa"}
]},

{ten:"Ngũ Uẩn (Pañcakkhandhā)", cls:"circle-tho", items:[
{ten:"Sắc Uẩn", pali:"Rūpakhandha", dt:"Sự tan rã do điều kiện bên ngoài", dtp:"Ruppana", cn:"Sự phân tán, đổ nát", cnp:"Vikiraṇa", th:"Không thiện, không ác", thp:"Abyākata", ng:"4 điều kiện: Nghiệp, Tâm, Nhiệt Lượng, Dưỡng Tố", ngp:""},
{ten:"Thọ Uẩn", pali:"Vedanākhandha", dt:"Sự cảm nhận", dtp:"Vedayita", cn:"Thưởng thức hay chịu đựng trần cảnh", cnp:"Anubhavanā, iṭṭhākārasambhogā", th:"Sự nếm trải của Danh pháp", thp:"Cetasika-assāda", ng:"Sự lắng đọng cảm xúc", ngp:"Passaddhi"},
{ten:"Tưởng Uẩn", pali:"Saññākhandha", dt:"Sự nhận diện cảnh cũ", dtp:"Sañjānana", cn:"Biết thêm lần nữa một cảnh đã biết", cnp:"Punasañjānanapaccanimitta-karanā, paccābhiññāṇā", th:"Cái biết thiên về kinh nghiệm", thp:"Yathāgayhanimittabhinivesa", ng:"Cảnh cũ từng biết qua", ngp:"Yathā-upatthitavisaya"},
{ten:"Hành Uẩn", pali:"Saṅkhārakkhandha", dt:"Sự cấu tạo, xây dựng", dtp:"Abhisaṅkharaṇa", cn:"Tích lũy, huân tập", cnp:"Āyūhana", th:"Sự dàn trải", thp:"Vipphāra", ng:"Ba Danh uẩn còn lại", ngp:"Sesakhandhattaya"},
{ten:"Thức Uẩn", pali:"Viññāṇakhandha", dt:"Sự nhận biết đối tượng", dtp:"Ārammaṇavijānana", cn:"Dẫn đầu tâm pháp, làm điểm tựa cho tâm sở", cnp:"Pubbaṅgama", th:"Sự nối kết với tâm sở, với cảnh sở tri", thp:"Sandahana", ng:"4 điều kiện: Nghiệp, Tâm, Nhiệt Lượng, Dưỡng Tố", ngp:""}
]},

{ten:"Ngũ Song Thức · Ý Giới · Ý Thức Giới · 2 Tâm Tố vô nhân", cls:"circle-vt", items:[
{ten:"Nhãn Thức", pali:"Cakkhuviññāṇa", dt:"Cái biết dựa vào thị giác", dtp:"Cakkhusannissitarūpa-vijānana", cn:"Hình ảnh", cnp:"Rūpamattārammaṇa", th:"Sự hướng về hình ảnh", thp:"Rūpābhimukhabhāva", ng:"Khai ngũ môn", ngp:"Rūpārammaṇāya kiriyamanodhātuyā apagama"},
{ten:"Nhĩ Thức", pali:"Sotaviññāṇa", dt:"Cái biết dựa vào thính giác", dtp:"Sotādisannissitasaddādi-vijānana", cn:"Âm thanh", cnp:"Saddamattārammaṇa", th:"Sự hướng về âm thanh", thp:"Saddābhimukhabhāva", ng:"Khai ngũ môn", ngp:"Sotārammaṇāya kiriyamanodhātuyā apagama"},
{ten:"Tỷ Thức", pali:"Ghānaviññāṇa", dt:"Cái biết dựa vào khứu giác", dtp:"Ghānadisannissitasaddādi-vijānana", cn:"Các mùi", cnp:"Gandhamattārammaṇa", th:"Sự hướng về các mùi", thp:"Gandhābhimukhabhāva", ng:"Khai ngũ môn", ngp:"Gandhārammaṇāya kiriyamanodhātuyā apagama"},
{ten:"Thiệt Thức", pali:"Jivhāviññāṇa", dt:"Cái biết dựa vào vị giác", dtp:"Jivhādisannissitasaddādi-vijānana", cn:"Các vị", cnp:"Rasamattārammaṇa", th:"Sự hướng về các vị", thp:"Rasābhimukhabhāva", ng:"Khai ngũ môn", ngp:"Rasārammaṇāya kiriyamanodhātuyā apagama"},
{ten:"Thân Thức", pali:"Kāyaviññāṇa", dt:"Cái biết dựa vào xúc giác", dtp:"Kāyadisannissitasaddādi-vijānana", cn:"Các đối tượng xúc giác", cnp:"Phoṭṭhabbamattārammaṇa", th:"Sự hướng về các đối tượng xúc giác", thp:"Phoṭṭhabbābhimukhabhāva", ng:"Khai ngũ môn", ngp:"Phoṭṭhabbārammaṇāya kiriyamanodhātuyā apagama"},
{ten:"Ý Giới", pali:"Manodhātu", dt:"Cái biết tiếp nối Ngũ Song Thức", dtp:"Cakkhuviññāṇādīnaṃ anantaraṃ rūpādivijānana", cn:"Sự đón nhận các đối tượng vật chất", cnp:"Rūpādisampaṭicchana", th:"Cảnh sao biết vậy", thp:"Tathābhāva", ng:"Sự có mặt của Ngũ Song Thức", ngp:"Cakkhuviññāṇādi-apagama"},
{ten:"Ý Thức Giới", pali:"Manoviññāṇadhātu", dt:"Cái biết lục trần", dtp:"Ahetukavipākā saḷārammaṇavijānana", cn:"Cái biết thừa tiếp Từ Tâm Quán Sát trở đi", cnp:"Santīraṇādi", th:"Cảnh sao biết vậy", thp:"Tathābhāva", ng:"Sắc Ý Vật", ngp:"Hadayavatthu"},
{ten:"Tâm Tố Xả thọ vô nhân", pali:"Upekkhāsahagatā-hetukakiriyā", dt:"Cái biết 6 trần", dtp:"Saḷārammaṇavijānana", cn:"Mở đường cho tâm Đoán Định", cnp:"Voṭṭhabbanāvajjana", th:"Cảnh sao biết vậy", thp:"Tathābhāva", ng:"Sát-na tâm đến sau", ngp:"Aññatarāpagama"},
{ten:"Tâm Tố Hỷ thọ vô nhân", pali:"Somanassasahagatā-hetukakiriyā", dt:"Cái biết 6 trần", dtp:"Saḷārammaṇavijānana", cn:"Sự tạo ra nụ cười La Hán", cnp:"Hasituppādana", th:"Cảnh sao biết vậy", thp:"Tathābhāva", ng:"Sắc Ý Vật", ngp:"Hadayavatthu"}
]},

{ten:"Tâm sở · 7 Biến hành · 6 Biệt cảnh (Thọ chia 5)", cls:"circle-tt", items:[
{ten:"Tâm sở", pali:"Cetasika", dt:"Điểm tựa của tâm", dtp:"Cittanissita", cn:"Sự gắn chặt không rời tâm thức", cnp:"Aviyoguppāda", th:"Cùng biết một cảnh với tâm", thp:"Ekārammaṇa", ng:"6 thức, tức tâm nào chúng đi cùng", ngp:"Cittuppāda"},
{ten:"Tâm sở Xúc", pali:"Phasso", dt:"Sự cọ xát", dtp:"Phusano", cn:"Sự miệt mài", cnp:"Saṅghaṭṭano", th:"Điểm hội tụ của tâm và tâm sở", thp:"Sannipāto", ng:"Có cảnh sở tri xuất hiện", ngp:"Āpāthagatavisayo"},
{ten:"Tâm sở Thọ", pali:"Vedanā", dt:"Sự cảm nhận", dtp:"Vedayita", cn:"Thưởng thức hay chịu đựng trần cảnh", cnp:"Anubhavanā, iṭṭhākārasambhogā", th:"Sự nếm trải của Danh pháp", thp:"Cetasika-assāda", ng:"Sự lắng đọng cảm xúc", ngp:"Passaddhi"},
{ten:"Khổ Thọ", pali:"Dukkhavedanā", dt:"Sự chịu đựng cảnh xúc bất toại", dtp:"Aniṭṭhaphoṭṭhabbānu-bhavanā", cn:"Làm héo úa Danh Sắc đồng sanh", cnp:"Sampayuttānaṃ milāpana", th:"Một kiểu thân bệnh", thp:"Kāyikābādha", ng:"Phải có thân xác vật chất", ngp:"Kāya"},
{ten:"Lạc Thọ", pali:"Sukhavedanā", dt:"Sự thưởng thức cảnh như ý", dtp:"Iṭṭhaphoṭṭhabbānubhavana, Sātalakkhaṇa", cn:"Thúc đẩy sức sống pháp đồng sanh", cnp:"Sampayutānaṃ upabrūhana", th:"Sự êm ái của thân xác", thp:"Kāyika-assāda, anuggahana", ng:"Phải có thân xác vật chất", ngp:"Kāya"},
{ten:"Ưu Thọ", pali:"Domanassavedanā", dt:"Sự chịu đựng cảnh pháp bất toại", dtp:"Aniṭṭhārammaṇānu-bhavana", cn:"Gánh chịu cảnh bất toại", cnp:"Āniṭṭhākārasambhoga", th:"Một kiểu tâm bệnh", thp:"Cetasikabādha", ng:"Sắc Ý vật", ngp:"Hadayavatthu"},
{ten:"Hỷ Thọ", pali:"Somanassavedanā", dt:"Sự cảm nhận cảnh pháp như ý", dtp:"Iṭṭhārammaṇānubhavana", cn:"Thưởng thức cảnh pháp như ý", cnp:"Iṭṭhākārasambhoga", th:"Sự ngọt ngào của tâm", thp:"Cetasika-assāda", ng:"Sự lắng đọng cảm xúc", ngp:"Passaddhi"},
{ten:"Xả Thọ", pali:"Upekkhāvedana", dt:"Cảm giác trung hòa", dtp:"Majjhattavedayita", cn:"Giữ cho pháp đồng sanh không thái quá bất cập", cnp:"Sampayuttānaṃ nātiupabrūhanamilāpana", th:"Trạng thái yên tĩnh", thp:"Santabhāva", ng:"Sự vắng mặt của Hỷ thọ", ngp:"Nippitika"},
{ten:"Tâm sở Tưởng", pali:"Saññā", dt:"Sự nhận diện cảnh cũ", dtp:"Sañjānana", cn:"Biết thêm lần nữa một cảnh đã biết", cnp:"Punasañjānanapaccanimitta-karanā, paccābhiññāṇā", th:"Cái biết thiên về kinh nghiệm", thp:"Yathāgayhanimittabhinivesa", ng:"Cảnh cũ từng biết qua", ngp:"Yathāupatthitavisaya"},
{ten:"Tâm sở Tư", pali:"Cetanā", dt:"Chủ ý", dtp:"Cetayitā", cn:"Sự đầu tư ý thức", cnp:"Āyūhanā", th:"Sự sách hoạch, xếp đặt", thp:"Saṃvidahana", ng:"Ba Danh Uẩn còn lại", ngp:"Sesakhandhattaya"},
{ten:"Tâm sở Định", pali:"Ekaggatā", dt:"Sự bất loạn của tâm", dtp:"Avikkhepa, Avisāra", cn:"Sự ổn định các pháp đồng sanh", cnp:"Sahajātānaṃsampiṇḍa", th:"Sự yên tĩnh của tâm", thp:"Upasama", ng:"Sự thoải mái và sáng suốt của tâm lý", ngp:"Ñāṇa, Sukha"},
{ten:"Tâm sở Mạng Quyền", pali:"Jivitindriya", dt:"Sự bảo trì Danh Sắc", dtp:"Anupālana", cn:"Sự có mặt của Danh Sắc", cnp:"Pavattana", th:"Sự ổn định của Danh Sắc", thp:"Ṭhapana", ng:"Danh Sắc, tức những gì cần được nuôi dưỡng mới sống được", ngp:"Yāpayitabbadhamma"},
{ten:"Tâm sở Tác Ý", pali:"Manasikāra", dt:"Sự tạo ra ấn tượng", dtp:"Sāraṇa", cn:"Kết nối cảnh và tâm", cnp:"Sampayojana, Saṃyojana", th:"Sự hướng đến cảnh", thp:"Ārammaṇābhimukha-bhāva", ng:"Cảnh sở tri", ngp:"Ārammaṇa"},
{ten:"Tâm sở Tầm", pali:"Vitakka", dt:"Sự hướng tâm đến cảnh", dtp:"Ārammaṇābhiniropana", cn:"Đánh thức tâm trước cảnh", cnp:"Āhananappariyāhanana", th:"Kéo tâm về với cảnh", thp:"Ānayana", ng:"Phải có cảnh sở tri và sự hợp tác của 3 Danh Uẩn còn lại", ngp:"Ārammaṇa, Sesakkhandhattaya"},
{ten:"Tâm sở Tứ", pali:"Vicāra", dt:"Sự chà xát vào cảnh sở tri", dtp:"Anumajjana", cn:"Thúc đẩy Danh pháp đồng sanh", cnp:"Sahajātānuyojana", th:"Gắn kết tâm vào cảnh", thp:"Anupabandha", ng:"Phải có cảnh sở tri và sự hợp tác của 3 Danh Uẩn còn lại", ngp:"Ārammaṇa, Sesakkhandhattaya"},
{ten:"Tâm sở Thắng Giải", pali:"Adhimokkha", dt:"Sự khẳng định", dtp:"Sanniṭṭhāna", cn:"Không nghi ngờ lưỡng lự", cnp:"Asaṃsaya", th:"Sự dứt khoát", thp:"Nicchaya", ng:"Điều đáng tin", ngp:"Sanniṭṭheyyadhamma"},
{ten:"Tâm sở Cần", pali:"Viriya", dt:"Sự nỗ lực", dtp:"Ussāha, Ussahana", cn:"Sự hỗ trợ Danh pháp đồng sanh", cnp:"Sahajātānaṃ upatthambhana", th:"Sự bất thoái", thp:"Asaṃsīdanabhāva", ng:"Đề tài kích động tư tưởng", ngp:"Saṃvega, Vīriyārambhavatthu"},
{ten:"Tâm sở Hỷ", pali:"Pīti", dt:"Trạng thái hân hoan", dtp:"Sapiyāyana", cn:"Làm sung mãn thân tâm", cnp:"Kāyacittapinana, Pharana", th:"Nâng cao cảm xúc", thp:"Odagya", ng:"Ba Danh Uẩn còn lại", ngp:"Sesakkhandhattaya"},
{ten:"Tâm sở Dục", pali:"Chanda", dt:"Ước muốn hành động", dtp:"Kattukamyatā", cn:"Sự hướng tìm đối tượng", cnp:"Ārammaṇa pariyesana", th:"Sự hứng thú trong cảnh sở tri", thp:"Ārammaṇa atthikatā", ng:"6 cảnh nói chung", ngp:"Ārammaṇa"}
]},

{ten:"14 Tâm sở Bất thiện", cls:"circle-bt", items:[
{ten:"Tâm sở Si", pali:"Moha", dt:"Sự bất tri", dtp:"Aññāṇa, Andhabhāva", cn:"Sự không thấu đáo, sự che khuất bản chất các pháp", cnp:"Ālambasabhāvacchādana, Asampaṭivedha", th:"Sự mê mờ bất cập của tâm lý", thp:"Āsammāpaṭipatti, Andhakāra", ng:"Sự vụng nghĩ", ngp:"Ayonisomanasikāra"},
{ten:"Tâm sở Vô Tàm", pali:"Ahiri", dt:"Sự không thẹn với điều xấu", dtp:"Kāyaduccatitādihi ajigucchana, Alajjā", cn:"Thực hiện ác nghiệp", cnp:"Duccaritakarana", th:"Sự thiếu dè chừng", thp:"Asaṅkocana", ng:"Sự thiếu tự trọng", ngp:"Attāgārava"},
{ten:"Tâm sở Vô Úy", pali:"Anottappa", dt:"Sự không kiêng sợ", dtp:"Anuttāsana, Asārajja", cn:"Thực hiện ác nghiệp", cnp:"Duccarita karana", th:"Sự thiếu dè chừng", thp:"Asaṅkocana", ng:"Xem thường người khác", ngp:"Paraguṇāgārava"},
{ten:"Tâm sở Phóng Dật", pali:"Uddhacca", dt:"Sự không lắng đọng", dtp:"Avūpasama", cn:"Thiếu ổn định", cnp:"Anavaṭṭhāṇa", th:"Sự phân tán tâm thức", thp:"Bhantabbhāva", ng:"Sự vụng nghĩ", ngp:"Ayonisomanasikāra"},
{ten:"Tâm sở Tham", pali:"Lobha", dt:"Sự ghì chặt, ôm giữ", dtp:"Alambaggaha, Ārammaṇaggahaṇa", cn:"Sự trói buộc tâm vào cảnh", cnp:"Abhisaṅga", th:"Không thể buông bỏ", thp:"Appariccāga", ng:"Tập chú khía cạnh hấp dẫn của 6 trần", ngp:"Saṃyojaniyadhammesu assādadassana"},
{ten:"Tâm sở Tà Kiến", pali:"Micchādiṭṭhi", dt:"Khuynh hướng vô lý", dtp:"Ayoniso abhinivesa", cn:"Sự ngoan cố trong nhận thức", cnp:"Parāmāsa", th:"Ý hướng sai lầm", thp:"Micchābhinivesa, Dalhaggāha", ng:"Xa người trí, vụng nghĩ, không thích nhìn đúng", ngp:"Sappurisavimukhata, Ayonisomanasikārata, Adassanakāmatādi"},
{ten:"Tâm sở Ngã Mạn", pali:"Māna", dt:"Thấy mình quan trọng", dtp:"Uṇṇati", cn:"Câu chấp bản thân", cnp:"Sampaggāha", th:"Quan tâm sự nổi bật", thp:"Ketukamyatā", ng:"Tâm tham ly tà", ngp:"Diṭṭhivippayuttalobha"},
{ten:"Tâm sở Sân", pali:"Dosa", dt:"Thiếu ôn hòa", dtp:"Caṇḍikka", cn:"Sự đốt nóng", cnp:"Visappana, Nissayadaha", th:"Sự nhiễu hại", thp:"Dūsana", ng:"Có chuyện làm bực mình", ngp:"Āghātavatthu"},
{ten:"Tâm sở Tật Đố", pali:"Issā", dt:"Sự ghen ghét", dtp:"Usūyana", cn:"Sự bất mãn", cnp:"Anabhirati", th:"Sự đối đầu", thp:"Vimukkhabhāva", ng:"Cái được của người khác", ngp:"Parasampatti"},
{ten:"Tâm sở Lận", pali:"Macchariya", dt:"Sự giấu kín của riêng", dtp:"Sakasampatti nigūhana", cn:"Không thích san sẻ", cnp:"Sādhāraṇabhāva-akkhamana", th:"Sự tích cóp", thp:"Kaṭukañcukatā", ng:"Của riêng, tinh thần hay vật chất", ngp:"Attasampatti"},
{ten:"Tâm sở Hối", pali:"Kukkucca", dt:"Nóng lòng vì chuyện đã qua", dtp:"Pacchānutāpa", cn:"Khổ tâm vì điều đã làm, chưa làm", cnp:"Katākatānusocana", th:"Sự hối hận", thp:"Vippaṭisāra", ng:"Chuyện đã làm, chưa làm", ngp:"Katākata"},
{ten:"Tâm sở Hôn Trầm", pali:"Thīna", dt:"Thiếu tinh tấn", dtp:"Anussāha", cn:"Sự tiêu tán sức nỗ lực", cnp:"Viriyavinodana", th:"Ý hướng bỏ cuộc", thp:"Saṃsīdana", ng:"Sự vụng nghĩ", ngp:"Ayonisomanasikāra"},
{ten:"Tâm sở Thụy Miên", pali:"Middha", dt:"Sự thiếu sức sống, thiếu năng động", dtp:"Akammaññatā", cn:"Sự biếng lười", cnp:"Onahana", th:"Sự buông xuôi", thp:"Līnatā", ng:"Cảm giác buồn ngủ", ngp:"Pacalayikaniddā"},
{ten:"Tâm sở Hoài Nghi", pali:"Vicikicchā", dt:"Sự nghi ngờ", dtp:"Saṃsaya", cn:"Sự dao động", cnp:"Kampana", th:"Sự thiếu dứt khoát", thp:"Anicchaya, Anekaṃsagāha", ng:"Sự vụng nghĩ", ngp:"Ayonisomanasikāra"}
]},

{ten:"25 Tâm sở Tịnh hảo (6 cặp thân·tâm và Giới phần kể gộp)", cls:"circle-th", items:[
{ten:"Tâm sở Tín", pali:"Saddā", dt:"Sự tin cậy, tín nhiệm", dtp:"Saddahana, Okappana", cn:"Sự ngưỡng mộ", cnp:"Pasādana, Pakkhandana", th:"Không bất tín", thp:"Akālussiya", ng:"Có đối tượng để tin", ngp:"Adhimutti, Saddheyyavatthu"},
{ten:"Tâm sở Niệm", pali:"Sati", dt:"Sự ghi nhớ", dtp:"Apilāpana, Anussaraṇa", cn:"Sự không mê lầm", cnp:"Asammosana", th:"Sự giữ yên tâm thức trong cảnh sở tri", thp:"Ārakkha, Visayābhimukkhībhāva", ng:"Ấn tượng sâu đậm hoặc sự tu tập Tứ Niệm Xứ", ngp:"Thirassaññā, Kāyādisatipaṭṭhāna"},
{ten:"Tâm sở Tàm", pali:"Hiri", dt:"Sự nhờm gớm điều xấu", dtp:"Jigucchana", cn:"Do thẹn mà không làm ác", cnp:"Lajjākārena pāpākaraṇa", th:"Sự dè chừng", thp:"Saṅkocana", ng:"Sự tôn trọng đối với mình và đời", ngp:"Attagāravaparagārava"},
{ten:"Tâm sở Úy", pali:"Ottapa", dt:"Sự kiêng sợ", dtp:"Uttāsana", cn:"Do kiêng sợ mà không làm ác", cnp:"Uttāsākārena pāpākaraṇa", th:"Sự dè chừng", thp:"Saṅkocana", ng:"Sự tôn trọng đối với mình và đời", ngp:"Attagāravaparagārava"},
{ten:"Tâm sở Vô Tham", pali:"Alobha", dt:"Không dính mắc, không ghim chặt", dtp:"Agedha, Alaggabhāva", cn:"Buông bỏ", cnp:"Apariggahaṇa", th:"Không đam mê", thp:"Anallīnabhāva", ng:"Suy tư hợp lý", ngp:"Yonisomanasikāra"},
{ten:"Tâm sở Vô Sân", pali:"Adosa", dt:"Không bạo tánh, không đối lập", dtp:"Acaṇḍikkala, Avirodha", cn:"Sự kiểm soát để không phiền người và tự phiền", cnp:"Āghātavinaya, Pariḷāhavinaya", th:"Sự mát mẻ của nội tâm", thp:"Sommabhāva", ng:"Suy tư hợp lý", ngp:"Yonisomanasikāra"},
{ten:"Tâm sở Hành Xả", pali:"Tatramajjhatatā", dt:"Trạng thái quân bình cảm xúc", dtp:"Samavāhita", cn:"Ngăn chặn sự thái quá, bất cập", cnp:"Ūnādhikanivāraṇa, Pakkhapātupacchedana", th:"Trạng thái trung dung", thp:"Majjhattabhāva", ng:"Các pháp tương ưng", ngp:"Sampayuttadhamma"},
{ten:"Tâm sở Tịnh Tánh · Tịnh Tâm", pali:"Kāyapassaddhi, Cittapassaddhi", dt:"Sự dàn xếp ổn định của tâm pháp", dtp:"Kāyacittadarathavūpasama", cn:"Sự trấn an tâm pháp", cnp:"Kāyacittadarathanim-maddana", th:"Trạng thái lắng đọng của tâm pháp", thp:"Kāyacittāparipphandasītibhāva", ng:"Bốn Danh Uẩn tức Thọ, Tưởng, Hành uẩn ở đây được gọi là Thân, Thức uẩn được gọi là Tâm", ngp:"Kāyacitta"},
{ten:"Tâm sở Khinh Tánh · Khinh Tâm", pali:"Kāyalahutā, Cittalahutā", dt:"Sự dàn xếp cho Danh uẩn được nhẹ nhàng", dtp:"Kāyacitta-garubhāvavūpasama", cn:"Sự làm giảm áp lực Danh uẩn", cnp:"Kāyacittagarubhāva-nimmaddana", th:"Sự lìa bỏ trạng thái cứng nhắc, ngoan cố", thp:"Kāyacittānaṃ adandhatā", ng:"Bốn Danh Uẩn tức Thọ, Tưởng, Hành uẩn ở đây được gọi là thân, Thức uẩn được gọi là Tâm", ngp:"Kāyacitta"},
{ten:"Tâm sở Nhu Tánh · Nhu Tâm", pali:"Kāyamudutā, Cittamudutā", dt:"Sự dàn xếp cho Danh uẩn không bị đóng khung", dtp:"Kāyacittathaddha-thambhabhāvavūpasama", cn:"Sự giảm tính lì lợm của Danh uẩn", cnp:"Kāyacittathaddhabhāva nimmaddana", th:"Trạng thái không xung đột", thp:"Appaṭighāta", ng:"Bốn Danh Uẩn tức Thọ, Tưởng, Hành ở đây được gọi là thân, Thức uẩn được gọi là Tâm", ngp:"Kāyacitta"},
{ten:"Tâm sở Thích Tánh · Thích Tâm", pali:"Kāyakammaññatā, Cittakammaññatā", dt:"Sự dàn xếp giúp Danh uẩn không bị xơ cứng", dtp:"Kāyacittakammañña-bhāvavūpasama", cn:"Sự giảm tính chai sạn của Danh uẩn", cnp:"Kāyacittā-naṃakammaññabhāva-nimmaddana", th:"Tính linh hoạt của Danh uẩn", thp:"Kāyacittāmāram-maṇakaraṇasampatti", ng:"Bốn Danh Uẩn tức Thọ, Tưởng, Hành ở đây được gọi là thân, Thức uẩn được gọi là Tâm", ngp:"Kāyacitta"},
{ten:"Tâm sở Thuần Tánh · Thuần Tâm", pali:"Kāyapāguññatā, Cittapāguññatā", dt:"Sự lành mạnh của Danh uẩn", dtp:"Kāyacittānaṃ agelaññabhāva", cn:"Giúp Danh uẩn không bị bệnh hoạn", cnp:"Kāyacittagelañña-nimmaddana", th:"Tính tích cực, năng động của Danh uẩn", thp:"Nirādīnava", ng:"Bốn Danh Uẩn Tức Thọ, Tưởng, Hành Ở Đây Được Gọi Là Thân, Thức Uẩn Được Gọi Là Tâm", ngp:"Kāyacitta"},
{ten:"Tâm sở Chánh Tánh · Chánh Tâm", pali:"Kāyajukatā, Cittujukatā", dt:"Trạng thái cương trực", dtp:"Kāyacittānaṃ ajjava", cn:"Sự vắng mặt của trạng thái quanh co", cnp:"Kāyacittakuṭilabhāva nimmaddana", th:"Sự thẳng thắn", thp:"Ajimhatā", ng:"Bốn Danh Uẩn tức Thọ, Tưởng, Hành ở đây được gọi là thân, Thức uẩn được gọi là Tâm", ngp:"Kāyacitta"},
{ten:"Tâm sở Giới Phần", pali:"Virati", dt:"Sự khép mình không để vi phạm", dtp:"Avītikama, Amaddana", cn:"Sự đào thải hay bài trừ ác nghiệp", cnp:"Kāyaduccaritādi-vatthuto saṅkocana", th:"Sự vắng mặt của ác nghiệp", thp:"Akiriya", ng:"Các thiện pháp như Chánh Tín, Tàm, Úy, thiểu dục", ngp:"Saddhāhirottapa appicchatādiguṇa"},
{ten:"Tâm sở Bi", pali:"Karuṇā", dt:"Mong chuyển hoá nỗi đau của người", dtp:"Dukkhāpanaya-nākārappavatti", cn:"Sự bất nhẫn trước nỗi đau của người", cnp:"Paradukkhāsahana", th:"Vô hại", thp:"Avihiṃsā", ng:"Đối tượng đáng thương", ngp:"Anāthabhāvadassana"},
{ten:"Tâm sở Hỷ (Tùy hỷ)", pali:"Muditā", dt:"Sự vui theo", dtp:"Pamodana", cn:"Sự vắng mặt của lòng ganh tị", cnp:"Anissāyana", th:"Không có tâm bất mãn", thp:"Arativighāta", ng:"Thấy người được gì", ngp:"Sampattidassana"},
{ten:"Tâm sở Trí Tuệ", pali:"Paññā, Amoha", dt:"Sự hiểu đúng bản chất sự vật, sự kiện", dtp:"Yathāsabhāvapaṭivedha, Akkhalitapaṭivedha", cn:"Sự soi rọi cảnh sở tri", cnp:"Visayobhāsana", th:"Sự không mê lầm", thp:"Asammoha", ng:"Sự suy tư hợp lý", ngp:"Yonisomanāsikāra"}
]},

{ten:"28 Sắc pháp (Cảnh Xúc kể trong Đất · Lửa · Gió)", cls:"circle-sac", items:[
{ten:"Đất", pali:"Pathavī", dt:"Tánh thô ngại", dtp:"Kakkhaḷatta", cn:"Làm điểm tựa cho các vật chất khác", cnp:"Paṭiṭṭhāna", th:"Sự tiếp nhận muôn vật", thp:"Sampaṭicchana", ng:"Ba Đại còn lại là Nước, Lửa, Gió", ngp:"Sesattaya"},
{ten:"Nước", pali:"Āpo", dt:"Sự tan chảy", dtp:"Paggharaṇa", cn:"Sự phát triển", cnp:"Brūhana", th:"Sự kết hợp, gắn kết", thp:"Saṅgaha", ng:"Ba Đại còn lại là Đất, Lửa, Gió", ngp:"Sesattaya"},
{ten:"Lửa", pali:"Tejo", dt:"Nhiệt độ nói chung", dtp:"Uṇhatta", cn:"Sự làm chín muồi vật chất", cnp:"Paripācana", th:"Trạng thái thuần thục, nhừ nhuyễn của vật chất", thp:"Maddavānuppadāna", ng:"Ba Đại còn lại là Đất, Nước, Gió", ngp:"Sesattaya"},
{ten:"Gió", pali:"Vāyo", dt:"Sự giãn nở, trương phồng", dtp:"Vitthambhana", cn:"Xê dịch di động", cnp:"Samudīraṇa", th:"Áp suất, sự tống đẩy", thp:"Abhinīhāra", ng:"Ba Đại còn lại là Đất, Nước, Lửa", ngp:"Sesattaya"},
{ten:"Thần kinh Thị Giác", pali:"Cakkhupasāda", dt:"Thần kinh thị giác", dtp:"Rūpābhighātārahabhūtappasāda, Daṭṭhukāmatānidānakammasamuṭṭhānabhūtappasāda", cn:"Sự nhạy cảm trước hình ảnh", cnp:"Rūpesu āviñchana", th:"Điểm tựa cho Nhãn thức", thp:"Cakkhuviññāṇassa ādhārabhāva", ng:"Sắc nghiệp có từ Sắc Ái", ngp:"Daṭṭhukāmatānidāna-kammajabhūta"},
{ten:"Thần kinh Thính Giác", pali:"Sotapasāda", dt:"Thần kinh thính giác", dtp:"Saddābhighātārahabhūtappasāda, Sotukāmatānidānakammasamuṭṭhānabhūtappasāda", cn:"Sự nhạy cảm trước âm thanh", cnp:"Saddesu āviñchana", th:"Điểm tựa cho Nhĩ thức", thp:"Sotaviññāṇassa ādhārabhāva", ng:"Sắc nghiệp có từ Thinh Ái", ngp:"Sotukāmatānidānakamma-majabhūta"},
{ten:"Thần kinh Khứu Giác", pali:"Ghānapasāda", dt:"Thần kinh khứu giác", dtp:"Gandhābhighātāraha-bhūtappasāda, Ghāyitukā-matānidānakamma samuṭṭhānabhūtappasāda", cn:"Sự nhạy cảm trước các mùi", cnp:"Gandhesu āviñchana", th:"Điểm tựa cho Tỷ Thức", thp:"Ghānaviññāṇassa ādhārabhāva", ng:"Sắc nghiệp có từ Khí Ái", ngp:"Ghāyitukāmatānidānakammajabhūta"},
{ten:"Thần kinh Vị Giác", pali:"Jivhāpasāda", dt:"Thần kinh vị giác", dtp:"Rasābhighātārahabhūtappasāda, Sāyitukāmatānidāna-kammasamuṭṭhānabhūtappasāda", cn:"Sự nhạy cảm trước các vị", cnp:"Rasesu āviñchana", th:"Điểm tựa cho Thiệt thức", thp:"Jivhāviññāṇassa ādhārabhāva", ng:"Sắc nghiệp có từ Vị Ái", ngp:"Sāyitukāmatānidāna-kammajabhūta"},
{ten:"Thần kinh Xúc Giác", pali:"Kāyapasāda", dt:"Thần kinh xúc giác", dtp:"Phoṭṭhabbābhighātāra-habhūtappasāda, Phusitukāmatānidāna-kamma-samuṭṭhānabhūtappasāda", cn:"Sự nhạy cảm trước các đối tượng xúc giác", cnp:"Phoṭṭhabhesu āviñchana", th:"Điểm tựa cho Thân thức", thp:"Kāyaviññāṇassa ādhārabhāva", ng:"Sắc nghiệp có từ Xúc Ái", ngp:"Phusitukāmatānidāna-kammajabhūta"},
{ten:"Cảnh Sắc", pali:"Rūpāyatana", dt:"Hình ảnh và màu sắc nói chung", dtp:"Cakkhupaṭihanana", cn:"Đối tượng của Nhãn thức", cnp:"Cakkhuviññāṇassa visayabhāva", th:"Chỗ hoạt động của Nhãn thức", thp:"Tasseva gocara", ng:"Bốn Đại", ngp:"Catumahābhūta"},
{ten:"Cảnh Thinh", pali:"Saddāyatana", dt:"Các thứ âm thanh, tiếng động", dtp:"Sotapaṭihanana", cn:"Đối tượng của Nhĩ thức", cnp:"Sotaviññāṇassa visayabhāva", th:"Chỗ hoạt động của Nhĩ thức", thp:"Tasseva gocara", ng:"Âm thanh, tiếng động", ngp:"Sadda"},
{ten:"Cảnh Khí", pali:"Gandhāyatana", dt:"Các mùi nói chung", dtp:"Ghānapaṭihanana", cn:"Đối tượng của Tỷ Thức", cnp:"Ghānaviññāṇassa visayabhāva", th:"Chỗ hoạt động của Tỷ Thức", thp:"Tasseva gocara", ng:"Các mùi nói chung", ngp:"Gandha"},
{ten:"Cảnh Vị", pali:"Rasāyatana", dt:"Các vị nói chung", dtp:"Jivhāpaṭihanana", cn:"Đối tượng của Thiệt thức", cnp:"Jivhāviññāṇassa visayabhāva", th:"Chỗ hoạt động của Thiệt thức", thp:"Tasseva gocara", ng:"Các vị nói chung", ngp:"Rasa"},
{ten:"Cảnh Xúc", pali:"Phoṭṭhabba", dt:"Gồm Đất, Lửa, Gió", dtp:"", cn:"Xem Đất, Lửa, Gió", cnp:"", th:"Xem Đất, Lửa, Gió", thp:"", ng:"Xem Đất, Lửa, Gió", ngp:""},
{ten:"Sắc Tố Nữ", pali:"Itthibhāva", dt:"Nữ tính hay giống cái", dtp:"Itthibhāva", cn:"Sự biểu hiện của nữ tính hay giống cái", cnp:"Itthītipakāsana", th:"Dáng nét riêng nữ tính của giống cái", thp:"Itthiliṅganimitta-kuttākappānaṃ kāraṇabhāva", ng:"Tứ Đại", ngp:"Catumahābhūta"},
{ten:"Sắc Tố Nam", pali:"Purisabhāva", dt:"Nam tính hay giống đực", dtp:"Purisabhāva", cn:"Sự biểu hiện của nam tính hay giống đực", cnp:"Purisotipakāsana", th:"Dáng nét riêng của nam tính hay giống đực", thp:"Purisaliṅganimittakuttā-kappānaṃ kāraṇabhāva", ng:"Tứ Đại", ngp:"Catumahābhūta"},
{ten:"Sắc Ý Vật", pali:"Hadayavatthu", dt:"Điểm tựa của Ý Giới và Ý Thức Giới", dtp:"Manodhātumanoviññāṇadhātūnaṃ nissaya", cn:"Hỗ trợ tâm thức", cnp:"Tāsaññeva dhātūnaṃ ādhāraṇa", th:"Sự cưu mang tâm thức", thp:"Ubbahana", ng:"Tứ Đại", ngp:"Catumahābhūta"},
{ten:"Sắc Mạng Quyền", pali:"Jīvitindriya", dt:"Sự bảo trì sắc pháp đồng sanh", dtp:"Sahajarūpānupālana", cn:"Giúp sắc pháp vận hành, hoạt động", cnp:"Tesaṃ pavattana", th:"Điểm tựa cho Sắc pháp", thp:"Tesaññeva ṭhapana", ng:"Sắc pháp nói chung", ngp:"Yāpayitabbabhūta"},
{ten:"Sắc Vật Thực", pali:"Āhararūpaṃ", dt:"Các chất dinh dưỡng", dtp:"Ojā", cn:"Sự tạo ra sắc pháp gián hay trực tiếp", cnp:"Rūpāharaṇa", th:"Sự hỗ trợ sắc pháp nói chung", thp:"Upatthambhana", ng:"Các thứ thực phẩm hay dưỡng tố", ngp:"Kabaḷaṃ katvā āharitabbavatthu"},
{ten:"Sắc Hư Không", pali:"Ākāsarūpa", dt:"Ranh giới giữa các sắc pháp", dtp:"Rūpapariccheda", cn:"Phân biệt vị trí các sắc pháp", cnp:"Rūpapariyantappakāsana", th:"Sự độc lập của các sắc", thp:"Rūpamariyāda", ng:"Khoảng cách giữa các sắc pháp", ngp:"Asamphuṭṭhabhāva-vacchiddavivarabhāva, Paricchinnarūpa"},
{ten:"Thân Biểu Tri", pali:"Kāyaviññatti", dt:"Các hoạt động lớn nhỏ của thân xác", dtp:"Sahajarūpakāyathambhanasandhāraṇacalana", cn:"Sự biểu ý qua thân xác", cnp:"Adhippāyapakāsana", th:"Sự khác biệt giữa người sống và xác chết", thp:"Kāyavipphandanahetubhāva", ng:"Phong Đại do tâm sanh", ngp:"Cittasamuṭṭhānavāyo-dhātu"},
{ten:"Khẩu Biểu Tri", pali:"Vācīviññatti", dt:"Bất cứ sự phát biểu nào của miệng", dtp:"Vacīghaṭṭana", cn:"Sự biểu ý qua ngôn từ", cnp:"Adhippāyappakāsana", th:"Tiếng hay giọng nói", thp:"Vacīghosahetubhāva", ng:"Địa Đại do tâm sanh", ngp:"Cittasamuṭṭhānapathavī-dhātu"},
{ten:"Sắc Khinh tánh", pali:"Rūpalahutā", dt:"Sự không nặng nề", dtp:"Adandhatā", cn:"Giúp sắc pháp được linh hoạt", cnp:"Rūpānaṃ garubbhāvavinodana", th:"Giúp sắc pháp hoạt động nhẹ nhàng", thp:"Lahuparivattitā", ng:"Các sắc cần sự nhẹ nhàng", ngp:"Lahurūpa"},
{ten:"Sắc Nhu tánh", pali:"Mudutārūpa", dt:"Sự không thô cứng", dtp:"Athaddhatā", cn:"Giúp sắc pháp không trơ lì", cnp:"Rūpānaṃ thaddhabhāvavinodana", th:"Giúp sắc pháp hoạt động mềm mại", thp:"Sabbakiriyāsu avirodhitā", ng:"Các sắc cần sự mềm mại", ngp:"Mudurūpa"},
{ten:"Sắc Thích tánh", pali:"Rūpakammañña", dt:"Khả năng thích ứng của sắc pháp", dtp:"Sarīrakiriyānukūlakammaññabhāva", cn:"Giúp sắc tránh tình trạng thiếu linh hoạt", cnp:"Akammaññatāvinodana", th:"Sự mạnh mẽ, cứng vững của sắc pháp", thp:"Adubbalabhāva", ng:"Các sắc cần sự thích ứng", ngp:"Kammaññarūpa"},
{ten:"Sắc Sinh", pali:"Upacaya", dt:"Sự khơi mào", dtp:"Ācaya", cn:"Sự sơ hiện của Sắc pháp", cnp:"Pubbantato rūpā-naṃummujjāpana", th:"Sự khai sinh Sắc pháp", thp:"Niyyātana", ng:"Giai đoạn hoàn chỉnh của Sắc pháp", ngp:"Paripuṇṇabhāva"},
{ten:"Sắc Tiến", pali:"Santati", dt:"Sự vận hành", dtp:"Pavatti", cn:"Sự tiếp nối", cnp:"Anuppabandhana", th:"Sự liên tục", thp:"Anupaccheda", ng:"Các sắc sanh sau", ngp:"Anuppabandhakarūpa"},
{ten:"Sắc Dị", pali:"Jaratārūpa", dt:"Sự chín muồi của Sắc pháp", dtp:"Rūpaparipākala", cn:"Sự thoái hóa của Sắc pháp", cnp:"Upanayana", th:"Sự đổi mới liên tục của Sắc pháp", thp:"Sabhāvānapagamepi navabhāvāpagama", ng:"Các sắc đang tàn lụi", ngp:"Paripaccamānarūpa"},
{ten:"Sắc Diệt", pali:"Aniccātārūpa", dt:"Sự tan rã băng hoại", dtp:"Paribheda", cn:"Sự co rút của Sắc pháp", cnp:"Saṃsīdana", th:"Sự hoại diệt", thp:"Khayavaya", ng:"Các sắc đang mất đi", ngp:"Paribhijjamānarūpa"}
]},

{ten:"12 chi Duyên khởi (Paṭiccasamuppāda) và Sầu · Bi · Khổ · Ưu · Não", cls:"circle-canh", items:[
{ten:"Vô Minh", pali:"Avijjā", dt:"Sự bất tri trong Tứ Đế", dtp:"Aññāṇa", cn:"Sự tăm tối mù mịt trong tâm thức", cnp:"Sammohana", th:"Sự che khuất, án ngữ", thp:"Chādana", ng:"Tứ Lậu", ngp:"Āsava"},
{ten:"Hành", pali:"Saṅkhāra", dt:"Sự cấu tạo, kiến thiết", dtp:"Abhisaṅkharaṇa", cn:"Sự tích lũy, đầu tư", cnp:"Āyūhana", th:"Chủ ý", thp:"Cetanā", ng:"Vô minh trong Tứ Đế", ngp:"Avijjā"},
{ten:"Thức", pali:"Viññāṇa", dt:"Sự nhận biết đối tượng", dtp:"Vijānana", cn:"Sự dẫn đầu, tiên phong", cnp:"Pubbaṅgama", th:"Sự kết nối đời này với kiếp khác", thp:"Paṭisandhi", ng:"Ba Hành hoặc 6 trần", ngp:"Saṅkhāra, Vatthārammaṇa"},
{ten:"Danh Pháp", pali:"Nāma", dt:"Sự hướng đến", dtp:"Namana", cn:"Sự kết hợp", cnp:"Sampayoga", th:"Sự không tách rời", thp:"Avinibbhoga", ng:"Thức tái sanh", ngp:"Viññāṇa"},
{ten:"Sắc Pháp", pali:"Rūpa", dt:"Sự tan rã do điều kiện bên ngoài", dtp:"Ruppana", cn:"Sự phân tán, đổ nát", cnp:"Vikiraṇa", th:"Không thiện, không ác", thp:"Abyākata", ng:"Thức tái sanh", ngp:"Viññāṇa"},
{ten:"Lục Nhập", pali:"Saḷāyatana", dt:"Sự dẫn đưa, tiến cử", dtp:"Āyatana", cn:"Hoạt động của sáu căn", cnp:"Dassanādi", th:"Cửa vào của 6 Thức", thp:"Vatthudvārabhāva", ng:"Danh Sắc đầu đời", ngp:"Nāmarūpa"},
{ten:"Xúc", pali:"Phassa", dt:"Sự tiếp xúc", dtp:"Phusana", cn:"Sự va chạm", cnp:"Saṅghaṭṭana", th:"Sự kết hợp", thp:"Saṅgati", ng:"Lục Nhập", ngp:"Saḷāyatana"},
{ten:"Thọ", pali:"Vedanā", dt:"Sự hưởng chịu", dtp:"Anubhavana", cn:"Sự hưởng chịu trần cảnh", cnp:"Visayarasasambhoga", th:"Lạc thọ và khổ thọ", thp:"Sukhadukkha", ng:"6 Xúc", ngp:"Phassa"},
{ten:"Ái", pali:"Taṇhā", dt:"Nguồn gốc của mọi hiện hữu", dtp:"Hetu", cn:"Sự vui thích", cnp:"Abhinandana", th:"Sự khao khát, không thỏa mãn", thp:"Atitibhāva", ng:"6 Thọ", ngp:"Vedanā"},
{ten:"Thủ", pali:"Upādāna", dt:"Sự ôm giữ, ghì chặt", dtp:"Gahaṇa", cn:"Sự ràng buộc, giam nhốt", cnp:"Amuñcana", th:"Tham ái và Tà kiến sâu đậm", thp:"Taṇhā, daḷhattadiṭṭhi", ng:"Lục Ái", ngp:"Taṇhā"},
{ten:"Hữu", pali:"Bhava", dt:"Nhân quả thiện ác nói chung", dtp:"Kammakammaphala", cn:"Sự có mặt", cnp:"Bhavana", th:"Thiện, Ác và Vô ký", thp:"Kusalākusalābyākata", ng:"Tứ Thủ", ngp:"Upādāna"},
{ten:"Sanh", pali:"Jāti", dt:"Sự có mặt lúc đầu đời", dtp:"Paṭhamābhininnatti", cn:"Sự đưa đẩy vào đời sống", cnp:"Nīyyātana", th:"Sự xuất hiện", thp:"Ummujjana", ng:"Khởi điểm của các khổ", ngp:"Dukkhavicittatā"},
{ten:"Lão", pali:"Jarā", dt:"Sự chín muồi của các Uẩn", dtp:"Khandhaparipāka", cn:"Ngõ dẫn vào cái chết", cnp:"Maraṇūpanayana", th:"Sự tiêu mất tuổi trẻ", thp:"Yobbanavināsa", ng:"Sắc pháp sắp mãn", ngp:"Paribhijjamānarūpa"},
{ten:"Tử", pali:"Maraṇa", dt:"Cái chết", dtp:"Cuti", cn:"Sự lìa bỏ", cnp:"Viyoga", th:"Sự rời khỏi một cảnh giới", thp:"Gativippavāsa", ng:"Sắc pháp đang mãn", ngp:"Paribhijjamānarūpa"},
{ten:"Sầu", pali:"Sokā", dt:"Sự nóng bức của nội tâm", dtp:"Antonijjhāna", cn:"Sự thiêu cháy, đốt nóng", cnp:"Parijjhāpana", th:"Sự muộn phiền", thp:"Anusocana", ng:"Sự tái sanh", ngp:"Jāti"},
{ten:"Bi Lụy", pali:"Parideva", dt:"Sự bi lụy", dtp:"Lālappana", cn:"Sự bận lòng với điều lỗi phải", cnp:"Guṇadosakittana", th:"Sự than khóc", thp:"Sambhama", ng:"Sự tái sanh", ngp:"Jāti"},
{ten:"Khổ", pali:"Dukkha", dt:"Sự bức bách của thân xác", dtp:"Kāyapīḷāna", cn:"Gốc của ưu thọ", cnp:"Domanassakaraṇa", th:"Sự trục trặc thân xác", thp:"Kāyikābādha", ng:"Sự tái sanh", ngp:"Jāti"},
{ten:"Ưu", pali:"Domanassa", dt:"Sự bức bách của nội tâm", dtp:"Cittapīḷana", cn:"Sự đổ nát của ý thức", cnp:"Manovighāta", th:"Đáng gọi là tâm bệnh", thp:"Mānasabyādhi", ng:"Sự tái sanh", ngp:"Jāti"},
{ten:"Não, Ai", pali:"Upāyāsa", dt:"Sự nóng nảy của tâm", dtp:"Cittaparidahana", cn:"Sự héo úa của tâm lý", cnp:"Nitthunana", th:"Sự suy sụp tinh thần", thp:"Visāda", ng:"Sự tái sanh", ngp:"Jāti"}
]},

{ten:"Ba loại Khổ", cls:"circle-bt", items:[
{ten:"Oán Tăng Hội Khổ", pali:"Appiyasampayoga", dt:"Sự hợp mặt với điều bất toại", dtp:"Aniṭṭhasamodhāna", cn:"Gốc của sự bất mãn", cnp:"Cittavighātakaraṇa", th:"Ngoài ý muốn", thp:"Anatthabbhāva", ng:"Điều nghịch ý", ngp:"Dukkhavatthu"},
{ten:"Ái Biệt Ly Khổ", pali:"Piyavippayoga", dt:"Sự chia xa với thứ vừa ý", dtp:"Iṭṭhavatthuviyoga", cn:"Sự tạo ra nỗi buồn", cnp:"Sokuppādana", th:"Sự mất mát", thp:"Byāsana", ng:"Chuyện nghịch ý", ngp:"Sokadukkhavatthu"},
{ten:"Cầu Bất Đắc Khổ", pali:"Icchitālābha", dt:"Ước muốn điều không có được", dtp:"Alabbhaneyyavatthuic-chana", cn:"Sự kiếm tìm mong đợi", cnp:"Tappariyesana", th:"Tình trạng ngoài tầm tay", thp:"Appatti", ng:"Chuyện nghịch ý", ngp:"Dukkhavatthu"}
]},

{ten:"Tứ Diệu Đế (Cattāri Ariyasaccāni)", cls:"circle-tho", items:[
{ten:"Khổ Đế", pali:"Dukkhasacca", dt:"Sự ám ảnh", dtp:"Bādhana", cn:"Sự đốt nóng", cnp:"Santāpa", th:"Sự vận hành", thp:"Pavatti", ng:"Tập Đế", ngp:"Samudaya"},
{ten:"Tập Đế", pali:"Samudaya", dt:"Nguồn cội", dtp:"Pabhava", cn:"Sự triền miên không dứt", cnp:"Anupacchedakaraṇa", th:"Sự trói buộc", thp:"Pālibodha", ng:"Tứ Lậu", ngp:"Āsava"},
{ten:"Diệt Đế", pali:"Nirodhasacca", dt:"Sự tịch tịnh", dtp:"Santi", cn:"Sự bất tử", cnp:"Accuti", th:"Không dấu vết", thp:"Animitta", ng:"— (tài liệu để trống)", ngp:""},
{ten:"Đạo Đế", pali:"Maggasacca", dt:"Sự dẫn đưa", dtp:"Niyyāna", cn:"Sự đoạn trừ phiền não", cnp:"Kilesappahāna", th:"Sự xuất ly, ra khỏi", thp:"Vuṭṭhāna", ng:"— (tài liệu để trống)", ngp:""}
]},

{ten:"Tứ Vô Lượng Tâm (Appamaññā)", cls:"circle-th", items:[
{ten:"Từ", pali:"Metta", dt:"Tấm lòng lợi tha", dtp:"Hitākārappavatti", cn:"Hành động hữu ích", cnp:"Hitūpasaṃhāra", th:"Kiềm chế lòng oán ghét", thp:"Āghātavinaya", ng:"Gặp được đối tượng vừa ý", ngp:"Manāpabhāvadassana"},
{ten:"Bi", pali:"Karuṇā", dt:"Mong chuyển hoá nỗi đau của người", dtp:"Dukkhāpanayanā-kārappavatti", cn:"Sự bất nhẫn trước nỗi đau của người", cnp:"Paradukkhāsahana", th:"Vô hại", thp:"Avihiṃsā", ng:"Đối tượng đáng thương", ngp:"Anāthabhāvadassana"},
{ten:"Hỷ", pali:"Muditā", dt:"Sự vui theo", dtp:"Pamodana", cn:"Sự vắng mặt của lòng ganh tị", cnp:"Anissāyana", th:"Không có tâm bất mãn", thp:"Arativighāta", ng:"Thấy người được gì", ngp:"Sampattidassana"},
{ten:"Xả", pali:"Upekkhā", dt:"Tâm trạng ung dung", dtp:"Majjhattākārappavatti", cn:"Cái nhìn công bằng", cnp:"Samabhāvadassana", th:"Sự vắng mặt của tâm xung đột", thp:"Paṭighānunayavū-pasama", ng:"Suy tư về nghiệp lý", ngp:"Pavattakammassakatā-dassana"}
]},

{ten:"Thập Độ (Dasa Pāramī)", cls:"circle-th", items:[
{ten:"Bố Thí", pali:"Dāna", dt:"Sự buông bỏ", dtp:"Pariccāga", cn:"Lìa bỏ lòng tham chấp trong tài vật", cnp:"Deyyadhamma Lobhavidhaṃsana", th:"Sự không dính mắc", thp:"Anāsatta", ng:"Có món tài vật để cho", ngp:"Pariccajitabbavatthu"},
{ten:"Giới Hạnh", pali:"Sīla", dt:"Sự chừng mực", dtp:"Sīlana", cn:"Sự lìa bỏ kiểu sống ác giới", cnp:"Dussīlya viddhaṃsana", th:"Sự thanh tịnh của thân và khẩu nghiệp", thp:"Soceyya", ng:"Tàm-Úy", ngp:"Hirī-ottappa"},
{ten:"Ly Dục", pali:"Nekkhamma", dt:"Lý tưởng lìa bỏ Dục Ái và Hữu Ái (chán hưởng, chán sống)", dtp:"Kāmato bhavatoca nikkhamana", cn:"Sự nhận thức mặt trái của ngũ dục và mọi hiện hữu", cnp:"Kāmabhavādīnava-vibhāvana", th:"Sự lìa khỏi Dục và Hữu Ái", thp:"Tasseva vimukhabhāva", ng:"Những ấn tượng kinh động (Saṃvega) nội tâm như chuyện sanh tử và sa đọa", ngp:"Saṃvega"},
{ten:"Trí Tuệ", pali:"Paññā", dt:"Sự thấy đúng bản chất vạn vật", dtp:"Yathāsabhāvapaṭivedha", cn:"Sự rọi sáng trần cảnh", cnp:"Visayobhāsana", th:"Sự không mê lầm ngộ nhận", thp:"Asammoha", ng:"Các tầng thiền định", ngp:"Samādhi"},
{ten:"Tinh Tấn", pali:"Viriya", dt:"Sự cố gắng", dtp:"Ussāha", cn:"Sự trợ lực", cnp:"Upatthambhana", th:"Sự không buông xuôi", thp:"Asaṃsīdana", ng:"Những ấn tượng kinh động nội tâm (sanh tử và sa đọa)", ngp:"Saṃvega"},
{ten:"Nhẫn Nại", pali:"Khanti", dt:"Sự chịu đựng", dtp:"Khamana", cn:"Sự vững lòng trước các cảnh như ý và bất toại", cnp:"Iṭṭhāniṭṭhasahana", th:"Sự kham nhậm", thp:"Adhivāsana", ng:"Cái nhìn đúng đắn", ngp:"Yathābhūtadassana"},
{ten:"Chân Thật", pali:"Sacca", dt:"Sự trung thực", dtp:"Avisaṃvādana", cn:"Sự phơi bày sự thật", cnp:"Yathāvavibhāvana", th:"Sự chính chắn trong ngôn từ", thp:"Sādhutā", ng:"Lòng vị tha", ngp:"Soracca"},
{ten:"Quyết Định", pali:"Adhiṭṭhāna", dt:"Sự kiên định trong lý tưởng giải thoát", dtp:"Bodhisambhāresu avaṭṭhāna", cn:"Sự vượt qua các trở lực", cnp:"Tesaṃ paṭipakkhābhibhavana", th:"Sự không lung lay lý tưởng", thp:"Tattha acalatā", ng:"Lý tưởng giải thoát", ngp:"Bodhisambhāra"},
{ten:"Từ Tâm", pali:"Mettā", dt:"Tấm lòng lợi tha", dtp:"Hitākārappavatti", cn:"Hành động hữu ích", cnp:"Hitūpasaṃhāra", th:"Cách sống và nghĩ vị tha", thp:"Sommābhāva", ng:"Khía cạnh tốt ở người khác", ngp:"Sattānaṃ manāpabhāvadassana"},
{ten:"Hành Xả", pali:"Upekkhā", dt:"Tâm trạng ung dung", dtp:"Majjhattākārappavatti", cn:"Cái nhìn công bằng", cnp:"Samabhāvadassana", th:"Sự vắng mặt của tâm xung đột", thp:"Paṭighānunayavūpasama", ng:"Suy tư về nghiệp lý", ngp:"Kammassakatāpaccavekkhaṇā"}
]},

{ten:"Pháp Vô Vi — Níp-bàn", cls:"circle-tho", items:[
{ten:"Pháp Vô Vi, Níp-bàn", pali:"Asaṅkhata, Nibbāna", dt:"Sự vắng lặng tuyệt đối", dtp:"Santi", cn:"Bất động, bất tử", cnp:"Acalaṃ, Accuta", th:"Sự lìa khỏi hoàn toàn mọi hiện hữu", thp:"Nissarana", ng:"— (tài liệu để trống)", ngp:""}
]}

];

// ============================================================
// 14 CHỨC NĂNG CỦA TÂM — Đường Vào Thắng Pháp (TK Chánh Minh)
// ============================================================
const CHUCNANG_TAM_14 = [
{ten:"Tục sinh (nối liền)", pali:"Paṭisandhi", giaithich:"Chức năng nối liền, còn gọi là sự Tục sinh. Sự chấm dứt kiếp sống cũ được gọi là chết và sự khởi đầu một kiếp sống mới gọi là tục sinh. Chết và tục sinh được nối liền nhau không có gián đoạn, không có khoảng trống.", tam:"<b>19 tâm</b> = 2 tâm Quan sát thọ xả + 8 tâm Đại quả + 9 tâm quả Đáo đại."},
{ten:"Hữu phần", pali:"Bhavaṅga", giaithich:"Tâm hữu phần chỉ là loại tâm \"duy trì\" đời sống tâm pháp của một chúng sinh trong kiếp sống đó. Sở dĩ có tên gọi là hữu phần vì xuất hiện sau sát-na tục sinh.", tam:"Cũng chính là một trong <b>19 tâm tục sinh</b> (2 Quan sát thọ xả + 8 Đại quả + 9 quả Đáo đại)."},
{ten:"Hướng môn", pali:"Āvajjana", giaithich:"Như tâm Hướng ngũ môn trong lộ ngũ môn, chận đứng dòng hữu phần không cho chúng sinh lên; tâm Hướng ý môn trong lộ ý cũng tương tự như vậy.", tam:"<b>2 tâm</b>: tâm Hướng ngũ môn (lộ ngũ môn) và tâm Hướng ý môn (lộ ý)."},
{ten:"Thấy", pali:"Dassana", giaithich:"Thấy là \"nhận biết bằng mắt\" hay \"trực tiếp nhận biết cảnh sắc bằng mắt\".", tam:"<b>2 tâm Nhãn thức</b>."},
{ten:"Nghe", pali:"Savana", giaithich:"Nghe là \"tiếp nhận âm thanh bằng tai\" hay \"trực tiếp nhận biết cảnh thinh bằng tai\".", tam:"<b>2 tâm Nhĩ thức</b>."},
{ten:"Ngửi", pali:"Ghāyana", giaithich:"Ngửi là \"dùng mũi để nhận biết\" hay \"trực tiếp nhận biết cảnh mùi bằng mũi\".", tam:"<b>2 tâm Tỷ thức</b>."},
{ten:"Nếm", pali:"Sāyana", giaithich:"Nếm là \"dùng lưỡi để biết vị chất\" hay \"trực tiếp nhận biết cảnh vị bằng lưỡi\".", tam:"<b>2 tâm Thiệt thức</b>."},
{ten:"Đụng", pali:"Phusana", giaithich:"Đụng là \"va chạm vào\" hay \"trực tiếp nhận biết cảnh xúc bằng thân\".", tam:"<b>2 tâm Thân thức</b>."},
{ten:"Tiếp nhận (Tiếp thu)", pali:"Sampaṭicchana", giaithich:"Tiếp thu là \"nhận cái gì đó do người khác trao lại\" hay \"tiếp nhận cảnh do tâm trước để lại\". Trong lộ ngũ môn, khi một trong 5 ngoại cảnh (sắc, thinh, mùi, vị và xúc) được một trong năm đôi thức nhận bắt; khi tâm này diệt đi, một tâm khác sinh lên nhận lại cảnh đó — tâm này có tên gọi là tâm Tiếp thu.", tam:"<b>2 tâm Tiếp thu</b>."},
{ten:"Quan sát", pali:"Santīraṇa", giaithich:"Quan sát là \"xem xét để thấy rõ\" hay \"tâm xem xét cảnh khi nhận biết cảnh\".", tam:"<b>3 tâm Quan sát</b>."},
{ten:"Xác định", pali:"Voṭṭhabbana", giaithich:"\"Xác\" là đúng theo sự thật, \"định\" là đề ra — tức \"xác định rõ là cảnh tốt hay xấu rồi đề ra cách xử lý cảnh\". Ví như người sau khi quan sát trái xoài, xác định \"trái xoài chín hay chưa chín\", rồi \"ăn hay không ăn\". Chính trong giai đoạn này tạo điều kiện cho tâm thiện hay tâm bất thiện sinh ra kế tiếp: nếu \"định ra\" phương án đúng thì tâm thiện sinh lên, nếu \"định ra\" phương án sai thì tâm bất thiện sinh lên.", tam:"Chỉ có <b>tâm Hướng ý môn</b> thực hiện được chức năng \"xác định\" này, để rồi sau đó là những tâm đổng lực thiện, bất thiện hay Duy tác đổng lực sinh khởi."},
{ten:"Đổng lực", pali:"Javana", giaithich:"Đổng lực vừa \"nhanh và có sức mạnh\", giống như \"ánh sét\" vừa cực nhanh vừa có sức mạnh rất lớn.", tam:"<b>87 tâm</b> = 29 đổng lực dục giới + 18 đổng lực Đáo đại + 40 tâm Siêu thế."},
{ten:"Na cảnh", pali:"Tadārammaṇa", giaithich:"Trong sự diễn hoạt của tâm, khi sát-na đổng lực thứ 7 đã diệt nhưng cảnh vẫn còn sức mạnh, kích động đến luồng hữu phần; bấy giờ có một loại tâm sinh lên 2 sát-na liên tục để nhận cảnh đó. Chức năng này được gọi là Na cảnh, nghĩa là \"nhận lại cảnh cũ\".", tam:"<b>11 tâm</b> = 3 tâm Quan sát + 8 tâm Đại quả. <i>(Tài liệu ghi \"3 tâm quan sát thọ xả\"; đúng là 3 tâm Quan sát gồm 2 thọ xả + 1 thọ hỷ.)</i>"},
{ten:"Tử (chấm dứt kiếp sống cũ)", pali:"Cuti", giaithich:"Tâm tử là sát-na tâm sinh lên cuối cùng trong kiếp sống; thời điểm xuất hiện tâm tử gọi là thời tử.", tam:"Cũng chính là <b>19 tâm làm việc tục sinh</b>. Nói cách khác, loại tâm làm việc tục sinh, hữu phần hay tử cũng chính là một loại; sở dĩ có tên gọi \"tục sinh, hữu phần, tử\" là do chúng xuất hiện theo từng thời điểm: khởi đầu kiếp sống mới gọi là tâm tục sinh; sau tâm tục sinh một sát-na gọi là tâm hữu phần; chấm dứt kiếp sống cũ gọi là tâm tử."}
];

// ============================================================
// BẢN TÓM LƯỢC 24 DUYÊN CHÍNH TRONG ĐẠI PHÁT THÚ
// (duyên chính · duyên phụ · số kể 01–48)
// ============================================================
const DUYENHE_TOMLUOC = [
{ten:"Nhân Duyên", so:"01", phu:[]},
{ten:"Cảnh Duyên", so:"02", phu:[]},
{ten:"Trưởng Duyên", so:"", phu:[["Cảnh Trưởng Duyên","03"],["Câu Sinh Trưởng Duyên","04"],["Vật Cảnh Tiền Sinh Trưởng Duyên","05"]]},
{ten:"Vô Gián Duyên", so:"06", phu:[]},
{ten:"Đẳng Vô Gián Duyên", so:"06*", phu:[]},
{ten:"Câu Sinh Duyên", so:"07", phu:[]},
{ten:"Hỗ Tương Duyên", so:"08", phu:[]},
{ten:"Y Chỉ Duyên", so:"", phu:[["Câu Sinh Y Duyên","09"],["Vật Tiền Sinh Y Duyên","10"],["Vật Cảnh Tiền Sinh Y Duyên","11"]]},
{ten:"Cận Y Duyên", so:"", phu:[["Cảnh Cận Y Duyên","12"],["Vô Gián Cận Y Duyên","13"],["Thường Cận Y Duyên","14"]]},
{ten:"Tiền Sinh Duyên", so:"", phu:[["Vật Tiền Sinh Duyên","15"],["Cảnh Tiền Sinh Duyên","16"]]},
{ten:"Hậu Sinh Duyên", so:"17", phu:[]},
{ten:"Trùng Dụng Duyên", so:"18", phu:[]},
{ten:"Nghiệp Duyên", so:"", phu:[["Câu Sinh Nghiệp Duyên","19"],["Dị Thời Nghiệp Duyên","20"],["Vô Gián Nghiệp Duyên","21"]]},
{ten:"Dị Thục Quả Duyên", so:"22", phu:[]},
{ten:"Vật Thực Duyên", so:"", phu:[["Sắc Vật Thực Duyên","23"],["Danh Vật Thực Duyên","24"]]},
{ten:"Quyền Duyên", so:"", phu:[["Câu Sinh Quyền Duyên","25"],["Tiền Sinh Quyền Duyên","26"],["Sắc Mạng Quyền Duyên","27"]]},
{ten:"Thiền Na Duyên", so:"28", phu:[]},
{ten:"Đồ Đạo Duyên", so:"29", phu:[]},
{ten:"Tương Ưng Duyên", so:"30", phu:[]},
{ten:"Bất Tương Ưng Duyên", so:"", phu:[["Câu Sinh Bất Tương Ưng Duyên","31"],["Vật Tiền Sinh Bất Tương Ưng Duyên","32"],["Vật Cảnh Tiền Sinh Bất Tương Ưng Duyên","33"],["Hậu Sinh Bất Tương Ưng Duyên","34"]]},
{ten:"Hiện Hữu Duyên", so:"", phu:[["Câu Sinh Hiện Hữu Duyên","35"],["Vật Tiền Sinh Hiện Hữu Duyên","36"],["Cảnh Tiền Sinh Hiện Hữu Duyên","37"],["Hậu Sinh Hiện Hữu Duyên","38"],["Vật Thực Hiện Hữu Duyên","39"],["Quyền Hiện Hữu Duyên","40"]]},
{ten:"Vô Hữu Duyên", so:"41", phu:[]},
{ten:"Ly Khứ Duyên", so:"42", phu:[]},
{ten:"Bất Ly Duyên", so:"", phu:[["Câu Sinh Bất Ly Duyên","43"],["Vật Tiền Sinh Bất Ly Duyên","44"],["Cảnh Tiền Sinh Bất Ly Duyên","45"],["Hậu Sinh Bất Ly Duyên","46"],["Vật Thực Bất Ly Duyên","47"],["Quyền Bất Ly Duyên","48"]]}
];
