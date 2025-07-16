import React, { useState } from 'react';
import './content.css';
import { getHintFromGemini } from './getHint';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import GetSOln from './getSol';

const AI = () => {
  const [expanded, setExpanded] = useState(false);
  const [hint, setHint] = useState("");
  const [soln, setSoln] = useState("");
  const [hb, setHb] = useState(false);
  const [sb, setSb] = useState(false); // soln button
  const [loading, setLoading] = useState(false);

  const toggleExpand = () => setExpanded(prev => !prev);
  const description = document.querySelector('meta[name="description"]')?.content;

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
        {expanded ? '🔴 FOCUS' : '➕ Need Help'}
      </h4>

      {expanded && (
        <div className="leetfocus-content">
          <p style={{ fontSize: '16px', fontWeight: 'bold' }}>🧠 Focus Hint</p>

          {loading && !sb && (
            <p style={{ fontSize: '12px' }}>Thinking...</p>
          )}

          {!loading && hb && (
            <div className="leetfocus-markdown">{hintText}</div>
          )}

          {!hb && !loading && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLoading(true);
                getHintFromGemini(description).then((res) => {
                  setHint(res);
                  setHb(true);
                  setLoading(false);
                });
              }}
              style={{
                padding: '6px 12px',
                fontSize: '13px',
                backgroundColor: '#3c82f6',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '6px'
              }}
            >
              🧠 Get Hint
            </button>
          )}

          <div className="leetfocus-action">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (sb || loading) return;
                setLoading(true);
                GetSOln(description).then(res => {
                  setSoln(res);
                  setSb(true);
                  setLoading(false);
                });
              }}
              style={{
                marginTop: '10px',
                padding: '6px 10px',
                fontSize: '12px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                background: '#262626',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              📘 Get Soln
            </button>
          </div>

          {loading && sb && (
            <p style={{ fontSize: '12px' }}>Getting solution...</p>
          )}

          {!loading && sb && (
            <pre
              style={{
                backgroundColor: '#1e1e1e',
                color: '#dcdcdc',
                padding: '12px',
                borderRadius: '6px',
                marginTop: '10px',
                overflowX: 'auto',
                fontSize: '13px',
                lineHeight: '1.5'
              }}
            >
              <code>{soln}</code>
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default AI;
