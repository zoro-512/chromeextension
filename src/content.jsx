alert("✅ LeetFocus script loaded");

import './pageComp/content.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import AI from './pageComp/AI';

// You can rename this component however you want
const description = document.querySelector('meta[name="description"]')?.content;



// Inject your component into the page
const container = document.createElement('div')
container.id = '__leetfocus_root'
document.body.appendChild(container)

const root = createRoot(container)
root.render(<AI />)
