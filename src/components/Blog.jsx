'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Clock, Tag } from 'lucide-react';
import Link from 'next/link';
import { blogs } from '../data/blogData';
import './Blog.css';

const Blog = () => {
    return (
        <section id="blog" className="blog-section">
            <div className="section-header">
                <span className="subtitle">Latest News</span>
                <h2 className="title">My AI/ML Blog</h2>
            </div>

            <div className="blog-grid">
                {blogs.map((blog, index) => (
                    <motion.div 
                        key={index}
                        className="blog-card glass"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="blog-image">
                            <img src={blog.image} alt={blog.title} />
                            <div className="blog-image-overlay"></div>
                        </div>
                        <div className="blog-content">
                            <div className="blog-meta">
                                <span><Calendar size={14} /> {blog.date}</span>
                                <span><Clock size={14} /> {blog.readTime}</span>
                            </div>
                            <div className="blog-tags">
                                {blog.tags.slice(0, 3).map((tag, i) => (
                                    <span key={i} className="blog-tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h3 className="blog-title">{blog.title}</h3>
                            <p className="blog-desc">{blog.desc}</p>
                            <Link href={`/blog/${blog.slug}`} className="read-more">
                                <span>Read More</span>
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Blog;
