'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import './Blog.css';

const blogs = [
    {
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
        date: 'May 12, 2026',
        author: 'Admin',
        title: 'How Generative AI is Changing Modern Software Development',
        desc: 'Explore the impact of LLMs on coding efficiency and the rise of autonomous development agents.'
    },
    {
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800',
        date: 'May 08, 2026',
        author: 'Admin',
        title: 'Building Efficient RAG Pipelines with LangChain and Pinecone',
        desc: 'A deep dive into architecting retrieval-augmented systems for high-performance AI applications.'
    },
    {
        image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=800',
        date: 'May 05, 2026',
        author: 'Admin',
        title: 'Top 5 Machine Learning Trends to Watch in 2026',
        desc: 'From multimodal models to edge AI, here is what is shaping the future of machine learning.'
    }
];

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
                        </div>
                        <div className="blog-content">
                            <div className="blog-meta">
                                <span><Calendar size={14} /> {blog.date}</span>
                                <span><User size={14} /> {blog.author}</span>
                            </div>
                            <h3 className="blog-title">{blog.title}</h3>
                            <p className="blog-desc">{blog.desc}</p>
                            <a href="#" className="read-more">
                                <span>Read More</span>
                                <ArrowRight size={16} />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Blog;
