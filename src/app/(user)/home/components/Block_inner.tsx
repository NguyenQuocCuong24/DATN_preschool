'use client'
import React from 'react';

const data = [
  {
    title: 'Kỹ năng về nhà an toàn cho mẹ và bé khi bé đi lạc',
    date: '14/09/2020 14:26:50',
  },
  {
    title: 'Cách đối phó tinh tế với một số hành vi xấu của trẻ',
    date: '04/09/2020 14:17:18',
  },
  {
    title: 'Bí quyết gắn kết với con dù con đã lớn',
    date: '28/08/2020 10:03:42',
  },
  {
    title: 'Nên sai vặt trẻ càng sớm càng tốt',
    date: '24/08/2020 09:13:08',
  },
];

export default function Blockinner() {
  return (
    <div className="w-screen bg-white py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-center text-xl font-semibold text-gray-800 mb-10">
          Chúng tôi đã triển khai sản phẩm ở rất nhiều quận huyện và hiện tại đang được sử dụng rất tốt
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((item, index) => (
            <div key={index} className="bg-gray-100 shadow rounded">
              <div className="bg-blue-500 h-2 rounded-t"></div>
              <div className="p-4">
                <h3 className="text-blue-700 font-medium text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-4">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}
