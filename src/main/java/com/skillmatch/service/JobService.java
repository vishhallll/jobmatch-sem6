package com.skillmatch.service;

import com.skillmatch.model.Job;
import com.skillmatch.model.Skill;
import com.skillmatch.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class JobService {
    private final JobRepository jobRepository;

    @Autowired
    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job updateJob(Job job) {
        return jobRepository.save(job);
    }

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }

    public List<Job> findMatchingJobs(Set<Skill> userSkills) {
        return jobRepository.findMatchingJobs(userSkills);
    }
}