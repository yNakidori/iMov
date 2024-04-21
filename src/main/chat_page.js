import React from 'react';
import MenuAppBar from '../components/MenuAppBar';
import LeftSection from '../components/chatComponents/LeftSection';
import RightSection from '../components/chatComponents/RightSection';

const ChatPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <MenuAppBar />
            <div style={{ flex: 1, display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <LeftSection />
                </div>
                <div style={{ flex: 4 }}>
                    <RightSection />
                </div>
            </div>
        </div>
    )
}

export default ChatPage;
