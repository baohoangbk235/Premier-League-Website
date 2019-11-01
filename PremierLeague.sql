CREATE TABLE CauThu (
	TenCauThu varchar(50) not null,
     MSCT char(8) not null,
	 SoAo int not null,
     MaCLB char(8) not null,
     Vitri varchar(30) not null,  
     QuocTich varchar(30) not null,
	 Tuoi int not null,
     NgaySinh date not null,    
     ChieuCao float not null,
     CanNang float not null,
	 AvatarUrl varchar(300) not null,
     SoBan int default 0,
     KienTao int default 0
);
-- CREATE TABLE DoiBong (
--     MaCLB char(8) not null,
--     Ten varchar(30) not null,
--     NamThanhLap date not null,
--     LogoUrl varchar(300) not null,
--     SanNha varchar(30) not null,
--     TenHLV varchar(30) not null,
--     SoDanhHieu int not null,
--     Diem int default 0,
--     SoTranThang int  default 0,
--     SoTranHoa int default 0,
--     SoTranThua int default 0,
--     SoBanThang int default 0,
--     SoBanThua int default 0
-- );
-- CREATE TABLE TranDau(
--     MaTran char(8) not null,
--     MaDoiNha char(8) not null,
--     MaDoiKhach char(8) not null,
--     VongDau int not null,
--     SoBanDoiNha int default 0,
--     SoBanDoiKhach int default 0,
--     ThoiGian date,
--     HighLightSrc varchar(300) default 'ChuaDau'
-- );
-- CREATE TABLE BanThang(
--     MaTran char(8) not null,
--     MaCT char(8) not null,
--     MaCTKienTao char(8) not null
-- );
-- CREATE TABLE taikhoan(
--     TenDangNhap varchar(30) UNIQUE not null,
--     MatKhau varchar(30) not null
-- );
-- CREATE TABLE BinhLuan(
--     MaTran char(8) not null,
--     TenDangNhap varchar(30) not null,
--     BinhLuan varchar(300) not null
-- )
