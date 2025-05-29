"use client"
import { jwtDecode } from 'jwt-decode';

export const getCustomerId = () => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                return decoded.customerId;
            } catch (e) {
                console.log('Token không hợp lệ', e);
            }
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
            console.log('Token không hợp lệ', e);
        }
    }
    return  {
        customerId: 0,
        customerType: "CUSTOMER",
        fullName: "",
        userId: 0,
        classId: 0
    };
}

export const isAdmin = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decoded = jwtDecode(token);
            return decoded.customerType === 'ADMIN';
        } catch (e) {
            console.log('Token không hợp lệ', e);
        }
    }
    return false;
}

export const isTeacher = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decoded = jwtDecode(token);
            return decoded.customerType === 'TEACHER';
        } catch (e) {
            console.log('Token không hợp lệ', e);
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
            console.log('Token không hợp lệ', e);
        }
    }
    return false;
}