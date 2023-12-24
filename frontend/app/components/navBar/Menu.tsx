import React from 'react'
import MenuItem from './MenuItems'

interface Props {
    roleId: string;
}

const Menu = ({ roleId }: Props) => {
    return (
        <div className="flex absolute left-50">
            {
                (roleId == '5') && (
                    <div>
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
                    <div>
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

        </div>
    )
}

export default Menu