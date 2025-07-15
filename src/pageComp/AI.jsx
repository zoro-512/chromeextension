import React, { useState } from 'react';
import './content.css'; // Your styles
import { getHintFromGemini } from './getHint';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';


const AI = () => {
  const [expanded, setExpanded] = useState(false);
  const[hint,setHint]=React.useState("");
    const [loading, setLoading] = useState(false);

  const toggleExpand = () => setExpanded(prev => !prev);

  const description = document.querySelector('meta[name="description"]')?.content;

  React.useEffect(()=>{
   if (expanded && description) {
      setLoading(true);
      getHintFromGemini(description).then((res) => {
        setHint(res);
        setLoading(false);
      });
    }
  }, [expanded]);
  const hintText = (
  <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {hint}
  </ReactMarkdown>
);


return (
  <div
    className={`leetfocus-box ${expanded ? 'expanded' : 'collapsed'}`}
    onClick={toggleExpand}
  >
    <h4 style={{ margin: 0, cursor: 'pointer' }}>
      {expanded ? '🔴' : '➕ Need Help'}
    </h4>

    {expanded && (
      <div className="leetfocus-content">
        <p style={{ fontSize: '16px', fontWeight: 'bold' }}>🧠 Focus Hint</p>
        {loading ? (
          <p style={{ fontSize: '12px' }}>Thinking...</p>
        ) : (
          <div className="leetfocus-markdown">{hintText}</div>
        )}
        <div className="leetfocus-action">
          <button style={{
            marginTop: '10px',
            padding: '6px 10px',
            fontSize: '12px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            background: '#262626',
            color:'white',
            cursor: 'pointer'
          }}>
            📘 Get Soln
          </button>
        </div>
      </div>
    )}
  </div>
);


}
export default AI;
