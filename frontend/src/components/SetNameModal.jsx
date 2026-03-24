import React, { useState } from 'react';
import { X, User, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

const SetNameModal = ({ isOpen, onClose, onSave, currentName }) => {
  const [name, setName] = useState(currentName || '');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please enter a name!');
      return;
    }
    if (trimmed.length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }
    if (trimmed.length > 20) {
      setError('Name must be 20 characters or less');
      return;
    }
    onSave(trimmed);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" data-testid="set-name-modal">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-gray-900 border border-gray-700/60 rounded-2xl p-6 shadow-2xl shadow-orange-500/10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
          data-testid="set-name-close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
            <User className="w-6 h-6 text-black" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Choose Your Name</h2>
            <p className="text-gray-400 text-sm">This shows on the leaderboard</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              placeholder="Enter your explorer name..."
              maxLength={20}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 text-lg font-bold"
              autoFocus
              data-testid="set-name-input"
            />
            <div className="flex justify-between mt-1.5 px-1">
              {error ? (
                <span className="text-red-400 text-xs">{error}</span>
              ) : (
                <span className="text-gray-600 text-xs">2-20 characters</span>
              )}
              <span className="text-gray-600 text-xs">{name.length}/20</span>
            </div>
          </div>

          <Button
            onClick={handleSave}
            className="w-full py-3 rounded-xl font-black text-base bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black border-0 transition-all"
            data-testid="set-name-save"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {currentName ? 'Update Name' : 'Set Name & Join Leaderboard'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SetNameModal;
