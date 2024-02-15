'use client';
import React, { useEffect, useState } from 'react';
import { Winners } from '@/services/GetWinners';
import styles from "./table.module.css";
export default function Table() {
    const [show, showState] = useState(false)
  function toggleShowTable(){
    showState(!show)
  }
  const getRankings = async ()=>{
    const table = document.getElementById('usuarios')
    Winners.getWinnersTable(table)
  }
  useEffect(()=>{
    getRankings();
  },[]);
  return (
    <div id="header" className={`${styles.header} ${show?styles.show:styles.hide}`}>
    <table id="tabla" className="table">
      <thead className="thead-dark">
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Record</th>
        </tr>
      </thead>
      <tbody id="usuarios"></tbody>
    </table>
    <button onClick={toggleShowTable} id="mostrar">I</button>
  </div>
  )
}