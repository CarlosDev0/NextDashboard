"use client";
import React, { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import "./statustransaction.css";
import StatusIcon from "@/components/statusicon/page";

export default function StatusTransaction() {
  const [status, setStatus] = useState(false);
  const [statusActivation, setStatusActivation] = useState(false);
  const [emailStatus, setEmailNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus(true);
    }, 4000);
    return () => clearTimeout(timer);
  }),
    []; /* [] to run only once */

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatusActivation(true), 5000;
    });
    return () => clearTimeout(timer);
  }, []); /* [] to run only once */
  useEffect(() => {
    const timer = setTimeout(() => setEmailNotification(true), 6000);
    return () => clearTimeout(timer);
  }, []);
  //New component (StatusIcon) that receives status, it should be called in the firs useEffect
  return (
    <div className="page-layout">
      <div className="left-panel-container">
        <aside className="left-panel">
          <div className="table">
            <div className="title">
              <h2>TRANSACTION: 317411912854566459</h2>
            </div>
            <div className="rowStatus">
              <StatusIcon status={status} /> Payment Status:
              <div>11:16 a. m. - 05/03/2025</div>
            </div>
            <div className="rowStatus">
              <StatusIcon status={statusActivation} /> Product Activation:
            </div>
            <div className="rowStatus">
              <StatusIcon status={emailStatus} /> Email Notification:
            </div>
            <div className="rowStatus">
              <StatusIcon status={statusActivation} /> Electronic Invoice:
            </div>
          </div>
        </aside>
      </div>
      {/* <main className="main-container">
        <header>
          <p>test</p>
        </header>
      </main> */}
      <aside className="right-panel">
        <div>Summary of purchase:</div>
        <div>Email Notification:</div>
      </aside>
    </div>
  );
}
