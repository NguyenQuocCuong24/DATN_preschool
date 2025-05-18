import { Spin } from 'antd';
import React from 'react';

const Loading = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0, right: 0,
      width: '80vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(255, 255, 255, 0.6)',
      zIndex: 9999
    }}>
      <Spin size="large" tip="Đang tải..." />
    </div>
  );
};

export default Loading;
