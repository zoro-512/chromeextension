alert("✅ LeetFocus script loaded");

import './pageComp/content.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import AI from './pageComp/AI';

// You can rename this component however you want
const description = document.querySelector('meta[name="description"]')?.content;

const Copm = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 10,
      right: 10,
      padding: '12px 18px',
      backgroundColor:'aqua',
      border: '1px solid #ddd',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '10px',
      zIndex: 9999,
      fontFamily: 'Arial, sans-serif'
    }}>
      <h4>🚀 LeetFocus</h4>
      <p>You're on LeetCode. Stay focused and solve!</p>
      <p>{description}</p>
    </div>
  )
}

// Inject your component into the page
const container = document.createElement('div')
container.id = '__leetfocus_root'
document.body.appendChild(container)

const root = createRoot(container)
root.render(<AI />)
