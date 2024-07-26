'use client'
import React, { useState } from 'react';
import { OpenAI } from 'openai';

function Create() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const generateImage = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await openai.images.generate({
        prompt,
        n: 1,
        size: '512x512',
      });
      setImageUrl(response.data[0].url);
    } catch (error) {
      console.error('Error generating image:', error);
      setError('Failed to generate image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='max-container padding-container gap-20 py-22 pb-32 md-gap-28 lg:py-20'>
      <div>Preview image</div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {imageUrl && <img src={imageUrl} alt="Generated" />}
      <div>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter prompt for AI image"
        />
        <button onClick={generateImage} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
      </div>
    </section>
  );
}

export default Create;
