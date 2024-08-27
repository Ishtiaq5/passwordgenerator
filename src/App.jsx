// eslint-disable-next-line no-unused-vars
import React, { useState, useCallback, useEffect, useRef } from 'react';

const App = () => {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [pass, setPass] = useState('');
  const inputRef = useRef(null);

  const passgen = useCallback(() => {
    let pass = '';
    let str = 'QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm';
    if (number) str += '0123456789';
    if (char) str += '!@#\$%^&*(){}][';
    for (let i = 1; i <= length; i++) {
      let chr = Math.floor(Math.random() * str.length);
      pass += str.charAt(chr);
    }
    setPass(pass);
  }, [length, number, char]);

  useEffect(() => {
    passgen();
  }, [length, number, char, passgen]);

  const copyToClipboard = () => {
    inputRef.current?.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
  };

  return (
    <>
      <div className="bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl mb-4 text-center">Password Generator</h1>
          <input
            type="text"
            value={pass}
            ref={inputRef}
            className="w-full py-2 px-3 rounded-md mb-4 focus:outline-none"
            placeholder="Generated Password"
            readOnly
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 w-full"
            onClick={copyToClipboard}
          >
            Copy Password
          </button>
          <div className="flex items-center justify-between mb-4">
            <label>Length: {length}</label>
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={number}
                onChange={() => setNumber((prev) => !prev)}
              />
              Include Numbers
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={char}
                onChange={() => setChar((prev) => !prev)}
              />
              Include Special Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;