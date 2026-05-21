'use client';

import React, { use } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, User, Share2, Tag } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { blogs } from '../../../src/data/blogData';
import './blogDetail.css';

export default function BlogDetailPage({ params }) {
    const { slug } = use(params);
    const blog = blogs.find(b => b.slug === slug);

    if (!blog) {
        return (
            <div className="blog-detail-page">
                <div className="blog-detail-container">
                    <div className="blog-not-found">
                        <h1>Blog Post Not Found</h1>
                        <p>The article you&apos;re looking for doesn&apos;t exist.</p>
                        <Link href="/#blog" className="back-btn">
                            <ArrowLeft size={18} />
                            <span>Back to Blog</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: blog.title,
                    text: blog.desc,
                    url: window.location.href,
                });
            } catch (err) {
                // User cancelled share
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
        }
    };

    return (
        <div className="blog-detail-page">
            {/* Ambient Background Glow */}
            <div className="blog-ambient-glow"></div>

            {/* Navigation Bar */}
            <motion.nav 
                className="blog-nav"
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Link href="/#blog" className="back-btn">
                    <ArrowLeft size={18} />
                    <span>Back to Blog</span>
                </Link>
                <button className="share-btn" onClick={handleShare}>
                    <Share2 size={16} />
                    <span>Share</span>
                </button>
            </motion.nav>

            {/* Hero Banner */}
            <motion.div 
                className="blog-detail-hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <img src={blog.image} alt={blog.title} className="hero-bg-image" />
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <motion.div 
                        className="hero-tags"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {blog.tags.map((tag, i) => (
                            <span key={i} className="hero-tag">
                                <Tag size={12} />
                                {tag}
                            </span>
                        ))}
                    </motion.div>
                    <motion.h1 
                        className="hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        {blog.title}
                    </motion.h1>
                    <motion.div 
                        className="hero-meta"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="meta-item">
                            <div className="author-avatar">
                                <span>{blog.author.charAt(0)}</span>
                            </div>
                            <span>{blog.author}</span>
                        </div>
                        <div className="meta-divider"></div>
                        <div className="meta-item">
                            <Calendar size={16} />
                            <span>{blog.date}</span>
                        </div>
                        <div className="meta-divider"></div>
                        <div className="meta-item">
                            <Clock size={16} />
                            <span>{blog.readTime}</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Article Content */}
            <motion.article 
                className="blog-detail-container"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
            >
                <div className="blog-detail-content">
                    <ReactMarkdown
                        components={{
                            h2: ({ children }) => <h2 className="article-h2">{children}</h2>,
                            h3: ({ children }) => <h3 className="article-h3">{children}</h3>,
                            h4: ({ children }) => <h4 className="article-h4">{children}</h4>,
                            p: ({ children }) => <p className="article-p">{children}</p>,
                            ul: ({ children }) => <ul className="article-ul">{children}</ul>,
                            ol: ({ children }) => <ol className="article-ol">{children}</ol>,
                            li: ({ children }) => <li className="article-li">{children}</li>,
                            blockquote: ({ children }) => <blockquote className="article-blockquote">{children}</blockquote>,
                            code: ({ children, className }) => {
                                const isInline = !className;
                                return isInline 
                                    ? <code className="article-inline-code">{children}</code>
                                    : <code className={`article-code-block ${className || ''}`}>{children}</code>;
                            },
                            pre: ({ children }) => <pre className="article-pre">{children}</pre>,
                            strong: ({ children }) => <strong className="article-strong">{children}</strong>,
                        }}
                    >
                        {blog.content}
                    </ReactMarkdown>
                </div>

                {/* Bottom Navigation */}
                <div className="blog-bottom-nav">
                    <Link href="/#blog" className="bottom-back-btn">
                        <ArrowLeft size={18} />
                        <span>Back to All Articles</span>
                    </Link>
                </div>
            </motion.article>
        </div>
    );
}
