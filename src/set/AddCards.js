import React from 'react';

export default function AddCards({ onAdd }) {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      onAdd({name: e.target.elements[0].value});   
    }}>
      <input name="set" placeholder="Name your new set" />
      <button type="submit"> Add Set </button>
    </form>
  );
}