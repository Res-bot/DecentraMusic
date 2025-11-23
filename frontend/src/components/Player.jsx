import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle } from 'lucide-react';

const Player = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-4 z-50">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4 w-1/3">
                    <div className="w-14 h-14 bg-slate-800 rounded-lg animate-pulse"></div>
                    <div>
                        <div className="h-4 w-32 bg-slate-800 rounded animate-pulse mb-2"></div>
                        <div className="h-3 w-24 bg-slate-800 rounded animate-pulse"></div>
                    </div>
                </div>

                <div className="flex flex-col items-center w-1/3">
                    <div className="flex items-center gap-6 mb-2">
                        <button className="text-gray-400 hover:text-white transition-colors">
                            <Shuffle size={20} />
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors">
                            <SkipBack size={24} />
                        </button>
                        <button className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white hover:bg-emerald-700 transition-colors">
                            <Play size={24} fill="currentColor" />
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors">
                            <SkipForward size={24} />
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors">
                            <Repeat size={20} />
                        </button>
                    </div>
                    <div className="w-full flex items-center gap-3">
                        <span className="text-xs text-gray-400">0:00</span>
                        <div className="flex-1 h-1 bg-slate-800 rounded-full">
                            <div className="w-0 h-full bg-emerald-600 rounded-full"></div>
                        </div>
                        <span className="text-xs text-gray-400">0:00</span>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 w-1/3">
                    <Volume2 size={20} className="text-gray-400" />
                    <div className="w-24 h-1 bg-slate-800 rounded-full">
                        <div className="w-1/2 h-full bg-emerald-600 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Player;
