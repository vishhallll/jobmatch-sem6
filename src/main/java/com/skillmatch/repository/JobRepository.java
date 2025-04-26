package com.skillmatch.repository;

import com.skillmatch.model.Job;
import com.skillmatch.model.Skill;
import com.skillmatch.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByEmployerAndActiveTrue(User employer);
    
    @Query("SELECT j FROM Job j WHERE j.active = true AND EXISTS " +
           "(SELECT s FROM j.requiredSkills s WHERE s IN :userSkills)")
    List<Job> findMatchingJobs(@Param("userSkills") Set<Skill> userSkills);
}