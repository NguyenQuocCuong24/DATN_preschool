import { Button, Form, FormInstance, Input, Modal } from "antd";
import { CircleX } from 'lucide-react';

type ModalProps = {
    title: String;
    confirmText: String;
    handleOk: () => void; 
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    form: FormInstance;
}

const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

const ModalForm = (props: ModalProps) => {
    const {title, confirmText, handleOk, isModalOpen, setIsModalOpen, form } = props;
    
    return (
        <div>
            <Modal
                title={title}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => setIsModalOpen(false)}
                okText={confirmText}
                cancelText="Hủy"
            >
            <Form
                name="dynamic_form_item"
                {...formItemLayoutWithOutLabel}
                style={{ maxWidth: 600 }}
                form={form}
                >
                <Form.Item name="name" label="Tên lịch trình" rules={[{ required: true, message: "Vui lòng nhập tên lịch trình" }]}>
                    <Input />
                </Form.Item>
                <Form.List
                    name="routes"
                    rules={[
                    {
                        validator: async (_, names) => {
                        if (!names || names.length < 2) {
                            return Promise.reject(new Error('Tối thiểu có 2 địa điểm'));
                        }
                        },
                    },
                    ]}
                >
                    {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => (
                        <Form.Item
                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                            label={index === 0 ? 'Lộ trình' : ''}
                            required={false}
                            key={field.key}
                        >
                            <div className='flex gap-2'>
                                <Form.Item
                                {...field}
                                validateTrigger={['onChange', 'onBlur']}
                                rules={[
                                    {
                                    required: true,
                                    whitespace: true,
                                    message: "Vui lòng nhập đầy đủ địa điểm.",
                                    },
                                ]}
                                noStyle
                                >

                                <Input placeholder="Nhập địa điểm" style={{ width: '60%' }} />
                                </Form.Item>
                                {fields.length > 1 ? (
                                    <CircleX 
                                        color='gray'
                                        className="cursor-pointer dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </div>
                        </Form.Item>
                        ))}
                        <Form.Item>
                        <Button
                            type="dashed"
                            onClick={() => add()}
                            style={{ width: '60%' }}
                        >
                            Thêm địa điểm
                        </Button>
                        
                        <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                    )}
                </Form.List>
                
                </Form>
            </Modal>
        </div>
    );
};

export default ModalForm;