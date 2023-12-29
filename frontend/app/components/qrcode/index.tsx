import { useEffect, useState } from 'react';
import { Result } from 'postcss';
import { Html5Qrcode } from 'html5-qrcode';
import { Sacramento } from 'next/font/google';
// import './qrScript'

interface Props {
    visible: any;
    setVisible: any;
    orderId: any;
    setOrderId: any;
}

const QRCodeScanner = ({ visible, setVisible, setOrderId }: Props) => {
    const [scanResult, setScanResult] = useState(null);

    useEffect(() => {

        const html5Qrcode = new Html5Qrcode('reader');

        const qrCodeSuccessCallback = async (decodedText: any, decodedResult: any) => {
            if (decodedText) {
                setScanResult(decodedText);
                setOrderId(decodedText);
                html5Qrcode.stop();
            }
        }

        const qrCodeErrorCallback = (Error: any) => {
            console.log(Error);
            // console.log(visible);
        }
        const config = { fps: 10, qrbox: { width: 250, height: 250 } }
        console.log('start');

        html5Qrcode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback, qrCodeErrorCallback);
        console.log('end');

    }, [visible]);

    return (
        <div>
            <div id="reader" style={{ width: '500px' }}></div>
            {
              scanResult && (
                <div>Mã đơn hàng : {scanResult}</div>
              )
            }
        </div>
    );
}

export default QRCodeScanner;