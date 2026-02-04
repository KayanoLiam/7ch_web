import React from 'react';
import { useTranslation } from 'react-i18next';
import { changelogData } from '../data/changelog';

interface ChangelogProps {
    onBack: () => void;
}

export const Changelog: React.FC<ChangelogProps> = ({ onBack }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white min-h-screen text-[#1a1a1a]">
            {/* Header */}
            <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-black">
                    Changelog
                </h1>
                <p className="text-lg text-gray-600 mb-12">
                    All major updates and releases.
                </p>

                {/* List */}
                <div className="space-y-16">
                    {changelogData.map((entry, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-4 md:gap-12">
                            {/* Date Column */}
                            <div className="md:w-1/4 text-gray-500 font-medium whitespace-nowrap pt-1">
                                {entry.date}
                            </div>

                            {/* Content Column */}
                            <div className="md:w-3/4">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <h2 className="text-2xl font-bold text-black">
                                        {entry.title}
                                    </h2>
                                </div>
                                <div className="text-sm font-mono text-gray-500 mb-6">
                                    {entry.version}
                                </div>

                                <ul className="space-y-3">
                                    {entry.changes.map((change, i) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-700 leading-relaxed">
                                            <span className="mt-2 w-1 h-1 bg-gray-400 rounded-full flex-shrink-0" />
                                            <span>{change}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 pt-10 border-t border-gray-100">
                    <button
                        onClick={onBack}
                        className="text-gray-500 hover:text-black transition-colors"
                    >
                        ← Back to 7ch
                    </button>
                </div>
            </div>
        </div>
    );
};
