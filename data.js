// Dữ liệu đầy đủ 22 Quyền (Bāvīsatindriya)
// paramattha: "tam" | "sohuu" | "sac"  (Tâm / Sở hữu tâm / Sắc pháp — trong 4 Thực tính pháp: Tâm, Sở hữu tâm, Sắc pháp, Níp-bàn)
const QUYEN_DATA = [
{
  id:1, ten:"Nhãn quyền", pali:"Cakkhundriya",
  canquan:"Cai quản trong sự thấy.",
  chiphap:"Sắc thần kinh nhãn (Cakkhu-pasāda).",
  sacdanh:"sac", sacdanh_label:"Sắc quyền",
  paramattha:["sac"],
  paramattha_detail:"Sắc pháp — cụ thể là 1 trong 5 sắc thần kinh (pasāda-rūpa), làm nơi nương cho nhãn thức phát sinh.",
  coi:"duc", coi_label:"Dục giới quyền", coi_detail:"Chỉ có mặt và hoạt động trong Dục giới.",
  chiphapchande:"nhitythietthann", chiphapchande_label:"Nhóm 5 Sắc thần kinh",
  chiphapchande_cung:"Nhĩ, Tỷ, Thiệt, Thân quyền — cùng quy về nhóm 5 sắc thần kinh (pasāda-rūpa).",
  duyen:true, duyen_loai:"Tiền sanh quyền duyên (Purejātindriyapaccayo)",
  duyen_detail:"5 sắc thần kinh (nhãn, nhĩ, tỷ, thiệt, thân) sanh trước, làm chỗ nương để trợ lực cho Ngũ song thức giới phát sanh sau."
},
{
  id:2, ten:"Nhĩ quyền", pali:"Sotindriya",
  canquan:"Cai quản trong sự nghe.",
  chiphap:"Sắc thần kinh nhĩ (Sota-pasāda).",
  sacdanh:"sac", sacdanh_label:"Sắc quyền",
  paramattha:["sac"],
  paramattha_detail:"Sắc pháp — 1 trong 5 sắc thần kinh (pasāda-rūpa), làm nơi nương cho nhĩ thức phát sinh.",
  coi:"duc", coi_label:"Dục giới quyền", coi_detail:"Chỉ có mặt và hoạt động trong Dục giới.",
  chiphapchande:"nhitythietthann", chiphapchande_label:"Nhóm 5 Sắc thần kinh",
  chiphapchande_cung:"Nhãn, Tỷ, Thiệt, Thân quyền — cùng quy về nhóm 5 sắc thần kinh.",
  duyen:true, duyen_loai:"Tiền sanh quyền duyên (Purejātindriyapaccayo)",
  duyen_detail:"Sanh trước, làm chỗ nương để trợ lực cho Ngũ song thức giới phát sanh sau."
},
{
  id:3, ten:"Tỷ quyền", pali:"Ghānindriya",
  canquan:"Cai quản trong sự ngửi biết mùi.",
  chiphap:"Sắc thần kinh tỷ (Ghāna-pasāda).",
  sacdanh:"sac", sacdanh_label:"Sắc quyền",
  paramattha:["sac"],
  paramattha_detail:"Sắc pháp — 1 trong 5 sắc thần kinh (pasāda-rūpa), làm nơi nương cho tỷ thức phát sinh.",
  coi:"duc", coi_label:"Dục giới quyền", coi_detail:"Chỉ có mặt và hoạt động trong Dục giới.",
  chiphapchande:"nhitythietthann", chiphapchande_label:"Nhóm 5 Sắc thần kinh",
  chiphapchande_cung:"Nhãn, Nhĩ, Thiệt, Thân quyền — cùng quy về nhóm 5 sắc thần kinh.",
  duyen:true, duyen_loai:"Tiền sanh quyền duyên (Purejātindriyapaccayo)",
  duyen_detail:"Sanh trước, làm chỗ nương để trợ lực cho Ngũ song thức giới phát sanh sau."
},
{
  id:4, ten:"Thiệt quyền", pali:"Jivhindriya",
  canquan:"Cai quản trong sự nếm biết vị.",
  chiphap:"Sắc thần kinh thiệt (Jivhā-pasāda).",
  sacdanh:"sac", sacdanh_label:"Sắc quyền",
  paramattha:["sac"],
  paramattha_detail:"Sắc pháp — 1 trong 5 sắc thần kinh (pasāda-rūpa), làm nơi nương cho thiệt thức phát sinh.",
  coi:"duc", coi_label:"Dục giới quyền", coi_detail:"Chỉ có mặt và hoạt động trong Dục giới.",
  chiphapchande:"nhitythietthann", chiphapchande_label:"Nhóm 5 Sắc thần kinh",
  chiphapchande_cung:"Nhãn, Nhĩ, Tỷ, Thân quyền — cùng quy về nhóm 5 sắc thần kinh.",
  duyen:true, duyen_loai:"Tiền sanh quyền duyên (Purejātindriyapaccayo)",
  duyen_detail:"Sanh trước, làm chỗ nương để trợ lực cho Ngũ song thức giới phát sanh sau."
},
{
  id:5, ten:"Thân quyền", pali:"Kāyindriya",
  canquan:"Cai quản trong sự xúc chạm.",
  chiphap:"Sắc thần kinh thân (Kāya-pasāda).",
  sacdanh:"sac", sacdanh_label:"Sắc quyền",
  paramattha:["sac"],
  paramattha_detail:"Sắc pháp — 1 trong 5 sắc thần kinh (pasāda-rūpa), làm nơi nương cho thân thức phát sinh.",
  coi:"duc", coi_label:"Dục giới quyền", coi_detail:"Chỉ có mặt và hoạt động trong Dục giới.",
  chiphapchande:"nhitythietthann", chiphapchande_label:"Nhóm 5 Sắc thần kinh",
  chiphapchande_cung:"Nhãn, Nhĩ, Tỷ, Thiệt quyền — cùng quy về nhóm 5 sắc thần kinh.",
  duyen:true, duyen_loai:"Tiền sanh quyền duyên (Purejātindriyapaccayo)",
  duyen_detail:"Sanh trước, làm chỗ nương để trợ lực cho Ngũ song thức giới phát sanh sau."
},
{
  id:6, ten:"Nữ quyền", pali:"Itthindriya",
  canquan:"Cai quản việc biểu hiện giới tính, trạng thái, tư cách của nữ giới.",
  chiphap:"Sắc nữ tính (Itthibhāva-rūpa).",
  sacdanh:"sac", sacdanh_label:"Sắc quyền",
  paramattha:["sac"],
  paramattha_detail:"Sắc pháp — sắc y đại sinh (upādā-rūpa), quy định tướng mạo, giọng nói, cử chỉ nữ tính.",
  coi:"duc", coi_label:"Dục giới quyền", coi_detail:"Chỉ có mặt và hoạt động trong Dục giới.",
  chiphapchande:"nu", chiphapchande_label:"Sắc nữ tính (riêng biệt)",
  chiphapchande_cung:"Không quy chung với quyền nào khác — là 1 chi pháp chân đế độc lập.",
  duyen:false, duyen_loai:null,
  duyen_detail:"KHÔNG làm năng duyên trong Quyền duyên. Tuy có năng lực cai quản diện mạo, cử chỉ, nhưng không sở hữu chức năng của một mãnh lực duyên hệ thực thụ — thiếu năng lực đồng thời sản sinh, hỗ trợ, duy trì trực tiếp tại sát-na tục sinh như các quyền khác."
},
{
  id:7, ten:"Nam quyền", pali:"Purisindriya",
  canquan:"Cai quản việc biểu hiện tông tích, tư cách của nam giới.",
  chiphap:"Sắc nam tính (Purisabhāva-rūpa).",
  sacdanh:"sac", sacdanh_label:"Sắc quyền",
  paramattha:["sac"],
  paramattha_detail:"Sắc pháp — sắc y đại sinh (upādā-rūpa), quy định tướng mạo, giọng nói, cử chỉ nam tính.",
  coi:"duc", coi_label:"Dục giới quyền", coi_detail:"Chỉ có mặt và hoạt động trong Dục giới.",
  chiphapchande:"nam", chiphapchande_label:"Sắc nam tính (riêng biệt)",
  chiphapchande_cung:"Không quy chung với quyền nào khác — là 1 chi pháp chân đế độc lập.",
  duyen:false, duyen_loai:null,
  duyen_detail:"KHÔNG làm năng duyên trong Quyền duyên — cùng lý do như Nữ quyền."
},
{
  id:8, ten:"Mạng quyền", pali:"Jīvitindriya (Rūpa- và Nāma-)",
  canquan:"Cai quản việc gìn giữ và bảo trì thọ mạng của các pháp đồng sanh.",
  chiphap:"Gồm 2 chi pháp khác nhau, cùng gọi chung là Mạng quyền: (1) Sắc mạng quyền (Jīvitarūpa) — cho sắc nghiệp đồng sanh; (2) Danh mạng quyền (Nāma-jīvitindriya, một sở hữu tâm) — cho danh pháp đồng sanh.",
  sacdanh:"sac_danh", sacdanh_label:"Đặc biệt: cả Sắc lẫn Danh",
  paramattha:["sac","sohuu"],
  paramattha_detail:"Hai thực tánh pháp khác nhau: Sắc mạng quyền thuộc Sắc pháp; Danh mạng quyền thuộc Sở hữu tâm (Cetasika) — đây là lý do Mạng quyền được tính là 2 chi pháp trong bảng quy nạp 16 chi pháp.",
  coi:"honhop", coi_label:"Hỗn hợp 4 cõi", coi_detail:"Có mặt trong cả Dục giới, Sắc giới, Vô Sắc giới và Siêu thế.",
  chiphapchande:"mang", chiphapchande_label:"Mạng quyền (2 chi pháp: sắc + danh)",
  chiphapchande_cung:"Không quyền nào khác cùng nhóm — nhưng tự thân đã gồm 2 chi pháp chân đế.",
  duyen:true, duyen_loai:"Sắc mạng quyền duyên (Rūpindriyapaccayo) và Câu sanh quyền duyên (Sahajātindriyapaccayo)",
  duyen_detail:"Phần Sắc mạng quyền: duyên cho 9 sắc nghiệp đồng bọn trong cùng một nhóm (kalāpa), duy trì và bảo vệ sự tồn tại của chúng. Phần Danh mạng quyền: là 1 trong 15 danh quyền làm Câu sanh quyền duyên cho các danh pháp tương ưng."
},
{
  id:9, ten:"Ý quyền", pali:"Manindriya",
  canquan:"Cai quản sự nhận biết đối tượng cảnh.",
  chiphap:"Tất cả các tâm (89 hoặc 121 tâm).",
  sacdanh:"danh", sacdanh_label:"Danh quyền",
  paramattha:["tam"],
  paramattha_detail:"Tâm (Citta) — đây là quyền duy nhất trong 22 quyền có chi pháp là Tâm (không phải Sở hữu tâm).",
  coi:"honhop", coi_label:"Hỗn hợp 4 cõi", coi_detail:"Có mặt trong cả Dục giới, Sắc giới, Vô Sắc giới và Siêu thế.",
  chiphapchande:"tam", chiphapchande_label:"Tâm (riêng biệt)",
  chiphapchande_cung:"Không quy chung với quyền nào khác — là chi pháp Tâm duy nhất trong 22 quyền.",
  duyen:true, duyen_loai:"Câu sanh quyền duyên (Sahajātindriyapaccayo)",
  duyen_detail:"Là 1 trong 15 danh quyền, đồng sanh trợ lực cho các sở hữu tâm tương ưng và sắc pháp do tâm tạo (cittaja-rūpa)."
},
{
  id:10, ten:"Lạc quyền", pali:"Sukhindriya",
  canquan:"Cai quản sự hưởng cảnh sướng thuộc về thân.",
  chiphap:"Sở hữu thọ (Vedanā) trong 1 tâm thân thức câu hành lạc.",
  sacdanh:"danh", sacdanh_label:"Danh quyền",
  paramattha:["sohuu"],
  paramattha_detail:"Sở hữu tâm (Cetasika) — cụ thể là Sở hữu thọ (Vedanā cetasika).",
  coi:"duc", coi_label:"Dục giới quyền", coi_detail:"Chỉ có mặt và hoạt động trong Dục giới.",
  chiphapchande:"tho", chiphapchande_label:"Sở hữu thọ (nhóm 5 quyền)",
  chiphapchande_cung:"Khổ, Hỷ, Ưu, Xả quyền — cùng quy về 1 chi pháp là Sở hữu thọ (Vedanā).",
  duyen:true, duyen_loai:"Câu sanh quyền duyên (Sahajātindriyapaccayo)",
  duyen_detail:"Là 1 trong 15 danh quyền (đại diện bởi chi pháp Thọ), đồng sanh trợ lực cho danh pháp tương ưng và sắc pháp do tâm tạo."
},
{
  id:11, ten:"Khổ quyền", pali:"Dukkhindriya",
  canquan:"Cai quản sự hứng chịu cảnh đau khổ thuộc về thân.",
  chiphap:"Sở hữu thọ (Vedanā) trong 1 tâm thân thức câu hành khổ.",
  sacdanh:"danh", sacdanh_label:"Danh quyền",
  paramattha:["sohuu"],
  paramattha_detail:"Sở hữu tâm (Cetasika) — cụ thể là Sở hữu thọ (Vedanā cetasika).",
  coi:"duc", coi_label:"Dục giới quyền", coi_detail:"Chỉ có mặt và hoạt động trong Dục giới.",
  chiphapchande:"tho", chiphapchande_label:"Sở hữu thọ (nhóm 5 quyền)",
  chiphapchande_cung:"Lạc, Hỷ, Ưu, Xả quyền — cùng quy về 1 chi pháp là Sở hữu thọ (Vedanā).",
  duyen:true, duyen_loai:"Câu sanh quyền duyên (Sahajātindriyapaccayo)",
  duyen_detail:"Là 1 trong 15 danh quyền (đại diện bởi chi pháp Thọ), đồng sanh trợ lực cho danh pháp tương ưng."
},
{
  id:12, ten:"Hỷ quyền", pali:"Somanassindriya",
  canquan:"Cai quản sự hưởng cảnh vui sướng thuộc về tâm.",
  chiphap:"Sở hữu thọ (Vedanā) trong 62 tâm câu hành hỷ.",
  sacdanh:"danh", sacdanh_label:"Danh quyền",
  paramattha:["sohuu"],
  paramattha_detail:"Sở hữu tâm (Cetasika) — cụ thể là Sở hữu thọ (Vedanā cetasika).",
  coi:"bacoi", coi_label:"Liên quan 3 cõi", coi_detail:"Duy nhất trong 22 quyền có mặt ở cả 3 cõi: Dục giới, Sắc giới, và Siêu thế (nhưng không có ở Vô Sắc giới).",
  chiphapchande:"tho", chiphapchande_label:"Sở hữu thọ (nhóm 5 quyền)",
  chiphapchande_cung:"Lạc, Khổ, Ưu, Xả quyền — cùng quy về 1 chi pháp là Sở hữu thọ (Vedanā).",
  duyen:true, duyen_loai:"Câu sanh quyền duyên (Sahajātindriyapaccayo)",
  duyen_detail:"Là 1 trong 15 danh quyền (đại diện bởi chi pháp Thọ), đồng sanh trợ lực cho danh pháp tương ưng."
},
{
  id:13, ten:"Ưu quyền", pali:"Domanassindriya",
  canquan:"Cai quản sự hứng chịu cảnh buồn khổ thuộc về tâm.",
  chiphap:"Sở hữu thọ (Vedanā) trong 2 tâm căn sân.",
  sacdanh:"danh", sacdanh_label:"Danh quyền",
  paramattha:["sohuu"],
  paramattha_detail:"Sở hữu tâm (Cetasika) — cụ thể là Sở hữu thọ (Vedanā cetasika). Đây là quyền duy nhất trong 5 loại Thọ chỉ có mặt cùng tâm bất thiện (2 tâm căn sân).",
  coi:"duc", coi_label:"Dục giới quyền", coi_detail:"Chỉ có mặt và hoạt động trong Dục giới.",
  chiphapchande:"tho", chiphapchande_label:"Sở hữu thọ (nhóm 5 quyền)",
  chiphapchande_cung:"Lạc, Khổ, Hỷ, Xả quyền — cùng quy về 1 chi pháp là Sở hữu thọ (Vedanā).",
  duyen:true, duyen_loai:"Câu sanh quyền duyên (Sahajātindriyapaccayo)",
  duyen_detail:"Là 1 trong 15 danh quyền (đại diện bởi chi pháp Thọ), đồng sanh trợ lực cho danh pháp tương ưng."
},
{
  id:14, ten:"Xả quyền", pali:"Upekkhindriya",
  canquan:"Cai quản sự hưởng cảnh trung bình, không vui không buồn.",
  chiphap:"Sở hữu thọ (Vedanā) trong 55 tâm câu hành xả.",
  sacdanh:"danh", sacdanh_label:"Danh quyền",
  paramattha:["sohuu"],
  paramattha_detail:"Sở hữu tâm (Cetasika) — cụ thể là Sở hữu thọ (Vedanā cetasika).",
  coi:"honhop", coi_label:"Hỗn hợp 4 cõi", coi_detail:"Có mặt trong cả Dục giới, Sắc giới, Vô Sắc giới và Siêu thế.",
  chiphapchande:"tho", chiphapchande_label:"Sở hữu thọ (nhóm 5 quyền)",
  chiphapchande_cung:"Lạc, Khổ, Hỷ, Ưu quyền — cùng quy về 1 chi pháp là Sở hữu thọ (Vedanā).",
  duyen:true, duyen_loai:"Câu sanh quyền duyên (Sahajātindriyapaccayo)",
  duyen_detail:"Là 1 trong 15 danh quyền (đại diện bởi chi pháp Thọ), đồng sanh trợ lực cho danh pháp tương ưng."
},
{
  id:15, ten:"Tín quyền", pali:"Saddhindriya",
  canquan:"Cai quản năng lực thanh lọc đức tin, tin vào những điều đáng tin.",
  chiphap:"Sở hữu tín (Saddhā) trong 91 tâm tịnh hảo.",
  sacdanh:"danh", sacdanh_label:"Danh quyền",
  paramattha:["sohuu"],
  paramattha_detail:"Sở hữu tâm (Cetasika) — Sở hữu tín (Saddhā), 1 trong 5 quyền Bodhipakkhiya (Ngũ quyền).",
  coi:"honhop", coi_label:"Hỗn hợp 4 cõi", coi_detail:"Có mặt trong cả Dục giới, Sắc giới, Vô Sắc giới và Siêu thế.",
  chiphapchande:"tin", chiphapchande_label:"Sở hữu tín (riêng biệt)",
  chiphapchande_cung:"Không quy chung với quyền nào khác trong 22 quyền.",
  duyen:true, duyen_loai:"Câu sanh quyền duyên (Sahajātindriyapaccayo)",
  duyen_detail:"Là 1 trong 15 danh quyền, đồng sanh trợ lực cho danh pháp tương ưng."
},
{
  id:16, ten:"Tấn quyền", pali:"Viriyindriya",
  canquan:"Cai quản sự siêng năng dũng mãnh, nỗ lực tinh tấn.",
  chiphap:"Sở hữu cần (Viriya) trong 105 tâm tương ưng cần.",
  sacdanh:"danh", sacdanh_label:"Danh quyền",
  paramattha:["sohuu"],
  paramattha_detail:"Sở hữu tâm (Cetasika) — Sở hữu cần (Viriya), 1 trong 5 quyền Bodhipakkhiya (Ngũ quyền).",
  coi:"honhop", coi_label:"Hỗn hợp 4 cõi", coi_detail:"Có mặt trong cả Dục giới, Sắc giới, Vô Sắc giới và Siêu thế.",
  chiphapchande:"can", chiphapchande_label:"Sở hữu cần (riêng biệt)",
  chiphapchande_cung:"Không quy chung với quyền nào khác trong 22 quyền.",
  duyen:true, duyen_loai:"Câu sanh quyền duyên (Sahajātindriyapaccayo)",
  duyen_detail:"Là 1 trong 15 danh quyền, đồng sanh trợ lực cho danh pháp tương ưng."
},
{
  id:17, ten:"Niệm quyền", pali:"Satindriya",
  canquan:"Cai quản sự ghi nhớ chân chánh, tỉnh thức không lơ đễnh.",
  chiphap:"Sở hữu niệm (Sati) trong 91 tâm tịnh hảo.",
  sacdanh:"danh", sacdanh_label:"Danh quyền",
  paramattha:["sohuu"],
  paramattha_detail:"Sở hữu tâm (Cetasika) — Sở hữu niệm (Sati), 1 trong 5 quyền Bodhipakkhiya (Ngũ quyền).",
  coi:"honhop", coi_label:"Hỗn hợp 4 cõi", coi_detail:"Có mặt trong cả Dục giới, Sắc giới, Vô Sắc giới và Siêu thế.",
  chiphapchande:"niem", chiphapchande_label:"Sở hữu niệm (riêng biệt)",
  chiphapchande_cung:"Không quy chung với quyền nào khác trong 22 quyền.",
  duyen:true, duyen_loai:"Câu sanh quyền duyên (Sahajātindriyapaccayo)",
  duyen_detail:"Là 1 trong 15 danh quyền, đồng sanh trợ lực cho danh pháp tương ưng."
},
{
  id:18, ten:"Định quyền", pali:"Samādhindriya",
  canquan:"Cai quản sự tập trung, đình trụ tâm vững vàng trên một cảnh.",
  chiphap:"Sở hữu nhất hành (Ekaggatā) trong 72 tâm (trừ 16 tâm vô cần và 1 tâm tương ưng hoài nghi).",
  sacdanh:"danh", sacdanh_label:"Danh quyền",
  paramattha:["sohuu"],
  paramattha_detail:"Sở hữu tâm (Cetasika) — Sở hữu nhất hành (Ekaggatā), 1 trong 5 quyền Bodhipakkhiya (Ngũ quyền).",
  coi:"honhop", coi_label:"Hỗn hợp 4 cõi", coi_detail:"Có mặt trong cả Dục giới, Sắc giới, Vô Sắc giới và Siêu thế.",
  chiphapchande:"dinh", chiphapchande_label:"Sở hữu nhất hành (riêng biệt)",
  chiphapchande_cung:"Không quy chung với quyền nào khác trong 22 quyền.",
  duyen:true, duyen_loai:"Câu sanh quyền duyên (Sahajātindriyapaccayo)",
  duyen_detail:"Là 1 trong 15 danh quyền, đồng sanh trợ lực cho danh pháp tương ưng."
},
{
  id:19, ten:"Tuệ quyền", pali:"Paññindriya",
  canquan:"Cai quản sự hiểu biết thấu suốt bản chất thực tánh của các pháp.",
  chiphap:"Sở hữu trí tuệ (Paññā) hợp với 47 hoặc 79 tâm tương ưng trí.",
  sacdanh:"danh", sacdanh_label:"Danh quyền",
  paramattha:["sohuu"],
  paramattha_detail:"Sở hữu tâm (Cetasika) — Sở hữu trí tuệ (Paññā), 1 trong 5 quyền Bodhipakkhiya (Ngũ quyền). Đây là quyền phổ thông (hiệp thế) của Tuệ; 3 quyền tiếp theo (20–22) là Tuệ ở cấp độ Siêu thế.",
  coi:"honhop", coi_label:"Hỗn hợp 4 cõi", coi_detail:"Có mặt trong cả Dục giới, Sắc giới, Vô Sắc giới và Siêu thế.",
  chiphapchande:"tue", chiphapchande_label:"Sở hữu trí tuệ (nhóm 4 quyền)",
  chiphapchande_cung:"Tri vị tri, Tri dĩ tri, Tri cụ tri quyền — cùng quy về 1 chi pháp là Sở hữu trí tuệ (Paññā).",
  duyen:true, duyen_loai:"Câu sanh quyền duyên (Sahajātindriyapaccayo)",
  duyen_detail:"Là 1 trong 15 danh quyền, đồng sanh trợ lực cho danh pháp tương ưng."
},
{
  id:20, ten:"Tri vị tri quyền", pali:"Anaññataññassāmītindriya",
  canquan:"Trí tuệ cai quản việc thấu rõ Tứ Thánh Đế mà trước đây mình chưa từng thấu triệt hay chứng đắc.",
  chiphap:"Sở hữu trí tuệ hợp với 1 tâm Sơ đạo (Đạo Nhập Lưu — Sotāpattimagga).",
  sacdanh:"danh", sacdanh_label:"Danh quyền",
  paramattha:["sohuu"],
  paramattha_detail:"Sở hữu tâm (Cetasika) — Sở hữu trí tuệ (Paññā), ở giai đoạn Đạo Nhập Lưu — lần đầu tiên chứng ngộ Tứ Thánh Đế.",
  coi:"sieuthe", coi_label:"Siêu thế quyền", coi_detail:"Hoàn toàn giải thoát, vượt ngoài tam giới — chỉ có mặt nơi tâm Siêu thế.",
  chiphapchande:"tue", chiphapchande_label:"Sở hữu trí tuệ (nhóm 4 quyền)",
  chiphapchande_cung:"Tuệ, Tri dĩ tri, Tri cụ tri quyền — cùng quy về 1 chi pháp là Sở hữu trí tuệ (Paññā).",
  duyen:true, duyen_loai:"Câu sanh quyền duyên (Sahajātindriyapaccayo)",
  duyen_detail:"Là 1 trong 15 danh quyền, đồng sanh trợ lực cho danh pháp tương ưng."
},
{
  id:21, ten:"Tri dĩ tri quyền", pali:"Aññindriya",
  canquan:"Trí tuệ cai quản việc thấu rõ Tứ Thánh Đế mà mình đã từng chứng nghiệm từ trước.",
  chiphap:"Sở hữu trí tuệ hợp với 3 đạo cao (Nhất Lai, Bất Lai, A-la-hán Đạo) và 3 quả thấp (Nhập Lưu, Nhất Lai, Bất Lai Quả).",
  sacdanh:"danh", sacdanh_label:"Danh quyền",
  paramattha:["sohuu"],
  paramattha_detail:"Sở hữu tâm (Cetasika) — Sở hữu trí tuệ (Paññā), ở giai đoạn giữa: đã từng chứng ngộ Tứ Thánh Đế và đang tiếp tục thấu triệt sâu hơn.",
  coi:"sieuthe", coi_label:"Siêu thế quyền", coi_detail:"Hoàn toàn giải thoát, vượt ngoài tam giới — chỉ có mặt nơi tâm Siêu thế.",
  chiphapchande:"tue", chiphapchande_label:"Sở hữu trí tuệ (nhóm 4 quyền)",
  chiphapchande_cung:"Tuệ, Tri vị tri, Tri cụ tri quyền — cùng quy về 1 chi pháp là Sở hữu trí tuệ (Paññā).",
  duyen:true, duyen_loai:"Câu sanh quyền duyên (Sahajātindriyapaccayo)",
  duyen_detail:"Là 1 trong 15 danh quyền, đồng sanh trợ lực cho danh pháp tương ưng."
},
{
  id:22, ten:"Tri cụ tri quyền", pali:"Aññātāvindriya",
  canquan:"Trí tuệ hoàn toàn thấu suốt, liễu tri trọn vẹn Tứ Thánh Đế và tận diệt mọi lậu hoặc.",
  chiphap:"Sở hữu trí tuệ hợp với 1 tâm Quả A-la-hán (Arahattaphala).",
  sacdanh:"danh", sacdanh_label:"Danh quyền",
  paramattha:["sohuu"],
  paramattha_detail:"Sở hữu tâm (Cetasika) — Sở hữu trí tuệ (Paññā), ở cấp độ viên mãn — Quả A-la-hán, không còn gì để chứng thêm.",
  coi:"sieuthe", coi_label:"Siêu thế quyền", coi_detail:"Hoàn toàn giải thoát, vượt ngoài tam giới — chỉ có mặt nơi tâm Siêu thế.",
  chiphapchande:"tue", chiphapchande_label:"Sở hữu trí tuệ (nhóm 4 quyền)",
  chiphapchande_cung:"Tuệ, Tri vị tri, Tri dĩ tri quyền — cùng quy về 1 chi pháp là Sở hữu trí tuệ (Paññā).",
  duyen:true, duyen_loai:"Câu sanh quyền duyên (Sahajātindriyapaccayo)",
  duyen_detail:"Là 1 trong 15 danh quyền, đồng sanh trợ lực cho danh pháp tương ưng."
}
];

const PARAMATTHA_LABELS = {
  tam: "Tâm (Citta)",
  sohuu: "Sở hữu tâm (Cetasika)",
  sac: "Sắc pháp (Rūpa)",
  nipban: "Níp-bàn (Nibbāna)"
};

const VIEWS = {
  sacdanh: {
    title:"Sắc quyền / Danh quyền",
    key:(d)=>d.sacdanh,
    colors:{sac:"purple", danh:"teal", sac_danh:"coral"},
    legend:[["purple","sac","Sắc quyền (8)"],["teal","danh","Danh quyền (14)"],["coral","sac_danh","Mạng quyền — cả Sắc lẫn Danh (1)"]]
  },
  coi: {
    title:"Theo Địa vực (Cõi)",
    key:(d)=>d.coi,
    colors:{duc:"coral", bacoi:"amber", sieuthe:"purple", honhop:"teal"},
    legend:[["coral","duc","Dục giới (10)"],["amber","bacoi","3 cõi (1)"],["purple","sieuthe","Siêu thế (3)"],["teal","honhop","Hỗn hợp 4 cõi (8)"]]
  },
  chiphap: {
    title:"Theo 16 Chi pháp Chân đế",
    key:(d)=>d.chiphapchande,
    colors:{nhitythietthann:"gray", nu:"pink", nam:"blue", mang:"coral", tam:"purple", tho:"amber", tin:"teal", can:"teal", niem:"teal", dinh:"teal", tue:"green"},
    legend:[["gray","nhitythietthann","5 Sắc thần kinh"],["pink","nu","Sắc nữ tính"],["blue","nam","Sắc nam tính"],["coral","mang","Mạng quyền (2 chi pháp)"],["purple","tam","Tâm"],["amber","tho","Thọ (5 quyền)"],["teal","tin","Tín/Cần/Niệm/Định"],["green","tue","Tuệ (4 quyền)"]]
  },
  duyen: {
    title:"Vai trò trong Quyền Duyên",
    key:(d)=>d.duyen ? "in":"out",
    colors:{in:"teal", out:"gray"},
    legend:[["teal","in","20 quyền — làm năng duyên"],["gray","out","2 quyền bị loại trừ (Nam, Nữ)"]]
  }
};
