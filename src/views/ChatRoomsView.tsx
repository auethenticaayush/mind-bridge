import React, { useState } from 'react';
import { PeerMessage, PeerRoom, UserProfile } from '../types';
import { INITIAL_PEER_MESSAGES, PEER_ROOMS } from '../data/mockData';

interface ChatRoomsViewProps {
  user: UserProfile;
}

export const ChatRoomsView: React.FC<ChatRoomsViewProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'peer' | 'counselor'>('peer');
  const [selectedRoomId, setSelectedRoomId] = useState<string>('finals');
  const [roomMessages, setRoomMessages] = useState<Record<string, PeerMessage[]>>(INITIAL_PEER_MESSAGES);
  const [inputText, setInputText] = useState<string>('');

  const currentRoom = PEER_ROOMS.find(r => r.id === selectedRoomId) || PEER_ROOMS[0];
  const messages = roomMessages[selectedRoomId] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: PeerMessage = {
      id: 'msg-' + Date.now(),
      author: `${user.alias} (You)`,
      avatarBg: 'bg-primary-fixed',
      content: inputText.trim(),
      timestamp: 'Just now',
      isSelf: true,
      helpfulCount: 0,
    };

    setRoomMessages(prev => ({
      ...prev,
      [selectedRoomId]: [...(prev[selectedRoomId] || []), newMsg],
    }));
    setInputText('');

    // Simulated peer reply
    setTimeout(() => {
      const peerReplies = [
        "Sending calm energy your way! Take a slow deep breath.",
        "So valid. You are definitely not the only student experiencing this right now.",
        "Thank you for sharing that openly here. It helps knowing we're in this together.",
        "Rooting for you! Remember your GPA does not define your human worth."
      ];
      const reply = peerReplies[Math.floor(Math.random() * peerReplies.length)];
      const botMsg: PeerMessage = {
        id: 'bot-' + Date.now(),
        author: 'Mindful Panda #402',
        avatarBg: 'bg-secondary-fixed',
        content: reply,
        timestamp: 'Just now',
        isSelf: false,
        helpfulCount: 1,
      };
      setRoomMessages(prev => ({
        ...prev,
        [selectedRoomId]: [...(prev[selectedRoomId] || []), botMsg],
      }));
    }, 1500);
  };

  const handleHelpfulClick = (msgId: string) => {
    setRoomMessages(prev => {
      const currentList = prev[selectedRoomId] || [];
      return {
        ...prev,
        [selectedRoomId]: currentList.map(m =>
          m.id === msgId ? { ...m, helpfulCount: m.helpfulCount + 1 } : m
        ),
      };
    });
  };

  return (
    <div className="flex flex-col w-full px-4 pb-28 pt-2 space-y-4">
      {/* Top Segmented Selector */}
      <div className="flex bg-surface-container p-1 rounded-2xl">
        <button
          onClick={() => setActiveTab('peer')}
          className={`flex-1 py-2 rounded-xl text-[13px] font-semibold transition-all ${
            activeTab === 'peer'
              ? 'bg-surface-container-lowest text-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          24/7 Peer Lounges
        </button>
        <button
          onClick={() => setActiveTab('counselor')}
          className={`flex-1 py-2 rounded-xl text-[13px] font-semibold transition-all ${
            activeTab === 'counselor'
              ? 'bg-surface-container-lowest text-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Counselor DMs (Encrypted)
        </button>
      </div>

      {activeTab === 'peer' ? (
        <div className="space-y-4">
          {/* Peer Room Chips Carousel */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
            {PEER_ROOMS.map(room => {
              const isSelected = selectedRoomId === room.id;
              return (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoomId(room.id)}
                  className={`shrink-0 flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-[13px] font-semibold transition-all ${
                    isSelected
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high border border-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{room.icon}</span>
                  <span>{room.title}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {room.activeCount}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Room Header */}
          <div className="p-3.5 bg-surface-container-lowest rounded-2xl border border-surface-container/60 shadow-sm flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <h3 className="font-bold text-[15px] text-on-surface">{currentRoom.title}</h3>
              </div>
              <p className="text-[12px] text-on-surface-variant mt-0.5">{currentRoom.description}</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-surface-container text-primary font-bold text-[11px] shrink-0">
              {currentRoom.activeCount} Online
            </span>
          </div>

          {/* Messages Feed */}
          <div className="space-y-3 min-h-[300px] max-h-[440px] overflow-y-auto pr-1">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`p-3.5 rounded-2xl text-[13px] border transition-all ${
                  msg.isSelf
                    ? 'ml-auto bg-primary text-white border-primary/20 max-w-[88%]'
                    : 'mr-auto bg-surface-container-lowest text-on-surface border-surface-container max-w-[90%]'
                }`}
              >
                <div className="flex items-center justify-between mb-1 text-[11px]">
                  <span className={`font-semibold ${msg.isSelf ? 'text-white' : 'text-primary'}`}>
                    {msg.author}
                  </span>
                  <span className={msg.isSelf ? 'text-white/80' : 'text-on-surface-variant'}>
                    {msg.timestamp}
                  </span>
                </div>

                <p className="leading-relaxed">{msg.content}</p>

                <div className="flex items-center justify-end gap-2 mt-2 pt-1">
                  <button
                    onClick={() => handleHelpfulClick(msg.id)}
                    className={`text-[11px] flex items-center gap-1 px-2 py-0.5 rounded-full transition-transform active:scale-90 ${
                      msg.isSelf
                        ? 'bg-white/20 text-white'
                        : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    <span>🤍</span>
                    <span>{msg.helpfulCount} Supportive</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Input Form */}
          <form onSubmit={handleSendMessage} className="flex gap-2 pt-1">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder={`Share anonymously as ${user.alias}...`}
              className="flex-1 px-4 py-3 rounded-full bg-surface-container-lowest border border-surface-container text-[13px] text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
            />
            <button
              type="submit"
              className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-container active:scale-95 shadow-md shrink-0"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </form>
        </div>
      ) : (
        /* Counselor Direct Messages */
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-sm flex items-start gap-3">
            <img
              alt="Dr. Sarah Jenkins"
              className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-primary-fixed"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsxdljH_DSKYyhmqWiQ0zdu8uN3scqi5kK1A-Rmuju-HPaVdDs94re6hffR2a0nc3I4-jcyuJvqssu5f894Oq7O8pxcmcnT_Q1dRCczMwCmzsi2e17QI-fxvNOus6dOBK-ybQU2IOUzQXCgMb9AOsdD3rWOUt0F-DWNGV8boPNYDMAWVbhwPXwvC6D4uN4t2jNor8wmTrngcR7BkJNbvj7U4k_6VrDbffAe2Sbp2yBk03_6axvMeqU"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-[14px] text-on-surface">Dr. Sarah Jenkins, LPC</h4>
                <span className="text-[11px] text-primary font-medium">Active</span>
              </div>
              <p className="text-[12px] text-on-surface-variant mt-1 line-clamp-2">
                "Hi Gentle Otter. Looking forward to our 3:30 PM session. Bring any questions or specific anxieties you would like to unpack."
              </p>
              <span className="text-[10px] text-outline mt-2 block">256-Bit Cryptographic Vault</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low text-center">
            <span className="material-symbols-outlined text-primary text-[28px] mb-1">lock</span>
            <p className="font-semibold text-[13px] text-on-surface">Counselor DMs are End-to-End Encrypted</p>
            <p className="text-[11px] text-on-surface-variant max-w-xs mx-auto mt-1">
              Direct messages are strictly restricted between you and your verified university counselor. Messages auto-expunge every 30 days.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
