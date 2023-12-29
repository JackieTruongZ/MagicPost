import React from 'react'
import MenuItem from './MenuItems'
import './style.css'

interface Props {
    roleId: string;
}

const Menu = ({ roleId }: Props) => {
    return (
        <div className="h-full flex flex-row">
            {
                (roleId == '5') && (
                    <div className='h-full flex flex-row'>
                        <MenuItem onClick={() => { window.location.href = '/director/pointmanager' }}>
                            <div>
                                <p>Point</p>
                            </div>
                        </MenuItem>
                        <MenuItem onClick={() => { window.location.href = '/director/accountmanager' }}>
                            <div>
                                <p>Account</p>
                            </div>
                        </MenuItem>
                        <MenuItem onClick={() => { window.location.href = '/director/ordermanager' }}>
                            <div>
                                <p>Order</p>
                            </div>
                        </MenuItem>
                    </div>
                )
            }

            {
                (['51', '52'].includes(roleId)) && (
                    <div className='h-full flex flex-row'>
                        <MenuItem onClick={() => { window.location.href = '/PointManager/accountmanager' }}>
                            <div>
                                <p>Account</p>
                            </div>
                        </MenuItem>
                        <MenuItem onClick={() => { window.location.href = '/PointManager/ordermanager' }}>
                            <div>
                                <p>Order</p>
                            </div>
                        </MenuItem>
                    </div>
                )
            }

            {
                (['511', '512', '521'].includes(roleId)) && (
                    <div className='h-full flex flex-row'>
                        <MenuItem onClick={() => { window.location.href = '/Staff' }}>
                            <div>
                                <p style={{ width: "max-content" }}>Làm việc thôi</p>
                            </div>
                        </MenuItem>
                    </div>
                )
            }

        </div>
    )
}

export default Menu