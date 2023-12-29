'use client'

import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Result } from 'postcss';


interface Props {
    visiblePopUpCamera: boolean;
}

const QRCodeScanner = ({ visiblePopUpCamera }: Props) => {
    const [scanResult, setScanResult] = useState(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 500,
                height: 500,
            },
            fps: 5,
        },
            true
        );

        if (!visiblePopUpCamera) {
            scanner.clear();
        }

        const success = (result: any) => {
            scanner.clear();
            setScanResult(result);
        }

        const error = (err: any) => {
            console.warn(err)
        }

        scanner.render(success, error);
    }, []);

    return (
        <div>
            {
                scanResult ? (
                    <div>{scanResult}</div>
                ) : (
                    <div id='reader'></div>
                )
            }
        </div>
    );
}

export default QRCodeScanner;