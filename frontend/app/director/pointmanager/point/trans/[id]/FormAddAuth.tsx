import { BaseService } from '@/app/service/BaseService';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react'

interface Props {
    transId: string | undefined;
}

function FormAddAuth({ transId }: Props) {
    const [userId, setUserId] = useState<string>('');
    const [validate, setValidate] = useState<boolean>(false);
    const baseService = new BaseService();
    const toast = useRef<Toast | null>(null);
    const handleSubmit = async () => {
        if (userId == '') {
            setValidate(true);
        } 
        else {
            console.log(userId);
            try {
                const formData = {
                    userId : parseInt(userId),
                    transId : transId
                }
                const res = await baseService.addUserOnPoint(formData)
                console.log(res);
                if (res.data.status == 'OK') {
                    toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Thêm thành viên thành công'});
                } else{
                    toast.current?.show({ severity: 'warn', summary: 'Warn', detail: `${res.data.message}`});
                }
            } catch (error) {
                console.log(error);
                toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Có lỗi khi thêm thành viên'});
            }
        }
    }
    return (
        <div>
            <Toast ref={toast} />
            <div className="">
                <label htmlFor="userId">Id người dùng</label>
                <InputText id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
                {(userId == '' && validate) && (
                    <span>Không để trống</span>
                )}
            </div>
            <Button label='Submit' onClick={handleSubmit} />
        </div>
    )
}

export default FormAddAuth