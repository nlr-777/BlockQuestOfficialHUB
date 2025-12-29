import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Database, Lock, UserCheck, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-page min-h-screen bg-black text-gray-200">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-cyan-500/20">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <Shield className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
          <h1 className="text-4xl sm:text-5xl font-black text-cyan-400 mb-4">Privacy Policy</h1>
          <p className="text-gray-400">Last updated: December 2024</p>
        </div>

        <div className="space-y-8 text-gray-300">
          {/* Introduction */}
          <section className="policy-section">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6" />
              Introduction
            </h2>
            <p className="mb-4">
              BlockQuest Official ("we", "us", or "our") operates the BlockQuestOfficial.com website and associated games. 
              This Privacy Policy explains how we collect, use, and protect information when you or your child uses our services.
            </p>
            <p>
              We are committed to protecting the privacy of all users, especially children. Our games are designed for 
              ages 5+ and we comply with Australian privacy laws including the Privacy Act 1988 (Cth) and the Australian 
              Privacy Principles (APPs).
            </p>
          </section>

          {/* Information We Collect */}
          <section className="policy-section">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
              <Database className="w-6 h-6" />
              Information We Collect
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-cyan-300 mb-2">Information You Provide</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Player nicknames (no real names required)</li>
                  <li>Email address (for newsletter subscription only, with parental consent for under 16s)</li>
                  <li>Game progress and achievements</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-cyan-300 mb-2">Automatically Collected Information</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Device type and browser information</li>
                  <li>General location (country level only)</li>
                  <li>Game usage statistics</li>
                </ul>
              </div>
              <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4 mt-4">
                <p className="text-green-400 font-semibold">🛡️ What We DON'T Collect:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Real names of children</li>
                  <li>Physical addresses</li>
                  <li>Photos or videos</li>
                  <li>Financial information (no real cryptocurrency or purchases)</li>
                  <li>Social media accounts</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="policy-section">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
              <UserCheck className="w-6 h-6" />
              How We Use Information
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To provide and improve our games and educational content</li>
              <li>To save game progress and achievements</li>
              <li>To send newsletters (only with explicit consent)</li>
              <li>To ensure a safe gaming environment</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="policy-section">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6" />
              Data Security
            </h2>
            <p className="mb-4">
              We implement appropriate technical and organisational measures to protect personal information against 
              unauthorised access, alteration, disclosure, or destruction. This includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments</li>
              <li>Limited access to personal information</li>
              <li>Secure hosting within Australia or approved jurisdictions</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section className="policy-section bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">👶 Children's Privacy</h2>
            <p className="mb-4">
              BlockQuest is designed to be safe for children aged 5 and above. We take extra precautions:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>No collection of personal information from children without parental consent</li>
              <li>No advertising or in-app purchases</li>
              <li>No social features that allow direct communication between users</li>
              <li>No real cryptocurrency transactions</li>
              <li>Parents can request deletion of their child's data at any time</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="policy-section">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Your Rights</h2>
            <p className="mb-4">Under Australian privacy law, you have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access the personal information we hold about you or your child</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of personal information</li>
              <li>Withdraw consent for data processing</li>
              <li>Lodge a complaint with the Office of the Australian Information Commissioner (OAIC)</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="policy-section">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
              <Mail className="w-6 h-6" />
              Contact Us
            </h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p><strong>Email:</strong> privacy@blockquestofficial.com</p>
              <p className="mt-2"><strong>Response Time:</strong> We aim to respond within 30 days</p>
            </div>
          </section>

          {/* Updates */}
          <section className="policy-section">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Policy Updates</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify users of any material changes 
              by posting the new Privacy Policy on this page and updating the "Last updated" date.
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

export default PrivacyPolicy;
