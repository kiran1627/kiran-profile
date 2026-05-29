'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, BookOpen, Terminal, ShieldAlert, Award } from 'lucide-react';
import { blogs } from '../data/blogData';
import './Blog.css';

const Blog = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 80, damping: 14 }
    }
  };

  return (
    <section id="blog" className="blog-section">
      <div className="blog-grid-overlay" />
      <div className="blog-glow-orb" />

      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-cinematic">
          <span className="section-eyebrow">
            <BookOpen size={12} className="pulse-icon" /> TECHNICAL LEARNINGS
          </span>
          <h2 className="heading-primary-cinematic">
            <span className="text-gradient">BLOGS</span>
          </h2>
          <p className="section-subtitle-cinematic">
            Sharing insights on AI Engineering, Full Stack Development, and System Design.
          </p>
        </div>

        {/* Premium Article Cards */}
        <motion.div
          className="blog-cards-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {blogs.map((blog, i) => (
            <motion.a
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className="blog-card glass-panel-premium"
              variants={cardVariants}
            >
              <div className="blog-card-image-wrapper">
                <img src={blog.image} alt={blog.title} className="blog-card-image" />
                <div className="blog-card-overlay">
                  <div className="read-more-btn">
                    <span>Read More</span>
                    <ArrowRight size={14} className="arrow-icon" />
                  </div>
                </div>
              </div>

              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <span className="blog-card-date">{blog.date}</span>
                  <span className="blog-card-read-time">
                    <Clock size={12} /> {blog.readTime}
                  </span>
                </div>
                
                <h3 className="blog-card-title">{blog.title}</h3>
                <p className="blog-card-desc">{blog.desc}</p>
                
                <div className="blog-card-tags">
                  {blog.tags.map((tag, idx) => (
                    <span key={idx} className="blog-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
