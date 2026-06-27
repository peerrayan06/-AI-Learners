import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Box, Sparkles, GraduationCap, Bot, Globe, Palette, Music } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-12 w-full flex-grow overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-[80dvh] flex flex-col md:flex-row items-center justify-between py-12 gap-8">
        <div className="w-full md:w-1/2 flex flex-col gap-6 z-10">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
            <span className="glow-dot"></span>
            <span className="text-xs text-primary font-mono uppercase tracking-widest">The Future is Here</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Learn AI by Building <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Real Projects</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed">
            Master AI tools, AI agents, website development, image generation, and future-ready skills with practical learning. Join our elite community of builders.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Link to="/register" className="gradient-btn-primary px-8 py-4 rounded-xl font-bold text-on-primary-container flex items-center gap-2">
              Register Now
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 relative flex justify-center items-center h-[400px] md:h-[600px]">
          {/* Decorative blurred orbs for atmosphere */}
          <div className="absolute w-64 h-64 bg-primary/20 rounded-full blur-[100px] -top-10 -right-10 pointer-events-none"></div>
          <div className="absolute w-64 h-64 bg-secondary/10 rounded-full blur-[100px] bottom-0 left-0 pointer-events-none"></div>
          
          <div className="w-full h-full relative z-0 glass-card rounded-[2rem] overflow-hidden flex items-center justify-center p-8 group">
            <img 
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqvO5AMqwwuecVN_yAJtUPMBbryRyYmaRueXKsPMePNl2FiI_CLtSkD1CuqfsN45hc63l2OnP7a-Zq5jqBwIulbT8OB0EMfVcMavBT0RflBYj14FG6fiQQLvj2XyoINfWAP3_yKDscraP9Jh7ffvyWSouXmjp73G5U9r5m003tmqMY07oAJqcrh84ktHsjPxHALf3wMDNfPByJOl7KureKlAmwHApS74l5JptnnT9Fjslm9DyHKPI2NllhXff6m455pBlcVbm8pRub" 
              alt="Futuristic AI Brain" 
            />
            {/* Floating Data Points Overlay */}
            <div className="absolute top-1/4 left-1/4 animate-bounce p-4 glass-card rounded-xl shadow-2xl">
              <Bot className="text-secondary" size={32} />
            </div>
            <div className="absolute bottom-1/4 right-1/4 animate-pulse p-4 glass-card rounded-xl shadow-2xl" style={{ animationDelay: '1s' }}>
              <Terminal className="text-primary" size={32} />
            </div>
          </div>
        </div>
      </section>

      {/* About Section: Feature Cards */}
      <section className="py-16 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-secondary tracking-widest uppercase">Methodology</span>
          <h2 className="text-3xl font-bold">Why AI Learners?</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Practical Learning */}
          <div className="glass-card p-8 rounded-xl flex flex-col gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <Terminal size={28} />
            </div>
            <h3 className="text-xl font-bold">Practical Learning</h3>
            <p className="text-on-surface-variant text-base leading-relaxed">Don't just watch videos. Code, prompt, and deploy AI solutions in our cloud-integrated lab environment from day one.</p>
          </div>
          
          {/* Project-Based Education */}
          <div className="glass-card p-8 rounded-xl flex flex-col gap-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary">
              <Box size={28} />
            </div>
            <h3 className="text-xl font-bold">Project-Based Education</h3>
            <p className="text-on-surface-variant text-base leading-relaxed">Build a professional portfolio of real-world AI applications, from custom chatbots to automated content pipelines.</p>
          </div>
          
          {/* Future Skills */}
          <div className="glass-card p-8 rounded-xl flex flex-col gap-4">
            <div className="w-12 h-12 bg-tertiary/10 rounded-lg flex items-center justify-center text-tertiary">
              <Sparkles size={28} />
            </div>
            <h3 className="text-xl font-bold">Future Skills</h3>
            <p className="text-on-surface-variant text-base leading-relaxed">Stay ahead of the curve. We constantly update our curriculum to cover the latest breakthroughs in LLMs and generative tech.</p>
          </div>
        </div>
      </section>

      {/* Learning Topics Grid: Bento Layout */}
      <section className="py-16 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono text-primary tracking-widest uppercase">Curriculum</span>
            <h2 className="text-3xl font-bold">Explore Our Domains</h2>
          </div>
          <p className="text-on-surface-variant text-base leading-relaxed md:max-w-md">Our curriculum is designed to transform you from a beginner to an AI specialist through structured, hands-on paths.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* AI Basics */}
          <div className="md:col-span-3 glass-card p-8 rounded-xl relative group overflow-hidden">
            <div className="relative z-10">
              <GraduationCap className="text-primary mb-4" size={40} />
              <h4 className="text-2xl font-bold">AI Basics</h4>
              <p className="text-on-surface-variant mt-2 max-w-xs leading-relaxed">Foundational concepts of neural networks, machine learning, and the history of modern AI.</p>
            </div>
            <div className="absolute -bottom-8 -right-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <GraduationCap size={160} />
            </div>
          </div>
          
          {/* AI Agents */}
          <div className="md:col-span-3 glass-card p-8 rounded-xl relative group overflow-hidden">
            <div className="relative z-10">
              <Bot className="text-secondary mb-4" size={40} />
              <h4 className="text-2xl font-bold">AI Agents</h4>
              <p className="text-on-surface-variant mt-2 max-w-xs leading-relaxed">Build autonomous agents using AutoGPT, BabyAGI, and LangChain frameworks.</p>
            </div>
            <div className="absolute -bottom-8 -right-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <Bot size={160} />
            </div>
          </div>
          
          {/* Website Development */}
          <div className="md:col-span-2 glass-card p-8 rounded-xl text-center group">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Globe className="text-primary" size={32} />
              </div>
              <h4 className="text-xl font-bold">Website Dev</h4>
              <p className="text-xs font-mono text-on-surface-variant">Modern full-stack with AI-powered code assistants.</p>
            </div>
          </div>
          
          {/* Image Generation */}
          <div className="md:col-span-2 glass-card p-8 rounded-xl text-center group">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <Palette className="text-secondary" size={32} />
              </div>
              <h4 className="text-xl font-bold">Image Gen</h4>
              <p className="text-xs font-mono text-on-surface-variant">Master Midjourney, Stable Diffusion, and DALL-E 3.</p>
            </div>
          </div>
          
          {/* Music Generation */}
          <div className="md:col-span-2 glass-card p-8 rounded-xl text-center group">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-tertiary/20 transition-colors">
                <Music className="text-tertiary" size={32} />
              </div>
              <h4 className="text-xl font-bold">Music Gen</h4>
              <p className="text-xs font-mono text-on-surface-variant">Create professional audio tracks with Suno and Udio AI.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 pb-24">
        <div className="glass-card p-8 md:p-16 rounded-3xl overflow-hidden relative border-none bg-gradient-to-br from-primary-fixed-dim/10 via-surface-container to-surface-container-low">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(77,142,255,0.1),transparent_70%)] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            <h2 className="text-4xl md:text-5xl font-extrabold max-w-2xl tracking-tight">
              Ready to join AI Learners?
            </h2>
            <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
              Unlock over 100+ projects, exclusive community events, and the most advanced AI curriculum available online.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-6">
              <Link to="/register" className="gradient-btn-primary px-10 py-5 rounded-2xl font-bold text-lg text-on-primary-container shadow-xl hover:scale-105 transition-transform block">
                Register Now
              </Link>
            </div>
          </div>
          
          {/* Atmospheric background element */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
        </div>
      </section>
    </div>
  );
}
