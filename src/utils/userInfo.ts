"use client"
import { jwtDecode } from 'jwt-decode';

export const getCustomerId = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decoded = jwtDecode(token);
            return decoded.customerId;
        } catch (e) {
            console.log('Token không hợp lệ');
        }
    }
    return 0;
}

export const getCustomerInfo = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decoded = jwtDecode(token);
            return decoded;
        } catch (e) {
            console.log('Token không hợp lệ');
        }
    }
    return {classId: 0, customerId: 0};
}

export const isAdmin = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decoded = jwtDecode(token);
            return decoded.customerType === 'ADMIN';
        } catch (e) {
            console.log('Token không hợp lệ');
        }
    }
    return false;
}

export const isCustomer = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decoded = jwtDecode(token);
            return decoded.customerType === 'CUSTOMER';
        } catch (e) {
            console.log('Token không hợp lệ');
        }
    }
    return false;
}