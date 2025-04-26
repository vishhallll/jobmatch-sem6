import React from 'react';
import { X } from 'lucide-react';
import { Skill } from '../../types';

interface SkillBadgeProps {
  skill: Skill;
  matchPercentage?: number;
  onRemove?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({
  skill,
  matchPercentage,
  onRemove,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  };

  const levelColors = {
    beginner: 'bg-blue-100 text-blue-800',
    intermediate: 'bg-green-100 text-green-800',
    advanced: 'bg-purple-100 text-purple-800',
    expert: 'bg-amber-100 text-amber-800',
    default: 'bg-gray-100 text-gray-800',
  };

  const getColorByLevel = () => {
    if (skill.level) {
      return levelColors[skill.level];
    }
    return levelColors.default;
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full font-medium
        ${sizeClasses[size]}
        ${getColorByLevel()}
        ${className}
      `}
    >
      {skill.name}
      {skill.level && (
        <span className="ml-1 text-xs opacity-75">
          {skill.level.charAt(0).toUpperCase()}
        </span>
      )}
      {matchPercentage !== undefined && (
        <span className="ml-1 text-xs font-semibold">{matchPercentage}%</span>
      )}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 flex-shrink-0 flex items-center justify-center h-4 w-4 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Remove skill {skill.name}</span>
        </button>
      )}
    </span>
  );
};