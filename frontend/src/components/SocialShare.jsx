/* =====================================================
   SOCIAL SHARING COMPONENT
   Native share API with fallback buttons
   ===================================================== */

import React, { useState } from 'react';
import { Share2, Twitter, Facebook, Linkedin, Link2, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

const SocialShare = ({ title, description, url }) => {
  const [copied, setCopied] = useState(false);
  
  const shareData = {
    title: title || 'Block Quest Official | Learn Web3 Through Games and Books',
    text: description || 'Master Web3 Chaos with 5 epic books and 16 retro arcade games! Safe, ad-free educational fun.',
    url: url || window.location.href
  };

  /* Native Share API (mobile-first) */
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled or failed:', err);
      }
    }
  };

  /* Copy link to clipboard */
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  /* Social share URLs */
  const socialUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`
  };

  return (
    <div className="social-share-container flex flex-wrap items-center justify-center gap-3">
      {/* Native Share Button (shows on supported devices) */}
      {navigator.share && (
        <Button
          onClick={handleNativeShare}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors focus:outline focus:outline-2 focus:outline-blue-500"
          aria-label="Share this page"
        >
          <Share2 className="w-4 h-4" aria-hidden="true" />
          Share
        </Button>
      )}

      {/* Twitter */}
      <a
        href={socialUrls.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-lg transition-colors focus:outline focus:outline-2 focus:outline-blue-500"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-5 h-5" aria-hidden="true" />
      </a>

      {/* Facebook */}
      <a
        href={socialUrls.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 bg-[#4267B2] hover:bg-[#365899] text-white rounded-lg transition-colors focus:outline focus:outline-2 focus:outline-blue-500"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-5 h-5" aria-hidden="true" />
      </a>

      {/* LinkedIn */}
      <a
        href={socialUrls.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 bg-[#0077B5] hover:bg-[#006097] text-white rounded-lg transition-colors focus:outline focus:outline-2 focus:outline-blue-500"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-5 h-5" aria-hidden="true" />
      </a>

      {/* Copy Link */}
      <Button
        onClick={copyToClipboard}
        className={`flex items-center justify-center w-10 h-10 ${
          copied ? 'bg-green-600' : 'bg-gray-600 hover:bg-gray-500'
        } text-white rounded-lg transition-colors focus:outline focus:outline-2 focus:outline-blue-500`}
        aria-label={copied ? 'Link copied!' : 'Copy link'}
      >
        {copied 
          ? <CheckCircle className="w-5 h-5" aria-hidden="true" /> 
          : <Link2 className="w-5 h-5" aria-hidden="true" />
        }
      </Button>
    </div>
  );
};

export default SocialShare;
