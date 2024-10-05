import React, { useState, useEffect, useCallback } from 'react';
import { fetchAudiobooks, fetchVotedAudiobook, voteAudiobook } from '../api/api';
import AudiobookCard from '../components/AudiobookCard';

const Audiobooks = () => {
  const [audiobooks, setAudiobooks] = useState([]);
  const [error, setError] = useState('');
  const [votedAudiobook, setVotedAudiobook] = useState();
  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetchAudiobooks(token);
      setAudiobooks(response.data);
    } catch (error) {
      setError('Failed to load audiobooks');
    }
  }, []);
  const fetchVote = useCallback(async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetchVotedAudiobook(token)
      if (res) {
        setVotedAudiobook(res?.data)
      }
    } catch (error) {
      // setError(error?.response?.data?.msg ?? 'Failed to fetch previous vote');
    }
  }, []);
  const handleVote = useCallback(async (audiobook) => {
    try {
      const token = localStorage.getItem('token')
      const res = await voteAudiobook(audiobook?.id, token);
      if (res) {
        setAudiobooks(audiobooks.map(a => a.id === audiobook?.id ? { ...a, votes: res?.data?.vote_count } : a));
        setVotedAudiobook(audiobook)
      }
    } catch (error) {
      setError(error?.response?.data?.msg ?? 'Failed to vote');
    }
  }, [audiobooks]);

  useEffect(() => {
    !audiobooks?.length && fetchData();
  }, [fetchData, audiobooks]);

  useEffect(() => {
    !votedAudiobook && fetchVote();
  }, [fetchVote, votedAudiobook]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Audiobooks</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {audiobooks.map(audiobook => (
          <AudiobookCard key={audiobook.id} audiobook={audiobook} onVote={handleVote} voted={audiobook?.id === votedAudiobook?.id} disable={!!votedAudiobook} />
        ))}
      </div>
    </div>
  );
};

export default Audiobooks;