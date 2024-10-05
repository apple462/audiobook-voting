import React from 'react';

const AudiobookCard = ({ audiobook, onVote, voted, disable }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center">
      {/* <img src={audiobook.cover} alt={audiobook.title} className="h-40 w-full object-cover mb-4" /> */}
      <h3 className="text-lg font-semibold">{audiobook.title}</h3>
      <p className="text-sm text-gray-600">{audiobook.author}</p>
      <p className="text-sm mt-2">Votes: {audiobook.votes}</p>
      {!voted && <button disabled={disable} onClick={() => onVote(audiobook)} className={`mt-4 px-4 py-2 bg-${disable ? 'gray' : 'blue'}-500 text-white rounded-md ${disable ? 'disabled:opacity-75 cursor-not-allowed' : ''}`}>
        Vote
      </button>}
      {voted && <p className="text-sm text-green-600 mt-6">You've voted for this audiobook</p>}
    </div>
  );
};

export default AudiobookCard;