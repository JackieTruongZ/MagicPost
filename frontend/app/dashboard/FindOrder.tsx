'use client'
import React from 'react';
import './style.css';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
function FindOrder() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        // Perform search logic with the searchTerm
        console.log('Searching for:', searchTerm);
    };
    return (
        <div className="component-container h-auto">
            <div className='h-screen flex align-items-center flex justify-content-center flex-wrap'>
                <div className="search flex align-items-center justify-content-center font-bold border-round m-2">
                    <Button
                        icon="pi pi-search"
                        onClick={handleSearch}
                        className="p-button-lg p-mr-2 border-noround-right border-round-left-lg"
                    />
                    <span className="p-float-label">
                        <InputText
                            id="searchInput"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-inputtext-lg border-noround-left border-round-right-lg"
                        />
                        <label htmlFor="searchInput">Search</label>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default FindOrder