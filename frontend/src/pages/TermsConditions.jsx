import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Scale, AlertTriangle, GamepadIcon, BookOpen, Ban } from 'lucide-react';
import { Button } from '../components/ui/button';

const TermsConditions = () => {
  return (
    <div className="terms-page min-h-screen bg-black text-gray-200">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-magenta-500/20">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" className="text-pink-400 hover:text-pink-300 hover:bg-pink-400/10">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 text-pink-400" />
          <h1 className="text-4xl sm:text-5xl font-black text-pink-400 mb-4">Terms & Conditions</h1>
          <p className="text-gray-400">Last updated: December 2024</p>
        </div>

        <div className="space-y-8 text-gray-300">
          {/* Agreement */}
          <section className="terms-section">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6" />
              Agreement to Terms
            </h2>
            <p className="mb-4">
              By accessing or using BlockQuest Official ("the Service"), you agree to be bound by these Terms and Conditions. 
              If you are a parent or guardian, you agree to these terms on behalf of your child.
            </p>
            <p>
              These terms are governed by the laws of Australia. If you do not agree with these terms, please do not use our Service.
            </p>
          </section>

          {/* Description of Service */}
          <section className="terms-section">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
              <GamepadIcon className="w-6 h-6" />
              Description of Service
            </h2>
            <p className="mb-4">
              BlockQuest Official provides:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Retro arcade games</strong> that teach Web3 and blockchain concepts through fun gameplay</li>
              <li><strong>Educational quizzes</strong> integrated into game experiences</li>
              <li><strong>Digital books</strong> (coming soon) that complement the gaming experience</li>
              <li><strong>Achievement systems</strong> to reward learning progress</li>
            </ul>
            <div className="bg-cyan-900/30 border border-cyan-500/30 rounded-lg p-4 mt-4">
              <p className="text-cyan-400 font-semibold">🎮 Important: This is NOT an educational institution or school.</p>
              <p className="mt-2">BlockQuest is an entertainment platform that incorporates educational elements about future technology concepts through gamified experiences.</p>
            </div>
          </section>

          {/* Age Requirements */}
          <section className="terms-section bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">👶 Age Requirements</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Our games are designed for users aged <strong>5 years and above</strong></li>
              <li>Children under 16 should have parental supervision and consent</li>
              <li>Parents/guardians are responsible for monitoring their child's use of the Service</li>
              <li>We do not knowingly collect personal information from children without parental consent</li>
            </ul>
          </section>

          {/* No Real Cryptocurrency */}
          <section className="terms-section">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
              <Ban className="w-6 h-6" />
              No Real Cryptocurrency
            </h2>
            <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 font-semibold mb-2">⚠️ IMPORTANT DISCLAIMER</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>BlockQuest does NOT involve real cryptocurrency, tokens, or NFTs</li>
                <li>All in-game currencies, badges, and rewards are purely virtual with no monetary value</li>
                <li>We do NOT facilitate any real financial transactions</li>
                <li>Any blockchain concepts taught are for educational purposes only</li>
                <li>We do NOT provide financial advice or encourage real crypto investment</li>
              </ul>
            </div>
          </section>

          {/* User Conduct */}
          <section className="terms-section">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              User Conduct
            </h2>
            <p className="mb-4">When using BlockQuest, you agree NOT to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use offensive or inappropriate player names</li>
              <li>Attempt to hack, exploit, or disrupt the Service</li>
              <li>Use automated systems or bots</li>
              <li>Impersonate others or misrepresent your identity</li>
              <li>Share your account with others</li>
              <li>Use the Service for any illegal purpose</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="terms-section">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Intellectual Property
            </h2>
            <p className="mb-4">
              All content on BlockQuest, including but not limited to games, graphics, text, logos, and software, 
              is the property of BlockQuest Official and is protected by Australian and international copyright laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, or create derivative works without our express written permission.
            </p>
          </section>

          {/* Disclaimers */}
          <section className="terms-section">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Disclaimers</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>The Service is provided "as is" without warranties of any kind</li>
              <li>We do not guarantee uninterrupted or error-free service</li>
              <li>Educational content is for general information and entertainment only</li>
              <li>We are not responsible for third-party links or content</li>
              <li>Game progress may be lost due to technical issues</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section className="terms-section">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by Australian law, BlockQuest Official shall not be liable for any 
              indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.
            </p>
          </section>

          {/* Termination */}
          <section className="terms-section">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Termination</h2>
            <p>
              We reserve the right to terminate or suspend access to the Service immediately, without prior notice, 
              for any breach of these Terms. Upon termination, your right to use the Service will cease immediately.
            </p>
          </section>

          {/* Australian Consumer Law */}
          <section className="terms-section bg-green-900/20 border border-green-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-400 mb-4">🇦🇺 Australian Consumer Law</h2>
            <p>
              Nothing in these terms excludes, restricts, or modifies any consumer guarantee, right, or remedy 
              conferred on you by the Australian Consumer Law (Schedule 2 of the Competition and Consumer Act 2010) 
              that cannot be excluded, restricted, or modified by agreement.
            </p>
          </section>

          {/* Contact */}
          <section className="terms-section">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have questions about these Terms and Conditions, please contact us:
            </p>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p><strong>Email:</strong> legal@blockquestofficial.com</p>
              <p className="mt-2"><strong>Website:</strong> blockquestofficial.com</p>
            </div>
          </section>

          {/* Changes */}
          <section className="terms-section">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will provide notice of significant changes 
              by posting the new terms on this page. Your continued use of the Service after changes constitutes 
              acceptance of the new terms.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-500">
        <p>© 2025 BlockQuest Official. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TermsConditions;
