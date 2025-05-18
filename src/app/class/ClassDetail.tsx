import { ClassType } from '@/src/request/model';
import { Modal } from 'antd';

type ClassDetailProps = {
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void
    data: ClassType
}

const ClassDetail = (props: ClassDetailProps) => {
    const {isModalOpen, setIsModalOpen, data} = props;
    return (
        <Modal
          title="Thông tin chi tiết"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
           <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Thông tin lớp học</h1>

                <p className="text-gray-500">Tên lớp: <strong>{data.name}</strong></p>

                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <p><span className="font-medium">Giảng viên:</span> {"teacher"}</p>
                    <p><span className="font-medium">Thời gian học:</span> {"schedule"}</p>
                    <p><span className="font-medium">Số học viên:</span> {12}</p>
                </div>

                {true && (
                    <div>
                    <p className="font-medium">Ghi chú:</p>
                    <p className="text-sm text-gray-600">{"description"}</p>
                    </div>
                )}
            </div>    
        </Modal>
    );
};

export default ClassDetail;