
export default function BanTruDocumentList() {
    const documents = [
        "Sổ điểm danh trường, lớp",
        "Sổ thu thanh toán nhỏ",
        "Biên lai thu tiền",
        "Sổ thu thanh toán lớn, tổng kết các ngày thu",
        "Sổ quỹ tiền mặt (tiền ăn trưa)",
        "Xây dựng thực đơn tuần - Tính khẩu phần dinh dưỡng (dự tính), Phiếu kê chợ",
        "Tổng hợp khẩu phần dinh dưỡng tuần (Bản in chính thức)",
        "Mẫu lưu 3 bước",
        "Phiếu xuất kho, nhập kho"
    ];

    return (
        <div className="bg-white py-4 px-6 max-w-6xl mx-auto mb-20">
            {/* Mô tả hướng dẫn */}
            <div className="bg-[#007dc3] text-white text-xl p-4 text-center font-medium">
                Theo như chương trình tập huấn thực hiện sổ sách bán trú của Phòng Giáo dục Mầm non -
                Sở Giáo dục và Đào tạo Thành phố Hồ Chí Minh, việc thực hiện các loại hồ sơ bán trú
                tại các trường mầm non bao gồm các mẫu báo cáo như sau:
            </div>

            {/* Danh sách sổ sách */}
            <div className="max-w-6xl mx-auto mt-6 border border-[#f8f7f6] rounded shadow bg-gray-50 mb-10">
                {documents.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 px-6 py-4 border-b border-b-[#c0dffa] text-[22px] hover:bg-gray-200 text-[#007dc3]"
                    >
                        <span className="w-12 text-blue-600 font-bold text-4xl text-center leading-none">
                            {index + 1}
                        </span>
                        <span className="flex-1">{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
