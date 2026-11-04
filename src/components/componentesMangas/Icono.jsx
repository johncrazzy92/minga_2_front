const ChatIcon = ({ onClick, isVisible }) => {
    return (

        <div className={`chat-icon z-50 ${isVisible ? 'hidden' : ''}`} onClick={onClick}>
            <img src="/img/icon.webp" alt="Chat Assistant" />
        </div>
    );
};

export default ChatIcon;