package com.skillmatch.service;

import com.skillmatch.model.Skill;
import com.skillmatch.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SkillService {
    private final SkillRepository skillRepository;

    @Autowired
    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public Skill createSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    public Optional<Skill> getSkillById(Long id) {
        return skillRepository.findById(id);
    }

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public Optional<Skill> findByName(String name) {
        return skillRepository.findByNameIgnoreCase(name);
    }
}