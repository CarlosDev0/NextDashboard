// Portfolio.jsx
import React from 'react';
import './portfolio.css';

export default function Portfolio() {
  return (
    <section className="portfolio-container">
      <h1 className="portfolio-title">My Portfolio</h1>
      <div className="portfolio-grid">
        {/* Technology Stack Card */}
        <div className="portfolio-card">
          <h2>Technology Stack</h2>
          <div className="stack-section">
            <h3>Back End</h3>
            <ul>
              <li>.NET (C#)</li>
              <li>.NET Framework 4.7, 4.8</li>
              <li>.NET Core 3.1, 5, 8</li>
            </ul>
          </div>
          <div className="stack-section">
            <h3>Front End</h3>
            <ul>
              <li>React, Angular</li>
              <li>HTML, CSS, Vanilla JavaScript</li>
              <li>jQuery, Kendo Libraries, Angular</li>
            </ul>
          </div>
          <div className="stack-section">
            <h3>Databases</h3>
            <ul>
              <li>SQL Server</li>
              <li>MySQL, MariaDB, PostgreSQL</li>
              <li>CosmosDB, Redis</li>
            </ul>
          </div>
          <div className="stack-section">
            <h3>Cloud</h3>
            <ul>
              <li>Azure (SQL, Blob Storage, CosmosDB, Redis, Service Bus, Key Vault, Azure Functions, Cognitive Services)</li>
              <li>AWS (IAM, Lambda, S3 Storage, SQS/SNS)</li>
            </ul>
          </div>
        </div>

        {/* Development Practices Card */}
        <div className="portfolio-card">
          <h2>Development Practices</h2>
          <div className="stack-section">
            <h3>Design Patterns & Coding Practices</h3>
            <ul>
              <li>Clean Code, SOLID Principles</li>
              <li>MVC, REST API</li>
            </ul>
          </div>
          <div className="stack-section">
            <h3>Testing & Mocking</h3>
            <ul>
              <li>Testing Frameworks: NUnit, MSTest</li>
              <li>Mocking Framework: Moq</li>
            </ul>
          </div>
          <div className="stack-section">
            <h3>DevOps & Infrastructure</h3>
            <ul>
              <li>Source Control: Git, GitHub, BitBucket</li>
              <li>CI/CD, Docker, Kubernetes</li>
              <li>Infrastructure: Terraform</li>
            </ul>
          </div>
          <div className="stack-section">
            <h3>Security & Integration</h3>
            <ul>
              <li>Security: JWT, OAuth</li>
              <li>Integration: External APIs, Contentful</li>
              <li>ORM: Dapper, Entity Framework</li>
            </ul>
          </div>
        </div>

        {/* Tools & Education Card */}
        <div className="portfolio-card">
          <h2>Tools & Education</h2>
          <div className="stack-section">
            <h3>Tools</h3>
            <ul>
              <li>Swagger, RabbitMQ</li>
              <li>Browser Developer Tools (e.g., Chrome DevTools)</li>
              <li>Visual Studio, VS Code</li>
            </ul>
          </div>
          <div className="stack-section">
            <h3>Education</h3>
            <ul>
              <li>Bachelor's Degree in Computer Science</li>
            </ul>
          </div>
          <div className="stack-section">
            <h3>Working Environment</h3>
            <ul>
              <li>Agile Scrum</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}