"use client"
import LeftMenu from '@/src/components/sidebar/leftMenu';
import http from '@/src/request/httpConfig';
import { Menu } from '@/src/request/model';
import { MenuResponse } from '@/src/request/reponseType';
import { CameraOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Card, Image, List, Tag, Typography, Upload, message } from 'antd';
import type { RcFile, UploadChangeParam } from 'antd/es/upload';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const MEAL_TYPE: { [key: string]: string } = {
  LUNCH: "Bữa trưa",
  DINNER: "Bữa chiều"
}
const { Title, Text } = Typography;

export default function MenuDetail() {
    const searchParams = useSearchParams()
    
    
    const date = searchParams.get('date');
    const [fileList, setFileList] = useState<Record<number, RcFile>>({});
    const [data, setData] = useState<Menu[]>([]);
    const [reload, setReload] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<Record<number, string>>({});

    const handleImageSelected = (index: number, file: File) => {
        console.log("chạy vào đây");
        
        const imageUrl = URL.createObjectURL(file);
        setPreviewUrl(prev => ({
            ...prev,
            [index]: imageUrl,
        }));
    };
    
    useEffect(() => {
        getMenus();
    }, [reload])
    
    const getMenus = async () => {
        var response = await http.get<MenuResponse>(`/menus?fromDate=${date}&toDate=${date}`);
        if(response.status === 200){
            setData(response.payload.data);
        }
    }
    async function uploadImage(file: File) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:4567/images/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        return result;
    }
  const handleUpload = async (index: number) => {
    try {
        await uploadImage(fileList[index]).then(async response => {
            console.log(response.path);
            var record = data[index];
            const body = {...record, image: response.path}
            await http.post<Menu>("/menus", body);
            setReload(!reload);
        }); 
        setFileList([]);
        setPreviewUrl(prev => {
            const { [index]: _, ...rest } = prev;
            return rest;
        });
    } catch (err) {
    }
    setFileList([]);
  };

  return (
        <div className="flex h-screen overflow-hidden">
            <LeftMenu />
            <div className="flex-1 px-24 py-4 overflow-y-auto">
                {data && data.map((menu, key) => {
                    return(
                        <Card key={key} className="max-w-2xl mx-auto mt-6 shadow-xl rounded-2xl p-4">
                            <Title level={3}>{menu.name || 'Thực đơn chi tiết'}</Title>
                            <div className="mb-4 flex items-center gap-3">
                                <Tag color="blue">{MEAL_TYPE[menu.type]}</Tag>
                                <Text className="text-gray-500">
                                    Ngày: {new Date(menu.startTime).toLocaleDateString('vi-VN')}
                                </Text>
                            </div>
                            <div className='flex'>
                                {menu.image && !previewUrl?.[key] ?
                                    <div className='mr-4'>
                                        <Image src={menu.image}
                                            width={250}
                                            height={200}
                                            alt="Picture of the author"
                                            />

                                        <Upload
                                                key={key}
                                                {...{
                                                    beforeUpload: (file) => {
                                                        setFileList(prev => ({
                                                            ...prev,
                                                            [key]: file,
                                                        }));
                                                        return false; 
                                                    },
                                                accept: 'image/*',
                                                capture: 'environment',
                                                showUploadList: false,
                                                onChange: (info: UploadChangeParam) => {
                                                    const file = info.fileList[0].originFileObj;
                                                    console.log("on change: ", info);
                                                    if (file) {
                                                        handleImageSelected(key, file);
                                                    }
                                                },
                                                }}
                                            >
                                                <Button icon={<CameraOutlined />}>Chọn ảnh khác</Button>
                                            </Upload>
                                        </div>
                                    :
                                    <div className='mr-4'>
                                        {previewUrl?.[key] ? 

                                            <div className='mr-4'>
                                                <Image src={previewUrl[key]}
                                                    width={250}
                                                    height={200}
                                                    alt="Picture of the author"
                                                    />
                                            </div>
                                        : 
                                            <Upload
                                                key={key}
                                                {...{
                                                    beforeUpload: (file) => {
                                                        setFileList(prev => ({
                                                            ...prev,
                                                            [key]: file,
                                                        }));
                                                        return false; 
                                                    },
                                                accept: 'image/*',
                                                capture: 'environment',
                                                showUploadList: false,
                                                onChange: (info: UploadChangeParam) => {
                                                    const file = info.fileList[0].originFileObj;
                                                    console.log("on change: ", info);
                                                    if (file) {
                                                        handleImageSelected(key, file);
                                                    }
                                                },
                                                }}
                                            >
                                                <Button icon={<CameraOutlined />}>Chọn ảnh từ máy ảnh</Button>
                                            </Upload>
                                        }

                                        <div className='flex justify-between'>
                                            <Button
                                                type="primary"
                                                className="mt-4"
                                                onClick={() => handleUpload(key)}
                                                disabled={!fileList[key]}
                                                icon={<UploadOutlined />}
                                                >
                                                    Tải ảnh lên
                                            </Button>

                                            {previewUrl[key] && 
                                            <Button
                                                danger
                                                type="primary"
                                                className="mt-4"
                                                onClick={() => {
                                                    setPreviewUrl(prev => {
                                                        const { [key]: _, ...rest } = prev;
                                                        return rest;
                                                    });
                                                }}
                                                disabled={!fileList[key]}
                                                >
                                                    Huỷ
                                            </Button>
                                            }
                                        </div>
                                    </div>
                                }
                                <List
                                    header={<Text strong>Món ăn</Text>}
                                    bordered
                                    dataSource={menu.foods}
                                    renderItem={(item) => <List.Item>{item}</List.Item>}
                                    className="mb-6 w-full"
                                    />

                                
                            </div>
                        </Card>
                        )
                    })}
                </div>
            </div>
        );
};


