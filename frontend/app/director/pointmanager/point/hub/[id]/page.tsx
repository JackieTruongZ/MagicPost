import Banner from '@/app/components/Banner/page'
import { Avatar } from 'primereact/avatar'
import React from 'react'
import '../../style.css'
const HubPage = () => {
    return (
        <div>
            <div className="banner w-full ">
                <Banner />
            </div>
            <div className="hub-info">
                <Avatar
                    image="https://firebasestorage.googleapis.com/v0/b/magicpost-480e1.appspot.com/o/ava1.png?alt=media&token=f97025a6-5cf0-437e-a664-1f563d7860e6"
                    className="mr-4 ml-2 avatar"
                    size="large"
                    shape="circle"
                />
                <div className="hub-details">
                    {/* Hub details content */}
                </div>
            </div>
        </div>
    )
}

export default HubPage