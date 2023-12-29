'use client'

import React, { useEffect, useState } from 'react'
import HubStaffPage from './HubStaff/page';
import TransStaffPage from './TransStaff/page';

function StaffPage() {
    const [roleId, setRoleId] = useState('');
    useEffect(() => {
        const storedroleId: string | null = window.localStorage.getItem('roleId')
        if (storedroleId) {
            setRoleId(storedroleId);
        }
    }, [])
    return (
        <div>
            {
                (roleId && (['511', '512'].includes(roleId))) && (
                    <TransStaffPage />
                )
            }
            {
                (roleId && (['521'].includes(roleId))) && (
                    <HubStaffPage />
                )
            }
        </div>
    )
}

export default StaffPage