import React, { useState, useRef, useEffect } from 'react';
import { X, Plus, Check } from 'lucide-react';
import { Skill } from '../../types';
import { Button } from '../ui/Button';
import { SkillBadge } from '../ui/SkillBadge';

interface SkillSelectorProps {
  selectedSkills: Skill[];
  onSkillsChange: (skills: Skill[]) => void;
  suggestedSkills?: Skill[];
  maxSkills?: number;
}

const commonSkills: Skill[] = [
  { id: '1', name: 'JavaScript', level: 'intermediate' },
  { id: '2', name: 'React', level: 'advanced' },
  { id: '3', name: 'Node.js', level: 'intermediate' },
  { id: '4', name: 'TypeScript', level: 'intermediate' },
  { id: '5', name: 'HTML', level: 'advanced' },
  { id: '6', name: 'CSS', level: 'advanced' },
  { id: '7', name: 'Java', level: 'intermediate' },
  { id: '8', name: 'Python', level: 'beginner' },
  { id: '9', name: 'SQL', level: 'intermediate' },
  { id: '10', name: 'AWS', level: 'beginner' },
  { id: '11', name: 'Docker', level: 'beginner' },
  { id: '12', name: 'Git', level: 'intermediate' },
];

export const SkillSelector: React.FC<SkillSelectorProps> = ({
  selectedSkills,
  onSkillsChange,
  suggestedSkills = [],
  maxSkills = 20,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<Skill['level']>('beginner');
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSkills = commonSkills.filter(
    (skill) =>
      !selectedSkills.some((s) => s.id === skill.id) &&
      skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSkill = (skill: Skill) => {
    if (selectedSkills.length >= maxSkills) return;
    
    onSkillsChange([...selectedSkills, skill]);
    setSearchTerm('');
  };

  const handleCreateSkill = () => {
    if (!searchTerm.trim() || selectedSkills.length >= maxSkills) return;
    
    const newSkill: Skill = {
      id: `custom-${Date.now()}`,
      name: searchTerm.trim(),
      level: newSkillLevel,
    };
    
    onSkillsChange([...selectedSkills, newSkill]);
    setSearchTerm('');
    setIsAdding(false);
  };

  const handleRemoveSkill = (skillId: string) => {
    onSkillsChange(selectedSkills.filter((s) => s.id !== skillId));
  };

  const handleUpdateSkillLevel = (skillId: string, level: Skill['level']) => {
    onSkillsChange(
      selectedSkills.map((s) => (s.id === skillId ? { ...s, level } : s))
    );
  };

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {selectedSkills.map((skill) => (
          <div key={skill.id} className="group relative">
            <SkillBadge
              skill={skill}
              onRemove={() => handleRemoveSkill(skill.id)}
            />
            <div className="absolute z-10 top-full left-0 mt-1 hidden group-hover:block bg-white border border-gray-200 rounded-md shadow-lg p-2">
              <div className="text-xs font-medium text-gray-700 mb-1">Proficiency:</div>
              <div className="flex gap-1">
                {(['beginner', 'intermediate', 'advanced', 'expert'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleUpdateSkillLevel(skill.id, level)}
                    className={`
                      px-2 py-1 text-xs rounded-md transition-colors
                      ${skill.level === level
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }
                    `}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                    {skill.level === level && <Check className="inline-block ml-1 h-3 w-3" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}

        {selectedSkills.length < maxSkills && !isAdding && (
          <Button
            variant="outline"
            size="sm"
            icon={Plus}
            onClick={() => setIsAdding(true)}
            className="border-dashed"
          >
            Add Skill
          </Button>
        )}
      </div>

      {isAdding && (
        <div className="border border-gray-200 rounded-md p-3 bg-white shadow-sm">
          <div className="flex items-center mb-3">
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type a skill name..."
              className="flex-grow px-3 py-1.5 border-0 focus:ring-0 text-sm"
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setIsAdding(false);
                setSearchTerm('');
              }}
              icon={X}
              aria-label="Cancel"
            />
          </div>

          {searchTerm && (
            <div className="mb-3">
              <div className="text-xs font-medium text-gray-500 mb-1">Proficiency level:</div>
              <div className="flex flex-wrap gap-1">
                {(['beginner', 'intermediate', 'advanced', 'expert'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setNewSkillLevel(level)}
                    className={`
                      px-2 py-1 text-xs rounded-md transition-colors
                      ${newSkillLevel === level
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }
                    `}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredSkills.length > 0 && (
            <div>
              <div className="text-xs font-medium text-gray-500 mb-1">Suggested skills:</div>
              <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
                {filteredSkills.slice(0, 10).map((skill) => (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => handleAddSkill(skill)}
                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs rounded-md transition-colors"
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {searchTerm && filteredSkills.length === 0 && (
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-600">
                Add "{searchTerm}" as a new skill
              </span>
              <Button size="sm" onClick={handleCreateSkill}>
                Add
              </Button>
            </div>
          )}
        </div>
      )}

      {suggestedSkills.length > 0 && selectedSkills.length < maxSkills && (
        <div>
          <div className="text-sm font-medium text-gray-700 mb-2">Recommended skills:</div>
          <div className="flex flex-wrap gap-2">
            {suggestedSkills
              .filter((skill) => !selectedSkills.some((s) => s.id === skill.id))
              .slice(0, 5)
              .map((skill) => (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => handleAddSkill(skill)}
                  className="px-2 py-1 border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm rounded-md transition-colors flex items-center"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {skill.name}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};