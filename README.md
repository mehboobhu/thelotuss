


<h1>Node-Service Backend</h1>


<h2>Table of Contents</h2>
<ul>
  <li><a href="#getting-started">Getting Started</a></li>
    <ul>
      <li><a href="#prerequisites">Prerequisites</a></li>
      <li><a href="#database-setup">Database Setup</a></li>
      <li><a href="#installation">Installation</a></li>
    </ul>
  <li><a href="#usage">Usage</a></li>
    <ul>
      <li><a href="#running-the-server">Running the Server</a></li>
      <li><a href="#making-api-requests">Making API Requests</a></li>
      <li><a href="#getting-base64-encoded-credentials">Getting Base64-encoded Credentials</a></li>
        <ul>
          <li><a href="#generating-base64-credentials">Generating Base64 Credentials</a></li>
        </ul>
    </ul>
  <li><a href="#authentication">Authentication</a></li>
  <li><a href="#contributing">Contributing</a></li>
  <li><a href="#license">License</a></li>
</ul>

<h2>Getting Started</h2>

<h3>Prerequisites</h3>
<p>- Node.js installed (<a href="https://nodejs.org/" target="_blank">Download here</a>) (version 21.6.0) </p>
<p>- npm or yarn installed (<a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm" target="_blank">npm installation guide</a>, <a href="https://yarnpkg.com/getting-started/install" target="_blank">yarn installation guide</a>)</p>
<p>- PostgreSQL installed (<a href="https://www.postgresql.org/download/" target="_blank">Download here</a>)</p>
<p>- Create a PostgreSQL database and table for the application. You can use tools like pgAdmin or the command line to achieve this.</p>

<h3>Database Setup</h3>
<p>1. Create a PostgreSQL database:</p>
<code>CREATE DATABASE your_database_name;</code>
<p>2. Connect to the database:</p>
<code>\c your_database_name;</code>
<p>3. Create a table for the application. You can modify the following example to fit your needs:</p>
<code>
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);
</code>

<h3>Installation</h3>
<ol>
  <li>Clone the repository:</li>
  <code>git clone https://github.com/JeanSilva08/node-service.git</code>
  <li>Navigate to the project folder:</li>
  <code>cd node-service</code>
  <li>Install dependencies:</li>
  <code>npm install</code>
  <p>or</p>
  <code>yarn</code>
</ol>

<h2>Usage</h2>

<h3>Running the Server</h3>
<p>Start the server by running:</p>
<code>npm start</code>
<p>or</p>
<code>yarn start</code>
<p>The server will be running at <code>http://localhost:3000</code> by default.</p>

<h3>Making API Requests</h3>

<p>You can make API requests using tools like <code>httpie</code> or <code>curl</code>. Here are examples for GET, POST, and PUT:</p>

<h4>GET Request:</h4>
<code>http GET http://localhost:3000/api/users Authorization:"Basic &lt;base64(username:password)&gt;"</code>
<p>or</p>
<code>curl -X GET http://localhost:3000/api/users -H "Authorization: Basic &lt;base64(username:password)&gt;"</code>

<h4>POST Request:</h4>
<code>http POST http://localhost:3000/api/users \ username="your_username" \ email="your_email@example.com" \ Authorization:"Basic &lt;base64(username:password)&gt;"</code>
<p>or</p>
<code>curl -X POST http://localhost:3000/api/users \ -H "Content-Type: application/json" \ -d '{"username": "your_username", "email": "your_email@example.com"}' \ -H "Authorization: Basic &lt;base64(username:password)&gt;"</code>

<h4>PUT Request:</h4>
<code>http PUT http://localhost:3000/api/users/1 \ username="your_updated_username" \ email="your_updated_email@example.com" \ Authorization:"Basic &lt;base64(username:password)&gt;"</code>
<p>or</p>
<code>curl -X PUT http://localhost:3000/api/users/1 \ -H "Content-Type: application/json" \ -d '{"username": "your_updated_username", "email": "your_updated_email@example.com"}' \ -H "Authorization: Basic &lt;base64(username:password)&gt;"</code>

<h3>Getting Base64-encoded Credentials</h3>

<p>To get the Base64-encoded credentials, you can use the following command in your terminal:</p>
<code>echo -n "your_username:your_password" | base64</code>
<p>Replace <code>your_username</code> and <code>your_password</code> with your actual credentials.</p>
